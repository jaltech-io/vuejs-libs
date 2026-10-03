# FormDialog

<script setup>
import { ref } from 'vue'
import FormDialog from '@jaltech/vuejs-ui/form-dialog'
import { Input } from '@jaltech/vuejs-ui/input'

const open = ref(false)
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
