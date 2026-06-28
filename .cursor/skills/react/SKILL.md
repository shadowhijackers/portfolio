---
name: react-microfrontend
description: Best practices and coding standards for React Micro Frontend projects using Vite, Module Federation, JavaScript, Zustand, React Query, Axios, and Material UI.
globs:
  - "remotes/**/src/**/*.{js,jsx}"
  - "**/vite.config.js"
  - "module-federation.config.js"
alwaysApply: true
---

# React Micro Frontend Development Rules

## Tech Stack

- React 19
- JavaScript (ES2023+)
- Vite
- Module Federation
- React Router v6
- Zustand
- React Query
- Axios
- Material UI
- ESLint
- Prettier

## General Principles

- Write clean, maintainable JavaScript.
- Use Functional Components only.
- Keep components small and reusable.
- Prefer composition over inheritance.
- Reuse existing code before creating new components.
- Follow the existing project structure.
- Generate production-ready code.

Avoid:

- Class Components
- Duplicate logic
- Inline business logic
- Deep prop drilling
- Unnecessary abstractions

---

## Folder Structure

```

src/
├── api/
├── assets/
├── components/
├── constants/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── store/
├── styles/
├── utils/
├── App.jsx
└── main.jsx

```

---

## React Guidelines

- Use Functional Components.
- Use Hooks for reusable logic.
- Keep components under 200 lines.
- Use React.memo only when it improves performance.
- Use lazy loading for large pages.
- Keep presentation and data fetching separate.

---

## State Management

Use:

- useState for local state.
- Zustand for shared application state.
- React Query for server state.

Never duplicate state.

---

## API Pattern

Never call APIs directly inside components.

Preferred flow:

```

Component
↓
Custom Hook
↓
Service
↓
Axios Client

```

---

## Module Federation

- Expose only public modules.
- Keep internal utilities private.
- Do not import files from another MFE directly.
- Share only required dependencies.
- Ensure each MFE remains independently deployable.

Shared dependencies:

- react
- react-dom
- react-router-dom
- zustand

---

## Routing

- Each MFE owns its own routes.
- Do not depend on another MFE's routing configuration.

---

## Styling

- Use Material UI components.
- Prefer the `sx` prop and theme customization.
- Avoid inline styles unless necessary.

---

## Performance

Prefer:

- React.memo
- useMemo
- useCallback
- lazy()
- Suspense
- Dynamic imports
- Code splitting

Avoid unnecessary renders.

---

## JavaScript Standards

- Use const by default.
- Never use var.
- Use let only when reassignment is required.
- Prefer arrow functions.
- Use async/await.
- Use optional chaining.
- Use nullish coalescing.
- Use template literals.
- Use destructuring.

---

## Error Handling

Always handle:

- Loading state
- Error state
- Empty state
- Network failures

Provide meaningful feedback to users.

---

## File Naming

```

UserCard.jsx
Dashboard.jsx
useUsers.js
userService.js
dateUtils.js
userStore.js

```

---

## Security

- Never expose secrets.
- Never hardcode API keys.
- Validate user input.
- Handle authentication in the Host application.

---

## Git Commits

```

feat:
fix:
refactor:
docs:
style:
test:
chore:

```

---

## AI Instructions

When generating code:

- Follow the existing project conventions.
- Reuse existing components and hooks.
- Avoid unnecessary dependencies.
- Preserve Module Federation compatibility.
- Generate complete, production-ready JavaScript.
- Do not refactor unrelated files.
- Optimize for readability and maintainability.
- Ask for clarification when project conventions are ambiguous.

