# Drawer

<script setup>
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@jaltech/vuejs-ui/drawer'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

A panel that slides in from the edge of the screen, rendered in a portal.

<ClientOnly>
<div class="demo">
  <Drawer>
    <DrawerTrigger as-child>
      <Button>Open drawer</Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Edit profile</DrawerTitle>
        <DrawerDescription>Make changes to your profile here.</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <Button>Save</Button>
        <DrawerClose as-child>
          <Button variant="secondary">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@jaltech/vuejs-ui/drawer'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button>Open drawer</Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Edit profile</DrawerTitle>
        <DrawerDescription>Make changes to your profile here.</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <Button>Save</Button>
        <DrawerClose as-child>
          <Button variant="secondary">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
```
