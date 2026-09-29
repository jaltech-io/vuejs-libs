# Input

<script setup>
import { ref } from 'vue'
import { Input } from '@jaltech/vuejs-ui/input'
const value = ref('')
</script>

A text input bound with `v-model`.

<ClientOnly>
<div class="demo" style="display:block">
  <Input v-model="value" placeholder="Type something…" style="max-width:320px" />
  <p style="margin-top:.75rem;font-size:13px;color:hsl(var(--muted-foreground))">Value: {{ value || '—' }}</p>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@jaltech/vuejs-ui/input'
const value = ref('')
</script>

<template>
  <Input v-model="value" placeholder="Type something…" />
</template>
```
