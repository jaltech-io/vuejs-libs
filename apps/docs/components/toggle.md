# Toggle

<script setup>
import { ref } from 'vue'
import { Toggle } from '@jaltech/vuejs-ui/toggle'
const pressed = ref(false)
</script>

A two-state button, bound with `v-model:pressed`.

<ClientOnly>
<div class="demo">
  <Toggle v-model:pressed="pressed">Bold</Toggle>
  <Toggle variant="outline">Italic</Toggle>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Toggle } from '@jaltech/vuejs-ui/toggle'
const pressed = ref(false)
</script>

<template>
  <Toggle v-model:pressed="pressed">Bold</Toggle>
  <Toggle variant="outline">Italic</Toggle>
</template>
```
