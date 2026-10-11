# FormField

<script setup>
import { ref } from 'vue'
import { FormField } from '@jaltech/vuejs-ui/form-field'
import { Input } from '@jaltech/vuejs-ui/input'
import { Textarea } from '@jaltech/vuejs-ui/textarea'

const name = ref('')
</script>

One form field: label (with an asterisk when `required`), the control in the slot, an optional help line and the error message. Built on the `field/` primitives (`Field`, `FieldLabel`, `FieldDescription`, `FieldError`). The slot gives the control its `id` (linked to the label) and the accessibility attributes to spread on it.

<div class="demo" style="display:grid;gap:1rem;max-width:420px">
  <FormField v-slot="{ id, controlAttributes }" label="Name" required :error="name.trim() ? '' : 'The name is required'">
    <Input :id="id" v-model="name" v-bind="controlAttributes" placeholder="Type a name" />
  </FormField>
  <FormField v-slot="{ id, controlAttributes }" label="Description" description="Markdown is supported.">
    <Textarea :id="id" v-bind="controlAttributes" rows="3" />
  </FormField>
</div>

## Code

```vue
<script setup lang="ts">
import { FormField } from '@jaltech/vuejs-ui/form-field'
import { Input } from '@jaltech/vuejs-ui/input'
</script>

<template>
  <FormField v-slot="{ id, controlAttributes }" label="Name" required :error="errors.name">
    <Input :id="id" v-model="form.name" v-bind="controlAttributes" />
  </FormField>
</template>
```

It replaces the hand-written pattern:

```vue
<div class="space-y-1.5">
  <Label for="name">Name <span class="text-destructive">*</span></Label>
  <Input id="name" v-model="form.name" />
  <p v-if="errors.name" class="text-xs text-destructive">{{ errors.name }}</p>
</div>
```

## Props

| Prop | Type | | |
|---|---|---|---|
| `label` | `string` | | or the `label` slot |
| `required` | `boolean` | | asterisk after the label, `aria-required` |
| `error` | `string \| string[] \| null` | | message(s); the field becomes invalid (`aria-invalid`) |
| `description` | `string` | | help line under the control |
| `id` | `string` | generated | id of the control |

Default slot props: `id`, `invalid`, `controlAttributes` (`aria-invalid`, `aria-required`, `aria-describedby`) — spread them on the control with `v-bind`. Controls that already take an `id` (Combobox, DatePicker…) receive it the same way.
