# Getting started

> ⚠️ **Pre-release — not production-ready.** `@jaltech/vuejs-ui` is under active development (pre-`1.0.0`) and has not yet been through a human review pass. APIs may change without notice.

`@jaltech/vuejs-ui` is a standalone Vue 3 component library and design system. This site shows every component live; the snippets are the exact code that renders each demo.

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
