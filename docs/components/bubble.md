# Bubble

<script setup>
import { Bubble, BubbleContent, BubbleGroup } from '@jaltech/vuejs-ui/bubble'
</script>

A chat message bubble, with variants and start/end alignment for conversation threads.

<div class="demo" style="display:block">
  <BubbleGroup style="max-width:420px">
    <Bubble variant="muted" align="start">
      <BubbleContent>Hey, are we still on for tomorrow?</BubbleContent>
    </Bubble>
    <Bubble variant="default" align="end">
      <BubbleContent>Yes! See you at 10.</BubbleContent>
    </Bubble>
  </BubbleGroup>
</div>

## Code

```vue
<script setup lang="ts">
import { Bubble, BubbleContent, BubbleGroup } from '@jaltech/vuejs-ui/bubble'
</script>

<template>
  <BubbleGroup>
    <Bubble variant="muted" align="start">
      <BubbleContent>Hey, are we still on for tomorrow?</BubbleContent>
    </Bubble>
    <Bubble variant="default" align="end">
      <BubbleContent>Yes! See you at 10.</BubbleContent>
    </Bubble>
  </BubbleGroup>
</template>
```
