# Checkbox

<script setup>
import { ref } from 'vue'
import { Checkbox } from '@jaltech/vuejs-ui/checkbox'
const checked = ref(true)
</script>

A control that toggles a boolean value, bound with `v-model`.

<ClientOnly>
<div class="demo">
  <Checkbox v-model="checked" />
  <span style="font-size:14px">{{ checked ? 'Accepted' : 'Not accepted' }}</span>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@jaltech/vuejs-ui/checkbox'
const checked = ref(true)
</script>

<template>
  <Checkbox v-model="checked" />
</template>
```
