# Collapsible

<script setup>
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@jaltech/vuejs-ui/collapsible'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

An interactive section that expands and collapses its content.

<ClientOnly>
<div class="demo" style="display:block">
  <Collapsible>
    <CollapsibleTrigger as-child>
      <Button variant="secondary">Toggle details</Button>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <p style="margin-top:.75rem;font-size:14px">Hidden content revealed when open.</p>
    </CollapsibleContent>
  </Collapsible>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@jaltech/vuejs-ui/collapsible'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

<template>
  <Collapsible>
    <CollapsibleTrigger as-child>
      <Button variant="secondary">Toggle details</Button>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <p>Hidden content revealed when open.</p>
    </CollapsibleContent>
  </Collapsible>
</template>
```
