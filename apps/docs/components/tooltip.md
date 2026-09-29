# Tooltip

<script setup>
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@jaltech/vuejs-ui/tooltip'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

A floating label shown on hover or focus.

<ClientOnly>
<div class="demo">
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="secondary">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Helpful hint</TooltipContent>
    </Tooltip>
  </TooltipProvider>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@jaltech/vuejs-ui/tooltip'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="secondary">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Helpful hint</TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
```
