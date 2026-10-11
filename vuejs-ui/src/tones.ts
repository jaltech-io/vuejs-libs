/**
 * Tonalités de la lib : UNE palette (jetons `--h-*`) partagée par les pastilles de statut
 * (`StatusBadge`), les avatars à initiales (`InitialsAvatar`) et les cartes de KPI (`MetricCard`).
 * Purement visuelle : c'est l'application qui associe une valeur métier à une tonalité.
 */
export type Tone = 'gray' | 'blue' | 'green' | 'amber' | 'red' | 'purple';

export const TONES: readonly Tone[] = ['gray', 'blue', 'green', 'amber', 'red', 'purple'];

/** Pastille de texte (badge) : fond clair, texte foncé et lisible. */
export const badgeToneClasses: Record<Tone, string> = {
  gray: 'bg-(--h-surface2) text-(--h-text-2) border-[0.5px] border-(--h-border)',
  blue: 'bg-(--h-blue-50) text-(--h-blue-800)',
  green: 'bg-(--h-green-50) text-(--h-green-700)',
  amber: 'bg-(--h-amber-50) text-(--h-amber-700)',
  red: 'bg-(--h-red-50) text-(--h-red-700)',
  purple: 'bg-(--h-purple-50) text-(--h-purple-700)',
};

/** Pastille d'icône ou d'initiales (avatar, icône de KPI) : fond clair, icône vive. */
export const chipToneClasses: Record<Tone, string> = {
  gray: 'bg-(--h-surface2) text-(--h-text-2)',
  blue: 'bg-(--h-blue-50) text-(--h-blue-600)',
  green: 'bg-(--h-green-50) text-(--h-green-700)',
  amber: 'bg-(--h-amber-50) text-(--h-amber-700)',
  red: 'bg-(--h-red-50) text-(--h-red-700)',
  purple: 'bg-(--h-purple-50) text-(--h-purple-600)',
};
