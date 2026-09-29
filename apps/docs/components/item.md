# Item

<script setup>
import { Item, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemGroup, ItemSeparator } from '@jaltech/vuejs-ui/item'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

A flexible row that pairs a title and description with trailing actions.

<div class="demo" style="display:block">
  <ItemGroup style="max-width:420px">
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>Notifications</ItemTitle>
        <ItemDescription>Choose how you want to be notified.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="secondary">Manage</Button>
      </ItemActions>
    </Item>
  </ItemGroup>
</div>

## Code

```vue
<script setup lang="ts">
import { Item, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemGroup } from '@jaltech/vuejs-ui/item'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

<template>
  <ItemGroup>
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>Notifications</ItemTitle>
        <ItemDescription>Choose how you want to be notified.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="secondary">Manage</Button>
      </ItemActions>
    </Item>
  </ItemGroup>
</template>
```
