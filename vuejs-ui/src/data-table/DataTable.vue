<template>
  <div class="h-dt-scroll">
    <table class="h-dt-table">
      <thead class="h-dt-thead">
        <tr
          v-for="hg in table.getHeaderGroups()"
          :key="hg.id"
          class="h-dt-hrow"
        >
          <th
            v-for="header in hg.headers"
            :key="header.id"
            :colSpan="header.colSpan"
            class="h-dt-th"
            :style="header.column.getSize() !== 150 ? { width: `${header.column.getSize()}px`, minWidth: `${header.column.getSize()}px`, maxWidth: `${header.column.getSize()}px` } : {}"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </thead>
      <tbody class="h-dt-tbody">
        <template v-if="table.getRowModel().rows?.length">
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
            class="h-dt-row"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="h-dt-td"
            >
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
        </template>
        <tr v-else>
          <td :colSpan="columns.length" class="h-dt-empty">
            {{ texts.dataTable.noResults }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts" generic="TData">
import type { ColumnDef, Table } from '@tanstack/vue-table';
import { FlexRender } from '@tanstack/vue-table';
import { useLibraryTexts } from '../texts';

defineProps<{
  table: Table<TData>;
  columns: ColumnDef<TData, any>[];
}>();

const texts = useLibraryTexts();
</script>

<style scoped>
@reference "../styles.css";
/* Le style du tableau vit ICI, au plus près du composant (voir docs/UI.md côté app) —
   il ne dépend du global que pour les tokens de couleur --h-* (définis en :root par l'app).
   Auparavant ces classes étaient définies dans le globals.css de l'app consommatrice, ce qui
   cassait le rendu dès que l'app purgeait son CSS composant du global. */
.h-dt-scroll {
  @apply flex-1 overflow-auto min-h-0;
  scrollbar-width: thin;
  scrollbar-color: var(--h-border-strong) transparent;
}
.h-dt-scroll::-webkit-scrollbar {
  @apply w-1.5 h-1.5;
}
.h-dt-scroll::-webkit-scrollbar-thumb {
  background: var(--h-border-strong);
  @apply rounded;
}
.h-dt-table {
  @apply w-full text-compact border-collapse max-md:min-w-[600px];
}
.h-dt-th {
  @apply h-[38px] px-3.5 text-left text-2xs font-semibold text-(--h-text-3) tracking-[0.06em] uppercase bg-(--h-surface2) whitespace-nowrap sticky top-0 z-[1];
}
.h-dt-row:hover {
  @apply bg-[var(--h-surface2)];
}
.h-dt-row[data-state='selected'] {
  @apply bg-[var(--h-blue-50)];
}
.h-dt-td {
  @apply py-[11px] px-3.5 align-middle text-compact text-[var(--h-text)];
}
.h-dt-empty {
  @apply py-14 px-6 text-center text-(--h-text-3) text-compact;
}
</style>
