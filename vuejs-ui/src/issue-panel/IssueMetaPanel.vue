<template>
  <aside class="bg-(--h-surface) border-[0.5px] border-(--h-border) rounded-(--h-radius-lg) p-4 flex flex-col">
    <div class="flex flex-col gap-0.5 py-1 px-0">
      <div class="flex items-center justify-between py-[7px] px-0 gap-2">
        <span class="text-xs text-(--h-text-3) font-medium whitespace-nowrap shrink-0">{{ texts.issuePanel.status }}</span>
        <select
          class="text-xs font-semibold py-[3px] px-2 rounded-[20px] border border-(--h-border) cursor-pointer max-w-[160px] appearance-none text-right focus:outline-hidden"
          :value="issue.status"
          @change="emit('update-status', ($event.target as HTMLSelectElement).value as any)"
        >
          <option v-for="s in STATUS_OPTIONS" :key="s" :value="s">{{ texts.issuePanel.statuses[s] }}</option>
        </select>
      </div>
      <div class="flex items-center justify-between py-[7px] px-0 gap-2">
        <span class="text-xs text-(--h-text-3) font-medium whitespace-nowrap shrink-0">{{ texts.issuePanel.priority }}</span>
        <span class="flex items-center gap-1.5 text-compact font-medium" :class="priorityColorClass(issue.priority)">
          <component :is="PRIO_ICON[issue.priority]" :size="13" />
          {{ texts.issuePanel.priorities[issue.priority] }}
        </span>
      </div>
      <div class="flex items-center justify-between py-[7px] px-0 gap-2">
        <span class="text-xs text-(--h-text-3) font-medium whitespace-nowrap shrink-0">{{ texts.issuePanel.type }}</span>
        <span class="flex items-center gap-1.5 text-compact text-(--h-text) font-medium">
          <component :is="TYPE_ICON[issue.type]" :size="13" />
          {{ texts.issuePanel.types[issue.type] }}
        </span>
      </div>
      <div class="flex items-center justify-between py-[7px] px-0 gap-2">
        <span class="text-xs text-(--h-text-3) font-medium whitespace-nowrap shrink-0">{{ texts.issuePanel.assignee }}</span>
        <select
          class="text-compact py-[5px] px-2 rounded-(--h-radius) border border-(--h-border) bg-(--h-surface) text-(--h-text)
                 focus:outline-hidden focus:border-(--h-blue-400,#4a9eff) w-auto max-w-[170px]"
          :value="issue.assigneeId ?? ''" @change="emit('update-assignee', ($event.target as HTMLSelectElement).value || null)"
        >
          <option value="">{{ texts.issuePanel.unassigned }}</option>
          <option v-for="m in members" :key="m.id" :value="m.id">{{ m.name }} · {{ m.email }}</option>
        </select>
      </div>
      <div class="flex items-center justify-between py-[7px] px-0 gap-2">
        <span class="text-xs text-(--h-text-3) font-medium whitespace-nowrap shrink-0">{{ texts.issuePanel.sprint }}</span>
        <span class="flex items-center gap-1.5 text-compact text-(--h-text) font-medium">
          <span v-if="issue.sprintId" class="inline-flex items-center gap-[5px] text-xs text-(--h-purple-700)">
            <IconTable :size="11" /> {{ texts.issuePanel.linkedSprint }}
          </span>
          <span v-else class="text-xs text-(--h-text-3) italic">{{ texts.issuePanel.noSprint }}</span>
        </span>
      </div>
      <div class="flex items-center justify-between py-[7px] px-0 gap-2">
        <span class="text-xs text-(--h-text-3) font-medium whitespace-nowrap shrink-0">{{ texts.issuePanel.points }}</span>
        <span class="flex items-center gap-1.5 text-compact text-(--h-text) font-medium">
          <input
            type="number" min="0" step="1" :value="issue.storyPoints ?? ''" placeholder="—"
            class="w-14 text-right text-compact py-[5px] px-2 rounded-(--h-radius) border border-(--h-border) bg-(--h-surface)
                   text-(--h-text) focus:outline-hidden focus:border-(--h-blue-400,#4a9eff)"
            @change="onStoryPoints(($event.target as HTMLInputElement).value)"
          />
        </span>
      </div>
      <div class="flex items-center justify-between py-[7px] px-0 gap-2">
        <span class="text-xs text-(--h-text-3) font-medium whitespace-nowrap shrink-0">{{ texts.issuePanel.dueDate }}</span>
        <span class="flex items-center gap-1.5 text-compact font-medium text-(--h-text)">
          <IconCalendar :size="13" />
          {{ issue.dueDate ? fmtIssueDate(issue.dueDate, texts.locale) : '—' }}
        </span>
      </div>
      <div class="flex items-center justify-between py-[7px] px-0 gap-2">
        <span class="text-xs text-(--h-text-3) font-medium whitespace-nowrap shrink-0">{{ texts.issuePanel.parent }}</span>
        <span class="inline-flex items-center gap-1.5">
          <template v-if="parent">
            <button class="bg-none border-0 cursor-pointer p-0 font-[inherit]" @click="emit('go-issue', parent.id)"><code class="text-xs font-semibold text-(--h-blue-600)">{{ parent.code }}</code></button>
            <button
              class="bg-none border-0 cursor-pointer font-[inherit] text-(--h-text-3) text-xs inline-flex items-center hover:text-(--h-danger)"
              :title="texts.issuePanel.detach" @click="emit('detach-parent')"
            ><IconX :size="12" /></button>
          </template>
          <button
            v-else
            class="bg-none border-0 cursor-pointer font-[inherit] text-(--h-text-3) text-xs inline-flex items-center hover:text-(--h-blue-600) hover:underline"
            @click="attachOpen = !attachOpen"
          >{{ texts.issuePanel.attach }}</button>
        </span>
      </div>
      <div v-if="attachOpen && !parent" class="flex items-center justify-between py-[7px] px-0 gap-2">
        <select
          class="w-full text-compact py-[5px] px-2 rounded-(--h-radius) border border-(--h-border) bg-(--h-surface) text-(--h-text)
                 focus:outline-hidden focus:border-(--h-blue-400,#4a9eff)"
          @change="onSetParent(($event.target as HTMLSelectElement).value)"
        >
          <option value="">{{ texts.issuePanel.chooseParent }}</option>
          <option v-for="i in parentCandidates" :key="i.id" :value="i.id">{{ i.code }} · {{ i.title }}</option>
        </select>
      </div>
    </div>

    <div class="h-[0.5px] bg-(--h-border) my-2" />

    <div class="flex flex-col gap-0.5 py-1 px-0">
      <div class="flex items-center justify-between py-[7px] px-0 gap-2">
        <span class="text-xs text-(--h-text-3) font-medium whitespace-nowrap shrink-0">{{ texts.issuePanel.labels }}</span>
        <div class="flex flex-wrap gap-1 justify-end">
          <template v-if="issue.labels?.length">
            <span v-for="l in issue.labels" :key="l" class="text-2xs py-0.5 px-[7px] rounded-[10px] bg-(--h-surface2) text-(--h-text-2) font-medium">{{ l }}</span>
          </template>
          <span v-else class="text-xs text-(--h-text-3) italic">{{ texts.issuePanel.none }}</span>
        </div>
      </div>
    </div>

    <div class="h-[0.5px] bg-(--h-border) my-2" />

    <div class="flex flex-col gap-0 py-1 px-0">
      <div class="flex justify-between items-center py-1.5 px-0 text-xs text-(--h-text-2)">
        <span class="text-xs text-(--h-text-3) font-medium whitespace-nowrap shrink-0">{{ texts.issuePanel.createdAt }}</span>
        <span class="text-compact text-(--h-text) font-medium">{{ fmtIssueDate(issue.createdAt, texts.locale) }}</span>
      </div>
      <div class="flex justify-between items-center py-1.5 px-0 text-xs text-(--h-text-2)">
        <span class="text-xs text-(--h-text-3) font-medium whitespace-nowrap shrink-0">{{ texts.issuePanel.updatedAt }}</span>
        <span class="text-compact text-(--h-text) font-medium">{{ fmtIssueDate(issue.updatedAt, texts.locale) }}</span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { IconCalendar, IconTable, IconX } from '@tabler/icons-vue';
import { ref } from 'vue';
import { useLibraryTexts } from '../texts';
import { fmtIssueDate, PRIO_ICON, priorityColorClass, TYPE_ICON } from './helpers';
import type { IssuePanelIssue, IssuePanelMember, IssuePanelSibling, IssuePanelStatus } from './types';

defineProps<{
  issue: IssuePanelIssue;
  members: IssuePanelMember[];
  parent?: IssuePanelSibling | null;
  parentCandidates: IssuePanelSibling[];
}>();

const emit = defineEmits<{
  'update-status': [status: IssuePanelStatus];
  'update-assignee': [id: string | null];
  'update-story-points': [value: number | null];
  'attach-parent': [id: string];
  'detach-parent': [];
  'go-issue': [id: string];
}>();

const STATUS_OPTIONS: IssuePanelStatus[] = ['open', 'in-progress', 'in-review', 'done', 'closed'];

const attachOpen = ref(false);
const texts = useLibraryTexts();

function onStoryPoints(value: string) {
  const p = value === '' ? null : Math.max(0, Math.round(Number(value)));
  emit('update-story-points', p);
}

function onSetParent(parentId: string) {
  if (!parentId) return;
  emit('attach-parent', parentId);
  attachOpen.value = false;
}
</script>
