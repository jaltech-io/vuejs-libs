# Form

<script setup>
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@jaltech/vuejs-ui/form'
import { Input } from '@jaltech/vuejs-ui/input'
import { Button } from '@jaltech/vuejs-ui/button'

function onSubmit(values) {
  console.log(values)
}
</script>

A form built on vee-validate that wires labels, controls, and validation messages to each field.

<ClientOnly>
<div class="demo" style="display:block">
  <Form @submit="onSubmit" style="max-width:360px">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="jaltech" v-bind="componentField" />
        </FormControl>
        <FormDescription>This is your public display name.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" style="margin-top:.75rem">Submit</Button>
  </Form>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@jaltech/vuejs-ui/form'
import { Input } from '@jaltech/vuejs-ui/input'
import { Button } from '@jaltech/vuejs-ui/button'

function onSubmit(values) {
  console.log(values)
}
</script>

<template>
  <Form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="jaltech" v-bind="componentField" />
        </FormControl>
        <FormDescription>This is your public display name.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">Submit</Button>
  </Form>
</template>
```
