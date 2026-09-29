# HTooltip

<script setup>
import HTooltip from '@jaltech/vuejs-ui/HTooltip.vue'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

A lightweight convenience tooltip: wrap any trigger in its default slot and pass `text`; `placement` controls the side (`top`, `top-end`, `bottom`, `left`).

<ClientOnly>
<div class="demo">
  <HTooltip text="Enregistrer les modifications">
    <Button>Survolez-moi</Button>
  </HTooltip>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import HTooltip from '@jaltech/vuejs-ui/HTooltip.vue'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

<template>
  <HTooltip text="Enregistrer les modifications" placement="top">
    <Button>Survolez-moi</Button>
  </HTooltip>
</template>
```
