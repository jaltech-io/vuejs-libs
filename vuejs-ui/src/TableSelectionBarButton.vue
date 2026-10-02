<script setup lang="ts">
import { IconLoader2 } from '@tabler/icons-vue';
import { Button } from './button';
import HTooltip from './HTooltip.vue';
import { cn } from './utils';

/** Bouton icône d'une barre de sélection de tableau ; `title` sert d'infobulle et de nom accessible. */
const props = defineProps<{
  title: string;
  pending?: boolean;
  disabled?: boolean;
  destructive?: boolean;
  /** Action favorable (valider, approuver) : icône verte. */
  success?: boolean;
}>();

defineEmits<(e: 'click') => void>();
</script>

<template>
  <HTooltip placement="top-end" :text="props.title">
    <Button
      type="button"
      variant="hicon"
      size="hicon"
      :aria-label="props.title"
      :disabled="props.disabled || props.pending"
      :class="
        cn(
          props.destructive && 'text-destructive hover:text-destructive',
          props.success && 'text-(--h-green-700) hover:text-(--h-green-700)',
        )
      "
      @click="$emit('click')"
    >
      <IconLoader2 v-if="props.pending" class="animate-spin" />
      <slot v-else />
    </Button>
  </HTooltip>
</template>
