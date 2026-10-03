<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { useLibraryTexts } from '../texts';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();

const texts = useLibraryTexts();
</script>

<template>
  <nav
    :aria-label="texts.breadcrumb.label"
    data-slot="breadcrumb"
    :class="props.class"
  >
    <slot />
  </nav>
</template>
