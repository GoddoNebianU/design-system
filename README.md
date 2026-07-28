# @goddonebianu/design-system

Pure presentation-layer UI primitives shared across [lernu.cc](https://lernu.cc) projects. Built with Radix UI + class-variance-authority + Tailwind CSS v4.

Ships **TypeScript source** (`.tsx` / `.ts`) — not pre-bundled ESM/CJS. This lets Tailwind v4 scan component classes via `@source` and lets Next.js / Vite compile the TSX directly from `node_modules`.

## Contents

- **31 UI primitives**: `accordion`, `alert`, `avatar`, `badge`, `button`, `card`, `container`, `dialog`, `dropdown-menu`, `empty-state`, `field`, `heading`, `icon-button`, `input`, `label`, `modal`, `popover`, `progress`, `range`, `scroll-area`, `select`, `separator`, `skeleton`, `spinner`, `stack`, `switch`, `table`, `tabs`, `text`, `textarea`, `tooltip`
- **Utilities**: `cn` (clsx + tailwind-merge)
- **Theming**: `theme-provider`, `theme-presets`, `themes.json` (14 presets), `tokens.css`

## Installation

This package is consumed via **git URL dependency** tracking the `main` branch HEAD on GitHub. It is **NOT published to any npm registry** — no `.npmrc`, no PAT, no authentication required (the repo is public).

### 1. Add the dependency

In `package.json`:

```json
"dependencies": {
  "@goddonebianu/design-system": "git+https://github.com/GoddoNebianU/design-system.git#main"
}
```

Then `pnpm install` (or `npm install` / `yarn install`).

### 2. `preinstall` hook — HTTPS rewrite (Vercel deploy fix)

pnpm resolves `#main` (branch ref) by writing the lockfile `resolution.repo` as an SSH URL (`git@github.com:...`) — see [pnpm issue #13276](https://github.com/pnpm/pnpm/issues/13276), still open as of pnpm 10.x/11.x. Vercel's deploy key does not cover this repo, so a frozen-lockfile install will hit `git_access_denied` on `git clone` of the SSH URL. Fix: add a `preinstall` script to each consumer's `package.json` that transparently rewrites the SSH URL to HTTPS (public repo, no auth):

```json
"scripts": {
  "preinstall": "git config --local url.\"https://github.com/Goddonebianu/design-system\".insteadOf \"git@github.com:GoddoNebianU/design-system\" 2>/dev/null || true"
}
```

> **Important**: use the **exact-match** insteadOf for the design-system repo only (not the global `git@github.com:` prefix) so you don't accidentally rewrite the consumer project's own SSH origin remote.

### 3. Import tokens (Tailwind v4)

In your main CSS file (e.g. `globals.css`), after `@import "tailwindcss"`:

```css
@import "@goddonebianu/design-system/tokens.css";
@source "@goddonebianu/design-system";
```

- `@import ... tokens.css` injects the shared design tokens (semantic colors, spacing, radius, shadows, etc.)
- `@source "@goddonebianu/design-system"` tells Tailwind v4 to scan the package source for class names so they are included in the generated CSS

### 4. Next.js consumers — enable transpilation

If you use Next.js, add the package to `transpilePackages` in `next.config.ts` so the TSX source in `node_modules` is compiled:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@goddonebianu/design-system"],
};

export default nextConfig;
```

Vite consumers need no extra configuration — Vite compiles TSX from `node_modules` by default.

## Upgrading

git URL dependencies **do not support semver ranges** (`^0.1.0` etc.). Each upgrade is an explicit action. To pull the latest `main` HEAD:

```bash
pnpm update @goddonebianu/design-system
```

This re-resolves the ref and updates the lockfile. Commit the lockfile change.

## Usage

Import each primitive via its explicit subpath. Do **not** use a bare `@goddonebianu/design-system` import (barrel imports are intentionally not supported — use explicit subpaths for tree-shaking and clarity).

```tsx
import { Button } from "@goddonebianu/design-system/button";
import { Card } from "@goddonebianu/design-system/card";
import { cn } from "@goddonebianu/design-system/cn";
import { ThemeProvider } from "@goddonebianu/design-system/theme-provider";
```

## Peer dependencies

- `react` >= 18
- `react-dom` >= 18

## License

MIT
