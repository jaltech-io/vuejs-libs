<template>
  <StatusBadge :variant="variant"><slot /></StatusBadge>
</template>

<script setup lang="ts">
/**
 * @deprecated Utiliser `StatusBadge` (`@jaltech/vuejs-ui/status-badge`) : même rendu, mêmes
 * variantes, plus la prop `label` et l'option `dot`. Conservé pour compatibilité.
 */
import StatusBadge from './status-badge/StatusBadge.vue';
import type { Tone } from './tones';

withDefaults(defineProps<{ variant?: Tone }>(), { variant: 'gray' });
</script>
