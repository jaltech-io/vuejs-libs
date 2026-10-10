import {
  type ExpandedState,
  getExpandedRowModel,
  type Row,
  type RowData,
  type Table,
  type TableOptions,
  type Updater,
} from '@tanstack/vue-table';
import { type Ref, ref } from 'vue';

declare module '@tanstack/vue-table' {
  // Paramètres de type identiques à la déclaration de TanStack (obligatoire pour fusionner).
  interface ColumnMeta<TData extends RowData, TValue> {
    /**
     * Colonne arborescente d'un tableau en arbre (`useDataTableTree`) : `DataTable` rend sa cellule
     * dans `DataTableTreeCell` — indentation par profondeur, lignes de liaison, bouton déplier/replier.
     */
    tree?: boolean;
  }
}

export interface DataTableTreeOptions<TData> {
  /** Enfants d'une ligne (ex. `(space) => space.children`), comme l'option TanStack du même nom. */
  getSubRows: (row: TData) => TData[] | undefined;
  /** Tout déplié au départ (lignes chargées plus tard comprises). Défaut : tout replié. */
  initiallyExpanded?: boolean;
  /** État déplié fourni par l'appelant (contrôlé). Défaut : un état interne, renvoyé par le composable. */
  expanded?: Ref<ExpandedState>;
}

/** Options à étaler dans `useVueTable` pour un tableau en arbre. */
export type DataTableTreeTableOptions<TData> = Pick<
  TableOptions<TData>,
  'getSubRows' | 'getExpandedRowModel' | 'onExpandedChange' | 'filterFromLeafRows' | 'paginateExpandedRows'
>;

export interface DataTableTree<TData> {
  /** État déplié : `true` (tout), ou `{ [rowId]: true }`. À brancher dans `state.expanded`. */
  expanded: Ref<ExpandedState>;
  /** À étaler dans les options de `useVueTable`. */
  tableOptions: DataTableTreeTableOptions<TData>;
}

/**
 * Mode arbre d'un DataTable : `getSubRows` branché sur `getExpandedRowModel`.
 * - filtres et recherche partent des feuilles (`filterFromLeafRows`) : un parent reste affiché si un
 *   de ses enfants correspond ;
 * - le tri s'applique à chaque niveau (TanStack trie les enfants sous leur parent) ;
 * - la pagination porte sur les lignes racines (`paginateExpandedRows: false`) : un parent et ses
 *   enfants dépliés restent sur la même page.
 *
 * ```ts
 * const tree = useDataTableTree({ getSubRows: (space) => space.children, initiallyExpanded: true });
 * const table = useVueTable({ ...tree.tableOptions, state: { get expanded() { return tree.expanded.value } }, … });
 * ```
 */
export function useDataTableTree<TData>(options: DataTableTreeOptions<TData>): DataTableTree<TData> {
  const expanded = options.expanded ?? ref<ExpandedState>(options.initiallyExpanded ? true : {});
  return {
    expanded,
    tableOptions: {
      getSubRows: options.getSubRows,
      getExpandedRowModel: getExpandedRowModel(),
      onExpandedChange: (updater: Updater<ExpandedState>) => {
        expanded.value = typeof updater === 'function' ? updater(expanded.value) : updater;
      },
      filterFromLeafRows: true,
      paginateExpandedRows: false,
    },
  };
}

/** Le tableau est en mode arbre (`getSubRows` fourni). */
export function isTreeTable(table: Table<any>): boolean {
  return typeof table.options.getSubRows === 'function';
}

/** Dernier enfant affiché de son parent (après filtre et tri) ; une ligne racine l'est toujours. */
export function isLastSiblingRow(row: Row<any>): boolean {
  const parent = row.getParentRow();
  if (!parent) return true;
  const siblings = parent.subRows;
  return siblings[siblings.length - 1]?.id === row.id;
}
