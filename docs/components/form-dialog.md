# FormDialog

<script setup>
import { ref } from 'vue'
import FormDialog from '@jaltech/vuejs-ui/form-dialog'
import { Input } from '@jaltech/vuejs-ui/input'
import { Button } from '@jaltech/vuejs-ui/button'

const open = ref(false)
const rejectOpen = ref(false)
</script>

A dialog that wraps a form, with a built-in trigger button, header, submit/cancel footer, and a pending state.

**Built on:** shadcn-vue's Dialog.

<ClientOnly>
<div class="demo" style="display:block">
  <FormDialog
    :open="open"
    title="Nouveau projet"
    trigger-label="Nouveau projet"
    submit-label="Créer"
    @update:open="open = $event"
    @submit="open = false"
  >
    <Input placeholder="Nom du projet" />
    <Input placeholder="Clé (ex. PRJ)" />
  </FormDialog>
</div>
</ClientOnly>

## Red submit (`submitVariant`)

`submit-variant="destructive"` turns the submit button red, for a negative action that still needs a form (reject with a reason…). Default: `default`. The footer is always « Cancel » then the action verb; `pending-label` replaces the verb while `pending`.

<ClientOnly>
<div class="demo" style="display:block">
  <FormDialog
    :open="rejectOpen"
    title="Rejeter la demande"
    submit-label="Rejeter"
    pending-label="Rejet…"
    submit-variant="destructive"
    @update:open="rejectOpen = $event"
    @submit="rejectOpen = false"
  >
    <template #trigger>
      <Button type="button" size="sm" variant="outline">Rejeter…</Button>
    </template>
    <Input placeholder="Motif du rejet" />
  </FormDialog>
</div>
</ClientOnly>

```vue
<FormDialog
  v-model:open="rejectOpen"
  title="Rejeter la demande"
  hide-trigger
  submit-label="Rejeter"
  pending-label="Rejet…"
  submit-variant="destructive"
  :pending="rejecting"
  @submit="reject"
>
  <Input v-model="reason" placeholder="Motif du rejet" />
</FormDialog>
```

Built-in texts are translatable once for the whole application (`formDialog` section of [`installLibraryTexts`](/guide/texts)); a prop still wins.

## Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import FormDialog from '@jaltech/vuejs-ui/form-dialog'
import { Input } from '@jaltech/vuejs-ui/input'

const open = ref(false)
</script>

<template>
  <FormDialog
    :open="open"
    title="Nouveau projet"
    trigger-label="Nouveau projet"
    submit-label="Créer"
    @update:open="open = $event"
    @submit="open = false"
  >
    <Input placeholder="Nom du projet" />
    <Input placeholder="Clé (ex. PRJ)" />
  </FormDialog>
</template>
```
