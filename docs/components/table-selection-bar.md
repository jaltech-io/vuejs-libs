# TableSelectionBar

<script setup>
import TableSelectionBar from '@jaltech/vuejs-ui/table-selection-bar'
import TableSelectionBarButton from '@jaltech/vuejs-ui/table-selection-bar-button'
import { IconCheck, IconTrash } from '@tabler/icons-vue'
</script>

A bulk-selection bar that appears when rows are selected: it shows the count with a clear button, and hosts action buttons in its default slot. Provide `TableSelectionBarButton` children (each renders an icon-only, tooltip-wrapped action).

<ClientOnly>
<div class="demo" style="display:block">
  <TableSelectionBar :selected-count="3" label="tâche sélectionnée" plural-label="tâches sélectionnées">
    <TableSelectionBarButton title="Marquer terminé">
      <IconCheck class="size-3.5" />
    </TableSelectionBarButton>
    <TableSelectionBarButton title="Supprimer" destructive>
      <IconTrash class="size-3.5" />
    </TableSelectionBarButton>
  </TableSelectionBar>
</div>
</ClientOnly>

Built-in texts are translatable once for the whole application (`selectionBar` section of [`installLibraryTexts`](/guide/texts)); a prop still wins.

## Code

```vue
<script setup lang="ts">
import TableSelectionBar from '@jaltech/vuejs-ui/table-selection-bar'
import TableSelectionBarButton from '@jaltech/vuejs-ui/table-selection-bar-button'
import { IconCheck, IconTrash } from '@tabler/icons-vue'
</script>

<template>
  <TableSelectionBar
    :selected-count="3"
    label="tâche sélectionnée"
    plural-label="tâches sélectionnées"
    @clear="() => { /* réinitialiser la sélection */ }"
  >
    <TableSelectionBarButton title="Marquer terminé" @click="() => {}">
      <IconCheck class="size-3.5" />
    </TableSelectionBarButton>
    <TableSelectionBarButton title="Supprimer" destructive @click="() => {}">
      <IconTrash class="size-3.5" />
    </TableSelectionBarButton>
  </TableSelectionBar>
</template>
```
