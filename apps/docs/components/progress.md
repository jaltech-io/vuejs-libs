# Progress

<script setup>
import { ref } from 'vue'
import { Progress } from '@jaltech/vuejs-ui/progress'
import { Button } from '@jaltech/vuejs-ui/button'
const value = ref(40)
</script>

Displays completion progress of a task.

<ClientOnly>
<div class="demo" style="display:block">
  <Progress :model-value="value" style="max-width:360px" />
  <div style="margin-top:.75rem;display:flex;gap:.5rem">
    <Button size="sm" variant="secondary" @click="value = Math.max(0, value - 10)">-10</Button>
    <Button size="sm" variant="secondary" @click="value = Math.min(100, value + 10)">+10</Button>
    <span style="font-size:13px;color:hsl(var(--muted-foreground));align-self:center">{{ value }}%</span>
  </div>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Progress } from '@jaltech/vuejs-ui/progress'
const value = ref(40)
</script>

<template>
  <Progress :model-value="value" />
</template>
```
