<script setup lang="ts">
import { Loader2Icon } from '@lucide/vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '../utils';
import { useLibraryTexts } from '../texts';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();

const texts = useLibraryTexts();
</script>

<template>
  <Loader2Icon
    role="status"
    :aria-label="texts.spinner.label"
    :class="cn('size-4 animate-spin', props.class)"
  />
</template>
