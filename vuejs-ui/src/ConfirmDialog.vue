<template>
  <Dialog :open="_confirmOpen" @update:open="(v) => { if (!v) resolveConfirm(false) }">
    <DialogContent class="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>{{ _confirmOpts.title }}</DialogTitle>
        <DialogDescription v-if="_confirmOpts.description">
          {{ _confirmOpts.description }}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="pt-2">
        <Button type="button" variant="outline" @click="resolveConfirm(false)">
          {{ _confirmOpts.cancelLabel ?? 'Annuler' }}
        </Button>
        <Button
          type="button"
          :variant="_confirmOpts.variant === 'destructive' ? 'destructive' : 'default'"
          @click="resolveConfirm(true)"
        >
          {{ _confirmOpts.confirmLabel ?? 'Confirmer' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { _confirmOpen, _confirmOpts, resolveConfirm } from '@jaltech/vuejs-ui/composables/useConfirm';
import { Button } from './button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog';
</script>
