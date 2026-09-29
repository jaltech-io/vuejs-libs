<script setup lang="ts">
import { Loader2Icon, PlusIcon } from 'lucide-vue-next';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';

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

function close() {
  emit('update:open', false);
}
function onCancel() {
  emit('cancel');
  close();
}
</script>

<template>
  <Dialog :open="props.open" @update:open="emit('update:open', $event)">
    <DialogTrigger v-if="!hideTrigger" as-child>
      <slot name="trigger">
        <button
          class="inline-flex h-7 items-center justify-center rounded-md bg-primary px-2.5 text-primary-foreground hover:bg-primary/90"
          :class="iconOnly ? 'w-7' : 'gap-1.5 text-sm font-medium px-3'"
        >
          <PlusIcon class="size-3.5 shrink-0" /><span v-if="!iconOnly">{{ triggerLabel ?? title }}</span>
        </button>
      </slot>
    </DialogTrigger>
    <DialogContent :class="contentClass ?? 'sm:max-w-sm'">
      <DialogHeader><DialogTitle>{{ title }}</DialogTitle></DialogHeader>
      <form @submit.prevent="emit('submit')" class="flex flex-col gap-4 py-2">
        <slot />
      </form>
      <DialogFooter>
        <button type="button" class="inline-flex h-9 items-center rounded-md border px-4 text-sm hover:bg-accent" @click="onCancel">
          {{ cancelLabel }}
        </button>
        <button
          type="button" :disabled="pending" @click="emit('submit')"
          class="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          <Loader2Icon v-if="pending" class="size-4 animate-spin" />
          {{ pending ? (pendingLabel ?? submitLabel) : submitLabel }}
        </button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
