import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingState,
  type Table,
  type Updater,
  useVueTable,
  type VisibilityState,
} from '@tanstack/vue-table';
import { useEventListener } from '@vueuse/core';
import { type ComputedRef, computed, type MaybeRefOrGetter, type Ref, ref, toValue } from 'vue';
import { provideTableInstance } from '../composables/useTableInstance';
import { type DataTableTree, type DataTableTreeOptions, useDataTableTree } from './tree';

export interface ClientDataTableOptions<TData> {
  /** Lignes (ref, getter ou tableau) : la table suit leurs changements. */
  data: MaybeRefOrGetter<TData[]>;
  /** Colonnes (tableau, ref ou getter). */
  columns: MaybeRefOrGetter<ColumnDef<TData, any>[]>;
  /** Tri au départ (ex. `[{ id: 'createdAt', desc: true }]`). Défaut : aucun. */
  initialSorting?: SortingState;
  /** Id stable d'une ligne (sélection conservée au rechargement des données). Défaut : index TanStack. */
  getRowId?: (row: TData, index: number, parent?: Row<TData>) => string;
  /** Mode arbre : le résultat de `useDataTableTree`, ou directement ses options. */
  tree?: DataTableTree<TData> | DataTableTreeOptions<TData>;
  /** Lignes par page. Défaut : 20. */
  pageSize?: number;
  /** Sélection de lignes. Défaut : `true` (toutes sélectionnables). */
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  /** Échap vide la sélection. Défaut : `true`. */
  clearSelectionOnEscape?: boolean;
  /**
   * Partage la table avec les composants du tableau (barre d'outils, vues, colonnes) via
   * `provideTableInstance`. Défaut : `true` (appel dans un `setup`).
   */
  provide?: boolean;
}

export interface ClientDataTable<TData> {
  table: Table<TData>;
  columnFilters: Ref<ColumnFiltersState>;
  sorting: Ref<SortingState>;
  columnVisibility: Ref<VisibilityState>;
  rowSelection: Ref<RowSelectionState>;
  pagination: Ref<PaginationState>;
  /** État déplié (mode arbre uniquement). */
  expanded: DataTableTree<TData>['expanded'] | undefined;
  /** Lignes sélectionnées (données d'origine), après filtres. */
  selectedRows: ComputedRef<TData[]>;
  selectedCount: ComputedRef<number>;
  clearSelection: () => void;
}

function isTree<TData>(tree: DataTableTree<TData> | DataTableTreeOptions<TData>): tree is DataTableTree<TData> {
  return 'tableOptions' in tree;
}

/**
 * Table TanStack « côté client » (filtres, tri, pagination et sélection en mémoire) prête pour
 * `DataTable`, `DataTableAdvancedToolbar`, `ViewsSidebar` et `SavedViewsDataTable` : état complet,
 * row models (dont facettes), partage par `provideTableInstance`, Échap pour vider la sélection.
 *
 * ```ts
 * const { table, selectedRows } = useClientDataTable({ data: labels, columns, getRowId: (label) => label.id });
 * ```
 */
export function useClientDataTable<TData>(options: ClientDataTableOptions<TData>): ClientDataTable<TData> {
  const columnFilters = ref<ColumnFiltersState>([]);
  const sorting = ref<SortingState>(options.initialSorting ? [...options.initialSorting] : []);
  const columnVisibility = ref<VisibilityState>({});
  const rowSelection = ref<RowSelectionState>({});
  const pagination = ref<PaginationState>({ pageIndex: 0, pageSize: options.pageSize ?? 20 });

  const tree = options.tree ? (isTree(options.tree) ? options.tree : useDataTableTree(options.tree)) : undefined;

  const apply =
    <TState>(state: Ref<TState>) =>
    (updater: Updater<TState>) => {
      state.value = typeof updater === 'function' ? (updater as (old: TState) => TState)(state.value) : updater;
    };

  const table = useVueTable<TData>({
    ...(tree?.tableOptions ?? {}),
    get data() {
      return toValue(options.data);
    },
    get columns() {
      return toValue(options.columns);
    },
    ...(options.getRowId ? { getRowId: options.getRowId } : {}),
    state: {
      get columnFilters() {
        return columnFilters.value;
      },
      get sorting() {
        return sorting.value;
      },
      get columnVisibility() {
        return columnVisibility.value;
      },
      get rowSelection() {
        return rowSelection.value;
      },
      get pagination() {
        return pagination.value;
      },
      // Sans arbre, `undefined` laisse TanStack sur son état interne (getter : réactivité conservée).
      get expanded() {
        return tree?.expanded.value;
      },
    },
    enableRowSelection: options.enableRowSelection ?? true,
    onColumnFiltersChange: apply(columnFilters),
    onSortingChange: apply(sorting),
    onColumnVisibilityChange: apply(columnVisibility),
    onRowSelectionChange: apply(rowSelection),
    onPaginationChange: apply(pagination),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  if (options.provide !== false) provideTableInstance(table, columnVisibility);

  const clearSelection = () => table.toggleAllRowsSelected(false);

  if (options.clearSelectionOnEscape !== false && typeof window !== 'undefined') {
    useEventListener(window, 'keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') clearSelection();
    });
  }

  const selectedRows = computed(() => table.getFilteredSelectedRowModel().rows.map((row) => row.original));
  const selectedCount = computed(() => selectedRows.value.length);

  return {
    table,
    columnFilters,
    sorting,
    columnVisibility,
    rowSelection,
    pagination,
    expanded: tree?.expanded,
    selectedRows,
    selectedCount,
    clearSelection,
  };
}
