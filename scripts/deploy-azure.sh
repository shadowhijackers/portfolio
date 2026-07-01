#!/usr/bin/env bash
set -euo pipefail

STORAGE_ACCOUNT="${STORAGE_ACCOUNT:-portfolio27964}"
RESOURCE_GROUP="${RESOURCE_GROUP:-}"
CUSTOM_DOMAIN="${CUSTOM_DOMAIN:-https://nagarajravi.dev}"
INDEX_DOCUMENT="${INDEX_DOCUMENT:-index.html}"
ERROR_DOCUMENT="${ERROR_DOCUMENT:-index.html}"
AUTH_MODE="${AUTH_MODE:-key}"

SKIP_INSTALL=false
SKIP_BUILD=false

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

usage() {
  cat <<EOF
Usage: $(basename "$0") [options]

Deploy the portfolio micro-frontend to Azure Storage static website hosting.

Options:
  --skip-install   Skip npm install
  --skip-build     Upload existing dist folders without rebuilding
  -h, --help       Show this help message

Environment variables:
  STORAGE_ACCOUNT  Azure storage account name (default: portfolio27964)
  RESOURCE_GROUP   Azure resource group (auto-discovered if unset)
  INDEX_DOCUMENT   Static website index document (default: index.html)
  ERROR_DOCUMENT   Static website 404 document (default: index.html)
  AUTH_MODE        Azure auth mode: key or login (default: key)
  CUSTOM_DOMAIN    Public site URL for Module Federation builds
                   (default: https://nagarajravi.dev)
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --skip-install)
      SKIP_INSTALL=true
      shift
      ;;
    --skip-build)
      SKIP_BUILD=true
      shift
      ;;
    -h | --help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

log() {
  printf '\n==> %s\n' "$1"
}

fail() {
  printf 'Error: %s\n' "$1" >&2
  exit 1
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || fail "'$1' is required but not installed."
}

resolve_resource_group() {
  if [[ -n "${RESOURCE_GROUP}" ]]; then
    return
  fi

  RESOURCE_GROUP="$(
    az storage account list \
      --query "[?name=='${STORAGE_ACCOUNT}'].resourceGroup | [0]" \
      -o tsv
  )"

  [[ -n "${RESOURCE_GROUP}" && "${RESOURCE_GROUP}" != "null" ]] ||
    fail "Could not find resource group for storage account '${STORAGE_ACCOUNT}'. Set RESOURCE_GROUP explicitly."
}

resolve_static_url() {
  local endpoint
  endpoint="$(
    az storage account show \
      --name "${STORAGE_ACCOUNT}" \
      --resource-group "${RESOURCE_GROUP}" \
      --query "primaryEndpoints.web" \
      -o tsv
  )"

  [[ -n "${endpoint}" && "${endpoint}" != "null" ]] ||
    fail "Could not resolve static website endpoint for '${STORAGE_ACCOUNT}'."

  STORAGE_ORIGIN="${endpoint%/}"
}

resolve_public_url() {
  local domain="${CUSTOM_DOMAIN%/}"

  if [[ "${domain}" != http* ]]; then
    domain="https://${domain}"
  fi

  PUBLIC_SITE_URL="${domain}"
}

build_remotes() {
  log "Building remotes"

  VITE_BASE_PATH=/header/ npm run build -w @portfolio/header
  VITE_BASE_PATH=/about/ npm run build -w @portfolio/about
  VITE_BASE_PATH=/experience/ npm run build -w @portfolio/experience
  VITE_BASE_PATH=/projects/ npm run build -w @portfolio/projects
  VITE_BASE_PATH=/contact/ npm run build -w @portfolio/contact
}

build_shell() {
  log "Building shell with AZURE_STATIC_URL=${PUBLIC_SITE_URL}"
  AZURE_STATIC_URL="${PUBLIC_SITE_URL}" npm run build -w shell
}

validate_dist() {
  local dist_path="$1"
  [[ -d "${dist_path}" ]] || fail "Missing build output: ${dist_path}"
}

upload_dist() {
  local source_dir="$1"
  local destination_path="$2"
  local destination="\$web"

  if [[ -n "${destination_path}" ]]; then
    destination="\$web/${destination_path}"
  fi

  validate_dist "${source_dir}"

  log "Uploading ${source_dir} to ${destination}"

  az storage blob upload-batch \
    --account-name "${STORAGE_ACCOUNT}" \
    --destination "${destination}" \
    --source "${source_dir}" \
    --overwrite \
    --auth-mode "${AUTH_MODE}" \
    --only-show-errors
}

main() {
  require_command az
  require_command npm

  az account show >/dev/null 2>&1 ||
    fail "Azure CLI is not logged in. Run 'az login' first."

  log "Using storage account: ${STORAGE_ACCOUNT}"
  resolve_resource_group
  log "Using resource group: ${RESOURCE_GROUP}"

  log "Enabling static website hosting"
  az storage blob service-properties update \
    --account-name "${STORAGE_ACCOUNT}" \
    --static-website \
    --index-document "${INDEX_DOCUMENT}" \
    --404-document "${ERROR_DOCUMENT}" \
    --auth-mode "${AUTH_MODE}" \
    --only-show-errors

  resolve_static_url
  resolve_public_url
  log "Storage origin: ${STORAGE_ORIGIN}"
  log "Public site URL: ${PUBLIC_SITE_URL}"

  cd "${ROOT_DIR}"

  if [[ "${SKIP_INSTALL}" == false ]]; then
    log "Installing dependencies"
    npm install
  fi

  if [[ "${SKIP_BUILD}" == false ]]; then
    build_remotes
    build_shell
  fi

  upload_dist "${ROOT_DIR}/shell/dist" ""
  upload_dist "${ROOT_DIR}/remotes/header/dist" "header"
  upload_dist "${ROOT_DIR}/remotes/about/dist" "about"
  upload_dist "${ROOT_DIR}/remotes/experience/dist" "experience"
  upload_dist "${ROOT_DIR}/remotes/projects/dist" "projects"
  upload_dist "${ROOT_DIR}/remotes/contact/dist" "contact"

  log "Deployment complete"
  printf '\nPublic site URL: %s\n' "${PUBLIC_SITE_URL}"
  printf 'Storage origin (Cloudflare CNAME target): %s\n' "${STORAGE_ORIGIN#https://}"
}

main "$@"
