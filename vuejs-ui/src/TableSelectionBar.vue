<script setup lang="ts">
import { IconX } from '@tabler/icons-vue';
import { Button } from './button';

defineProps<{
  selectedCount: number;
  label?: string;
  pluralLabel?: string;
}>();

const emit = defineEmits<(e: 'clear') => void>();
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-150 ease-out" enter-from-class="translate-x-1.5 opacity-0"
    leave-active-class="transition-all duration-150 ease-out" leave-to-class="translate-x-1.5 opacity-0"
  >
    <div v-if="selectedCount > 0" class="flex items-center gap-1.5">
      <span class="h-4 w-px bg-border" />
      <div class="flex h-7 items-center gap-1 rounded-md border border-dashed px-2 text-xs text-muted-foreground">
        {{ selectedCount }} {{ selectedCount > 1 ? (pluralLabel ?? label ?? 'sélectionnés') : (label ?? 'sélectionné') }}
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          class="ml-1 size-4"
          aria-label="Effacer la sélection"
          @click="emit('clear')"
        >
          <IconX />
        </Button>
      </div>
      <slot />
    </div>
  </Transition>
</template>
