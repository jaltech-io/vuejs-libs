# SkeletonList

<script setup>
import { SkeletonList } from '@jaltech/vuejs-ui/skeleton'
</script>

`count` identical skeleton lines, for a loading list, cards or form fields.

<div class="demo" style="display:block">
  <SkeletonList :count="4" />
</div>

<div class="demo" style="display:block">
  <SkeletonList :count="6" class="grid grid-cols-3 gap-3" item-class="h-24 rounded-xl" />
</div>

## Code

```vue
<script setup lang="ts">
import { SkeletonList } from '@jaltech/vuejs-ui/skeleton'
</script>

<template>
  <SkeletonList v-if="loading" :count="4" />
  <SkeletonList v-if="loading" :count="6" class="grid grid-cols-3 gap-3" item-class="h-24 rounded-xl" />
</template>
```

## Props

| Prop | Type | Default | |
|---|---|---|---|
| `count` | `number` | `3` | number of lines |
| `itemClass` | `string` | `h-10 w-full` | classes of each line (merged) |
| `class` | `string` | `flex flex-col gap-2` | classes of the container (merged) |

For a table, use `DataTableSkeleton` (or `SavedViewsDataTable`, which shows it while loading).
