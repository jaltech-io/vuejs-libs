<template>
  <aside class="h-table-wrap w-52 shrink-0 self-start">
    <div class="flex h-[38px] items-center justify-between whitespace-nowrap bg-[var(--h-surface2)] px-3.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--h-text-3)]">
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
        class="flex items-center gap-1 rounded-[var(--h-radius)] pr-1 pl-2 text-[13px] transition-colors hover:bg-[var(--h-surface2)]"
        :class="currentView?.id === view.id ? 'bg-[var(--h-blue-50)] font-medium text-[var(--h-text)]' : 'text-[var(--h-text-2)]'"
      >
        <BookmarkIcon class="size-3.5 shrink-0" :class="currentView?.id === view.id ? 'text-[var(--h-blue-600)]' : 'opacity-60'" />

        <input
          v-if="editingId === view.id"
          ref="editInputRef"
          v-model="editingName"
          class="min-w-0 flex-1 rounded-[var(--h-radius)] border border-input bg-background px-1.5 py-1 text-[13px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          :disabled="savingId === view.id"
          @keyup.enter="saveEdit(view)"
          @keyup.esc="cancelEdit"
          @blur="saveEdit(view)"
          @click.stop
        />
        <button v-else type="button" class="min-w-0 flex-1 truncate py-2 text-left" @click="selectView(view)">{{ view.name }}</button>

        <template v-if="editingId !== view.id">
          <button
            type="button"
            class="flex size-6 shrink-0 items-center justify-center rounded-[var(--h-radius)] bg-[var(--h-surface)] text-[var(--h-blue-600)] shadow-sm transition-colors hover:brightness-95"
            title="Modifier"
            @click.stop="startEdit(view)"
          >
            <PencilIcon class="size-3.5" />
          </button>
          <button
            type="button"
            class="flex size-6 shrink-0 items-center justify-center rounded-[var(--h-radius)] bg-[var(--h-surface)] text-destructive shadow-sm transition-colors hover:brightness-95"
            title="Supprimer"
            @click.stop="onDelete(view)"
          >
            <TrashIcon class="size-3.5" />
          </button>
        </template>
        <Loader2Icon v-else-if="savingId === view.id" class="size-3.5 shrink-0 animate-spin text-muted-foreground" />
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
// Sidebar de VUES SAUVEGARDÉES réutilisable — unique pour tous les programmes à table.
// UX « Éléments de travail » (programme issues) : icône par vue, renommage INLINE (le seul
// champ modifiable étant le nom), corbeille, et bouton « + » qui émet `create` (le programme
// ouvre son propre ViewFormModal en mode création). Les colonnes masquables sont DÉRIVÉES de
// l'instance de table partagée (useTableInstance) : la visibilité des colonnes d'une vue n'est
// donc plus figée sur le jeu de colonnes d'issues (correctif du hardcode historique de COLUMNS),
// et aucun programme n'a à déclarer ses colonnes ici.
import { computed, nextTick, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTableInstance } from '../../../composables/useTableInstance';
import HTooltip from '../../../HTooltip.vue';
import type { FilterParams, ViewItem } from '../../../types';
import { BookmarkIcon, ListIcon, Loader2Icon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-vue-next';
import { COLUMNS, calcViewSearchParams } from './utils';

const props = defineProps<{
  views: ViewItem[];
  defaultLabel?: string;
  onUpdateView: (
    id: string,
    payload: { name: string; columns?: string[]; filterParams?: FilterParams },
  ) => Promise<unknown>;
  onDeleteView: (view: ViewItem) => Promise<unknown>;
}>();
const emit = defineEmits<(e: 'create') => void>();

const router = useRouter();
const route = useRoute();
const { table } = useTableInstance();

// Colonnes réellement masquables de CE tableau (dérivées de tanstack), pas un jeu figé.
// Repli sur COLUMNS (issues) si la table n'expose encore aucune colonne masquable.
const columnIds = computed<readonly string[]>(() => {
  const ids = table
    .getAllColumns()
    .filter((c) => typeof c.accessorFn !== 'undefined' && c.getCanHide())
    .map((c) => c.id);
  return ids.length ? ids : COLUMNS;
});

const currentView = computed(() => props.views.find((v) => v.id === (route.query.viewId as string)) ?? null);

function selectView(view: ViewItem | null) {
  if (!view) {
    router.replace({ path: route.path, query: {} });
    table.setColumnVisibility({});
    return;
  }
  router.replace({ path: route.path, query: calcViewSearchParams(view, columnIds.value) });
  if (view.columns) {
    const vis: Record<string, boolean> = {};
    columnIds.value.forEach((c) => {
      vis[c] = (view.columns ?? []).includes(c);
    });
    table.setColumnVisibility(vis);
  } else {
    table.setColumnVisibility({});
  }
}

// ── Édition inline — le seul champ modifiable étant le nom, pas de modal :
// l'input remplace directement le libellé de la vue. ──
const editingId = ref<string | null>(null);
const editingName = ref('');
const savingId = ref<string | null>(null);
// L'input n'existe qu'une seule ligne à la fois (v-if sur la ligne en édition), mais Vue
// collecte quand même le ref en tableau puisqu'il est déclaré à l'intérieur du v-for parent.
const editInputRef = ref<HTMLInputElement[]>([]);

function startEdit(view: ViewItem) {
  editingId.value = view.id;
  editingName.value = view.name;
  nextTick(() => {
    const el = editInputRef.value[0];
    el?.focus();
    el?.select();
  });
}

function cancelEdit() {
  editingId.value = null;
  editingName.value = '';
}

async function saveEdit(view: ViewItem) {
  if (editingId.value !== view.id) return;
  const trimmed = editingName.value.trim();
  if (!trimmed || trimmed === view.name) {
    cancelEdit();
    return;
  }
  savingId.value = view.id;
  try {
    await props.onUpdateView(view.id, {
      name: trimmed,
      columns: view.columns ?? undefined,
      filterParams: view.filterParams ?? undefined,
    });
  } finally {
    savingId.value = null;
    cancelEdit();
  }
}

async function onDelete(view: ViewItem) {
  await props.onDeleteView(view);
}
</script>
