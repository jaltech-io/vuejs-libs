# Switch

<script setup>
import { ref } from 'vue'
import { Switch } from '@jaltech/vuejs-ui/switch'
const on = ref(true)
</script>

A toggle bound with `v-model`.

<ClientOnly>
<div class="demo">
  <Switch v-model="on" />
  <span style="font-size:14px">{{ on ? 'On' : 'Off' }}</span>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@jaltech/vuejs-ui/switch'
const on = ref(true)
</script>

<template>
  <Switch v-model="on" />
</template>
```
