---
aside: false
pageClass: wide-page
---

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

Built-in texts are translatable once for the whole application (`dataTable`, `dataTableFilters` and `dataTableViews` section of [`installLibraryTexts`](/guide/texts)); a prop still wins.

## How it is assembled

The advanced table is a composition around a standard TanStack `useVueTable` instance shared with the toolbar and the views sidebar via `provideTableInstance`:

```vue
<script setup lang="ts">
import { useVueTable, getCoreRowModel, getFilteredRowModel,
  getSortedRowModel, getPaginationRowModel, getFacetedRowModel,
  getFacetedUniqueValues } from '@tanstack/vue-table'
import { provideTableInstance } from '@jaltech/vuejs-ui/composables'
import { DataTable, DataTablePagination, DataTableAdvancedToolbar } from '@jaltech/vuejs-ui/data-table'
import { ViewsSidebar } from '@jaltech/vuejs-ui/data-table/advanced/views'
import { TableSelectionBar } from '@jaltech/vuejs-ui'

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

### Saved views contract

- The URL is the source of truth: a view's filters (all of them, whatever the table), operator, sort and visible columns (`cols`, dot-separated ids, absent = all visible) are written to the query with `viewId`. Selecting a view, resetting it or reloading the page restores both filters and columns.
- `onCreateView` / `onUpdateView` / `onDeleteView` resolve **after** `views` is refreshed. On failure they return `{ status: 'error', message }`: the message is displayed as is (translate it before returning). Creation returns `{ view: { id } }` and the new view becomes the active one; deleting the active view goes back to the default view.
- "Reset" / "Update view" only show up when the current filters or columns really differ from the active view (semantic comparison: key order, empty values and filter order do not count).
