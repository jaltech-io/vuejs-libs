<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <div
    data-slot="card-header"
    :class="cn('@container/card-header grid min-w-0 auto-rows-min grid-cols-[minmax(0,1fr)] grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[minmax(0,1fr)_auto] [.border-b]:pb-6', props.class)"
  >
    <slot />
  </div>
</template>
