# ConfirmDialog

<script setup>
import ConfirmDialog from '@jaltech/vuejs-ui/ConfirmDialog.vue'
import { showConfirm } from '@jaltech/vuejs-ui/composables/useConfirm'
import { Button } from '@jaltech/vuejs-ui/button'

async function remove() {
  const ok = await showConfirm({
    title: 'Supprimer le projet ?',
    description: 'Cette action est irréversible.',
    confirmLabel: 'Supprimer',
    variant: 'destructive',
  })
  // ok === true si l'utilisateur a confirmé
}
</script>

An imperative confirmation dialog: mount `<ConfirmDialog />` once, then call `showConfirm({...})` anywhere to get a `Promise<boolean>`.

**Built on:** shadcn-vue's Dialog.

<ClientOnly>
<div class="demo" style="display:block">
  <Button variant="destructive" @click="remove">Supprimer</Button>
  <ConfirmDialog />
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import ConfirmDialog from '@jaltech/vuejs-ui/ConfirmDialog.vue'
import { showConfirm } from '@jaltech/vuejs-ui/composables/useConfirm'
import { Button } from '@jaltech/vuejs-ui/button'

async function remove() {
  const ok = await showConfirm({
    title: 'Supprimer le projet ?',
    description: 'Cette action est irréversible.',
    confirmLabel: 'Supprimer',
    variant: 'destructive',
  })
  // ok === true si l'utilisateur a confirmé
}
</script>

<template>
  <!-- Monté une seule fois, généralement à la racine de l'app -->
  <ConfirmDialog />
  <Button variant="destructive" @click="remove">Supprimer</Button>
</template>
```
