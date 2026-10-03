<template>
  <div class="flex gap-1 border-b-[0.5px] border-b-(--h-border) mb-5">
    <RouterLink
      v-for="tab in TABS" :key="tab.routeName"
      class="flex items-center gap-1.5 py-[9px] px-3.5 border-0 bg-none cursor-pointer no-underline text-[13px]
             font-medium text-(--h-text-3) border-b-2 border-b-transparent -mb-px font-[inherit]
             transition-[color,border-color] duration-100 hover:text-(--h-text-2)"
      active-class="h-tenant-tab-active"
      :to="{ name: tab.routeName, params }"
    >
      <component :is="tab.icon" :size="14" /> {{ tab.label }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { IconInfoCircle, IconPuzzle } from '@tabler/icons-vue';
import { computed } from 'vue';
import { useLibraryTexts } from '../texts';

defineProps<{ params: Record<string, string> }>();

const texts = useLibraryTexts();
const TABS = computed(() => [
  { routeName: 'tenant-informations', label: texts.value.tenantPanel.tabInformations, icon: IconInfoCircle },
  { routeName: 'tenant-programs', label: texts.value.tenantPanel.tabPrograms, icon: IconPuzzle },
]);
</script>

<style scoped>
@reference "../styles.css";
.h-tenant-tab-active { @apply text-(--h-blue-600)! border-b-[var(--h-blue-600)]; }
</style>
