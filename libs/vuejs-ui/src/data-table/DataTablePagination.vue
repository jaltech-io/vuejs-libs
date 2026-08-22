<template>
  <div class="flex w-full items-center justify-end gap-3 px-3 py-1.5">
    <!-- Rows per page -->
    <Select
      :model-value="String(table.getState().pagination.pageSize)"
      @update:model-value="v => table.setPageSize(Number(v))"
    >
      <SelectTrigger class="h-7 w-[62px] text-xs px-2 gap-1 [&>svg]:size-3">
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper" side="top" align="end" :side-offset="4" class="min-w-[62px]">
        <SelectItem v-for="size in [10, 20, 30, 40, 50]" :key="size" :value="String(size)" class="text-xs">
          {{ size }}
        </SelectItem>
      </SelectContent>
    </Select>

    <!-- Page info -->
    <span class="text-xs text-muted-foreground tabular-nums w-[52px] text-center">
      {{ currentPage }} / {{ totalPages }}
    </span>

    <!-- Nav buttons -->
    <div class="flex items-center gap-1">
      <button
        type="button"
        class="flex h-7 w-7 items-center justify-center rounded-md border border-input bg-background hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="currentPage <= 1"
        @click="table.setPageIndex(0)"
      >
        <ChevronsLeftIcon class="size-3.5" />
      </button>
      <button
        type="button"
        class="flex h-7 w-7 items-center justify-center rounded-md border border-input bg-background hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="currentPage <= 1"
        @click="table.previousPage()"
      >
        <ChevronLeftIcon class="size-3.5" />
      </button>
      <button
        type="button"
        class="flex h-7 w-7 items-center justify-center rounded-md border border-input bg-background hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="currentPage >= totalPages"
        @click="table.nextPage()"
      >
        <ChevronRightIcon class="size-3.5" />
      </button>
      <button
        type="button"
        class="flex h-7 w-7 items-center justify-center rounded-md border border-input bg-background hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="currentPage >= totalPages"
        @click="table.setPageIndex(table.getPageCount() - 1)"
      >
        <ChevronsRightIcon class="size-3.5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@profeskills/vuejs-ui/select';
import type { Table } from '@tanstack/vue-table';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps<{ table: Table<any> }>();

const currentPage = computed(() => props.table.getState().pagination.pageIndex + 1);
const totalPages = computed(() => Math.max(1, props.table.getPageCount()));
</script>
