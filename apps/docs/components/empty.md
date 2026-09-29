# Empty

<script setup>
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@jaltech/vuejs-ui/empty'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

A placeholder shown when there is no content to display.

<div class="demo" style="display:block">
  <Empty style="max-width:420px;border:1px dashed hsl(var(--border))">
    <EmptyHeader>
      <EmptyMedia variant="icon">📭</EmptyMedia>
      <EmptyTitle>No messages</EmptyTitle>
      <EmptyDescription>You're all caught up. New messages will appear here.</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button size="sm">Refresh</Button>
    </EmptyContent>
  </Empty>
</div>

## Code

```vue
<script setup lang="ts">
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@jaltech/vuejs-ui/empty'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">📭</EmptyMedia>
      <EmptyTitle>No messages</EmptyTitle>
      <EmptyDescription>You're all caught up. New messages will appear here.</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button size="sm">Refresh</Button>
    </EmptyContent>
  </Empty>
</template>
```
