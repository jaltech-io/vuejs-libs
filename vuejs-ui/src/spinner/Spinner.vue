<script setup lang="ts">
import { IconLoader2 } from '@tabler/icons-vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '../utils';
import { useLibraryTexts } from '../texts';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();

const texts = useLibraryTexts();
</script>

<template>
  <IconLoader2
    role="status"
    :aria-label="texts.spinner.label"
    :class="cn('size-4 animate-spin', props.class)"
  />
</template>
