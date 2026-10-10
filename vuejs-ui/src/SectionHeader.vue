<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { Badge } from './badge';
import { cn } from './utils';

/**
 * En-tête de section : UN style de titre, compteur facultatif, action principale à droite
 * (slot `actions`, ex. le bouton « Nouveau … »).
 */
const props = withDefaults(
  defineProps<{
    title: string;
    /** Nombre d'éléments, affiché en badge à côté du titre. */
    count?: number;
    /** Niveau de titre. Défaut : `h2`. */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    class?: HTMLAttributes['class'];
  }>(),
  { count: undefined, as: 'h2', class: undefined },
);
</script>

<template>
  <div data-slot="section-header" :class="cn('flex min-h-8 items-center justify-between gap-3', props.class)">
    <div class="flex min-w-0 items-center gap-2">
      <component :is="as" class="truncate text-base font-semibold text-foreground">{{ title }}</component>
      <Badge v-if="count !== undefined" variant="secondary" class="tabular-nums">{{ count }}</Badge>
    </div>
    <div v-if="$slots.actions" class="flex shrink-0 items-center gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>
