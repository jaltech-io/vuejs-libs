# RouterTabsNav

<script setup>
import RouterTabsNav from '@jaltech/vuejs-ui/router-tabs-nav'
import { IconGauge, IconLayoutDashboard, IconList } from '@tabler/icons-vue'

const tabs = [
  { label: 'Tableau de bord', to: '/', icon: IconLayoutDashboard },
  { label: 'Backlog', to: '/backlog', icon: IconList },
  { label: 'Vélocité', to: '/velocity', icon: IconGauge },
]
</script>

A generic router-driven tab bar built on `RouterLink`; the active tab is derived from the current route path. You supply the `tabs` (label, `to`, optional icon).

<ClientOnly>
<div class="demo" style="display:block">
  <RouterTabsNav :tabs="tabs" />
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import RouterTabsNav from '@jaltech/vuejs-ui/router-tabs-nav'
import { IconGauge, IconLayoutDashboard, IconList } from '@tabler/icons-vue'

const tabs = [
  { label: 'Tableau de bord', to: '/', icon: IconLayoutDashboard },
  { label: 'Backlog', to: '/backlog', icon: IconList },
  { label: 'Vélocité', to: '/velocity', icon: IconGauge },
]
</script>

<template>
  <RouterTabsNav :tabs="tabs" />
</template>
```
