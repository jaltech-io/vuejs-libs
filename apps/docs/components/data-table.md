# DataTable (advanced)

<script setup lang="ts">
import { h } from 'vue'
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import DataTable from '@jaltech/vuejs-ui/data-table/DataTable.vue'
import DataTablePagination from '@jaltech/vuejs-ui/data-table/DataTablePagination.vue'
import DataTableColumnHeader from '@jaltech/vuejs-ui/data-table/DataTableColumnHeader.vue'
import { Badge } from '@jaltech/vuejs-ui/badge'

const data = [
  { name: 'Ada Lovelace', role: 'Owner', status: 'Active' },
  { name: 'Alan Turing', role: 'Maintainer', status: 'Active' },
  { name: 'Grace Hopper', role: 'Developer', status: 'Invited' },
  { name: 'Linus Torvalds', role: 'Developer', status: 'Active' },
  { name: 'Margaret Hamilton', role: 'Maintainer', status: 'Suspended' },
  { name: 'Ken Thompson', role: 'Developer', status: 'Active' },
  { name: 'Barbara Liskov', role: 'Owner', status: 'Invited' },
]

const columns = [
  {
    accessorKey: 'name',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Name' }),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Role' }),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const s = row.original.status
      const variant = s === 'Active' ? 'default' : s === 'Invited' ? 'secondary' : 'outline'
      return h(Badge, { variant }, () => s)
    },
  },
]

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  initialState: { pagination: { pageSize: 5 } },
})
</script>

The data table layer on top of [TanStack Table](https://tanstack.com/table) — sortable column headers, custom cell rendering, and pagination, with the styling packaged into the components (no per-app CSS). The `advanced/` toolbar (faceted filters, saved views, bulk selection) builds on this same table instance.

**Built on:** TanStack Table + shadcn-vue's Table/Badge/DropdownMenu primitives.

<ClientOnly>
<div style="border:1px solid hsl(var(--border));border-radius:var(--radius);overflow:hidden;margin:1rem 0">
  <DataTable :table="table" :columns="columns" />
  <div style="padding:0.75rem 1rem;border-top:1px solid hsl(var(--border))">
    <DataTablePagination :table="table" />
  </div>
</div>
</ClientOnly>

Click a sortable header (**Name**, **Role**) to sort; use the pager to move between pages.

## Code

```vue
<script setup lang="ts">
import { h } from 'vue'
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table'
import DataTable from '@jaltech/vuejs-ui/data-table/DataTable.vue'
import DataTablePagination from '@jaltech/vuejs-ui/data-table/DataTablePagination.vue'
import DataTableColumnHeader from '@jaltech/vuejs-ui/data-table/DataTableColumnHeader.vue'
import { Badge } from '@jaltech/vuejs-ui/badge'

const data = [
  { name: 'Ada Lovelace', role: 'Owner', status: 'Active' },
  // …
]

const columns = [
  { accessorKey: 'name', header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Name' }) },
  { accessorKey: 'role', header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Role' }) },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => h(Badge, { variant: 'secondary' }, () => row.original.status),
  },
]

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  initialState: { pagination: { pageSize: 5 } },
})
</script>

<template>
  <DataTable :table="table" :columns="columns" />
  <DataTablePagination :table="table" />
</template>
```
