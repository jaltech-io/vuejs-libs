<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <div class="flex gap-1 flex-wrap">
        <RouterLink
          v-for="f in FILTER_TABS" :key="f.name" :to="tabPath(f.path)"
          class="py-[5px] px-3 text-xs rounded-[20px] border-[0.5px] border-transparent bg-none cursor-pointer text-[var(--h-text-3)]
                 font-[inherit] no-underline transition-[background,color] duration-100 hover:bg-[var(--h-surface2)] hover:text-[var(--h-text)]"
          active-class="act-filter-active"
        >{{ f.label }}</RouterLink>
      </div>
      <span class="text-xs text-[var(--h-text-3)]">{{ events.length }} événement{{ events.length > 1 ? 's' : '' }}</span>
    </div>

    <div class="flex flex-col">
      <template v-if="events.length">
        <div v-for="(item, i) in events" :key="item.id" class="flex gap-3.5">
          <div class="flex flex-col items-center shrink-0 w-[34px]">
            <Avatar class="size-[34px]" :style="{ background: avatarColor(item.type) + '20' }">
              <AvatarFallback class="bg-transparent text-xs font-bold" :style="{ color: avatarColor(item.type) }">
                {{ getInitials(item.authorEmail) }}
              </AvatarFallback>
            </Avatar>
            <div v-if="i < events.length - 1" class="flex-1 w-[1.5px] bg-[var(--h-border)] my-1 min-h-[24px]" />
          </div>
          <div class="pb-5 flex-1 min-w-0 pt-1.5">
            <div class="flex items-center gap-[5px] flex-wrap text-[13px]">
              <span class="text-[var(--h-text-2)]">{{ item.summary }}</span>
            </div>
            <div v-if="item.fromValue || item.toValue" class="flex items-center gap-1.5 mt-1.5 flex-wrap">
              <span v-if="item.fromValue" class="text-[11px] py-0.5 px-2 rounded-[20px] font-semibold bg-[var(--h-surface2)] text-[var(--h-text-3)] line-through">{{ item.fromValue }}</span>
              <span v-if="item.fromValue && item.toValue" class="text-[var(--h-text-3)] text-[11px]">→</span>
              <span v-if="item.toValue" class="text-[11px] py-0.5 px-2 rounded-[20px] font-semibold bg-[var(--h-blue-50)] text-[var(--h-blue-600)]">{{ item.toValue }}</span>
            </div>
            <span class="block mt-1 text-[11.5px] text-[var(--h-text-3)]">{{ relativeTime(item.createdAt) }}</span>
          </div>
        </div>
      </template>
      <div v-else class="p-12 text-center text-[13px] text-[var(--h-text-3)]">Aucun événement dans cette catégorie.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback } from '@profeskills/vuejs-ui/avatar';
import type { ActivityEventItem, ActivityEventKind } from '@profeskills/vuejs-ui/types';
import { getInitials } from '@profeskills/vuejs-ui/utils';
import { useRoute } from 'vue-router';

defineProps<{ events: ActivityEventItem[] }>();

const route = useRoute();

const FILTER_TABS = [
  { name: 'org-project-activity', path: 'activity', label: 'Tout' },
  { name: 'project-activity-creations', path: 'activity-creations', label: 'Créations' },
  { name: 'project-activity-status', path: 'activity-status', label: 'Changements de statut' },
  { name: 'project-activity-comments', path: 'activity-comments', label: 'Commentaires' },
  { name: 'project-activity-assignments', path: 'activity-assignments', label: 'Assignations' },
];

function tabPath(seg: string) {
  const { tenantId, orgId, projectId } = route.params as Record<string, string>;
  return `/tenant/${tenantId}/org/${orgId}/projects/${projectId}/${seg}`;
}

const TYPE_COLOR: Record<ActivityEventKind, string> = {
  issue_created: '#3b82f6',
  status_changed: '#10b981',
  priority_changed: '#ef4444',
  assignee_changed: '#f97316',
  comment_added: '#8b5cf6',
};
function avatarColor(t: ActivityEventKind) {
  return TYPE_COLOR[t] ?? '#64748b';
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return "à l'instant";
  const m = Math.floor(s / 60);
  if (m < 60) return `il y a ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `il y a ${h}h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `il y a ${d}j`;
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}
</script>

<style scoped>
/* active-class de RouterLink impose ce nom de classe litteral. Corps 100% Tailwind via @apply. */
.act-filter-active { @apply bg-[var(--h-blue-600)] text-white font-medium; }
</style>
