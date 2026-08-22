<template>
  <div v-if="column.getCanSort()" class="flex items-center space-x-2">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          class="-ml-3 h-8 data-[state=open]:bg-accent flex items-center gap-1 rounded px-2 hover:bg-accent hover:text-accent-foreground text-xs font-medium"
        >
          <span>{{ title }}</span>
          <ArrowUpIcon v-if="column.getIsSorted() === 'asc'" class="size-3.5" />
          <ArrowDownIcon v-else-if="column.getIsSorted() === 'desc'" class="size-3.5" />
          <ArrowUpDownIcon v-else class="size-3.5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem @click="column.toggleSorting(false)">
          <ArrowUpIcon class="mr-2 size-3.5 text-muted-foreground/70" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem @click="column.toggleSorting(true)">
          <ArrowDownIcon class="mr-2 size-3.5 text-muted-foreground/70" />
          Desc
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="column.toggleVisibility(false)">
          <EyeOffIcon class="mr-2 size-3.5 text-muted-foreground/70" />
          Hide
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
} from '@profeskills/vuejs-ui/dropdown-menu';
import type { Column } from '@tanstack/vue-table';
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, EyeOffIcon } from 'lucide-vue-next';

defineProps<{ column: Column<any, any>; title: string }>();
</script>
