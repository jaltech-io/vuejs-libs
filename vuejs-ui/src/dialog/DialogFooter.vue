<script setup lang="ts">
import { DialogClose } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { Button } from '../button';
import { cn } from '../utils';
import { useLibraryTexts } from '../texts';

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class'];
    showCloseButton?: boolean;
  }>(),
  {
    showCloseButton: false,
  },
);

const texts = useLibraryTexts();
</script>

<template>
  <div
    data-slot="dialog-footer"
    :class="cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', props.class)"
  >
    <slot />
    <DialogClose v-if="showCloseButton" as-child>
      <Button variant="outline">
        {{ texts.dialog.close }}
      </Button>
    </DialogClose>
  </div>
</template>
