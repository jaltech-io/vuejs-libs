# Dropdown Menu

<script setup>
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@jaltech/vuejs-ui/dropdown-menu'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

A menu of actions triggered by a button, rendered in a portal.

<ClientOnly>
<div class="demo">
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="secondary">Open menu</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@jaltech/vuejs-ui/dropdown-menu'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="secondary">Open menu</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```
