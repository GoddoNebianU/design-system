# @lernu/design-system

Pure presentation-layer UI primitives shared across [lernu.cc](https://lernu.cc) projects. Built with Radix UI + class-variance-authority + Tailwind CSS v4.

Ships **TypeScript source** (`.tsx` / `.ts`) — not pre-bundled ESM/CJS. This lets Tailwind v4 scan component classes via `@source` and lets Next.js / Vite compile the TSX directly from `node_modules`.

## Contents

- **31 UI primitives**: `accordion`, `alert`, `avatar`, `badge`, `button`, `card`, `container`, `dialog`, `dropdown-menu`, `empty-state`, `field`, `heading`, `icon-button`, `input`, `label`, `modal`, `popover`, `progress`, `range`, `scroll-area`, `select`, `separator`, `skeleton`, `spinner`, `stack`, `switch`, `table`, `tabs`, `text`, `textarea`, `tooltip`
- **Utilities**: `cn` (clsx + tailwind-merge)
- **Theming**: `theme-provider`, `theme-presets`, `themes.json` (14 presets), `tokens.css`

## Installation

This package is published to [GitHub Packages](https://npm.pkg.github.com) under the `@lernu` scope.

### 1. Configure npm registry for the `@lernu` scope

Create or edit `.npmrc` in your project root:

```ini
@lernu:registry=https://npm.pkg.github.com
```

Authenticate by providing a GitHub Personal Access Token (PAT) with `read:packages` scope. For CI, set `NODE_AUTH_TOKEN` in the environment. For local development, add to `.npmrc`:

```ini
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

### 2. Add the dependency

```bash
pnpm add @lernu/design-system
# or
npm install @lernu/design-system
```

### 3. Import tokens (Tailwind v4)

In your main CSS file (e.g. `globals.css`), after `@import "tailwindcss"`:

```css
@import "@lernu/design-system/tokens.css";
@source "@lernu/design-system";
```

- `@import ... tokens.css` injects the shared design tokens (semantic colors, spacing, radius, shadows, etc.)
- `@source "@lernu/design-system"` tells Tailwind v4 to scan the package source for class names so they are included in the generated CSS

### 4. Next.js consumers — enable transpilation

If you use Next.js, add the package to `transpilePackages` in `next.config.ts` so the TSX source in `node_modules` is compiled:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@lernu/design-system"],
};

export default nextConfig;
```

Vite consumers need no extra configuration — Vite compiles TSX from `node_modules` by default.

## Usage

Import each primitive via its explicit subpath. Do **not** use a bare `@lernu/design-system` import (barrel imports are intentionally not supported — use explicit subpaths for tree-shaking and clarity).

```tsx
import { Button } from "@lernu/design-system/button";
import { Card } from "@lernu/design-system/card";
import { cn } from "@lernu/design-system/cn";
import { ThemeProvider } from "@lernu/design-system/theme-provider";
```

## Peer dependencies

- `react` >= 18
- `react-dom` >= 18

## License

MIT
