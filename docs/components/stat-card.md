# StatCard

<script setup>
import StatCard from '@jaltech/vuejs-ui/stat-card'
import { IconUsers } from '@tabler/icons-vue'
</script>

A KPI card showing a label, a value, an optional icon, and an optional up/down delta.

<div class="demo" style="display:block">
  <StatCard :icon="IconUsers" label="Utilisateurs actifs" value="1 248" delta="+12%" :up="true" />
</div>

## Code

```vue
<script setup lang="ts">
import StatCard from '@jaltech/vuejs-ui/stat-card'
import { IconUsers } from '@tabler/icons-vue'
</script>

<template>
  <StatCard :icon="IconUsers" label="Utilisateurs actifs" value="1 248" delta="+12%" :up="true" />
</template>
```
