# RouterTabsNav

<script setup>
import RouterTabsNav from '@jaltech/vuejs-ui/RouterTabsNav.vue'
import { LayoutDashboardIcon, ListIcon, GaugeIcon } from 'lucide-vue-next'

const tabs = [
  { label: 'Tableau de bord', to: '/', icon: LayoutDashboardIcon },
  { label: 'Backlog', to: '/backlog', icon: ListIcon },
  { label: 'Vélocité', to: '/velocity', icon: GaugeIcon },
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
import RouterTabsNav from '@jaltech/vuejs-ui/RouterTabsNav.vue'
import { LayoutDashboardIcon, ListIcon, GaugeIcon } from 'lucide-vue-next'

const tabs = [
  { label: 'Tableau de bord', to: '/', icon: LayoutDashboardIcon },
  { label: 'Backlog', to: '/backlog', icon: ListIcon },
  { label: 'Vélocité', to: '/velocity', icon: GaugeIcon },
]
</script>

<template>
  <RouterTabsNav :tabs="tabs" />
</template>
```
