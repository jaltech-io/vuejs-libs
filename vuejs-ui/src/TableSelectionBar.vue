<script setup lang="ts">
import { IconX } from '@tabler/icons-vue';
import { computed } from 'vue';
import { Button } from './button';
import { useLibraryTexts } from './texts';

const props = defineProps<{
  selectedCount: number;
  /** Mot après le nombre (singulier ; aussi pluriel si `pluralLabel` absent). Défaut : textes de la lib. */
  label?: string;
  pluralLabel?: string;
}>();

const emit = defineEmits<(e: 'clear') => void>();

const texts = useLibraryTexts();

const countLabel = computed(() => {
  const word = props.selectedCount > 1 ? (props.pluralLabel ?? props.label) : props.label;
  return word ? `${props.selectedCount} ${word}` : texts.value.selectionBar.selectedCount(props.selectedCount);
});
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-150 ease-out" enter-from-class="translate-x-1.5 opacity-0"
    leave-active-class="transition-all duration-150 ease-out" leave-to-class="translate-x-1.5 opacity-0"
  >
    <div v-if="selectedCount > 0" class="flex items-center gap-1.5">
      <span class="h-4 w-px bg-border" />
      <div class="flex h-7 items-center gap-1 rounded-md border border-dashed px-2 text-xs tabular-nums text-muted-foreground">
        {{ countLabel }}
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          class="ml-1 size-4"
          :aria-label="texts.selectionBar.clearSelection"
          @click="emit('clear')"
        >
          <IconX />
        </Button>
      </div>
      <slot />
    </div>
  </Transition>
</template>
