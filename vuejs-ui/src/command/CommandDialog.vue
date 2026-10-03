<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from 'reka-ui';
import { useForwardPropsEmits } from 'reka-ui';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../dialog';
import Command from './Command.vue';
import { useLibraryTexts } from '../texts';

const props = defineProps<
  DialogRootProps & {
    title?: string;
    description?: string;
  }
>();
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

const texts = useLibraryTexts();
</script>

<template>
  <Dialog v-slot="slotProps" v-bind="forwarded">
    <DialogContent class="overflow-hidden p-0 ">
      <DialogHeader class="sr-only">
        <DialogTitle>{{ title ?? texts.command.title }}</DialogTitle>
        <DialogDescription>{{ description ?? texts.command.description }}</DialogDescription>
      </DialogHeader>
      <Command>
        <slot v-bind="slotProps" />
      </Command>
    </DialogContent>
  </Dialog>
</template>
