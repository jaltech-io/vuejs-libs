# Kbd

<script setup>
import { Kbd, KbdGroup } from '@jaltech/vuejs-ui/kbd'
</script>

Displays a keyboard key or a group of keys for a shortcut.

<div class="demo">
  <KbdGroup>
    <Kbd>Ctrl</Kbd>
    <Kbd>K</Kbd>
  </KbdGroup>
</div>

## Code

```vue
<script setup lang="ts">
import { Kbd, KbdGroup } from '@jaltech/vuejs-ui/kbd'
</script>

<template>
  <KbdGroup>
    <Kbd>Ctrl</Kbd>
    <Kbd>K</Kbd>
  </KbdGroup>
</template>
```
