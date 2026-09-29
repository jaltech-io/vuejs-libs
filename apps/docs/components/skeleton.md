# Skeleton

<script setup>
import { Skeleton } from '@jaltech/vuejs-ui/skeleton'
</script>

A placeholder shown while content is loading.

<div class="demo" style="display:block">
  <div style="display:flex;align-items:center;gap:12px">
    <Skeleton style="width:40px;height:40px;border-radius:9999px" />
    <div style="display:flex;flex-direction:column;gap:8px">
      <Skeleton style="width:180px;height:14px" />
      <Skeleton style="width:120px;height:14px" />
    </div>
  </div>
</div>

## Code

```vue
<script setup lang="ts">
import { Skeleton } from '@jaltech/vuejs-ui/skeleton'
</script>

<template>
  <div class="flex items-center gap-3">
    <Skeleton class="size-10 rounded-full" />
    <div class="flex flex-col gap-2">
      <Skeleton class="h-3.5 w-44" />
      <Skeleton class="h-3.5 w-28" />
    </div>
  </div>
</template>
```
