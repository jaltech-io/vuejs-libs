# Data Table

<script setup>
</script>

A table built on TanStack Table, driven by a `useVueTable` instance and column definitions.

```vue
<script setup lang="ts">
import { DataTable } from '@jaltech/vuejs-ui/data-table'
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table'

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
]
const data = [
  { name: 'Ada Lovelace', email: 'ada@example.com' },
  { name: 'Alan Turing', email: 'alan@example.com' },
]

const table = useVueTable({
  get data() { return data },
  columns,
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <DataTable :table="table" :columns="columns" />
</template>
```

_Interactive demo coming soon._
