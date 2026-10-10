# EmptyState

<script setup>
import EmptyState from '@jaltech/vuejs-ui/empty-state'
import { Button } from '@jaltech/vuejs-ui/button'
import { IconFolder, IconPlus } from '@tabler/icons-vue'
</script>

The one empty state: optional icon, the « Aucun … » sentence, and an optional action. Loading is shown with `Skeleton`, not with this component.

**Built on:** shadcn-vue's `Empty` primitives (still exported from `@jaltech/vuejs-ui/empty` for special cases).

<ClientOnly>
<div class="demo" style="display:block">
  <EmptyState :icon="IconFolder" text="Aucun projet.">
    <template #action>
      <Button size="sm"><IconPlus />Nouveau projet</Button>
    </template>
  </EmptyState>
</div>
<div class="demo" style="display:block">
  <EmptyState text="Aucune tâche." />
</div>
</ClientOnly>

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `icon` | `Component` | Optional icon (e.g. a `@tabler/icons-vue` icon) |
| `text` | `string` | The sentence, e.g. « Aucun projet. » |

Slot `action`: optional action under the text. The default slot (free content) is kept for compatibility with 0.5.x.

## Code

```vue
<script setup lang="ts">
import EmptyState from '@jaltech/vuejs-ui/empty-state'
import { Button } from '@jaltech/vuejs-ui/button'
import { IconFolder, IconPlus } from '@tabler/icons-vue'
</script>

<template>
  <EmptyState :icon="IconFolder" text="Aucun projet.">
    <template #action>
      <Button size="sm" @click="createOpen = true"><IconPlus />Nouveau projet</Button>
    </template>
  </EmptyState>
</template>
```
