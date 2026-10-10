---
aside: false
pageClass: wide-page
---

# DataTable (advanced)

<script setup>
import DataTableDemo from '../.vitepress/theme/components/DataTableDemo.vue'
import DataTableTreeDemo from '../.vitepress/theme/components/DataTableTreeDemo.vue'
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

## Tree mode

Rows can be displayed as a **tree** (spaces and sub-spaces, groups…): optional, off by default — a table without `getSubRows` behaves exactly as before.

<ClientOnly>
<div style="margin:1.5rem 0">
  <DataTableTreeDemo />
</div>
</ClientOnly>

Try it: collapse a branch with its chevron, use the **expand all / collapse all** button, type `data` in the search (the parents of a matching row stay displayed), sort by **Space** or **Members** (each level is sorted under its parent), and page through: pages count root rows only.

```ts
import { useDataTableTree } from '@jaltech/vuejs-ui/data-table'

const tree = useDataTableTree<Space>({ getSubRows: (space) => space.children, initiallyExpanded: true })

const columns: ColumnDef<Space, any>[] = [
  { accessorKey: 'name', meta: { tree: true }, header: 'Space', cell: ({ row }) => row.original.name },
  // …
]

const table = useVueTable({
  ...tree.tableOptions,
  get data() { return spaces.value },
  columns,
  state: { get expanded() { return tree.expanded.value }, /* sorting, columnFilters, pagination… */ },
  // getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel…
})
```

- **`useDataTableTree({ getSubRows, initiallyExpanded?, expanded? })`** returns `tableOptions`, to spread into `useVueTable`, and `expanded`, the expanded state (`true` = everything, or `{ [rowId]: true }`) to wire into `state.expanded`. Pass your own `expanded` ref to control it; `initiallyExpanded: true` starts fully expanded, rows loaded later included.
- `tableOptions` = `getSubRows` + `getExpandedRowModel()` + `onExpandedChange` + **`filterFromLeafRows: true`** (filters, column filters of the advanced toolbar included, start from the leaves: a parent stays displayed when one of its children matches) + **`paginateExpandedRows: false`** (pagination counts root rows; a parent and its expanded children always stay on the same page — the TanStack default would split a branch across pages and change the number of rows per page when expanding).
- **`meta: { tree: true }`** on one column: `DataTable` renders its cell inside **`DataTableTreeCell`** — indentation by depth, connector lines, chevron button with `aria-expanded`. The cell content itself is unchanged.
- **`DataTableExpandToggle`**: « Tout déplier / Tout replier » button, shown by `DataTableAdvancedToolbar` in tree mode (nothing otherwise); elsewhere pass `:table`.
- Data with a `parentId` instead of `children`: build the children first (`parentId` → `children`), then `getSubRows: (row) => row.children`.
- Texts: `dataTable.toggleRow`, `dataTable.expandAll`, `dataTable.collapseAll` ([`installLibraryTexts`](/guide/texts)); `toggleLabel` / `expandAllLabel` / `collapseAllLabel` props still win.
- `DataTableTreeCell` outside `DataTable`: the enclosing cell must be `position: relative`, with `--h-dt-tree-inset` set to its left padding.
