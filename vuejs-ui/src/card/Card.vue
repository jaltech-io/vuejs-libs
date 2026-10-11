<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <div
    data-slot="card"
    :class="
      cn(
        'bg-card text-card-foreground flex min-w-0 flex-col gap-6 rounded-xl border py-6 shadow-xs wrap-anywhere',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
