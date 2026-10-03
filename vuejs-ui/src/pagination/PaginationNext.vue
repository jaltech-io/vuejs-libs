<script setup lang="ts">
import { ChevronRightIcon } from '@lucide/vue';
import { reactiveOmit } from '@vueuse/core';
import type { PaginationNextProps } from 'reka-ui';
import { PaginationNext, useForwardProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import type { ButtonVariants } from '../button';
import { buttonVariants } from '../button';
import { cn } from '../utils';
import { useLibraryTexts } from '../texts';

const props = withDefaults(
  defineProps<
    PaginationNextProps & {
      size?: ButtonVariants['size'];
      class?: HTMLAttributes['class'];
    }
  >(),
  {
    size: 'default',
  },
);

const delegatedProps = reactiveOmit(props, 'class', 'size');
const forwarded = useForwardProps(delegatedProps);

const texts = useLibraryTexts();
</script>

<template>
  <PaginationNext
    data-slot="pagination-next"
    :class="cn(buttonVariants({ variant: 'ghost', size }), 'gap-1 px-2.5 sm:pr-2.5', props.class)"
    v-bind="forwarded"
  >
    <slot>
      <span class="hidden sm:block">{{ texts.pagination.next }}</span>
      <ChevronRightIcon />
    </slot>
  </PaginationNext>
</template>
