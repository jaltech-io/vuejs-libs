<script setup lang="ts">
import { IconLoader2, IconPlus } from '@tabler/icons-vue';
import { Button } from './button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { ScrollArea } from './scroll-area';
import { cn } from './utils';

/**
 * Modale de formulaire (création / modification) : en-tête et pied fixes, formulaire qui défile
 * dans une ScrollArea bornée à l'écran. Déclencheur « Nouveau … » optionnel.
 */
const props = withDefaults(
  defineProps<{
    open: boolean;
    title: string;
    triggerLabel?: string;
    iconOnly?: boolean;
    hideTrigger?: boolean;
    submitLabel?: string;
    pendingLabel?: string;
    pending?: boolean;
    /** Désactive le bouton de validation (formulaire incomplet). */
    submitDisabled?: boolean;
    contentClass?: string;
    cancelLabel?: string;
  }>(),
  {
    submitLabel: 'Créer',
    cancelLabel: 'Annuler',
  },
);

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void;
  (e: 'submit'): void;
  (e: 'cancel'): void;
}>();

function onCancel() {
  emit('cancel');
  emit('update:open', false);
}
</script>

<template>
  <Dialog :open="props.open" @update:open="emit('update:open', $event)">
    <DialogTrigger v-if="!hideTrigger" as-child>
      <slot name="trigger">
        <Button
          type="button"
          :size="iconOnly ? 'icon-sm' : 'sm'"
          :class="iconOnly ? 'size-7' : ''"
          :aria-label="iconOnly ? (triggerLabel ?? title) : undefined"
        >
          <IconPlus /><span v-if="!iconOnly">{{ triggerLabel ?? title }}</span>
        </Button>
      </slot>
    </DialogTrigger>
    <DialogContent
      :class="cn('flex max-h-[calc(100dvh-2rem)] flex-col gap-0 overflow-hidden p-0 max-sm:p-0', contentClass ?? 'sm:max-w-md')"
    >
      <DialogHeader class="px-6 pt-6 pb-3 max-sm:px-4">
        <DialogTitle>{{ title }}</DialogTitle>
      </DialogHeader>
      <ScrollArea class="min-h-0 flex-1 [&>[data-slot=scroll-area-viewport]]:max-h-[calc(100dvh-11rem)]">
        <form class="flex flex-col gap-4 px-6 py-2 max-sm:px-4" @submit.prevent="emit('submit')">
          <slot />
        </form>
      </ScrollArea>
      <DialogFooter class="border-t px-6 py-3 max-sm:px-4">
        <Button type="button" variant="outline" @click="onCancel">{{ cancelLabel }}</Button>
        <Button type="button" :disabled="pending || submitDisabled" @click="emit('submit')">
          <IconLoader2 v-if="pending" class="animate-spin" />
          {{ pending ? (pendingLabel ?? submitLabel) : submitLabel }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
