<template>
  <Dialog :open="_confirmOpen" @update:open="(v) => { if (!v) resolveConfirm(false) }">
    <DialogContent class="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>{{ _confirmOpts.title }}</DialogTitle>
        <DialogDescription v-if="_confirmOpts.description">
          {{ _confirmOpts.description }}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="flex gap-2 pt-2">
        <button
          type="button"
          @click="resolveConfirm(false)"
          class="inline-flex h-9 flex-1 items-center justify-center rounded-md border px-4 text-sm hover:bg-accent"
        >
          {{ _confirmOpts.cancelLabel ?? 'Annuler' }}
        </button>
        <button
          type="button"
          @click="resolveConfirm(true)"
          :class="[
            'inline-flex h-9 flex-1 items-center justify-center rounded-md px-4 text-sm font-medium',
            _confirmOpts.variant === 'destructive'
              ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
              : 'bg-primary text-primary-foreground hover:bg-primary/90',
          ]"
        >
          {{ _confirmOpts.confirmLabel ?? 'Confirmer' }}
        </button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { _confirmOpen, _confirmOpts, resolveConfirm } from '@jaltech/vuejs-ui/composables/useConfirm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@jaltech/vuejs-ui/dialog';
</script>
