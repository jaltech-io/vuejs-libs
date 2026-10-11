<script setup lang="ts">
// Liste de squelettes : `count` lignes identiques, pour un chargement de liste, de cartes ou de champs.
import type { HTMLAttributes } from 'vue';
import { cn } from '../utils';
import Skeleton from './Skeleton.vue';

const props = withDefaults(
  defineProps<{
    /** Nombre de lignes. Défaut : 3. */
    count?: number;
    /** Classes de chaque ligne (hauteur, largeur, arrondi). Défaut : `h-10 w-full`. */
    itemClass?: HTMLAttributes['class'];
    /** Classes du conteneur (espacement, grille…). Défaut : colonne espacée de `gap-2`. */
    class?: HTMLAttributes['class'];
  }>(),
  { count: 3 },
);
</script>

<template>
  <div data-slot="skeleton-list" aria-hidden="true" :class="cn('flex flex-col gap-2', props.class)">
    <Skeleton v-for="index in props.count" :key="index" :class="cn('h-10 w-full', props.itemClass)" />
  </div>
</template>
