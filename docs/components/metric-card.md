# MetricCard

<script setup>
import { MetricCard } from '@jaltech/vuejs-ui/metric-card'
import { IconAlertTriangle, IconBriefcase, IconCoin, IconUsers } from '@tabler/icons-vue'
</script>

The one KPI card of the library (it replaces `StatCard` and `HMetricCard`): an optional tinted icon chip, the value in tabular figures, the label and an optional secondary line. With `to` (application route) or `href` (external link, new tab) the whole card is a link.

<div class="demo" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
  <MetricCard label="Active projects" :value="12" :icon="IconBriefcase" />
  <MetricCard label="Projects at risk" :value="3" :icon="IconAlertTriangle" tone="red" />
  <MetricCard label="AI spend" value="$148.20" :icon="IconCoin" tone="purple" sub="of $500 this month" />
  <MetricCard label="Members" :value="42" :icon="IconUsers" tone="gray" href="https://example.com" />
  <MetricCard label="Average score" value="7.4" />
</div>

## Code

```vue
<script setup lang="ts">
import { MetricCard } from '@jaltech/vuejs-ui/metric-card'
import { IconAlertTriangle, IconBriefcase } from '@tabler/icons-vue'
</script>

<template>
  <div class="grid grid-cols-6 gap-3 max-[1100px]:grid-cols-3 max-[560px]:grid-cols-2">
    <MetricCard label="Active projects" :value="12" :icon="IconBriefcase" :to="{ name: 'projects' }" />
    <MetricCard label="Projects at risk" :value="3" :icon="IconAlertTriangle" :tone="atRisk ? 'red' : 'gray'" />
    <MetricCard label="Average score" value="7.4" sub="last 30 days" />
  </div>
</template>
```

## Props

| Prop | Type | Default | |
|---|---|---|---|
| `label` | `string` | — | |
| `value` | `string \| number` | — | shown with `tabular-nums` |
| `icon` | `Component` | — | icon chip (e.g. Tabler) |
| `tone` | `Tone` | `'blue'` | `gray`, `blue`, `green`, `amber`, `red`, `purple` (see [StatusBadge](/components/status-badge)) |
| `sub` | `string` | — | secondary line |
| `to` | `RouteLocationRaw` | — | internal link (vue-router) |
| `href` | `string` | — | external link, new tab (wins over `to`) |

The card shrinks in a grid and breaks long words; below 560 px the icon goes above the value. The application lays the cards out (grid) and maps each KPI to a tone.
