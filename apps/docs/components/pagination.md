# Pagination

<script setup>
import { Pagination, PaginationContent, PaginationEllipsis, PaginationFirst, PaginationItem, PaginationLast, PaginationNext, PaginationPrevious } from '@jaltech/vuejs-ui/pagination'
</script>

Navigation for splitting content across multiple pages.

<ClientOnly>
<div class="demo">
  <Pagination v-slot="{ page }" :total="100" :items-per-page="10" :sibling-count="1" show-edges :default-page="3">
    <PaginationContent v-slot="{ items }">
      <PaginationFirst />
      <PaginationPrevious />
      <template v-for="(item, index) in items" :key="index">
        <PaginationItem v-if="item.type === 'page'" :value="item.value" :is-active="item.value === page">
          {{ item.value }}
        </PaginationItem>
        <PaginationEllipsis v-else :index="index" />
      </template>
      <PaginationNext />
      <PaginationLast />
    </PaginationContent>
  </Pagination>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { Pagination, PaginationContent, PaginationEllipsis, PaginationFirst, PaginationItem, PaginationLast, PaginationNext, PaginationPrevious } from '@jaltech/vuejs-ui/pagination'
</script>

<template>
  <Pagination v-slot="{ page }" :total="100" :items-per-page="10" :sibling-count="1" show-edges :default-page="3">
    <PaginationContent v-slot="{ items }">
      <PaginationFirst />
      <PaginationPrevious />
      <template v-for="(item, index) in items" :key="index">
        <PaginationItem v-if="item.type === 'page'" :value="item.value" :is-active="item.value === page">
          {{ item.value }}
        </PaginationItem>
        <PaginationEllipsis v-else :index="index" />
      </template>
      <PaginationNext />
      <PaginationLast />
    </PaginationContent>
  </Pagination>
</template>
```
