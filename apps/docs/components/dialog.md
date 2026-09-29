# Dialog

<script setup>
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@jaltech/vuejs-ui/dialog'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

A modal dialog rendered in a portal.

<ClientOnly>
<div class="demo">
  <Dialog>
    <DialogTrigger as-child>
      <Button>Open dialog</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete project</DialogTitle>
        <DialogDescription>This action cannot be undone.</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="secondary">Cancel</Button>
        <Button>Confirm</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@jaltech/vuejs-ui/dialog'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button>Open dialog</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete project</DialogTitle>
        <DialogDescription>This action cannot be undone.</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="secondary">Cancel</Button>
        <Button>Confirm</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
```
