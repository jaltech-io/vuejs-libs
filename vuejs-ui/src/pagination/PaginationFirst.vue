<script setup lang="ts">
import { IconChevronLeft } from '@tabler/icons-vue';
import { reactiveOmit } from '@vueuse/core';
import type { PaginationFirstProps } from 'reka-ui';
import { PaginationFirst, useForwardProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import type { ButtonVariants } from '../button';
import { buttonVariants } from '../button';
import { cn } from '../utils';
import { useLibraryTexts } from '../texts';

const props = withDefaults(
  defineProps<
    PaginationFirstProps & {
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
  <PaginationFirst
    data-slot="pagination-first"
    :class="cn(buttonVariants({ variant: 'ghost', size }), 'gap-1 px-2.5 sm:pr-2.5', props.class)"
    v-bind="forwarded"
  >
    <slot>
      <IconChevronLeft />
      <span class="hidden sm:block">{{ texts.pagination.first }}</span>
    </slot>
  </PaginationFirst>
</template>
