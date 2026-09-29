# Pin Input

<script setup>
import { ref } from 'vue'
import { PinInput, PinInputGroup, PinInputSlot } from '@jaltech/vuejs-ui/pin-input'
const value = ref([])
</script>

A grouped set of single-character inputs for one-time codes or PINs.

<ClientOnly>
<div class="demo" style="display:block">
  <PinInput v-model="value" placeholder="○">
    <PinInputGroup>
      <PinInputSlot v-for="(id, index) in 5" :key="id" :index="index" />
    </PinInputGroup>
  </PinInput>
  <p style="margin-top:.75rem;font-size:13px;color:hsl(var(--muted-foreground))">Value: {{ value.join('') || '—' }}</p>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PinInput, PinInputGroup, PinInputSlot } from '@jaltech/vuejs-ui/pin-input'
const value = ref([])
</script>

<template>
  <PinInput v-model="value" placeholder="○">
    <PinInputGroup>
      <PinInputSlot v-for="(id, index) in 5" :key="id" :index="index" />
    </PinInputGroup>
  </PinInput>
</template>
```
