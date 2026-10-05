<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-2 flex-wrap">
      <span class="text-xs font-semibold text-(--h-text-3) tracking-[0.04em]">{{ issue.code }}</span>
      <span class="text-2xs font-semibold py-0.5 px-2 rounded tracking-[0.03em]" :class="typeBadgeClasses(issue.type)">{{ texts.issuePanel.types[issue.type] }}</span>
      <span class="inline-flex items-center gap-1 text-xs font-medium" :class="priorityColorClass(issue.priority)" :title="texts.issuePanel.priorities[issue.priority]">
        <component :is="PRIO_ICON[issue.priority]" :size="13" />
        {{ texts.issuePanel.priorities[issue.priority] }}
      </span>
    </div>
    <h1 class="text-xl font-bold text-(--h-text) tracking-[-0.03em] leading-[1.3] m-0">{{ issue.title }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useLibraryTexts } from '../texts';
import { PRIO_ICON, priorityColorClass, typeBadgeClasses } from './helpers';
import type { IssuePanelIssue } from './types';

defineProps<{ issue: IssuePanelIssue }>();

const texts = useLibraryTexts();
</script>
