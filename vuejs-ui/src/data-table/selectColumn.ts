import type { ColumnDef } from '@tanstack/vue-table';
import { h, toValue } from 'vue';
import { Checkbox } from '../checkbox';
import { injectLibraryTexts, resolveLibraryTexts } from '../texts';

export interface SelectColumnOptions {
  /** Nom accessible de la case d'en-tête. Défaut : textes de la lib (« Tout sélectionner »). */
  selectAllLabel?: string;
  /** Nom accessible de la case d'une ligne. Défaut : textes de la lib (« Sélectionner la ligne »). */
  selectRowLabel?: string;
}

/** Textes lus AU RENDU : ils suivent la langue courante fournie par `installLibraryTexts`. */
const currentTexts = () => resolveLibraryTexts(toValue(injectLibraryTexts())).dataTable;

/**
 * Colonne de sélection d'un DataTable : cases à cocher de la lib (clavier, nom accessible,
 * état intermédiaire), à mettre en tête des colonnes au lieu de cases faites main.
 */
export function createSelectColumn<TData>(options: SelectColumnOptions = {}): ColumnDef<TData> {
  return {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        modelValue: table.getIsAllPageRowsSelected()
          ? true
          : table.getIsSomePageRowsSelected()
            ? 'indeterminate'
            : false,
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(value === true),
        'aria-label': options.selectAllLabel ?? currentTexts().selectAll,
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(value === true),
        onClick: (event: Event) => event.stopPropagation(),
        'aria-label': options.selectRowLabel ?? currentTexts().selectRow,
      }),
    enableSorting: false,
    enableHiding: false,
    size: 36,
  };
}
