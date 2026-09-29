# Context Menu

<script setup>
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger } from '@jaltech/vuejs-ui/context-menu'
</script>

A menu shown at the pointer on right-click, rendered in a portal.

<ClientOnly>
<div class="demo">
  <ContextMenu>
    <ContextMenuTrigger>
      <span style="display:flex;align-items:center;justify-content:center;width:220px;height:80px;border:1px dashed hsl(var(--border));border-radius:6px;font-size:14px">Right-click here</span>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuLabel>Actions</ContextMenuLabel>
      <ContextMenuItem>Back</ContextMenuItem>
      <ContextMenuItem>Reload</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger } from '@jaltech/vuejs-ui/context-menu'
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuLabel>Actions</ContextMenuLabel>
      <ContextMenuItem>Back</ContextMenuItem>
      <ContextMenuItem>Reload</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
```
