import { h, type VNode } from 'vue';
import type { Tone } from '../tones';
import StatusBadge from './StatusBadge.vue';

export { StatusBadge };
export type { Tone as StatusVariant } from '../tones';

/**
 * Cellule « statut » d'une colonne TanStack :
 * `cell: ({ row }) => statusBadgeCell(STATUS[row.original.status].variant, STATUS[row.original.status].label)`.
 */
export function statusBadgeCell(variant: Tone, label: string | number, options: { dot?: boolean } = {}): VNode {
  return h(StatusBadge, { variant, label, dot: options.dot });
}
