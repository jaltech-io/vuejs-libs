<template>
  <aside class="h-table-wrap w-full md:w-52 shrink-0 self-start">
    <div class="flex h-[38px] items-center justify-between whitespace-nowrap bg-(--h-surface2) px-3.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-(--h-text-3)">
      <span>{{ texts.dataTableViews.sidebarTitle }}</span>
      <HTooltip placement="top-end" :text="texts.dataTableViews.sidebarNewView">
        <button
          type="button"
          class="flex size-7 shrink-0 items-center justify-center rounded-(--h-radius) bg-(--h-blue-50) text-(--h-blue-600) transition-colors hover:brightness-95"
          @click="emit('create')"
        >
          <PlusIcon class="size-4" />
        </button>
      </HTooltip>
    </div>

    <nav class="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto p-1.5">
      <button
        type="button"
        class="flex items-center gap-2 rounded-(--h-radius) px-2 py-1.5 text-left text-[13px] transition-colors hover:bg-(--h-surface2)"
        :class="!currentView ? 'bg-(--h-blue-50) font-medium text-(--h-text)' : 'text-(--h-text-2)'"
        @click="selectView(null)"
      >
        <ListIcon class="size-3.5 shrink-0" :class="!currentView ? 'text-(--h-blue-600)' : 'opacity-60'" />
        <span class="min-w-0 flex-1 truncate">{{ defaultLabel }}</span>
      </button>

      <template v-for="view in views" :key="view.id">
      <div
        class="flex items-center gap-1 rounded-(--h-radius) pr-1 pl-2 text-[13px] transition-colors hover:bg-(--h-surface2)"
        :class="currentView?.id === view.id ? 'bg-(--h-blue-50) font-medium text-(--h-text)' : 'text-(--h-text-2)'"
      >
        <BookmarkIcon class="size-3.5 shrink-0" :class="currentView?.id === view.id ? 'text-(--h-blue-600)' : 'opacity-60'" />

        <input
          v-if="editingId === view.id"
          ref="editInputRef"
          v-model="editingName"
          class="min-w-0 flex-1 rounded-(--h-radius) border border-input bg-background px-1.5 py-1 text-[13px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          :disabled="savingId === view.id"
          @keyup.enter="saveEdit(view)"
          @keyup.esc="cancelEdit"
          @blur="saveEdit(view, true)"
          @click.stop
        />
        <button v-else type="button" class="min-w-0 flex-1 truncate py-2 text-left" @click="selectView(view)">{{ view.name }}</button>

        <template v-if="editingId !== view.id">
          <button
            type="button"
            class="flex size-6 shrink-0 items-center justify-center rounded-(--h-radius) bg-(--h-surface) text-(--h-blue-600) shadow-xs transition-colors hover:brightness-95"
            :title="texts.dataTableViews.sidebarEdit"
            @click.stop="startEdit(view)"
          >
            <PencilIcon class="size-3.5" />
          </button>
          <button
            type="button"
            class="flex size-6 shrink-0 items-center justify-center rounded-(--h-radius) bg-(--h-surface) text-destructive shadow-xs transition-colors hover:brightness-95"
            :title="texts.dataTableViews.sidebarDelete"
            @click.stop="onDelete(view)"
          >
            <TrashIcon class="size-3.5" />
          </button>
        </template>
        <Loader2Icon v-else-if="savingId === view.id" class="size-3.5 shrink-0 animate-spin text-muted-foreground" />
      </div>
      <p v-if="editingId === view.id && editError" class="px-2 pb-1 text-xs text-destructive">{{ editError }}</p>
      </template>
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
import { useLibraryTexts } from '../../../texts';
import type { FilterParams, ViewItem } from '../../../types';
import { BookmarkIcon, ListIcon, Loader2Icon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-vue-next';
import { calcViewSearchParams, getHideableColumnIds } from './utils';

// Contrat des callbacks : résoudre APRÈS avoir rafraîchi `views` ; en cas d'échec, renvoyer
// `{ status: 'error', message }` — le message est affiché tel quel sous le champ de renommage
// (au consommateur de le traduire, et libre à lui d'afficher aussi un toast).
type ViewCallbackResult = { status?: string; message?: string } | undefined | void;

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
const texts = useLibraryTexts();

const currentView = computed(() => props.views.find((v) => v.id === (route.query.viewId as string)) ?? null);

// La query de la vue porte ses filtres ET ses colonnes (`cols`, relu par
// DataTableColumnsVisibility) : sélectionner une vue = remplacer la query.
function selectView(view: ViewItem | null) {
  if (!view) {
    router.replace({ path: route.path, query: {} });
    return;
  }
  router.replace({ path: route.path, query: calcViewSearchParams(view, getHideableColumnIds(table)) });
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
  editError.value = '';
  failedName.value = '';
}

// Échec du renommage : le champ reste ouvert avec le message ; quitter le champ sans changer
// le nom refusé (clic ailleurs, Échap) abandonne le renommage.
const editError = ref('');
const failedName = ref('');

async function saveEdit(view: ViewItem, fromBlur = false) {
  if (editingId.value !== view.id || savingId.value) return;
  const trimmed = editingName.value.trim();
  if (!trimmed || trimmed === view.name || (fromBlur && trimmed === failedName.value)) {
    cancelEdit();
    return;
  }
  savingId.value = view.id;
  let res: ViewCallbackResult;
  try {
    res = (await props.onUpdateView(view.id, {
      name: trimmed,
      columns: view.columns ?? undefined,
      filterParams: view.filterParams ?? undefined,
    })) as ViewCallbackResult;
  } finally {
    savingId.value = null;
  }
  if (res && res.status === 'error') {
    editError.value = res.message ?? '';
    failedName.value = trimmed;
    nextTick(() => {
      const el = editInputRef.value[0];
      el?.focus();
      el?.select();
    });
    return;
  }
  cancelEdit();
}

async function onDelete(view: ViewItem) {
  const wasActive = route.query.viewId === view.id;
  const res = (await props.onDeleteView(view)) as ViewCallbackResult;
  // Supprimer la vue active ramène à « Tous » (vue absente de la liste rafraîchie, ou succès explicite).
  const deleted = (res && res.status === 'success') || !props.views.some((v) => v.id === view.id);
  if (wasActive && deleted && route.query.viewId === view.id) selectView(null);
}
</script>
