# Command

<script setup>
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@jaltech/vuejs-ui/command'
</script>

A command palette with a filterable list of items.

<ClientOnly>
<div class="demo" style="display:block">
  <Command style="max-width:320px;border:1px solid hsl(var(--border))">
    <CommandInput placeholder="Type a command…" />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem value="calendar">Calendar</CommandItem>
        <CommandItem value="search">Search</CommandItem>
        <CommandItem value="settings">Settings</CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@jaltech/vuejs-ui/command'
</script>

<template>
  <Command>
    <CommandInput placeholder="Type a command…" />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem value="calendar">Calendar</CommandItem>
        <CommandItem value="search">Search</CommandItem>
        <CommandItem value="settings">Settings</CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
```
