# TableSelectionBar

<script setup>
import TableSelectionBar from '@jaltech/vuejs-ui/table-selection-bar'
import TableSelectionBarButton from '@jaltech/vuejs-ui/table-selection-bar-button'
import { CheckIcon, Trash2Icon } from 'lucide-vue-next'
</script>

A bulk-selection bar that appears when rows are selected: it shows the count with a clear button, and hosts action buttons in its default slot. Provide `TableSelectionBarButton` children (each renders an icon-only, tooltip-wrapped action).

<ClientOnly>
<div class="demo" style="display:block">
  <TableSelectionBar :selected-count="3" label="tâche sélectionnée" plural-label="tâches sélectionnées">
    <TableSelectionBarButton title="Marquer terminé">
      <CheckIcon class="size-3.5" />
    </TableSelectionBarButton>
    <TableSelectionBarButton title="Supprimer" destructive>
      <Trash2Icon class="size-3.5" />
    </TableSelectionBarButton>
  </TableSelectionBar>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import TableSelectionBar from '@jaltech/vuejs-ui/table-selection-bar'
import TableSelectionBarButton from '@jaltech/vuejs-ui/table-selection-bar-button'
import { CheckIcon, Trash2Icon } from 'lucide-vue-next'
</script>

<template>
  <TableSelectionBar
    :selected-count="3"
    label="tâche sélectionnée"
    plural-label="tâches sélectionnées"
    @clear="() => { /* réinitialiser la sélection */ }"
  >
    <TableSelectionBarButton title="Marquer terminé" @click="() => {}">
      <CheckIcon class="size-3.5" />
    </TableSelectionBarButton>
    <TableSelectionBarButton title="Supprimer" destructive @click="() => {}">
      <Trash2Icon class="size-3.5" />
    </TableSelectionBarButton>
  </TableSelectionBar>
</template>
```
