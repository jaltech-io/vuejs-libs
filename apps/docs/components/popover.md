# Popover

<script setup>
import { Popover, PopoverContent, PopoverTrigger } from '@jaltech/vuejs-ui/popover'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

Floating content anchored to a trigger, rendered in a portal.

<ClientOnly>
<div class="demo">
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="secondary">Open popover</Button>
    </PopoverTrigger>
    <PopoverContent>
      <p style="margin:0;font-size:14px;font-weight:600">Dimensions</p>
      <p style="margin:.25rem 0 0;font-size:13px;color:hsl(var(--muted-foreground))">Set the dimensions for the layer.</p>
    </PopoverContent>
  </Popover>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@jaltech/vuejs-ui/popover'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="secondary">Open popover</Button>
    </PopoverTrigger>
    <PopoverContent>
      <p>Dimensions</p>
      <p>Set the dimensions for the layer.</p>
    </PopoverContent>
  </Popover>
</template>
```
