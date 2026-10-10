<template>
  <div v-if="column.getCanSort()" class="flex items-center space-x-2">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          class="-ml-3 h-8 data-[state=open]:bg-accent flex items-center gap-1 rounded px-2 hover:bg-accent hover:text-accent-foreground text-xs font-medium"
        >
          <span>{{ title }}</span>
          <IconArrowUp v-if="column.getIsSorted() === 'asc'" class="size-3.5" />
          <IconArrowDown v-else-if="column.getIsSorted() === 'desc'" class="size-3.5" />
          <IconArrowsSort v-else class="size-3.5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem @click="column.toggleSorting(false)">
          <IconArrowUp class="mr-2 size-3.5 text-muted-foreground/70" />
          {{ texts.dataTable.sortAscending }}
        </DropdownMenuItem>
        <DropdownMenuItem @click="column.toggleSorting(true)">
          <IconArrowDown class="mr-2 size-3.5 text-muted-foreground/70" />
          {{ texts.dataTable.sortDescending }}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="column.toggleVisibility(false)">
          <IconEyeOff class="mr-2 size-3.5 text-muted-foreground/70" />
          {{ texts.dataTable.hideColumn }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  <div v-else class="text-xs font-medium">{{ title }}</div>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@jaltech/vuejs-ui/dropdown-menu';
import type { Column } from '@tanstack/vue-table';
import { IconArrowDown, IconArrowUp, IconArrowsSort, IconEyeOff } from '@tabler/icons-vue';
import { useLibraryTexts } from '../texts';

defineProps<{ column: Column<any, any>; title: string }>();

const texts = useLibraryTexts();
</script>
