# Sonner

<script setup>
import { Toaster } from '@jaltech/vuejs-ui/sonner'
import { Button } from '@jaltech/vuejs-ui/button'
import { toast } from 'vue-sonner'
</script>

An opinionated toast notifier. Render `<Toaster />` once, then call `toast()` from anywhere.

<ClientOnly>
<div class="demo">
  <Toaster />
  <Button @click="toast('Project saved', { description: 'Your changes are live.' })">Show toast</Button>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { Toaster } from '@jaltech/vuejs-ui/sonner'
import { Button } from '@jaltech/vuejs-ui/button'
import { toast } from 'vue-sonner'
</script>

<template>
  <Toaster />
  <Button @click="toast('Project saved', { description: 'Your changes are live.' })">
    Show toast
  </Button>
</template>
```
