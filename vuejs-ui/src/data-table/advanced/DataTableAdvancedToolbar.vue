<template>
  <div class="flex w-full flex-col overflow-x-auto">

    <!-- ── Row 1 : Filtre · Views (gauche) · Actions (droite) ── -->
    <div class="flex flex-wrap items-center justify-between gap-2 pb-0">
      <div class="flex flex-wrap items-center gap-2 min-w-0">
        <DataTableViewsDropdown
          v-if="!hideViewsDropdown"
          :views="views"
          :filterParams="currentFilterParams"
          :onCreateView="onCreateView"
          :onUpdateView="onUpdateView"
          :onDeleteView="onDeleteView"
          :defaultLabel="defaultLabel"
        />

        <!-- Bouton Filtrer / Ajouter -->
        <div v-if="selectableOptions.length > 0" class="relative" ref="addFilterRef">
          <button
            type="button"
            @click.stop="toggleAdd"
            class="inline-flex h-7 items-center gap-1.5 rounded-md border border-input bg-background px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <ListFilterIcon class="size-3.5" />
            {{ selectedOptions.length === 0 ? texts.dataTableFilters.filter : texts.dataTableFilters.add }}
          </button>
          <Teleport to="body">
            <div
              v-if="addOpen"
              :style="addStyle"
              class="fixed z-400 w-44 overflow-hidden rounded-md border bg-popover shadow-md"
              @mousedown.stop
            >
              <div class="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {{ texts.dataTableFilters.filterBy }}
              </div>
              <div
                v-for="opt in selectableOptions"
                :key="opt.id"
                @mousedown.prevent.stop="addOption(opt)"
                class="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm capitalize hover:bg-accent"
              >
                <TypeIcon v-if="opt.value === 'title'" class="size-3.5 shrink-0 text-muted-foreground" />
                <ListIcon v-else class="size-3.5 shrink-0 text-muted-foreground" />
                {{ opt.label }}
              </div>
            </div>
          </Teleport>
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-2 min-w-0">
        <slot name="selection" />
        <slot />
        <DataTableColumnsVisibility />
      </div>
    </div>

    <!-- ── Row 2 : Filtres actifs + actions vue ── -->
    <div v-if="selectedOptions.length > 0 || showViewActions" class="flex flex-wrap items-center gap-2 pt-3 min-h-[36px]">

      <!-- Filtres simples -->
      <DataTableFilterItem
        v-for="opt in singleFilters"
        :key="opt.id"
        :option="opt"
        :autoOpen="opt.id === lastAddedId"
        @update="updateOption"
        @remove="removeOption"
      />

      <!-- Groupe multi-filtre -->
      <DataTableMultiFilter
        v-if="multiFilters.length > 0"
        :options="multiFilters"
        :allOptions="allOptions"
        :selectedOptions="selectedOptions"
        :operator="multiOperator"
        @update:operator="updateOperator"
        @update:selectedOptions="onMultiUpdate"
      />

      <!-- Separateur vertical avant les actions de vue -->
      <div
        v-if="showViewActions"
        class="h-4 w-px bg-border/70"
      />

      <!-- Reinitialiser (vue active modifiee) -->
      <button
        v-if="isUpdated && currentView"
        type="button"
        @click="resetToCurrentView"
        class="inline-flex h-7 items-center gap-1 rounded-md px-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <RotateCcwIcon class="size-3" />
        {{ texts.dataTableViews.reset }}
      </button>

      <!-- Bouton Sauvegarder la vue -->
      <template v-if="hasActiveFilterValues && !currentView">
        <!-- Etat ferme : bouton bookmark -->
        <button
          v-if="!openSaveView"
          type="button"
          @click="openSaveView = true; $nextTick(() => saveInputRef?.focus())"
          class="inline-flex h-7 items-center gap-1.5 rounded-md border border-primary/30 bg-primary/5 px-2.5 text-xs font-medium text-primary transition-all hover:bg-primary/10 hover:border-primary/50"
        >
          <BookmarkPlusIcon class="size-3.5" />
          {{ texts.dataTableViews.saveView }}
        </button>

        <!-- Etat ouvert : saisie inline -->
        <div
          v-else
          class="flex items-center gap-1.5 rounded-md border border-primary/30 bg-background px-2.5 py-1 shadow-xs"
        >
          <BookmarkIcon class="size-3.5 shrink-0 text-primary" />
          <input
            ref="saveInputRef"
            v-model="newViewName"
            :placeholder="texts.dataTableViews.saveNamePlaceholder"
            class="w-32 bg-transparent text-xs outline-hidden placeholder:text-muted-foreground"
            @keyup.enter="handleSaveView"
            @keyup.escape="openSaveView = false; newViewName = ''"
          />
          <p v-if="saveViewError" class="text-[10px] text-destructive">{{ saveViewError }}</p>
          <div class="flex items-center gap-1">
            <button
              type="button"
              @click="handleSaveView"
              :disabled="saving"
              :title="texts.dataTableViews.saveHint"
              class="flex h-5 items-center justify-center rounded bg-primary px-1.5 text-[10px] font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              <Loader2Icon v-if="saving" class="size-3 animate-spin" />
              <CheckIcon v-else class="size-3" />
            </button>
            <button
              type="button"
              @click="openSaveView = false; newViewName = ''"
              :title="texts.dataTableViews.cancelHint"
              class="flex size-5 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <XIcon class="size-3" />
            </button>
          </div>
        </div>
      </template>

      <!-- Mettre a jour la vue active -->
      <button
        v-if="isUpdated && currentView"
        type="button"
        :disabled="saving"
        @click="handleUpdateView"
        class="inline-flex h-7 items-center gap-1.5 rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
      >
        <Loader2Icon v-if="saving" class="size-3.5 animate-spin" />
        <SaveIcon v-else class="size-3.5" />
        {{ texts.dataTableViews.updateView }}
      </button>
      <p v-if="updateViewError && isUpdated && currentView" class="text-xs text-destructive">{{ updateViewError }}</p>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useTableInstance } from '@jaltech/vuejs-ui/composables/useTableInstance';
import type { DataTableFilterOption, FilterParams, ViewItem } from '@jaltech/vuejs-ui/types';
import {
  BookmarkIcon,
  BookmarkPlusIcon,
  CheckIcon,
  ListFilterIcon,
  ListIcon,
  Loader2Icon,
  RotateCcwIcon,
  SaveIcon,
  TypeIcon,
  XIcon,
} from 'lucide-vue-next';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLibraryTexts } from '../../texts';
import DataTableColumnsVisibility from '../DataTableColumnsVisibility.vue';
import DataTableFilterItem from './DataTableFilterItem.vue';
import DataTableMultiFilter from './DataTableMultiFilter.vue';
import DataTableViewsDropdown from './views/DataTableViewsDropdown.vue';
import {
  buildFilterOptionsFromQuery,
  calcFilterParams,
  calcViewSearchParams,
  columnsEqual,
  filterParamsEqual,
  getHideableColumnIds,
} from './views/utils';

const props = defineProps<{
  filterFields: { label: string; value: string; placeholder?: string; options?: { label: string; value: string }[] }[];
  views: ViewItem[];
  // Contrat des callbacks de vues : résoudre APRÈS avoir rafraîchi `views`, et renvoyer
  // `{ status: 'error', message }` en cas d'échec — `message` est affiché tel quel (au
  // consommateur de le traduire). La création renvoie `{ view: { id } }` : la vue créée devient
  // la vue active.
  onCreateView: (p: any) => Promise<any>;
  onUpdateView: (id: string, p: any) => Promise<any>;
  onDeleteView: (id: string) => Promise<any>;
  defaultLabel?: string;
  // Le programme fournit son propre sélecteur de vues (ex. sidebar à gauche du
  // tableau) plutôt que le dropdown intégré — voir pages/tenants/components/ViewsSidebar.vue.
  hideViewsDropdown?: boolean;
}>();

const router = useRouter();
const route = useRoute();
const { table, columnVisibility } = useTableInstance();
const texts = useLibraryTexts();

const addOpen = ref(false);
const openSaveView = ref(false);
const newViewName = ref('');
const saveViewError = ref('');
const saving = ref(false);
const lastAddedId = ref<string | null>(null);

const addFilterRef = ref<HTMLElement | null>(null);
const saveInputRef = ref<HTMLInputElement | null>(null);
const addStyle = ref<Record<string, string>>({});

function posOf(el: HTMLElement | null, style: typeof addStyle) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  style.value = { top: `${r.bottom + 4}px`, left: `${r.left}px` };
}

function toggleAdd() {
  if (addOpen.value) {
    addOpen.value = false;
    return;
  }
  posOf(addFilterRef.value, addStyle);
  addOpen.value = true;
}

function handleDocClick(e: MouseEvent) {
  const t = e.target as Node;
  if (addOpen.value && addFilterRef.value && !addFilterRef.value.contains(t)) addOpen.value = false;
}
onMounted(() => document.addEventListener('mousedown', handleDocClick));
onUnmounted(() => document.removeEventListener('mousedown', handleDocClick));

const allOptions = computed<DataTableFilterOption[]>(() =>
  props.filterFields.map((f) => ({ id: f.value, label: f.label, value: f.value, options: f.options ?? [] })),
);

function buildFromQuery(q: Record<string, string>): DataTableFilterOption[] {
  return buildFilterOptionsFromQuery(allOptions.value, q);
}

const selectedOptions = ref<DataTableFilterOption[]>(buildFromQuery(route.query as Record<string, string>));
const multiOperator = ref((route.query.operator as string) || 'and');

// Le pont manquant : selectedOptions ne poussait jamais rien vers l'instance tanstack — les
// puces de filtre changeaient l'URL mais getFilteredRowModel() lisait un columnFilters resté
// vide en permanence, donc le tableau affichait toujours tout. Un champ à `options` (select)
// passe le tableau de valeurs choisies tel quel (les filterFn `value.includes(...)` déjà
// écrites sur ces colonnes l'attendent sous cette forme) ; un champ texte libre passe une
// simple chaîne (filterFn par défaut de tanstack, substring insensible à la casse).
// `empty`/`not_empty` ne sont pas encore gérés ici — connu, pas un correctif silencieux.
watch(
  selectedOptions,
  (opts: DataTableFilterOption[]) => {
    const active = new Map<string, DataTableFilterOption>(opts.map((o) => [o.value, o]));
    for (const field of allOptions.value) {
      const column = table.getColumn(field.value);
      if (!column) continue;
      const sel = active.get(field.value);
      if (!sel || !sel.filterValues || sel.filterValues.length === 0) {
        column.setFilterValue(undefined);
      } else {
        column.setFilterValue(sel.options?.length ? sel.filterValues : sel.filterValues[0]);
      }
    }
  },
  { deep: true, immediate: true },
);

const singleFilters = computed(() => selectedOptions.value.filter((o) => !o.isMulti));
const multiFilters = computed(() => selectedOptions.value.filter((o) => o.isMulti));
const selectableOptions = computed(() =>
  allOptions.value.filter((o) => !selectedOptions.value.some((s) => s.value === o.value)),
);
const currentView = computed(() => props.views.find((v) => v.id === (route.query.viewId as string)) ?? null);
const currentFilterParams = computed(() =>
  calcFilterParams(selectedOptions.value, route.query as Record<string, string>),
);

// FIX: le bouton "Sauvegarder" ne s'affiche que si au moins un filtre a une valeur reelle
const hasActiveFilterValues = computed(() =>
  selectedOptions.value.some(
    (o) =>
      o.filterOperator === 'empty' || o.filterOperator === 'not_empty' || (o.filterValues && o.filterValues.length > 0),
  ),
);

// Colonnes masquables de CE tableau et celles actuellement visibles
const hideableColumns = computed(() => getHideableColumnIds(table));
const currentColumns = computed(() => hideableColumns.value.filter((id) => columnVisibility.value[id] !== false));

// Comparaison SÉMANTIQUE avec la vue active (ordre des clés, valeurs vides, ordre des filtres
// et colonnes inconnues sans effet) : « Réinitialiser » / « Mettre à jour » n'apparaissent
// qu'en cas de vraie différence.
const isUpdated = computed(() => {
  if (!currentView.value) return false;
  return (
    !filterParamsEqual(currentFilterParams.value, currentView.value.filterParams) ||
    !columnsEqual(currentView.value.columns, currentColumns.value, hideableColumns.value)
  );
});

// Échec de la mise à jour de la vue active (message renvoyé par `onUpdateView`, affiché tel quel)
const updateViewError = ref('');
watch(
  () => route.query.viewId,
  () => {
    updateViewError.value = '';
  },
);

// Affiche le separateur vertical seulement quand des actions de vue sont presentes
const showViewActions = computed(
  () => (isUpdated.value && !!currentView.value) || (hasActiveFilterValues.value && !currentView.value),
);

function buildFilterQuery(opts: DataTableFilterOption[], op: string): Record<string, any> {
  const q: Record<string, any> = { ...route.query };
  props.filterFields.forEach((f) => {
    delete q[f.value];
  });
  delete q.operator;
  q.page = 1;
  for (const opt of opts) {
    const isEmpty = opt.filterOperator === 'empty' || opt.filterOperator === 'not_empty';
    const hasValues = opt.filterValues && opt.filterValues.length > 0;
    if (!isEmpty && !hasValues) continue;
    const val = isEmpty ? '' : opt.options?.length ? opt.filterValues!.join('.') : (opt.filterValues![0] ?? '');
    const opStr = opt.filterOperator ? `~${opt.filterOperator}` : '';
    const multiStr = opt.isMulti ? '~multi' : '';
    q[opt.value] = `${val}${opStr}${multiStr}`;
  }
  if (opts.length > 0) q.operator = op;
  return q;
}

function pushFilters(opts: DataTableFilterOption[], op: string) {
  router.replace({ query: buildFilterQuery(opts, op) });
}

function addOption(opt: DataTableFilterOption) {
  addOpen.value = false;
  if (selectedOptions.value.some((o) => o.value === opt.value)) return;
  selectedOptions.value = [
    ...selectedOptions.value,
    {
      id: opt.value,
      label: opt.label,
      value: opt.value,
      options: opt.options ?? [],
      filterValues: [],
      filterOperator: opt.options?.length ? 'eq' : 'ilike',
      isMulti: false,
    },
  ];
  lastAddedId.value = null;
  nextTick(() => {
    lastAddedId.value = opt.value;
  });
}

function updateOption(opt: DataTableFilterOption) {
  selectedOptions.value = selectedOptions.value.map((o) => (o.id === opt.id ? opt : o));
  lastAddedId.value = null;
  pushFilters(selectedOptions.value, multiOperator.value);
}

function removeOption(opt: DataTableFilterOption) {
  selectedOptions.value = selectedOptions.value.filter((o) => o.id !== opt.id);
  lastAddedId.value = null;
  pushFilters(selectedOptions.value, multiOperator.value);
}

function updateOperator(op: string) {
  multiOperator.value = op;
  pushFilters(selectedOptions.value, op);
}

function onMultiUpdate(opts: DataTableFilterOption[]) {
  selectedOptions.value = opts;
  pushFilters(opts, multiOperator.value);
}

// Les colonnes suivent l'URL (`cols`, relu par DataTableColumnsVisibility) : remettre la query
// de la vue suffit à restaurer ses filtres ET ses colonnes.
function resetToCurrentView() {
  if (!currentView.value) return;
  router.replace({ path: route.path, query: calcViewSearchParams(currentView.value, hideableColumns.value) });
}

async function handleSaveView() {
  if (saving.value) return;
  if (!newViewName.value.trim()) {
    saveViewError.value = texts.value.dataTableViews.nameRequired;
    return;
  }
  saving.value = true;
  try {
    const res = await props.onCreateView({
      name: newViewName.value.trim(),
      columns: [...currentColumns.value],
      filterParams: currentFilterParams.value,
    });
    if (res?.status === 'error') {
      saveViewError.value = res.message ?? '';
      return;
    }
    if (res?.view?.id) router.replace({ query: { ...(route.query as any), viewId: res.view.id } });
    openSaveView.value = false;
    newViewName.value = '';
    saveViewError.value = '';
  } finally {
    saving.value = false;
  }
}

async function handleUpdateView() {
  if (!currentView.value || saving.value) return;
  saving.value = true;
  updateViewError.value = '';
  try {
    const res = await props.onUpdateView(currentView.value.id, {
      name: currentView.value.name,
      columns: [...currentColumns.value],
      filterParams: currentFilterParams.value,
    });
    if (res?.status === 'error') updateViewError.value = res.message ?? '';
  } finally {
    saving.value = false;
  }
}

// Sync URL -> state
watch(
  () => props.filterFields.map((f) => route.query[f.value]).join('|') + (route.query.operator ?? ''),
  () => {
    const built = buildFromQuery(route.query as Record<string, string>);
    if (JSON.stringify(built) !== JSON.stringify(selectedOptions.value)) {
      selectedOptions.value = built;
    }
    multiOperator.value = (route.query.operator as string) || 'and';
  },
);
</script>
