import type { ColumnDef, FilterFn, HeaderContext } from '@tanstack/vue-table';
import { h, type MaybeRefOrGetter, toValue, type VNode } from 'vue';
import { rowActionsCell } from '../row-actions';
import type { RowAction } from '../row-actions/types';
import { injectLibraryTexts, resolveLibraryTexts } from '../texts';
import DataTableColumnHeader from './DataTableColumnHeader.vue';

/** Textes lus AU RENDU : ils suivent la langue courante fournie par `installLibraryTexts`. */
const currentTexts = () => resolveLibraryTexts(toValue(injectLibraryTexts())).dataTable;

/**
 * En-tête triable d'une colonne : `header: sortableHeader('Nom')`. Le titre peut être une
 * fonction (`() => t('…')`) : il est lu au rendu et suit la langue courante.
 */
export function sortableHeader<TData, TValue = unknown>(
  title: MaybeRefOrGetter<string>,
): (context: HeaderContext<TData, TValue>) => VNode {
  return ({ column }) => h(DataTableColumnHeader, { column, title: toValue(title) });
}

export interface ActionsColumnOptions {
  /** Libellé de l'en-tête. Défaut : textes de la lib (`dataTable.actions`). Fonction = lu au rendu. */
  header?: MaybeRefOrGetter<string>;
  /** Nombre maximal d'éléments affichés (icônes + « ⋯ »), comme `RowActions`. Défaut : 3. */
  max?: number;
  /** Largeur de la colonne (px). */
  size?: number;
}

/**
 * Colonne d'actions d'une ligne : en-tête aligné à droite, cellule `RowActions`, ni tri ni masquage.
 *
 * ```ts
 * createActionsColumn<Label>((label) => [
 *   { key: 'edit', label: t('…'), icon: IconPencil, onClick: () => openEdit(label) },
 *   { key: 'delete', label: t('…'), icon: IconTrash, danger: true, onClick: () => remove(label) },
 * ])
 * ```
 */
export function createActionsColumn<TData>(
  actionsOf: (row: TData) => RowAction[],
  options: ActionsColumnOptions = {},
): ColumnDef<TData> {
  return {
    id: 'actions',
    header: () =>
      h('div', { class: 'pr-1 text-right' }, options.header !== undefined ? toValue(options.header) : currentTexts().actions),
    cell: ({ row }) => rowActionsCell(actionsOf(row.original), options.max ? { max: options.max } : {}),
    enableSorting: false,
    enableHiding: false,
    ...(options.size ? { size: options.size } : {}),
  };
}

/**
 * Filtre de colonne « à options » : la valeur de la ligne est l'UNE des valeurs choisies.
 * `filterFn: oneOf` sur une colonne dont le champ de filtre a des `options` (barre d'outils avancée).
 * Une liste vide (ou absente) ne filtre rien.
 */
export const oneOf: FilterFn<any> = (row, columnId, filterValue: unknown) => {
  const values = Array.isArray(filterValue) ? filterValue : filterValue == null ? [] : [filterValue];
  if (values.length === 0) return true;
  return values.map(String).includes(String(row.getValue(columnId)));
};
oneOf.autoRemove = (value: unknown) => value == null || (Array.isArray(value) && value.length === 0);
