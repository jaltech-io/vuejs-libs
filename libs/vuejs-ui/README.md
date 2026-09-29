# @jaltech/vuejs-ui

[![npm version](https://img.shields.io/npm/v/@jaltech/vuejs-ui)](https://www.npmjs.com/package/@jaltech/vuejs-ui)
[![license](https://img.shields.io/npm/l/@jaltech/vuejs-ui)](./LICENSE)
[![types included](https://img.shields.io/npm/types/@jaltech/vuejs-ui)](https://www.npmjs.com/package/@jaltech/vuejs-ui)

> [!WARNING]
> **Pre-release — not production-ready.** This package is under active development (pre-`1.0.0`) and has **not yet been through a human stabilization and review pass**. Its API may change at any time, without a deprecation cycle. It is published for early experimentation and feedback only — **do not use it in production**. This notice will be removed at the `1.0.0` release.

A standalone Vue 3 component library and design system, usable in any Vue application. It ships accessible, composable UI primitives built on [Reka UI](https://reka-ui.com/) and styled with [Tailwind CSS](https://tailwindcss.com/), from simple buttons to a full-featured data table.

## Features

- **Vue 3** — built for the Composition API and `<script setup>`.
- **TypeScript first** — types are shipped with the package; no separate `@types` install.
- **Source-first & tree-shakeable** — components are published as source and exposed through granular subpath exports, so your bundler only includes what you import.
- **~65 component families** — accordion, alert, avatar, badge, button, calendar, card, carousel, chart, combobox, command palette, context menu, dialog, drawer, dropdown menu, form, input, pagination, popover, select, sheet, sidebar, stepper, table and an advanced **data table** (filtering, column visibility, saved views, pagination), and more.
- **Composables** — `useConfirm` (imperative confirm dialogs) and `useTableInstance` (TanStack Table helpers).
- **Dark mode** — theming via CSS variables; toggle by adding the `dark` class to a root element.

## Requirements

- **Node.js** `>= 20`
- A bundler that compiles Vue SFCs and TypeScript (Vite with `@vitejs/plugin-vue` is recommended).

Peer dependencies:

| Package | Range | Notes |
|---|---|---|
| `vue` | `^3.5.0` | required |
| `vue-router` | `>=4 <6` | required |
| `@tanstack/vue-table` | `^8.0.0` | required (used by the data table) |
| `vee-validate` | `^5.0.0-beta.0` | optional (form validation) |

## Installation

```bash
# pnpm
pnpm add @jaltech/vuejs-ui vue vue-router @tanstack/vue-table
```

```bash
# npm
npm install @jaltech/vuejs-ui vue vue-router @tanstack/vue-table
```

Import the stylesheet once, in your application entry point:

```ts
import '@jaltech/vuejs-ui/styles.css'
```

Because the package is distributed as source, Vite's dependency pre-bundling (esbuild) cannot process the `.vue` files. Exclude the package from `optimizeDeps`:

```ts
// vite.config.ts
export default defineConfig({
  optimizeDeps: {
    exclude: ['@jaltech/vuejs-ui'],
  },
})
```

Add the library's source files to your Tailwind `content` globs so its utility classes are generated:

```js
// tailwind.config.js
export default {
  content: [
    './src/**/*.{vue,js,ts}',
    './node_modules/@jaltech/vuejs-ui/src/**/*.{vue,js,ts}',
  ],
}
```

## Quick start

```vue
<script setup lang="ts">
import { HBadge } from '@jaltech/vuejs-ui'
import { Dialog, DialogContent, DialogTrigger } from '@jaltech/vuejs-ui/dialog'
</script>

<template>
  <Dialog>
    <DialogTrigger>Open</DialogTrigger>
    <DialogContent>
      <HBadge>New</HBadge>
    </DialogContent>
  </Dialog>
</template>
```

## Usage

### Subpath imports

Common components are re-exported from the package root, and every component family is also available under its own subpath. Import from the subpath to keep bundles lean:

```ts
import { Dialog, DialogContent } from '@jaltech/vuejs-ui/dialog'
import { DataTable } from '@jaltech/vuejs-ui/data-table'
import { Select, SelectContent, SelectItem } from '@jaltech/vuejs-ui/select'
```

### Composables

```ts
import { showConfirm } from '@jaltech/vuejs-ui/confirm'

const ok = await showConfirm({ title: 'Delete this item?' })
```

```ts
import { useTableInstance } from '@jaltech/vuejs-ui/table-instance'
```

### Theming and dark mode

Colors are defined as CSS variables under `:root`, with dark values applied under the `.dark` selector. Enable dark mode by adding the `dark` class to a root element (for example `<html>` or `<body>`):

```html
<html class="dark">
```

Override any of the theme variables in your own CSS to customize the palette:

```css
:root {
  --background: 213 33% 97%;
  --primary: 222 47% 11%;
}
```

## Contributing

```bash
git clone https://github.com/jaltech-io/vuejs-libs.git
cd vuejs-libs
pnpm install
pnpm check   # typecheck + build + package verification
```

Issues and pull requests are welcome at
[github.com/jaltech-io/vuejs-libs](https://github.com/jaltech-io/vuejs-libs).

## License

MIT © 2026 Jaltech — see [LICENSE](./LICENSE).
