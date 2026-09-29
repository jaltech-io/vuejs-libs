# Slider

<script setup>
import { ref } from 'vue'
import { Slider } from '@jaltech/vuejs-ui/slider'
const value = ref([50])
</script>

A range input bound with `v-model` as an array of values.

<ClientOnly>
<div class="demo" style="display:block">
  <Slider v-model="value" :max="100" :step="1" style="max-width:320px" />
  <p style="margin-top:.75rem;font-size:13px;color:hsl(var(--muted-foreground))">Value: {{ value[0] }}</p>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '@jaltech/vuejs-ui/slider'
const value = ref([50])
</script>

<template>
  <Slider v-model="value" :max="100" :step="1" />
</template>
```
