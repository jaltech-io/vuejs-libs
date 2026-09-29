# Hover Card

<script setup>
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@jaltech/vuejs-ui/hover-card'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

A card of rich content revealed when hovering a trigger, rendered in a portal.

<ClientOnly>
<div class="demo">
  <HoverCard>
    <HoverCardTrigger as-child>
      <Button variant="link">@jaltech</Button>
    </HoverCardTrigger>
    <HoverCardContent>
      <p style="margin:0;font-size:14px;font-weight:600">Jaltech</p>
      <p style="margin:.25rem 0 0;font-size:13px;color:hsl(var(--muted-foreground))">Building the @jaltech/vuejs-ui component library.</p>
    </HoverCardContent>
  </HoverCard>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@jaltech/vuejs-ui/hover-card'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

<template>
  <HoverCard>
    <HoverCardTrigger as-child>
      <Button variant="link">@jaltech</Button>
    </HoverCardTrigger>
    <HoverCardContent>
      <p>Jaltech</p>
      <p>Building the @jaltech/vuejs-ui component library.</p>
    </HoverCardContent>
  </HoverCard>
</template>
```
