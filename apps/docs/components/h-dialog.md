# HDialog

<script setup>
import { ref } from 'vue'
import HDialog from '@jaltech/vuejs-ui/HDialog.vue'
import { Button } from '@jaltech/vuejs-ui/button'

const open = ref(false)
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

## Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import HDialog from '@jaltech/vuejs-ui/HDialog.vue'
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
