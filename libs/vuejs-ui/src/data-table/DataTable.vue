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
            Aucun résultat.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts" generic="TData">
import type { ColumnDef, Table } from '@tanstack/vue-table';
import { FlexRender } from '@tanstack/vue-table';

defineProps<{
  table: Table<TData>;
  columns: ColumnDef<TData, any>[];
}>();
</script>
