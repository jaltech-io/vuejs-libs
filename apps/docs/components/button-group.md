# Button Group

<script setup>
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from '@jaltech/vuejs-ui/button-group'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

Groups related buttons together with shared, connected edges.

<div class="demo" style="display:block">
  <ButtonGroup>
    <Button variant="secondary">Bold</Button>
    <Button variant="secondary">Italic</Button>
    <Button variant="secondary">Underline</Button>
  </ButtonGroup>
  <ButtonGroup style="margin-top:.75rem">
    <ButtonGroupText>Sort by</ButtonGroupText>
    <ButtonGroupSeparator />
    <Button variant="secondary">Newest</Button>
  </ButtonGroup>
</div>

## Code

```vue
<script setup lang="ts">
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from '@jaltech/vuejs-ui/button-group'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

<template>
  <ButtonGroup>
    <Button variant="secondary">Bold</Button>
    <Button variant="secondary">Italic</Button>
    <Button variant="secondary">Underline</Button>
  </ButtonGroup>

  <ButtonGroup>
    <ButtonGroupText>Sort by</ButtonGroupText>
    <ButtonGroupSeparator />
    <Button variant="secondary">Newest</Button>
  </ButtonGroup>
</template>
```
