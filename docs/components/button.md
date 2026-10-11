# Button — `pending`

<script setup>
import { ref } from 'vue'
import { Button } from '@jaltech/vuejs-ui/button'
import { IconDeviceFloppy, IconDownload, IconTrash } from '@tabler/icons-vue'

const pending = ref(false)
function run() {
  pending.value = true
  setTimeout(() => { pending.value = false }, 1500)
}
</script>

The shadcn-vue `Button`, plus a **`pending`** prop for an action in progress: the button is disabled (`aria-busy`), and a spinner replaces its icon — or comes before its label when it has none. The label stays displayed.

<div class="demo">
  <Button :pending="pending" @click="run"><IconDeviceFloppy />Save</Button>
  <Button variant="outline" :pending="pending" @click="run">Send</Button>
  <Button variant="hicon" size="hicon" aria-label="Export" :pending="pending" @click="run"><IconDownload /></Button>
  <Button variant="destructive" :pending="pending" @click="run"><IconTrash />Delete</Button>
</div>

Click any button: all of them are pending for 1.5 s.

## Code

```vue
<script setup lang="ts">
import { Button } from '@jaltech/vuejs-ui/button'
import { IconDeviceFloppy } from '@tabler/icons-vue'
</script>

<template>
  <Button :pending="saving" @click="save"><IconDeviceFloppy />Save</Button>
</template>
```

It replaces the hand-written pattern:

```vue
<Button :disabled="saving" @click="save">
  <IconLoader2 v-if="saving" class="animate-spin" />
  <IconDeviceFloppy v-else />
  Save
</Button>
```

## Props added to shadcn-vue

| Prop | Type | Default | |
|---|---|---|---|
| `pending` | `boolean` | `false` | spinner, disabled, `aria-busy` |
| `disabled` | `boolean` | `false` | now a declared prop: `disabled \|\| pending` disables the button |

`FormDialog` (submit button) and `TableSelectionBarButton` use it.
