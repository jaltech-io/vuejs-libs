<template>
  <div>
    <button
      v-if="parent"
      class="inline-flex items-center gap-1.5 self-start text-xs text-[var(--h-text-2)] bg-[var(--h-surface2)] border-[0.5px]
             border-[var(--h-border)] rounded-[20px] py-1 px-3 mb-3 cursor-pointer max-w-full font-[inherit]
             hover:border-[var(--h-border-strong)] hover:text-[var(--h-text)]"
      @click="emit('go-parent', parent.id)"
    >
      <IconArrowUp :size="13" /> Parent&nbsp;: <code class="font-semibold text-[var(--h-blue-600)]">{{ parent.code }}</code> <span class="overflow-hidden text-ellipsis whitespace-nowrap">{{ parent.title }}</span>
    </button>

    <div class="flex gap-0.5 border-b border-[var(--h-border)] mb-5">
      <RouterLink
        v-for="tab in TABS" :key="tab.key" :to="`${basePath}/${tab.key}`"
        class="inline-flex items-center gap-1.5 py-2 px-3.5 text-[13px] font-medium text-[var(--h-text-3)] bg-none border-0
               border-b-2 border-b-transparent cursor-pointer font-[inherit] no-underline transition-[color,border-color]
               duration-150 -mb-px whitespace-nowrap hover:text-[var(--h-text)]"
        active-class="h-issue-tab-active"
      >
        <component :is="tab.icon" :size="14" />
        {{ tab.label }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  IconArrowUp,
  IconClock,
  IconFileDescription,
  IconGitBranch,
  IconMessage,
  IconPaperclip,
  IconSubtask,
  IconTimeline,
} from '@tabler/icons-vue';
import type { IssuePanelSibling } from './types';

defineProps<{
  /** Préfixe de route commun aux 7 programmes tab, ex. `/tenant/x/org/y/projects/z/issues/w`. */
  basePath: string;
  parent?: IssuePanelSibling | null;
}>();
const emit = defineEmits<{ 'go-parent': [id: string] }>();

const TABS = [
  { key: 'description', label: 'Description', icon: IconFileDescription },
  { key: 'subtasks', label: 'Sous-tâches', icon: IconSubtask },
  { key: 'comments', label: 'Commentaires', icon: IconMessage },
  { key: 'attachments', label: 'Pièces jointes', icon: IconPaperclip },
  { key: 'time', label: 'Temps', icon: IconClock },
  { key: 'activity', label: 'Activité', icon: IconTimeline },
  { key: 'relations', label: 'Relations', icon: IconGitBranch },
];
</script>

<style scoped>
/* active-class de RouterLink impose ce nom de classe litteral. Corps 100% Tailwind via @apply. */
.h-issue-tab-active { @apply !text-[var(--h-blue-600)] border-b-[var(--h-blue-600)]; }
</style>
