# Sheet

<script setup>
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@jaltech/vuejs-ui/sheet'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

A panel that slides in from the edge of the screen, rendered in a portal.

<ClientOnly>
<div class="demo">
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="secondary">Open sheet</Button>
    </SheetTrigger>
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>Make changes to your profile here.</SheetDescription>
      </SheetHeader>
      <SheetFooter>
        <SheetClose as-child>
          <Button>Save changes</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@jaltech/vuejs-ui/sheet'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="secondary">Open sheet</Button>
    </SheetTrigger>
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>Make changes to your profile here.</SheetDescription>
      </SheetHeader>
      <SheetFooter>
        <SheetClose as-child>
          <Button>Save changes</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
```
