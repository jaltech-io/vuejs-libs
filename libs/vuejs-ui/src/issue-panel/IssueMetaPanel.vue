<template>
  <aside class="bg-[var(--h-surface)] border-[0.5px] border-[var(--h-border)] rounded-[var(--h-radius-lg)] p-4 flex flex-col">
    <div class="flex flex-col gap-0.5 py-1 px-0">
      <div class="flex items-center justify-between py-[7px] px-0 gap-2">
        <span class="text-[11.5px] text-[var(--h-text-3)] font-medium whitespace-nowrap shrink-0">Statut</span>
        <select
          class="text-[11.5px] font-semibold py-[3px] px-2 rounded-[20px] border border-[var(--h-border)] cursor-pointer max-w-[160px] appearance-none text-right focus:outline-none"
          :value="issue.status"
          @change="emit('update-status', ($event.target as HTMLSelectElement).value as any)"
        >
          <option v-for="s in STATUS_OPTIONS" :key="s" :value="s">{{ STATUS_LABEL[s] }}</option>
        </select>
      </div>
      <div class="flex items-center justify-between py-[7px] px-0 gap-2">
        <span class="text-[11.5px] text-[var(--h-text-3)] font-medium whitespace-nowrap shrink-0">Priorité</span>
        <span class="flex items-center gap-1.5 text-[12.5px] font-medium" :class="priorityColorClass(issue.priority)">
          <component :is="PRIO_ICON[issue.priority]" :size="13" />
          {{ PRIO_LABEL[issue.priority] }}
        </span>
      </div>
      <div class="flex items-center justify-between py-[7px] px-0 gap-2">
        <span class="text-[11.5px] text-[var(--h-text-3)] font-medium whitespace-nowrap shrink-0">Type</span>
        <span class="flex items-center gap-1.5 text-[12.5px] text-[var(--h-text)] font-medium">
          <component :is="TYPE_ICON[issue.type]" :size="13" />
          {{ TYPE_LABEL[issue.type] }}
        </span>
      </div>
      <div class="flex items-center justify-between py-[7px] px-0 gap-2">
        <span class="text-[11.5px] text-[var(--h-text-3)] font-medium whitespace-nowrap shrink-0">Assigné à</span>
        <select
          class="text-[12.5px] py-[5px] px-2 rounded-[var(--h-radius)] border border-[var(--h-border)] bg-[var(--h-surface)] text-[var(--h-text)]
                 focus:outline-none focus:border-[var(--h-blue-400,#4a9eff)] w-auto max-w-[170px]"
          :value="issue.assigneeId ?? ''" @change="emit('update-assignee', ($event.target as HTMLSelectElement).value || null)"
        >
          <option value="">Non assigné</option>
          <option v-for="m in members" :key="m.id" :value="m.id">{{ m.name }} · {{ m.email }}</option>
        </select>
      </div>
      <div class="flex items-center justify-between py-[7px] px-0 gap-2">
        <span class="text-[11.5px] text-[var(--h-text-3)] font-medium whitespace-nowrap shrink-0">Sprint</span>
        <span class="flex items-center gap-1.5 text-[12.5px] text-[var(--h-text)] font-medium">
          <span v-if="issue.sprintId" class="inline-flex items-center gap-[5px] text-xs text-[var(--h-purple-700)]">
            <IconTable :size="11" /> Sprint lié
          </span>
          <span v-else class="text-xs text-[var(--h-text-3)] italic">Aucun sprint</span>
        </span>
      </div>
      <div class="flex items-center justify-between py-[7px] px-0 gap-2">
        <span class="text-[11.5px] text-[var(--h-text-3)] font-medium whitespace-nowrap shrink-0">Points</span>
        <span class="flex items-center gap-1.5 text-[12.5px] text-[var(--h-text)] font-medium">
          <input
            type="number" min="0" step="1" :value="issue.storyPoints ?? ''" placeholder="—"
            class="w-14 text-right text-[12.5px] py-[5px] px-2 rounded-[var(--h-radius)] border border-[var(--h-border)] bg-[var(--h-surface)]
                   text-[var(--h-text)] focus:outline-none focus:border-[var(--h-blue-400,#4a9eff)]"
            @change="onStoryPoints(($event.target as HTMLInputElement).value)"
          />
        </span>
      </div>
      <div class="flex items-center justify-between py-[7px] px-0 gap-2">
        <span class="text-[11.5px] text-[var(--h-text-3)] font-medium whitespace-nowrap shrink-0">Échéance</span>
        <span class="flex items-center gap-1.5 text-[12.5px] font-medium text-[var(--h-text)]">
          <IconCalendar :size="13" />
          {{ issue.dueDate ? fmtIssueDate(issue.dueDate) : '—' }}
        </span>
      </div>
      <div class="flex items-center justify-between py-[7px] px-0 gap-2">
        <span class="text-[11.5px] text-[var(--h-text-3)] font-medium whitespace-nowrap shrink-0">Parent</span>
        <span class="inline-flex items-center gap-1.5">
          <template v-if="parent">
            <button class="bg-none border-0 cursor-pointer p-0 font-[inherit]" @click="emit('go-issue', parent.id)"><code class="text-xs font-semibold text-[var(--h-blue-600)]">{{ parent.code }}</code></button>
            <button
              class="bg-none border-0 cursor-pointer font-[inherit] text-[var(--h-text-3)] text-[11.5px] inline-flex items-center hover:text-[var(--h-danger)]"
              title="Détacher" @click="emit('detach-parent')"
            ><IconX :size="12" /></button>
          </template>
          <button
            v-else
            class="bg-none border-0 cursor-pointer font-[inherit] text-[var(--h-text-3)] text-[11.5px] inline-flex items-center hover:text-[var(--h-blue-600)] hover:underline"
            @click="attachOpen = !attachOpen"
          >Rattacher…</button>
        </span>
      </div>
      <div v-if="attachOpen && !parent" class="flex items-center justify-between py-[7px] px-0 gap-2">
        <select
          class="w-full text-[12.5px] py-[5px] px-2 rounded-[var(--h-radius)] border border-[var(--h-border)] bg-[var(--h-surface)] text-[var(--h-text)]
                 focus:outline-none focus:border-[var(--h-blue-400,#4a9eff)]"
          @change="onSetParent(($event.target as HTMLSelectElement).value)"
        >
          <option value="">— Choisir un parent —</option>
          <option v-for="i in parentCandidates" :key="i.id" :value="i.id">{{ i.code }} · {{ i.title }}</option>
        </select>
      </div>
    </div>

    <div class="h-[0.5px] bg-[var(--h-border)] my-2" />

    <div class="flex flex-col gap-0.5 py-1 px-0">
      <div class="flex items-center justify-between py-[7px] px-0 gap-2">
        <span class="text-[11.5px] text-[var(--h-text-3)] font-medium whitespace-nowrap shrink-0">Labels</span>
        <div class="flex flex-wrap gap-1 justify-end">
          <template v-if="issue.labels?.length">
            <span v-for="l in issue.labels" :key="l" class="text-[11px] py-0.5 px-[7px] rounded-[10px] bg-[var(--h-surface2)] text-[var(--h-text-2)] font-medium">{{ l }}</span>
          </template>
          <span v-else class="text-xs text-[var(--h-text-3)] italic">Aucun</span>
        </div>
      </div>
    </div>

    <div class="h-[0.5px] bg-[var(--h-border)] my-2" />

    <div class="flex flex-col gap-0 py-1 px-0">
      <div class="flex justify-between items-center py-1.5 px-0 text-xs text-[var(--h-text-2)]">
        <span class="text-[11.5px] text-[var(--h-text-3)] font-medium whitespace-nowrap shrink-0">Créé le</span>
        <span class="text-[12.5px] text-[var(--h-text)] font-medium">{{ fmtIssueDate(issue.createdAt) }}</span>
      </div>
      <div class="flex justify-between items-center py-1.5 px-0 text-xs text-[var(--h-text-2)]">
        <span class="text-[11.5px] text-[var(--h-text-3)] font-medium whitespace-nowrap shrink-0">Modifié le</span>
        <span class="text-[12.5px] text-[var(--h-text)] font-medium">{{ fmtIssueDate(issue.updatedAt) }}</span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { IconCalendar, IconTable, IconX } from '@tabler/icons-vue';
import { ref } from 'vue';
import {
  fmtIssueDate,
  PRIO_ICON,
  PRIO_LABEL,
  priorityColorClass,
  STATUS_LABEL,
  TYPE_ICON,
  TYPE_LABEL,
} from './helpers';
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
