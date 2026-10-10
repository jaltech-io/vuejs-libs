<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia } from './empty';
import { cn } from './utils';

/**
 * État vide recommandé : icône facultative, phrase (« Aucun projet. ») et action facultative
 * (slot `action`). Construit sur les primitives `Empty*` (toujours exportées pour les cas à part).
 * Le chargement s'affiche avec `Skeleton`, pas avec ce composant.
 */
const props = defineProps<{
  /** Icône (composant, ex. `IconFolder` de `@tabler/icons-vue`). */
  icon?: Component;
  /** La phrase affichée, ex. « Aucun projet. ». */
  text?: string;
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <Empty data-slot="empty-state" :class="cn('gap-3 p-8 md:p-10', props.class)">
    <EmptyHeader>
      <EmptyMedia v-if="icon" variant="icon" class="mb-1 text-muted-foreground">
        <component :is="icon" />
      </EmptyMedia>
      <EmptyDescription v-if="text">{{ text }}</EmptyDescription>
      <!-- Contenu libre (rétrocompatibilité 0.5.x : message en slot par défaut). -->
      <div v-if="$slots.default" class="text-sm/relaxed text-muted-foreground">
        <slot />
      </div>
    </EmptyHeader>
    <EmptyContent v-if="$slots.action">
      <slot name="action" />
    </EmptyContent>
  </Empty>
</template>
