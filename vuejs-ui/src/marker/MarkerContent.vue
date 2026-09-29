<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../utils';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
</script>

<template>
  <span
    data-slot="marker-content"
    :class="cn('group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center hover:[a]:*:text-foreground [a]:*:underline [a]:*:underline-offset-3 min-w-0 wrap-break-word', props.class)"
  >
    <slot />
  </span>
</template>
