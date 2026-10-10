<script setup lang="ts">
import { IconDots } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import type { PaginationEllipsisProps } from 'reka-ui';
import { PaginationEllipsis } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '../utils';
import { useLibraryTexts } from '../texts';

const props = defineProps<PaginationEllipsisProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');

const texts = useLibraryTexts();
</script>

<template>
  <PaginationEllipsis
    data-slot="pagination-ellipsis"
    v-bind="delegatedProps"
    :class="cn('flex size-9 items-center justify-center', props.class)"
  >
    <slot>
      <IconDots class="size-4" />
      <span class="sr-only">{{ texts.pagination.morePages }}</span>
    </slot>
  </PaginationEllipsis>
</template>
