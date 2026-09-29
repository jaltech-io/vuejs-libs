# EmptyState

<script setup>
import EmptyState from '@jaltech/vuejs-ui/empty-state'
</script>

A centered, muted empty/loading placeholder in the ProjectFlow design-system style. Put your message (typically a `<p>`, optionally an icon) in the default slot.

<div class="demo" style="display:block">
  <EmptyState>
    <p>Aucune tâche pour le moment.</p>
  </EmptyState>
</div>

## Code

```vue
<script setup lang="ts">
import EmptyState from '@jaltech/vuejs-ui/empty-state'
</script>

<template>
  <EmptyState>
    <p>Aucune tâche pour le moment.</p>
  </EmptyState>
</template>
```
