# Scroll Area

<script setup>
import { ScrollArea } from '@jaltech/vuejs-ui/scroll-area'
</script>

A scrollable region with a styled, cross-browser scrollbar.

<ClientOnly>
<div class="demo">
  <ScrollArea class="rounded-md border" style="height:200px;width:280px;padding:1rem">
    <h4 style="margin:0 0 .5rem;font-size:14px;font-weight:600">Tags</h4>
    <div v-for="i in 30" :key="i" style="font-size:13px;padding:.25rem 0;border-bottom:1px solid hsl(var(--border))">
      Item number {{ i }}
    </div>
  </ScrollArea>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { ScrollArea } from '@jaltech/vuejs-ui/scroll-area'
</script>

<template>
  <ScrollArea class="rounded-md border" style="height:200px;width:280px">
    <div v-for="i in 30" :key="i">Item number {{ i }}</div>
  </ScrollArea>
</template>
```
