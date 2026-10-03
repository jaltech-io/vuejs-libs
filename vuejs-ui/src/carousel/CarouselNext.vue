<script setup lang="ts">
import { ArrowRight } from '@lucide/vue';
import type { ButtonVariants } from '../button';
import { Button } from '../button';
import { cn } from '../utils';
import type { WithClassAsProps } from './interface';
import { useCarousel } from './useCarousel';
import { useLibraryTexts } from '../texts';

const props = withDefaults(
  defineProps<
    {
      variant?: ButtonVariants['variant'];
      size?: ButtonVariants['size'];
    } & WithClassAsProps
  >(),
  {
    variant: 'outline',
    size: 'icon',
  },
);

const { orientation, canScrollNext, scrollNext } = useCarousel();

const texts = useLibraryTexts();
</script>

<template>
  <Button
    data-slot="carousel-next"
    :disabled="!canScrollNext"
    :class="cn(
      'absolute size-8 rounded-full',
      orientation === 'horizontal'
        ? 'top-1/2 -right-12 -translate-y-1/2'
        : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
      props.class,
    )"
    :variant="variant"
    :size="size"
    @click="scrollNext"
  >
    <slot>
      <ArrowRight />
      <span class="sr-only">{{ texts.carousel.next }}</span>
    </slot>
  </Button>
</template>
