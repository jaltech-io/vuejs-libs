# Calendar

<script setup>
import { Calendar } from '@jaltech/vuejs-ui/calendar'
</script>

A date field for selecting dates, built on `@internationalized/date`.

<ClientOnly>
<div class="demo">
  <Calendar />
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { CalendarDate } from '@internationalized/date'
import { Calendar } from '@jaltech/vuejs-ui/calendar'

const value = ref(new CalendarDate(2026, 9, 29))
</script>

<template>
  <Calendar v-model="value" />
</template>
```
