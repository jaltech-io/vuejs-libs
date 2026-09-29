# Number Field

<script setup>
import { ref } from 'vue'
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput } from '@jaltech/vuejs-ui/number-field'
const quantity = ref(1)
</script>

A numeric input with increment and decrement controls, bound with `v-model`.

<ClientOnly>
<div class="demo" style="display:block">
  <NumberField v-model="quantity" :min="0" :max="10" style="max-width:180px">
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
  <p style="margin-top:.75rem;font-size:13px;color:hsl(var(--muted-foreground))">Quantity: {{ quantity }}</p>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput } from '@jaltech/vuejs-ui/number-field'
const quantity = ref(1)
</script>

<template>
  <NumberField v-model="quantity" :min="0" :max="10">
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
```
