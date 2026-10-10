# RowActions

<script setup>
import { ref } from 'vue'
import { RowActions } from '@jaltech/vuejs-ui/row-actions'
import { IconArchive, IconCopy, IconDownload, IconPencil, IconTrash } from '@tabler/icons-vue'

const last = ref('—')
const act = (name) => () => { last.value = name }

const few = [
  { key: 'edit', label: 'Modifier', icon: IconPencil, onClick: act('Modifier') },
  { key: 'delete', label: 'Supprimer', icon: IconTrash, danger: true, onClick: act('Supprimer') },
]
const many = [
  { key: 'edit', label: 'Modifier', icon: IconPencil, onClick: act('Modifier') },
  { key: 'duplicate', label: 'Dupliquer', icon: IconCopy, onClick: act('Dupliquer') },
  { key: 'export', label: 'Exporter', icon: IconDownload, onClick: act('Exporter') },
  { key: 'archive', label: 'Archiver', icon: IconArchive, disabled: true, onClick: act('Archiver') },
  { key: 'delete', label: 'Supprimer', icon: IconTrash, danger: true, onClick: act('Supprimer') },
]
</script>

The actions of a table or list row: icons right-aligned, **one** style (`hicon` / `hicon-danger` button variants), a tooltip and an accessible name on every icon. Beyond `max` (default 3), it shows `max - 1` icons and a « ⋯ » menu with the rest (danger entries in red). Clicks never reach the row (rows are often clickable).

**Built on:** the library `Button`, `HTooltip` and `DropdownMenu`.

<ClientOnly>
<div class="demo" style="display:block">
  <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0">
    <span>2 actions</span>
    <RowActions :actions="few" />
  </div>
  <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0">
    <span>5 actions (max 3)</span>
    <RowActions :actions="many" />
  </div>
  <p style="margin:8px 0 0;font-size:13px;opacity:.7">Last action: {{ last }}</p>
</div>
</ClientOnly>

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `actions` | `RowAction[]` | — | `{ key, label, icon, onClick, danger?, hidden?, disabled? }` |
| `max` | `number` | `3` | Maximum number of visible items (icons + « ⋯ ») |
| `moreLabel` | `string` | `rowActions.more` | Accessible name / tooltip of « ⋯ » ([texts](/guide/texts)) |

`hidden` actions are not rendered (permissions, row state); `danger` gives the red hover (icon) or the red menu entry.

## Code

```vue
<script setup lang="ts">
import { RowActions, type RowAction } from '@jaltech/vuejs-ui/row-actions'
import { IconPencil, IconTrash } from '@tabler/icons-vue'

const actions: RowAction[] = [
  { key: 'edit', label: 'Modifier', icon: IconPencil, onClick: () => edit(item) },
  { key: 'delete', label: 'Supprimer', icon: IconTrash, danger: true, onClick: () => remove(item) },
]
</script>

<template>
  <RowActions :actions="actions" />
</template>
```

## In a DataTable column

`rowActionsCell(actions, options?)` renders `RowActions` from a TanStack column definition. Recommended column:

```ts
import type { ColumnDef } from '@tanstack/vue-table'
import { rowActionsCell } from '@jaltech/vuejs-ui/row-actions'
import { IconPencil, IconTrash } from '@tabler/icons-vue'

const actionsColumn: ColumnDef<Project> = {
  id: 'actions',
  header: () => null,
  enableSorting: false,
  enableHiding: false,
  size: 96,
  cell: ({ row }) =>
    rowActionsCell([
      { key: 'edit', label: 'Modifier', icon: IconPencil, onClick: () => openEdit(row.original) },
      {
        key: 'delete',
        label: 'Supprimer',
        icon: IconTrash,
        danger: true,
        hidden: !canDelete(row.original),
        onClick: () => remove(row.original),
      },
    ]),
}
```
