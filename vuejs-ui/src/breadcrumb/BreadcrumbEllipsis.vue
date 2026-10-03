<script lang="ts" setup>
import { MoreHorizontal } from '@lucide/vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '../utils';
import { useLibraryTexts } from '../texts';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();

const texts = useLibraryTexts();
</script>

<template>
  <span
    data-slot="breadcrumb-ellipsis"
    role="presentation"
    aria-hidden="true"
    :class="cn('flex size-9 items-center justify-center', props.class)"
  >
    <slot>
      <MoreHorizontal class="size-4" />
    </slot>
    <span class="sr-only">{{ texts.breadcrumb.more }}</span>
  </span>
</template>
