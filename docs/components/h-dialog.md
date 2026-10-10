# HDialog

<script setup>
import { ref } from 'vue'
import HDialog from '@jaltech/vuejs-ui/h-dialog'
import ConfirmDialog from '@jaltech/vuejs-ui/confirm-dialog'
import { showConfirm } from '@jaltech/vuejs-ui/composables'
import { Button } from '@jaltech/vuejs-ui/button'

const open = ref(false)

const ticketOpen = ref(false)
const ticketStatus = ref('Ouvert')

async function closeTicket() {
  const ok = await showConfirm({
    title: 'Clôturer le ticket ?',
    description: 'Le ticket passera au statut « Clôturé ».',
    confirmLabel: 'Clôturer',
    variant: 'destructive',
  })
  if (ok) ticketStatus.value = 'Clôturé'
}
</script>

A self-contained modal dialog (ProjectFlow design-system style) with a built-in header, close button, and optional footer slot. Controlled via `v-model`.

<ClientOnly>
<div class="demo" style="display:block">
  <Button @click="open = true">Ouvrir la boîte de dialogue</Button>
  <HDialog v-model="open" title="Confirmer l'action">
    <p>Le contenu de la boîte de dialogue se place dans le slot par défaut.</p>
    <template #footer>
      <Button variant="outline" @click="open = false">Annuler</Button>
      <Button @click="open = false">Valider</Button>
    </template>
  </HDialog>
</div>
</ClientOnly>

## Confirmation from inside a dialog

A confirmation opened from a dialog (`showConfirm` called from an `HDialog`, a `FormDialog` or a `Dialog`) always shows **above** it, overlay included — even though `<ConfirmDialog />` is mounted once at the root of the app, before the dialog. Every layer that opens (dialog, sheet, drawer, popover, menu, select…) takes the next rank on a single shared stack (`useLayer`, from `z-index: 1001`), whatever the mount order; tooltips stay on top (`9999`). Keep your own page chrome (sticky headers, sidebars, banners) below `1000`.

<ClientOnly>
<div class="demo" style="display:block">
  <!-- Monté AVANT la fiche, comme à la racine d'une application -->
  <ConfirmDialog />
  <Button @click="ticketOpen = true">Ouvrir la fiche</Button>
  <HDialog v-model="ticketOpen" title="PROJ-42 · Corriger l'export">
    <p>Statut : <strong>{{ ticketStatus }}</strong></p>
    <template #footer>
      <Button variant="outline" @click="ticketStatus = 'Ouvert'">Rouvrir</Button>
      <Button variant="destructive" @click="closeTicket">Clôturer…</Button>
    </template>
  </HDialog>
</div>
</ClientOnly>

```vue
<script setup lang="ts">
import { showConfirm } from '@jaltech/vuejs-ui/composables'

async function closeTicket() {
  const ok = await showConfirm({
    title: 'Clôturer le ticket ?',
    confirmLabel: 'Clôturer',
    variant: 'destructive',
  })
  if (ok) status.value = 'Clôturé'
}
</script>

<template>
  <!-- App.vue : <ConfirmDialog /> monté une seule fois -->
  <HDialog v-model="ticketOpen" title="PROJ-42 · Corriger l'export">
    <template #footer>
      <Button variant="destructive" @click="closeTicket">Clôturer…</Button>
    </template>
  </HDialog>
</template>
```

## Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import HDialog from '@jaltech/vuejs-ui/h-dialog'
import { Button } from '@jaltech/vuejs-ui/button'

const open = ref(false)
</script>

<template>
  <Button @click="open = true">Ouvrir la boîte de dialogue</Button>
  <HDialog v-model="open" title="Confirmer l'action">
    <p>Le contenu de la boîte de dialogue se place dans le slot par défaut.</p>
    <template #footer>
      <Button variant="outline" @click="open = false">Annuler</Button>
      <Button @click="open = false">Valider</Button>
    </template>
  </HDialog>
</template>
```
