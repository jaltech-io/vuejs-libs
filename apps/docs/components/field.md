# Field

<script setup>
import { Field, FieldDescription, FieldLabel } from '@jaltech/vuejs-ui/field'
import { Input } from '@jaltech/vuejs-ui/input'
</script>

A layout primitive that groups a label, control, and description for a form input.

<ClientOnly>
<div class="demo" style="display:block">
  <Field style="max-width:360px">
    <FieldLabel>Email</FieldLabel>
    <Input type="email" placeholder="you@example.com" />
    <FieldDescription>We'll never share your email.</FieldDescription>
  </Field>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { Field, FieldDescription, FieldLabel } from '@jaltech/vuejs-ui/field'
import { Input } from '@jaltech/vuejs-ui/input'
</script>

<template>
  <Field>
    <FieldLabel>Email</FieldLabel>
    <Input type="email" placeholder="you@example.com" />
    <FieldDescription>We'll never share your email.</FieldDescription>
  </Field>
</template>
```
