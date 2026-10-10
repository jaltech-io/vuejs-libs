# SectionHeader

<script setup>
import SectionHeader from '@jaltech/vuejs-ui/section-header'
import { Button } from '@jaltech/vuejs-ui/button'
import { IconPlus } from '@tabler/icons-vue'
</script>

The single section title style: title, optional count badge, and the section's main action on the right (`actions` slot — typically the « Nouveau … » button).

<ClientOnly>
<div class="demo" style="display:block">
  <SectionHeader title="Membres" :count="12">
    <template #actions>
      <Button size="sm"><IconPlus />Nouveau membre</Button>
    </template>
  </SectionHeader>
</div>
</ClientOnly>

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | Section title |
| `count` | `number` | — | Shown as a secondary badge next to the title |
| `as` | `'h1'` … `'h6'` | `'h2'` | Heading level |

Slot `actions`: right-aligned main action(s).

## Code

```vue
<script setup lang="ts">
import SectionHeader from '@jaltech/vuejs-ui/section-header'
import { Button } from '@jaltech/vuejs-ui/button'
import { IconPlus } from '@tabler/icons-vue'
</script>

<template>
  <SectionHeader title="Membres" :count="members.length">
    <template #actions>
      <Button size="sm" @click="createOpen = true"><IconPlus />Nouveau membre</Button>
    </template>
  </SectionHeader>
</template>
```
