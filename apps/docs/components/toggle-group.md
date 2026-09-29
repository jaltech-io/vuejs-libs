# Toggle Group

<script setup>
import { ref } from 'vue'
import { ToggleGroup, ToggleGroupItem } from '@jaltech/vuejs-ui/toggle-group'
const alignment = ref('left')
</script>

A set of toggles where a value is selected, bound with `v-model`.

<ClientOnly>
<div class="demo" style="display:block">
  <ToggleGroup v-model="alignment" type="single" variant="outline">
    <ToggleGroupItem value="left">Left</ToggleGroupItem>
    <ToggleGroupItem value="center">Center</ToggleGroupItem>
    <ToggleGroupItem value="right">Right</ToggleGroupItem>
  </ToggleGroup>
  <p style="margin-top:.75rem;font-size:13px;color:hsl(var(--muted-foreground))">Selected: {{ alignment || '—' }}</p>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ToggleGroup, ToggleGroupItem } from '@jaltech/vuejs-ui/toggle-group'
const alignment = ref('left')
</script>

<template>
  <ToggleGroup v-model="alignment" type="single" variant="outline">
    <ToggleGroupItem value="left">Left</ToggleGroupItem>
    <ToggleGroupItem value="center">Center</ToggleGroupItem>
    <ToggleGroupItem value="right">Right</ToggleGroupItem>
  </ToggleGroup>
</template>
```
