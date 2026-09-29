# DataTable (advanced)

<script setup>
import DataTableDemo from '../.vitepress/theme/components/DataTableDemo.vue'
</script>

The full data-table experience from the real application, on top of [TanStack Table](https://tanstack.com/table): a filter toolbar with faceted filters, a **saved-views** sidebar, row **selection** with a floating bulk-action bar, sortable column headers, and **pagination** — all driven by one table instance, with the styling packaged into the components.

**Built on:** TanStack Table + shadcn-vue's Table / Badge / Popover / Command primitives.

<ClientOnly>
<div style="margin:1.5rem 0">
  <DataTableDemo />
</div>
</ClientOnly>

Try it: sort with the **Project / Status / Priority** headers, open **Filter** to filter by status/visibility/health/priority, tick rows to reveal the bulk-action bar, add a **saved view** with the **+** in the sidebar, and page through with the pager.

## How it is assembled

The advanced table is a composition around a standard TanStack `useVueTable` instance shared with the toolbar and the views sidebar via `provideTableInstance`:

```vue
<script setup lang="ts">
import { useVueTable, getCoreRowModel, getFilteredRowModel,
  getSortedRowModel, getPaginationRowModel, getFacetedRowModel,
  getFacetedUniqueValues } from '@tanstack/vue-table'
import { provideTableInstance } from '@jaltech/vuejs-ui/composables/useTableInstance'
import DataTableAdvancedToolbar from '@jaltech/vuejs-ui/data-table/advanced/DataTableAdvancedToolbar.vue'
import ViewsSidebar from '@jaltech/vuejs-ui/data-table/advanced/views/ViewsSidebar.vue'
import DataTable from '@jaltech/vuejs-ui/data-table/DataTable.vue'
import DataTablePagination from '@jaltech/vuejs-ui/data-table/DataTablePagination.vue'
import TableSelectionBar from '@jaltech/vuejs-ui/TableSelectionBar.vue'

const table = useVueTable({
  get data() { return rows.value },
  columns,
  state: { /* columnFilters, sorting, columnVisibility, rowSelection, pagination */ },
  enableRowSelection: true,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  /* on…Change handlers */
})
provideTableInstance(table, columnVisibility)
</script>

<template>
  <DataTableAdvancedToolbar :filter-fields="filterFields" :views="views"
    :on-create-view="createView" :on-update-view="updateView" :on-delete-view="deleteView"
    default-label="All projects">
    <template #selection>
      <TableSelectionBar :selected-count="selectedCount" @clear="table.toggleAllRowsSelected(false)">…</TableSelectionBar>
    </template>
  </DataTableAdvancedToolbar>

  <div class="flex items-start gap-4">
    <ViewsSidebar :views="views" default-label="All projects"
      :on-update-view="updateView" :on-delete-view="deleteView" @create="openCreate" />
    <div class="flex-1">
      <DataTable :table="table" :columns="columns" />
      <DataTablePagination :table="table" />
    </div>
  </div>
</template>
```

In the real app the views and rows come from the API; here they are in-memory so the whole flow is live.
