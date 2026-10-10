<template>
  <HTooltip v-if="visible" :text="label" placement="top-end">
    <button
      type="button"
      :aria-label="label"
      class="flex size-7 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
      @click="resolvedTable!.toggleAllRowsExpanded(!allExpanded)"
    >
      <IconChevronsUp v-if="allExpanded" class="size-4" />
      <IconChevronsDown v-else class="size-4" />
    </button>
  </HTooltip>
</template>

<script setup lang="ts">
/**
 * Bouton « Tout déplier / Tout replier » d'un tableau en arbre (`useDataTableTree`). Rien n'est
 * affiché hors mode arbre ni quand aucune ligne n'a d'enfants. `DataTableAdvancedToolbar` l'inclut ;
 * ailleurs, passer `table` ou fournir l'instance par `provideTableInstance`.
 */
import { TableInstanceKey } from '@jaltech/vuejs-ui/composables/useTableInstance';
import type { Table } from '@tanstack/vue-table';
import { IconChevronsDown, IconChevronsUp } from '@tabler/icons-vue';
import { computed, inject } from 'vue';
import HTooltip from '../HTooltip.vue';
import { useLibraryTexts } from '../texts';
import { isTreeTable } from './tree';

const props = defineProps<{
  table?: Table<any>;
  /** Défaut : textes de la lib (`dataTable.expandAll`). */
  expandAllLabel?: string;
  /** Défaut : textes de la lib (`dataTable.collapseAll`). */
  collapseAllLabel?: string;
}>();

const texts = useLibraryTexts();
const provided = inject(TableInstanceKey, undefined);
const resolvedTable = computed(() => props.table ?? provided?.table);

const visible = computed(() => {
  const table = resolvedTable.value;
  return !!table && isTreeTable(table) && table.getCanSomeRowsExpand();
});

// Tout est déplié quand chaque ligne dépliable l'est (filtres et tri appliqués, toutes pages).
const allExpanded = computed(() => {
  const table = resolvedTable.value;
  if (!table) return false;
  if (table.getState().expanded === true) return true;
  return table
    .getPrePaginationRowModel()
    .flatRows.every((row) => !row.getCanExpand() || row.getIsExpanded());
});

const label = computed(() =>
  allExpanded.value
    ? (props.collapseAllLabel ?? texts.value.dataTable.collapseAll)
    : (props.expandAllLabel ?? texts.value.dataTable.expandAll),
);
</script>
