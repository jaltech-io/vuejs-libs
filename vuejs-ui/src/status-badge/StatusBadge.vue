<script setup lang="ts">
// Pastille de statut GÉNÉRIQUE : la couleur vient d'une variante (tonalité), le libellé de
// l'application. Aucune valeur métier ici — l'application associe chaque valeur à une variante.
import type { HTMLAttributes } from 'vue';
import { badgeToneClasses, type Tone } from '../tones';
import { cn } from '../utils';

const props = withDefaults(
  defineProps<{
    /** Tonalité de la pastille. Défaut : `gray`. */
    variant?: Tone;
    /** Libellé ; le slot par défaut le remplace. */
    label?: string | number;
    /** Point de couleur avant le libellé. */
    dot?: boolean;
    class?: HTMLAttributes['class'];
  }>(),
  { variant: 'gray' },
);
</script>

<template>
  <span
    data-slot="status-badge"
    :data-variant="props.variant"
    :class="cn(
      'inline-flex w-fit shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-[9px] py-[3px] text-2xs font-medium',
      badgeToneClasses[props.variant],
      props.class,
    )"
  >
    <span v-if="dot" class="size-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
    <slot>{{ label }}</slot>
  </span>
</template>
