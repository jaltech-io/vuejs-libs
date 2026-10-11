---
aside: false
pageClass: wide-page
---

# DataTable (advanced)

<script setup>
import DataTableDemo from '../.vitepress/theme/components/DataTableDemo.vue'
import DataTableTreeDemo from '../.vitepress/theme/components/DataTableTreeDemo.vue'
</script>

The full data-table experience from the real application, on top of [TanStack Table](https://tanstack.com/table): a filter toolbar with faceted filters, a **saved-views** sidebar, row **selection** with a floating bulk-action bar, sortable column headers, CSV export and **pagination** — all driven by one table instance, with the styling packaged into the components.

**Built on:** TanStack Table + shadcn-vue's Table / Badge / Popover / Command primitives.

<ClientOnly>
<div style="margin:1.5rem 0">
  <DataTableDemo />
</div>
</ClientOnly>

Try it: sort with the **Project / Owner / Status / Priority** headers, open **Filter** to filter by status/health/priority, tick rows to reveal the bulk-action bar, add a **saved view** with the **+** in the sidebar, export to CSV, and page through with the pager.

Built-in texts are translatable once for the whole application (`dataTable`, `dataTableFilters` and `dataTableViews` section of [`installLibraryTexts`](/guide/texts)); a prop still wins.

## The shell: `useClientDataTable` + `SavedViewsDataTable`

The demo above is the whole screen. Two pieces replace the ~50 lines of `useVueTable` setup and the ~60 lines of template every table used to repeat:

```vue
<script setup lang="ts">
import {
  createActionsColumn, createSelectColumn, oneOf, SavedViewsDataTable, sortableHeader, useClientDataTable,
} from '@jaltech/vuejs-ui/data-table'
import { statusBadgeCell } from '@jaltech/vuejs-ui/status-badge'
import type { SavedViewsSource } from '@jaltech/vuejs-ui/types'

const columns: ColumnDef<Label, any>[] = [
  createSelectColumn<Label>(),
  { accessorKey: 'name', header: sortableHeader(() => t('labels.name')) },
  { accessorKey: 'status', header: sortableHeader('Status'), filterFn: oneOf,
    cell: ({ row }) => statusBadgeCell(STATUS[row.original.status].tone, STATUS[row.original.status].label) },
  createActionsColumn<Label>((label) => [
    { key: 'edit', label: 'Edit', icon: IconPencil, onClick: () => openEdit(label) },
    { key: 'delete', label: 'Delete', icon: IconTrash, danger: true, onClick: () => remove(label) },
  ]),
]

const { table, selectedRows } = useClientDataTable({ data: labels, columns, getRowId: (label) => label.id })

// The library calls no API: the application provides its saved views.
const viewsSource: SavedViewsSource = {
  list: () => api.getViews(),
  create: (payload) => api.createView(payload),
  update: (id, payload) => api.updateView(id, payload),
  delete: (id) => api.deleteView(id),
}
</script>

<template>
  <SavedViewsDataTable :table="table" :columns="columns" :filter-fields="filterFields"
    :views-source="viewsSource" :loading="loading" default-label="All labels" export-filename="labels">
    <template #create><LabelFormDialog with-trigger /></template>
    <template #selection-actions="{ rows, clear }">
      <TableSelectionBarButton title="Delete selection" destructive :pending="deleting" @click="bulkDelete(rows)">
        <IconTrash />
      </TableSelectionBarButton>
    </template>
  </SavedViewsDataTable>
</template>
```

### `useClientDataTable(options)`

In-memory filtering, sorting, pagination and selection, ready for every component of this page.

| Option | Default | |
|---|---|---|
| `data` | — | rows: ref, getter or array (the table follows it) |
| `columns` | — | `ColumnDef[]`, ref or getter |
| `initialSorting` | `[]` | e.g. `[{ id: 'createdAt', desc: true }]` |
| `getRowId` | TanStack index | stable row id (selection survives a reload of the data) |
| `tree` | — | tree mode: the result of `useDataTableTree`, or its options (see below) |
| `pageSize` | `20` | rows per page |
| `enableRowSelection` | `true` | boolean or `(row) => boolean` |
| `clearSelectionOnEscape` | `true` | Escape clears the selection |
| `provide` | `true` | shares the table with the toolbar / views (`provideTableInstance`) |

Returns `table`, the state refs (`columnFilters`, `sorting`, `columnVisibility`, `rowSelection`, `pagination`, `expanded` in tree mode), `selectedRows` (original data, after filters), `selectedCount` and `clearSelection()`. Row models: core, filtered, sorted, paginated, faceted (+ expanded in tree mode).

### `SavedViewsDataTable`

| Prop | Default | |
|---|---|---|
| `table`, `columns` | — | the table instance and its columns |
| `filterFields` | — | `DataTableFilterField[]`: `{ label, value, placeholder?, options? }`, `value` = column id |
| `viewsSource` | — | `{ list, create, update, delete }` (`SavedViewsSource`), or `null` while the views cannot be loaded yet |
| `defaultLabel` | texts | label of the "all rows" view |
| `loading` | `false` | skeleton while no row is displayed yet (a reload does not flash) |
| `skeletonRows` | `8` | |
| `exportable` | `true` | CSV export button (all filtered rows) and "export selection" in the selection bar |
| `exportFilename` | `export` | without extension |
| `exportExcludeColumns` | `['select', 'actions']` | |
| `selectionLabel`, `selectionPluralLabel` | texts | word after the selected count |

Slots: `create` (creation button, first in the toolbar), `actions` (other toolbar buttons, before the export), `selection-actions` (`{ rows, count, clear }`, after the export of the selection). Exposed: `refreshViews()`.

- `list` is called when `viewsSource` is set (or replaced) and after every create / update / delete. It handles its own errors (notification) and may throw: the last list is kept.
- The table card height is bounded by the CSS variable **`--h-table-max-height`** above the mobile breakpoint (sticky header, inner scroll), e.g. `:root { --h-table-max-height: calc(100vh - 310px) }`; without it, no bound. Same for the views sidebar.
- Stable hooks for end-to-end tests: `[data-slot=saved-views-data-table]`, `[data-slot=views-sidebar]`.

### Column helpers

- **`sortableHeader(title)`**: `header: sortableHeader('Name')` — a `DataTableColumnHeader` (sort / hide menu). `title` may be a getter (`() => t('…')`), read at render time.
- **`createActionsColumn(actionsOf, { header?, max?, size? })`**: `id: 'actions'`, header right-aligned (default text `dataTable.actions`), cell = [`RowActions`](/components/row-actions) of `actionsOf(row)`, `enableSorting` / `enableHiding` false.
- **`oneOf`**: `filterFn: oneOf` on a column whose filter field has `options` — the row value is one of the chosen values; an empty list filters nothing.
- **`createSelectColumn()`**: selection checkboxes.
- Cells: [`statusBadgeCell(tone, label)`](/components/status-badge), [`InitialsAvatar`](/components/initials-avatar).
- CSV: `exportTableToCsv(table, { filename?, excludeColumns?, onlySelected? })` / `tableToCsv(...)` — every filtered and sorted row (not only the current page), header = string `header` or column id.

## Assembling the pieces by hand

`SavedViewsDataTable` is a composition of public components, still usable on their own for a different layout:

```vue
<DataTableAdvancedToolbar :filter-fields="filterFields" :views="views"
  :on-create-view="createView" :on-update-view="updateView" :on-delete-view="deleteView" hide-views-dropdown />
<div class="flex items-start gap-4 max-md:flex-col">
  <ViewsSidebar :views="views" :on-update-view="updateView" :on-delete-view="deleteView" @create="open = true" />
  <div class="min-w-0 flex-1">
    <DataTable :table="table" :columns="columns" />
    <DataTablePagination :table="table" />
  </div>
</div>
<!-- Columns and filters of the new view are read from the shared table and the URL. -->
<ViewFormModal v-model:open="open" mode="create" :filter-fields="filterFields"
  :on-create-view="createView" :on-update-view="updateView" :on-delete-view="deleteView" />
```

### Saved views contract

- Views are **personal**: `ViewItem` is `{ id, name, columns, filterParams }` (no sharing, no `isPublic`).
- The URL is the source of truth: a view's filters (all of them, whatever the table), operator, sort and visible columns (`cols`, dot-separated ids, absent = all visible) are written to the query with `viewId`. Selecting a view, resetting it or reloading the page restores both filters and columns.
- **One contract for every component** (`DataTableAdvancedToolbar`, `DataTableViewsDropdown`, `ViewsSidebar`, `ViewFormModal`): `onCreateView(payload)`, `onUpdateView(id, payload)`, `onDeleteView(id)` — deletion receives the **id** and the library has already asked for confirmation (mount `<ConfirmDialog />` once). They resolve **after** `views` is refreshed. On failure they return `{ status: 'error', message }`: the message is displayed as is (translate it before returning). Creation returns `{ view: { id } }` and the new view becomes the active one; deleting the active view goes back to the default view.
- `ViewFormModal` in creation mode reads the visible columns from the shared table and the current filters from the URL (for `filterFields`, default: the table columns); the `columns` / `filterParams` props only force other values.
- `ViewsSidebar` has a flexible width: full width on mobile, the width of its view names between 10 and 16 rem above (longer names are truncated).
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

- With **`useClientDataTable`**: `useClientDataTable({ data, columns, tree: { getSubRows: (space) => space.children, initiallyExpanded: true } })` (or `tree: useDataTableTree(…)`) wires everything below and returns `expanded`.
- **`useDataTableTree({ getSubRows, initiallyExpanded?, expanded? })`** returns `tableOptions`, to spread into `useVueTable`, and `expanded`, the expanded state (`true` = everything, or `{ [rowId]: true }`) to wire into `state.expanded`. Pass your own `expanded` ref to control it; `initiallyExpanded: true` starts fully expanded, rows loaded later included.
- `tableOptions` = `getSubRows` + `getExpandedRowModel()` + `onExpandedChange` + **`filterFromLeafRows: true`** (filters, column filters of the advanced toolbar included, start from the leaves: a parent stays displayed when one of its children matches) + **`paginateExpandedRows: false`** (pagination counts root rows; a parent and its expanded children always stay on the same page — the TanStack default would split a branch across pages and change the number of rows per page when expanding).
- **`meta: { tree: true }`** on one column: `DataTable` renders its cell inside **`DataTableTreeCell`** — indentation by depth, connector lines, chevron button with `aria-expanded`. The cell content itself is unchanged.
- **`DataTableExpandToggle`**: « Tout déplier / Tout replier » button, shown by `DataTableAdvancedToolbar` in tree mode (nothing otherwise); elsewhere pass `:table`.
- Data with a `parentId` instead of `children`: build the children first (`parentId` → `children`), then `getSubRows: (row) => row.children`.
- Texts: `dataTable.toggleRow`, `dataTable.expandAll`, `dataTable.collapseAll` ([`installLibraryTexts`](/guide/texts)); `toggleLabel` / `expandAllLabel` / `collapseAllLabel` props still win.
- `DataTableTreeCell` outside `DataTable`: the enclosing cell must be `position: relative`, with `--h-dt-tree-inset` set to its left padding.
