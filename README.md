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

## Customize your portfolio

1. **Name & branding** — Edit `remotes/header/src/App.jsx` and `remotes/about/src/App.jsx`.
2. **Projects** — Update the `PROJECTS` array in `remotes/projects/src/App.jsx`.
3. **Contact & links** — Edit `remotes/contact/src/App.jsx` (`LINKS`, footer text).
4. **Résumé** — Place `resume.pdf` in `shell/public/` (create the folder if needed).

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

## Production notes

After `npm run build`, deploy each `dist` folder. Update remote URLs in `shell/vite.config.js` to your CDN origins before building the shell.
