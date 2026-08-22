<template>
  <aside class="h-table-wrap w-52 shrink-0 self-start">
    <div class="h-dt-th flex items-center justify-between">
      <span>Vues</span>
      <HTooltip placement="top-end" text="Nouvelle vue">
        <button
          type="button"
          class="flex size-7 shrink-0 items-center justify-center rounded-[var(--h-radius)] bg-[var(--h-blue-50)] text-[var(--h-blue-600)] transition-colors hover:brightness-95"
          @click="emit('create')"
        >
          <PlusIcon class="size-4" />
        </button>
      </HTooltip>
    </div>

    <nav class="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto p-1.5">
      <button
        type="button"
        class="flex items-center gap-2 rounded-[var(--h-radius)] px-2 py-1.5 text-left text-[13px] transition-colors hover:bg-[var(--h-surface2)]"
        :class="!currentView ? 'bg-[var(--h-blue-50)] font-medium text-[var(--h-text)]' : 'text-[var(--h-text-2)]'"
        @click="selectView(null)"
      >
        <ListIcon class="size-3.5 shrink-0" :class="!currentView ? 'text-[var(--h-blue-600)]' : 'opacity-60'" />
        <span class="min-w-0 flex-1 truncate">{{ defaultLabel }}</span>
      </button>

      <div
        v-for="view in views"
        :key="view.id"
        class="flex items-center gap-2 rounded-[var(--h-radius)] pr-1 pl-2 text-[13px] transition-colors hover:bg-[var(--h-surface2)]"
        :class="currentView?.id === view.id ? 'bg-[var(--h-blue-50)] font-medium text-[var(--h-text)]' : 'text-[var(--h-text-2)]'"
      >
        <BookmarkIcon class="size-3.5 shrink-0" :class="currentView?.id === view.id ? 'text-[var(--h-blue-600)]' : 'opacity-60'" />
        <button type="button" class="min-w-0 flex-1 truncate py-2 text-left" @click="selectView(view)">{{ view.name }}</button>
        <button
          type="button"
          class="flex size-6 shrink-0 items-center justify-center rounded-[var(--h-radius)] bg-[var(--h-surface)] text-[var(--h-blue-600)] shadow-sm transition-colors hover:brightness-95"
          title="Modifier"
          @click.stop="emit('edit', view)"
        >
          <PencilIcon class="size-3.5" />
        </button>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useTableInstance } from '@profeskills/vuejs-ui/composables/useTableInstance';
import type { ViewItem } from '@profeskills/vuejs-ui/types';
import { BookmarkIcon, ListIcon, PencilIcon, PlusIcon } from 'lucide-vue-next';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HTooltip from '../../../HTooltip.vue';
import { COLUMNS, calcViewSearchParams } from './utils';

const props = defineProps<{ views: ViewItem[]; defaultLabel?: string }>();
const emit = defineEmits<{ (e: 'create'): void; (e: 'edit', view: ViewItem): void }>();

const router = useRouter();
const route = useRoute();
const { table } = useTableInstance();

const currentView = computed(() => props.views.find((v) => v.id === (route.query.viewId as string)) ?? null);

function selectView(view: ViewItem | null) {
  if (!view) {
    router.replace({ path: route.path, query: {} });
    table.setColumnVisibility({});
    return;
  }
  router.replace({ path: route.path, query: calcViewSearchParams(view) });
  if (view.columns) {
    const vis: Record<string, boolean> = {};
    COLUMNS.forEach((c) => {
      vis[c] = (view.columns ?? []).includes(c);
    });
    table.setColumnVisibility(vis);
  } else {
    table.setColumnVisibility({});
  }
}
</script>
