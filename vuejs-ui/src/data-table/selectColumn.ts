import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';
import { Checkbox } from '../checkbox';

/**
 * Colonne de sélection d'un DataTable : cases à cocher de la lib (clavier, nom accessible,
 * état intermédiaire), à mettre en tête des colonnes au lieu de cases faites main.
 */
export function createSelectColumn<TData>(): ColumnDef<TData> {
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
        'aria-label': 'Tout sélectionner',
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(value === true),
        onClick: (event: Event) => event.stopPropagation(),
        'aria-label': 'Sélectionner la ligne',
      }),
    enableSorting: false,
    enableHiding: false,
    size: 36,
  };
}
