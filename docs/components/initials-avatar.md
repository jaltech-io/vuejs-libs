# InitialsAvatar

<script setup>
import { InitialsAvatar } from '@jaltech/vuejs-ui/avatar'
</script>

A person's initials (1-2 letters) on a tinted round chip — member, assignee, author. The full name is the accessible name and the native tooltip.

<div class="demo">
  <InitialsAvatar name="Ada Lovelace" size="xs" />
  <InitialsAvatar name="Alan Turing" size="sm" />
  <InitialsAvatar name="Grace Hopper" />
  <InitialsAvatar name="Margaret Hamilton" size="lg" />
  <InitialsAvatar name="Linus Torvalds" tone="green" />
  <InitialsAvatar name="Barbara Liskov" tone="purple" />
  <InitialsAvatar name="Edsger Dijkstra" tone="amber" />
  <InitialsAvatar name="Donald Knuth" tone="gray" />
</div>

## Code

```vue
<script setup lang="ts">
import { InitialsAvatar } from '@jaltech/vuejs-ui/avatar'
</script>

<template>
  <InitialsAvatar :name="member.name" size="sm" />
</template>
```

In a TanStack column:

```ts
{ accessorKey: 'name', cell: ({ row }) =>
    h('span', { class: 'inline-flex items-center gap-2' }, [h(InitialsAvatar, { name: row.original.name }), row.original.name]) }
```

## Props

| Prop | Type | Default | |
|---|---|---|---|
| `name` | `string \| null` | — | initials source (`getInitials` from `@jaltech/vuejs-ui/utils`) |
| `tone` | `Tone` | `'blue'` | `gray`, `blue`, `green`, `amber`, `red`, `purple` |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 20, 24, 28, 48 px |
| `title` | `string \| false` | `name` | native tooltip; `false` for none |
