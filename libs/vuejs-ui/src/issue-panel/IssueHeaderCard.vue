<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-2 flex-wrap">
      <span class="text-xs font-semibold text-[var(--h-text-3)] tracking-[0.04em]">{{ issue.code }}</span>
      <span class="text-[11px] font-semibold py-0.5 px-2 rounded tracking-[0.03em]" :class="typeBadgeClasses(issue.type)">{{ TYPE_LABEL[issue.type] }}</span>
      <span class="inline-flex items-center gap-1 text-xs font-medium" :class="priorityColorClass(issue.priority)" :title="PRIO_LABEL[issue.priority]">
        <component :is="PRIO_ICON[issue.priority]" :size="13" />
        {{ PRIO_LABEL[issue.priority] }}
      </span>
    </div>
    <h1 class="text-xl font-bold text-[var(--h-text)] tracking-[-0.03em] leading-[1.3] m-0">{{ issue.title }}</h1>
  </div>
</template>

<script setup lang="ts">
import { PRIO_ICON, PRIO_LABEL, priorityColorClass, TYPE_LABEL, typeBadgeClasses } from './helpers';
import type { IssuePanelIssue } from './types';

defineProps<{ issue: IssuePanelIssue }>();
</script>
