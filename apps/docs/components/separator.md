# Separator

<script setup>
import { Separator } from '@jaltech/vuejs-ui/separator'
</script>

A visual divider between content, horizontal or vertical.

<div class="demo" style="display:block">
  <div style="font-size:14px">Radix Primitives</div>
  <Separator style="margin:.75rem 0" />
  <div style="display:flex;align-items:center;height:20px;gap:1rem;font-size:14px">
    <span>Blog</span>
    <Separator orientation="vertical" />
    <span>Docs</span>
    <Separator orientation="vertical" />
    <span>Source</span>
  </div>
</div>

## Code

```vue
<script setup lang="ts">
import { Separator } from '@jaltech/vuejs-ui/separator'
</script>

<template>
  <div>Radix Primitives</div>
  <Separator />
  <div style="display:flex;height:20px">
    <span>Blog</span>
    <Separator orientation="vertical" />
    <span>Docs</span>
  </div>
</template>
```
