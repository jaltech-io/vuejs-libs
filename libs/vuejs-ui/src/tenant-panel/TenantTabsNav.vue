<template>
  <div class="flex gap-1 border-b-[0.5px] border-b-[var(--h-border)] mb-5">
    <RouterLink
      v-for="tab in TABS" :key="tab.routeName"
      class="flex items-center gap-1.5 py-[9px] px-3.5 border-0 bg-none cursor-pointer no-underline text-[13px]
             font-medium text-[var(--h-text-3)] border-b-2 border-b-transparent -mb-px font-[inherit]
             transition-[color,border-color] duration-100 hover:text-[var(--h-text-2)]"
      active-class="h-tenant-tab-active"
      :to="{ name: tab.routeName, params }"
    >
      <component :is="tab.icon" :size="14" /> {{ tab.label }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { IconInfoCircle, IconPuzzle } from '@tabler/icons-vue';

defineProps<{ params: Record<string, string> }>();

const TABS = [
  { routeName: 'tenant-informations', label: 'Informations générales', icon: IconInfoCircle },
  { routeName: 'tenant-programs', label: 'Programmes', icon: IconPuzzle },
];
</script>

<style scoped>
.h-tenant-tab-active { @apply !text-[var(--h-blue-600)] border-b-[var(--h-blue-600)]; }
</style>
