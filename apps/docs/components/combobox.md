# Combobox

<script setup>
import { ref } from 'vue'
import { Combobox } from '@jaltech/vuejs-ui/combobox'
const value = ref(null)
const options = [
  { id: 'vue', name: 'Vue' },
  { id: 'react', name: 'React' },
  { id: 'svelte', name: 'Svelte' },
]
</script>

A searchable select that combines a trigger, a popover, and a filterable list.

<ClientOnly>
<div class="demo" style="display:block">
  <Combobox v-model="value" :options="options" placeholder="Select a framework…" style="max-width:320px" />
  <p style="margin-top:.75rem;font-size:13px;color:hsl(var(--muted-foreground))">Value: {{ value || '—' }}</p>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Combobox } from '@jaltech/vuejs-ui/combobox'

const value = ref(null)
const options = [
  { id: 'vue', name: 'Vue' },
  { id: 'react', name: 'React' },
  { id: 'svelte', name: 'Svelte' },
]
</script>

<template>
  <Combobox v-model="value" :options="options" placeholder="Select a framework…" />
</template>
```
