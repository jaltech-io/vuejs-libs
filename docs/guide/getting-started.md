# Getting started

> ⚠️ **Pre-release — not production-ready.** `@jaltech/vuejs-ui` is under active development (pre-`1.0.0`) and has not yet been through a human review pass. APIs may change without notice.

`@jaltech/vuejs-ui` is a Vue 3 component library **built on [shadcn-vue](https://www.shadcn-vue.com/)** (which is itself built on [Reka UI](https://reka-ui.com/) + [Tailwind CSS](https://tailwindcss.com/)). This site shows every component live; the snippets are the exact code that renders each demo.

## Built on shadcn-vue — and why we build on top

We love how shadcn-vue models components, and we keep that model. Full credit for the underlying primitives goes to the shadcn-vue and Reka UI authors — we do not reinvent them and we do not claim them as ours.

Our reason for existing is one thing we ran into using shadcn-vue in a real application: its components are close to **atomic**. A dialog is a `Dialog` + `DialogTrigger` + `DialogContent` + `DialogHeader` + `DialogTitle` + `DialogFooter` + buttons — assembled by hand, every time. Across a real app that same composition gets repeated in every feature, so the boilerplate piles up.

`@jaltech/vuejs-ui` is the layer that packages those recurring compositions into **complete components**, so you write the feature once instead of re-assembling the primitives on every screen.

## Installation

```bash
pnpm add @jaltech/vuejs-ui vue vue-router @tanstack/vue-table
```

Import the stylesheet once, in your app entry point:

```ts
import '@jaltech/vuejs-ui/styles.css'
```

Because the package is distributed as source, exclude it from Vite's dependency pre-bundling and add its source to your Tailwind `content` globs:

```ts
// vite.config.ts
export default defineConfig({
  optimizeDeps: { exclude: ['@jaltech/vuejs-ui'] },
})
```

```js
// tailwind.config.js
export default {
  content: [
    './src/**/*.{vue,js,ts}',
    './node_modules/@jaltech/vuejs-ui/src/**/*.{vue,js,ts}',
  ],
}
```

## Usage

Import a component from its subpath and use it:

```vue
<script setup lang="ts">
import { Button } from '@jaltech/vuejs-ui/button'
</script>

<template>
  <Button>Click me</Button>
</template>
```

Head to the **Components** section to see each one in action.
