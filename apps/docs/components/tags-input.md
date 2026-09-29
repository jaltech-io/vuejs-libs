# Tags Input

<script setup>
import { ref } from 'vue'
import { TagsInput, TagsInputItem, TagsInputItemText, TagsInputItemDelete, TagsInputInput } from '@jaltech/vuejs-ui/tags-input'
const tags = ref(['vue', 'design'])
</script>

Collects a list of tags, bound with `v-model` as an array.

<ClientOnly>
<div class="demo" style="display:block">
  <TagsInput v-model="tags" style="max-width:360px">
    <TagsInputItem v-for="tag in tags" :key="tag" :value="tag">
      <TagsInputItemText />
      <TagsInputItemDelete />
    </TagsInputItem>
    <TagsInputInput placeholder="Add tag…" />
  </TagsInput>
  <p style="margin-top:.75rem;font-size:13px;color:hsl(var(--muted-foreground))">Tags: {{ tags.join(', ') || '—' }}</p>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { TagsInput, TagsInputItem, TagsInputItemText, TagsInputItemDelete, TagsInputInput } from '@jaltech/vuejs-ui/tags-input'
const tags = ref(['vue', 'design'])
</script>

<template>
  <TagsInput v-model="tags">
    <TagsInputItem v-for="tag in tags" :key="tag" :value="tag">
      <TagsInputItemText />
      <TagsInputItemDelete />
    </TagsInputItem>
    <TagsInputInput placeholder="Add tag…" />
  </TagsInput>
</template>
```
