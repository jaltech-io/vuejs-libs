import { h, type VNode } from 'vue';
import RowActions from './RowActions.vue';
import type { RowAction } from './types';

export { RowActions };
export type { RowAction } from './types';

export interface RowActionsCellOptions {
  /** Nombre maximal d'éléments affichés (icônes + « ⋯ »). Défaut : 3. */
  max?: number;
  /** Nom du déclencheur « ⋯ ». Défaut : textes de la lib. */
  moreLabel?: string;
}

/**
 * Rendu des actions d'une ligne dans une définition de colonne TanStack :
 * `cell: ({ row }) => rowActionsCell([...])`.
 */
export function rowActionsCell(actions: RowAction[], options: RowActionsCellOptions = {}): VNode {
  return h(RowActions, { actions, ...options });
}
