# Chart

<script setup>
import { ChartContainer } from '@jaltech/vuejs-ui/chart'
</script>

A theming and tooltip wrapper for charts built on top of `@unovis/vue`.

## Code

```vue
<script setup lang="ts">
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@jaltech/vuejs-ui/chart'

const config = {
  desktop: { label: 'Desktop', color: 'hsl(var(--primary))' },
}
</script>

<template>
  <ChartContainer :config="config">
    <!-- Compose @unovis/vue visualizations here -->
  </ChartContainer>
</template>
```

_Interactive demo coming soon._
