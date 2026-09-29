# Input Group

<script setup>
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from '@jaltech/vuejs-ui/input-group'
</script>

Groups an input with addons, text, or buttons inside a single bordered field.

<div class="demo" style="display:block">
  <InputGroup style="max-width:320px">
    <InputGroupAddon>
      <InputGroupText>https://</InputGroupText>
    </InputGroupAddon>
    <InputGroupInput placeholder="example.com" />
  </InputGroup>
  <InputGroup style="max-width:320px;margin-top:.75rem">
    <InputGroupInput placeholder="Search…" />
    <InputGroupAddon align="inline-end">
      <InputGroupButton>Go</InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</div>

## Code

```vue
<script setup lang="ts">
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from '@jaltech/vuejs-ui/input-group'
</script>

<template>
  <InputGroup>
    <InputGroupAddon>
      <InputGroupText>https://</InputGroupText>
    </InputGroupAddon>
    <InputGroupInput placeholder="example.com" />
  </InputGroup>

  <InputGroup>
    <InputGroupInput placeholder="Search…" />
    <InputGroupAddon align="inline-end">
      <InputGroupButton>Go</InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>
```
