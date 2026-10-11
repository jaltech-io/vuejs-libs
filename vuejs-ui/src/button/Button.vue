<script setup lang="ts">
import { IconLoader2 } from '@tabler/icons-vue';
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { computed } from 'vue';
import { cn } from '../utils';
import type { ButtonVariants } from '.';
import { buttonVariants } from '.';

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  class?: HTMLAttributes['class'];
  disabled?: boolean;
  /**
   * Action en cours : le bouton est désactivé (`aria-busy`) et un spinner remplace son icône
   * (ou précède son libellé s'il n'en a pas). Le libellé reste affiché.
   */
  pending?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
});

const inactive = computed(() => props.disabled || props.pending);
</script>

<template>
  <Primitive
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :data-pending="pending || undefined"
    :as="as"
    :as-child="asChild"
    :disabled="inactive || undefined"
    :aria-busy="pending || undefined"
    :class="cn(
      buttonVariants({ variant, size }),
      // Pendant l'action, l'icône du bouton cède la place au spinner.
      pending && '[&>svg:not([data-slot=button-spinner])]:hidden',
      props.class,
    )"
  >
    <IconLoader2 v-if="pending && !asChild" data-slot="button-spinner" class="animate-spin" aria-hidden="true" />
    <slot />
  </Primitive>
</template>
