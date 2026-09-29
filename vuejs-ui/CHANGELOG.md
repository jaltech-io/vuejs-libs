## 0.4.0 (2026-09-29)

### ⚠️ Breaking / Migration

- **tailwind:** migrated to **Tailwind CSS v4**. `styles.css` now uses `@import "tailwindcss/*"` + `@theme` + `@custom-variant` (no more `tailwind.config.cjs`); component `<style>` blocks that use `@apply` carry a `@reference`. Consumers must be on Tailwind v4 (use the `@tailwindcss/vite` plugin) and no longer need the JS preset/content globs. Preflight is still not shipped (source-first, non-clobbering). `tailwindcss-animate` → `tw-animate-css`.

> Not yet published to npm — pending the Tailwind v4 migration of downstream consumers (projectflow).

## 0.3.14 (2026-09-29)

### 🏡 Chore

- **repo:** flattened the monorepo (`libs/vuejs-ui` → `vuejs-ui`, `apps/docs` → `docs`); fixed `repository.directory` and `homepage` metadata accordingly. No package content change.

## 0.3.13 (2026-09-29)

### 🚀 Features

- **exports:** added folder barrels so consumers import from clean paths instead of deep `.vue` files — `@jaltech/vuejs-ui/composables`, `@jaltech/vuejs-ui/data-table/advanced`, `@jaltech/vuejs-ui/data-table/advanced/views` (ViewsSidebar, ViewFormModal), plus per-component subpaths for the composed components (`form-dialog`, `confirm-dialog`, `empty-state`, `h-dialog`, `h-tooltip`, `stat-card`, `h-metric-card`, `activity-feed`, `router-tabs-nav`, `table-selection-bar`).
- **exports:** the root barrel now also exports `EmptyState` and `RouterTabsNav` (were missing).

## 0.3.12 (2026-09-29)

### 📝 Documentation

- Rewrote the README as standalone, English, OSS-standard documentation (badges, features, requirements, quick start, usage, contributing, license); removed all origin-project references.
- Added a pre-release "not production-ready" notice (to be removed at 1.0.0).
- Cleaned package metadata (`description`, `keywords`, `author`); added a repository-root MIT LICENSE.

## 0.3.11 (2026-09-29)

### 🩹 Fixes

- **data-table:** the DataTable/ViewsSidebar styling now lives inside the components (scoped `<style>` / inline classes) instead of relying on the consuming app global CSS, so the table renders correctly regardless of the host app stylesheet.

## 0.3.2 (2026-08-24)

### 🩹 Fixes

- **build:** build.mjs copies the local output (`libs/vuejs-ui/dist`) to `dist/libs/vuejs-ui` so `pnpm check`/`verify` work again; first CI-driven publish

## 0.3.0 (2026-08-22)

### 🚀 Features

- **exports:** completed the public API — every component folder, `types`, `utils`, each composable, and the `./*` wildcard to the sources (`src/` is now published in the package). Covers all consumed subpaths, including deep `.vue` imports
- **deps:** declared previously implicit dependencies (`@vueuse/core`, `class-variance-authority`, `@lucide/vue`, `vue-sonner`); `vee-validate` as an optional peer

### ⚠️ Notes

- The package now exposes its sources (`.vue`/`.ts`): consumers need a bundler that compiles them (Vite + @vitejs/plugin-vue), and must add `@jaltech/vuejs-ui` to `optimizeDeps.exclude`

## 0.2.3 (2026-07-19)

### 🩹 Fixes

- **vuejs-ui:** retest publish pipeline after per-lib CI job split

### ❤️ Thank You

- Jaltech

## 0.2.2 (2026-07-19)

### 🩹 Fixes

- **vuejs-ui:** retest publish pipeline after per-lib CI job split

### ❤️ Thank You

- Jaltech

## 0.2.1 (2026-07-19)

### 🩹 Fixes

- **libs:** disable npm provenance, requires a public source repo
- **ci:** provide Sigstore OIDC token for npm provenance publishing

### ❤️ Thank You

- Jaltech

## 0.2.0 (2026-07-19)

This was a version bump only for vuejs-ui to align it with other projects, there were no code changes.