<template>
  <div class="relative" ref="rootRef">
    <HTooltip text="Colonnes visibles" placement="top-end">
      <button
        type="button"
        @click="toggleOpen"
        class="flex size-7 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
      >
        <SlidersHorizontalIcon class="size-4" />
      </button>
    </HTooltip>

    <Teleport to="body">
      <div
        v-if="open"
        :style="panelStyle"
        class="fixed z-[400] w-48 rounded-md border bg-popover shadow-md"
        @mousedown.stop
      >
        <p class="border-b px-3 py-2 text-xs font-semibold text-muted-foreground">Toggle columns</p>
        <div class="p-1">
          <div
            v-for="col in toggleableColumns"
            :key="col.id"
            class="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm capitalize hover:bg-accent"
            @mousedown.prevent.stop="toggleCol(col)"
          >
            <div
              class="flex size-4 shrink-0 items-center justify-center rounded border border-primary"
              :class="col.getIsVisible() ? 'bg-primary text-primary-foreground' : 'bg-background'"
            >
              <svg v-if="col.getIsVisible()" viewBox="0 0 12 12" class="size-3 fill-current">
                <polyline points="1,6 4,10 11,2" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
              </svg>
            </div>
            <span>{{ col.id }}</span>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useTableInstance } from '@profeskills/vuejs-ui/composables/useTableInstance';
import type { Column } from '@tanstack/vue-table';
import { SlidersHorizontalIcon } from 'lucide-vue-next';
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HTooltip from '../HTooltip.vue';

const { table } = useTableInstance();
const router = useRouter();
const route = useRoute();

const rootRef = ref<HTMLElement | null>(null);
const open = ref(false);
const panelStyle = ref<Record<string, string>>({});

const toggleableColumns = computed(() =>
  table.getAllColumns().filter((c) => typeof c.accessorFn !== 'undefined' && c.getCanHide()),
);

function toggleCol(col: Column<any, any>) {
  col.toggleVisibility(!col.getIsVisible());
  // Sync dans l'URL apres que Vue a applique le changement d'etat
  nextTick(() => {
    const visible = toggleableColumns.value.filter((c) => c.getIsVisible()).map((c) => c.id);
    const allVisible = visible.length === toggleableColumns.value.length;
    const q = { ...(route.query as Record<string, any>) };
    if (allVisible) {
      delete q.cols;
    } else {
      q.cols = visible.join('.');
    }
    router.replace({ query: q });
  });
}

function toggleOpen() {
  if (open.value) {
    open.value = false;
    return;
  }
  if (rootRef.value) {
    const r = rootRef.value.getBoundingClientRect();
    panelStyle.value = {
      top: `${r.bottom + 4}px`,
      right: `${window.innerWidth - r.right}px`,
    };
  }
  open.value = true;
}

function handleOutside(e: MouseEvent) {
  if (open.value && rootRef.value && !rootRef.value.contains(e.target as Node)) {
    open.value = false;
  }
}

onMounted(() => document.addEventListener('mousedown', handleOutside));
onUnmounted(() => document.removeEventListener('mousedown', handleOutside));
</script>
