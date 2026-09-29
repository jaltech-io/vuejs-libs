# Label

<script setup>
import { Label } from '@jaltech/vuejs-ui/label'
import { Input } from '@jaltech/vuejs-ui/input'
</script>

An accessible label associated with a form control via `for`.

<div class="demo" style="display:block">
  <Label for="email">Email</Label>
  <Input id="email" placeholder="you@example.com" style="max-width:320px;margin-top:.5rem" />
</div>

## Code

```vue
<script setup lang="ts">
import { Label } from '@jaltech/vuejs-ui/label'
import { Input } from '@jaltech/vuejs-ui/input'
</script>

<template>
  <Label for="email">Email</Label>
  <Input id="email" placeholder="you@example.com" />
</template>
```
