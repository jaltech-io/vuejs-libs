# StatCard

<script setup>
import StatCard from '@jaltech/vuejs-ui/StatCard.vue'
import { UsersIcon } from 'lucide-vue-next'
</script>

A KPI card showing a label, a value, an optional icon, and an optional up/down delta.

<div class="demo" style="display:block">
  <StatCard :icon="UsersIcon" label="Utilisateurs actifs" value="1 248" delta="+12%" :up="true" />
</div>

## Code

```vue
<script setup lang="ts">
import StatCard from '@jaltech/vuejs-ui/StatCard.vue'
import { UsersIcon } from 'lucide-vue-next'
</script>

<template>
  <StatCard :icon="UsersIcon" label="Utilisateurs actifs" value="1 248" delta="+12%" :up="true" />
</template>
```
