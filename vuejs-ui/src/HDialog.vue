<template>
  <!-- Modale simple (titre + contenu + pied optionnel) sur le Dialog de la lib : piège du focus,
       Échap et défilement du contenu dans une ScrollArea bornée à l'écran. -->
  <Dialog :open="modelValue" @update:open="(value: boolean) => $emit('update:modelValue', value)">
    <DialogContent
      class="flex max-h-[calc(100dvh-2rem)] flex-col gap-0 overflow-hidden p-0 max-sm:p-0"
      :style="width ? { maxWidth: width } : undefined"
    >
      <DialogHeader class="border-b px-6 pt-5 pb-3.5 max-sm:px-4">
        <DialogTitle class="text-base">{{ title }}</DialogTitle>
      </DialogHeader>
      <ScrollArea class="min-h-0 flex-1 [&>[data-slot=scroll-area-viewport]]:max-h-[calc(100dvh-10rem)]">
        <div class="flex flex-col gap-4 px-6 py-5 max-sm:px-4">
          <slot />
        </div>
      </ScrollArea>
      <DialogFooter v-if="$slots.footer" class="border-t px-6 py-3 max-sm:px-4">
        <slot name="footer" />
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './dialog';
import { ScrollArea } from './scroll-area';

defineProps<{ modelValue: boolean; title: string; width?: string }>();
defineEmits<{ 'update:modelValue': [v: boolean] }>();
</script>
