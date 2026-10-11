<template>
  <div data-slot="saved-views-data-table" class="max-md:flex max-md:flex-col max-md:gap-3">
    <template v-if="showSkeleton">
      <div class="mb-4 flex items-center gap-2.5 max-md:flex-wrap">
        <Skeleton class="h-10 w-64" />
        <Skeleton class="h-9 w-28" />
      </div>
      <div :class="cardClass">
        <DataTableSkeleton :row-count="skeletonRows" :column-count="columns.length" />
      </div>
    </template>

    <template v-else>
      <DataTableAdvancedToolbar
        class="max-md:order-2"
        :filter-fields="filterFields"
        :views="views"
        :on-create-view="createView"
        :on-update-view="updateView"
        :on-delete-view="deleteView"
        :default-label="defaultLabel"
        hide-views-dropdown
      >
        <div class="flex items-center gap-1.5">
          <slot name="create" />
          <slot name="actions" />
          <HTooltip v-if="exportable" placement="top-end" :text="texts.dataTable.exportCsv">
            <Button variant="hicon" size="hicon" :aria-label="texts.dataTable.exportCsv" @click="exportAll">
              <IconDownload />
            </Button>
          </HTooltip>
        </div>
        <template #selection>
          <TableSelectionBar
            :selected-count="selectedRows.length"
            :label="selectionLabel"
            :plural-label="selectionPluralLabel"
            @clear="clearSelection"
          >
            <TableSelectionBarButton v-if="exportable" :title="texts.dataTable.exportSelection" @click="exportSelected">
              <IconDownload />
            </TableSelectionBarButton>
            <slot name="selection-actions" :rows="selectedRows" :count="selectedRows.length" :clear="clearSelection" />
          </TableSelectionBar>
        </template>
      </DataTableAdvancedToolbar>

      <!-- Vues et tableau démarrent au même niveau sous la barre d'outils ; sur mobile, empilés
           (vues, barre d'outils, tableau). -->
      <div class="mt-2 flex items-start gap-4 max-md:contents">
        <ViewsSidebar
          class="max-md:order-1"
          :views="views"
          :default-label="defaultLabel"
          :on-update-view="updateView"
          :on-delete-view="deleteView"
          @create="viewModalOpen = true"
        />

        <div :class="[cardClass, 'w-full min-w-0 flex-1 max-md:order-3']">
          <DataTable :table="table" :columns="columns" />
          <div class="shrink-0 border-t-[0.5px] border-t-(--h-border) bg-(--h-surface2) px-2.5 py-[3px]">
            <DataTablePagination :table="table" />
          </div>
        </div>
      </div>
    </template>

    <ViewFormModal
      v-model:open="viewModalOpen"
      mode="create"
      :filter-fields="filterFields"
      :on-create-view="createView"
      :on-update-view="updateView"
      :on-delete-view="deleteView"
    />
  </div>
</template>

<script setup lang="ts" generic="TData">
// « Coque » d'un tableau avec vues enregistrées : squelette de chargement, barre d'outils avancée
// (filtres, création, export CSV, barre de sélection), panneau des vues, tableau, pagination et
// modale de création de vue. La table vient de l'appelant (`useClientDataTable`), les vues de ses
// callbacks (`viewsSource`) : la lib n'appelle aucune API et ne connaît aucun écran.
import { IconDownload } from '@tabler/icons-vue';
import type { ColumnDef, Table } from '@tanstack/vue-table';
import { computed, ref, watch } from 'vue';
import { Button } from '../../button';
import HTooltip from '../../HTooltip.vue';
import { Skeleton } from '../../skeleton';
import TableSelectionBar from '../../TableSelectionBar.vue';
import TableSelectionBarButton from '../../TableSelectionBarButton.vue';
import { useLibraryTexts } from '../../texts';
import type { DataTableFilterField, SavedViewsSource, ViewItem, ViewPayload } from '../../types';
import { exportTableToCsv } from '../csv';
import DataTable from '../DataTable.vue';
import DataTablePagination from '../DataTablePagination.vue';
import DataTableSkeleton from '../DataTableSkeleton.vue';
import DataTableAdvancedToolbar from './DataTableAdvancedToolbar.vue';
import ViewFormModal from './views/ViewFormModal.vue';
import ViewsSidebar from './views/ViewsSidebar.vue';

const props = withDefaults(
  defineProps<{
    table: Table<TData>;
    columns: ColumnDef<TData, any>[];
    /** Champs filtrables de la barre d'outils (`value` = id de colonne). */
    filterFields: DataTableFilterField[];
    /** Vues enregistrées de l'appelant ; `null` tant qu'elles ne peuvent pas être chargées. */
    viewsSource: SavedViewsSource | null;
    /** Libellé de la vue « toutes les lignes ». Défaut : textes de la lib. */
    defaultLabel?: string;
    /** Chargement : squelette tant qu'aucune ligne n'est encore affichée (un rechargement ne clignote pas). */
    loading?: boolean;
    /** Lignes du squelette. Défaut : 8. */
    skeletonRows?: number;
    /** Bouton d'export CSV (toutes les lignes filtrées) et export de la sélection. Défaut : `true`. */
    exportable?: boolean;
    /** Nom du fichier CSV, sans extension. Défaut : `export`. */
    exportFilename?: string;
    /** Colonnes exclues de l'export. Défaut : `select` et `actions`. */
    exportExcludeColumns?: string[];
    /** Mot après le nombre de lignes sélectionnées (voir `TableSelectionBar`). */
    selectionLabel?: string;
    selectionPluralLabel?: string;
  }>(),
  { loading: false, skeletonRows: 8, exportable: true, exportFilename: 'export' },
);

defineSlots<{
  /** Bouton de création (« Nouveau … »), en tête des actions de la barre d'outils. */
  create?(): unknown;
  /** Autres boutons de la barre d'outils, avant l'export. */
  actions?(): unknown;
  /** Actions sur la sélection (barre de sélection), après l'export de la sélection. */
  'selection-actions'?(props: { rows: TData[]; count: number; clear: () => void }): unknown;
}>();

const texts = useLibraryTexts();

// Carte du tableau (et de son squelette) : jetons --h-*, hauteur bornée par `--h-table-max-height`
// au-delà du mobile (en-tête collant, défilement interne) ; sans la variable, pas de borne.
const cardClass =
  'flex flex-col overflow-hidden rounded-(--h-radius-lg) border-[0.5px] border-(--h-border) bg-(--h-surface) shadow-[0_1px_3px_rgba(0,0,0,0.07),0_4px_14px_rgba(0,0,0,0.05)] max-md:overflow-x-auto md:max-h-(--h-table-max-height)';

const showSkeleton = computed(() => props.loading && props.table.getCoreRowModel().rows.length === 0);

// ── Vues enregistrées : chargées par `viewsSource.list`, rechargées après chaque action. ──
const views = ref<ViewItem[]>([]);
const viewModalOpen = ref(false);

async function refreshViews() {
  const source = props.viewsSource;
  if (!source) return;
  try {
    views.value = await source.list();
  } catch {
    // `list` signale lui-même l'échec ; la dernière liste reste affichée.
  }
}
watch(() => props.viewsSource, refreshViews, { immediate: true });

// Contrat des composants de vues : résoudre APRÈS avoir rafraîchi `views`.
async function afterRefresh<TResult>(action: () => Promise<TResult>): Promise<TResult> {
  try {
    return await action();
  } finally {
    await refreshViews();
  }
}
const noSource = () => Promise.resolve(undefined);
const createView = (payload: ViewPayload) =>
  props.viewsSource ? afterRefresh(() => props.viewsSource!.create(payload)) : noSource();
const updateView = (id: string, payload: ViewPayload) =>
  props.viewsSource ? afterRefresh(() => props.viewsSource!.update(id, payload)) : noSource();
const deleteView = (id: string) => (props.viewsSource ? afterRefresh(() => props.viewsSource!.delete(id)) : noSource());

// ── Sélection et export ──
const selectedRows = computed(() => props.table.getFilteredSelectedRowModel().rows.map((row) => row.original));
const clearSelection = () => props.table.toggleAllRowsSelected(false);

function exportAll() {
  exportTableToCsv(props.table, { filename: props.exportFilename, excludeColumns: props.exportExcludeColumns });
}
function exportSelected() {
  exportTableToCsv(props.table, {
    filename: props.exportFilename,
    excludeColumns: props.exportExcludeColumns,
    onlySelected: true,
  });
}

defineExpose({ refreshViews });
</script>
