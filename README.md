# Portfolio Micro Frontend

A personal portfolio website built with **React** and **Module Federation** (Vite). Each section is an independently runnable micro frontend; a shell app composes them at runtime.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  shell (host) — http://localhost:5173                  │
│  Loads remotes via Module Federation                    │
└────────────┬────────────┬────────────┬────────────┬─────┘
             │            │            │            │
     header  │    about   │ experience │  projects  │  contact   │
     :5001   │    :5002   │    :5005   │    :5003   │    :5004   │
```

| App | Port | Role |
|-----|------|------|
| `shell` | 5173 | Host — layout, error boundaries, lazy loads remotes |
| `@portfolio/header` | 5001 | Sticky nav, scroll spy |
| `@portfolio/about` | 5002 | Hero, skills |
| `@portfolio/experience` | 5005 | Work experience timeline |
| `@portfolio/projects` | 5003 | Project grid |
| `@portfolio/contact` | 5004 | Contact form, footer |

> **macOS note:** Port 5000 is often used by AirPlay Receiver, which returns "Access to localhost was denied". The shell uses **5173** instead.

## Quick start

```bash
npm install
npm run dev
```

Open **http://localhost:5173**. All six apps must be running (the root `dev` script starts them together).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start shell + all remotes in dev mode |
| `npm run build` | Production build (remotes first, then shell) |
| `npm run preview` | Preview the built shell |
| `npm run deploy:azure` | Build and deploy to Azure Storage |

## Customize your portfolio

1. **Name & branding** — Edit `remotes/header/src/App.jsx` and `remotes/about/src/App.jsx`.
2. **Projects** — Update the `PROJECTS` array in `remotes/projects/src/App.jsx`.
3. **Contact & links** — Edit `remotes/contact/src/App.jsx` (`LINKS`, footer text).
4. **Résumé** — Keep `resume.pdf` in `remotes/about/src/assets/` and copy it to `shell/public/resume.pdf` for download.

## Run a single micro frontend

Each remote can run standalone for focused development:

```bash
npm run dev -w @portfolio/about
```

## Tech stack

- React 18
- Vite 6
- [@module-federation/vite](https://www.npmjs.com/package/@module-federation/vite)
- npm workspaces

## Production & deployment

Deploy to Azure Storage static website hosting:

```bash
npm run deploy:azure
```

| Setting | Value |
|---------|-------|
| Storage account | `portfolio27964` |
| Public domain | `https://www.nagarajravi.dev` |
| Cloudflare DNS target | `portfolio27964.z1.web.core.windows.net` |

The deploy script builds remotes under path prefixes (`/header/`, `/about/`, etc.) and uploads them to the `$web` container. The shell is built with `CUSTOM_DOMAIN` so Module Federation remote URLs use your public domain.

### Cloudflare DNS (nagarajravi.dev)

Add these records in Cloudflare → **DNS**:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | `www` | `portfolio27964.z1.web.core.windows.net` | Proxied |
| CNAME | `@` | `portfolio27964.z1.web.core.windows.net` | Proxied |

Set **SSL/TLS** mode to **Full**.

Override the domain at deploy time:

```bash
CUSTOM_DOMAIN=https://nagarajravi.dev npm run deploy:azure
```

Faster re-deploy options:

```bash
npm run deploy:azure -- --skip-install
npm run deploy:azure -- --skip-build
```
