# MetricCard

<script setup>
import HMetricCard from '@jaltech/vuejs-ui/HMetricCard.vue'
</script>

A compact metric card in the ProjectFlow design-system style, with an uppercase label, a large value, and an optional sub-line.

<div class="demo" style="display:block">
  <HMetricCard label="Revenu mensuel" value="12 480 €" sub="+8% vs mois dernier" />
</div>

## Code

```vue
<script setup lang="ts">
import HMetricCard from '@jaltech/vuejs-ui/HMetricCard.vue'
</script>

<template>
  <HMetricCard label="Revenu mensuel" value="12 480 €" sub="+8% vs mois dernier" />
</template>
```
