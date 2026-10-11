# StatusBadge

<script setup>
import { StatusBadge } from '@jaltech/vuejs-ui/status-badge'
</script>

A generic status pill driven by a **variant** (a tone). The library knows no business value: the application maps each of its values (status, priority, role…) to a label and a tone, once, and every table, card or form reads that table.

<div class="demo">
  <StatusBadge variant="gray" label="Closed" />
  <StatusBadge variant="blue" label="Open" />
  <StatusBadge variant="amber" label="In progress" />
  <StatusBadge variant="purple" label="In review" />
  <StatusBadge variant="green" label="Done" />
  <StatusBadge variant="red" label="Blocked" />
  <StatusBadge variant="green" label="On track" dot />
  <StatusBadge variant="red" label="Off track" dot />
</div>

## Code

```vue
<script setup lang="ts">
import { StatusBadge } from '@jaltech/vuejs-ui/status-badge'
import type { Tone } from '@jaltech/vuejs-ui/tones'

// Application side: one display table per domain.
const STATUS: Record<string, { label: string; tone: Tone }> = {
  open: { label: 'Open', tone: 'blue' },
  done: { label: 'Done', tone: 'green' },
}
</script>

<template>
  <StatusBadge :variant="STATUS[issue.status].tone" :label="STATUS[issue.status].label" />
  <StatusBadge variant="green" dot>On track</StatusBadge>
</template>
```

In a TanStack column, **`statusBadgeCell(tone, label, { dot? })`**:

```ts
import { statusBadgeCell } from '@jaltech/vuejs-ui/status-badge'

{ accessorKey: 'status', filterFn: oneOf,
  cell: ({ row }) => statusBadgeCell(STATUS[row.original.status].tone, STATUS[row.original.status].label) }
```

## Props

| Prop | Type | Default | |
|---|---|---|---|
| `variant` | `StatusVariant` (= `Tone`) | `'gray'` | `gray`, `blue`, `green`, `amber`, `red`, `purple` |
| `label` | `string \| number` | — | the default slot replaces it |
| `dot` | `boolean` | `false` | coloured dot before the label |

The tones are shared by the whole library (`@jaltech/vuejs-ui/tones`: `Tone`, `TONES`, `badgeToneClasses`, `chipToneClasses`) — the same tone looks the same on a badge, an [InitialsAvatar](/components/initials-avatar) and a [MetricCard](/components/metric-card) icon.

`HBadge` is kept as a deprecated alias of `StatusBadge` (same rendering and variants).
