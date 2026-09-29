# Native Select

<script setup>
import { ref } from 'vue'
import { NativeSelect, NativeSelectOption, NativeSelectOptGroup } from '@jaltech/vuejs-ui/native-select'
const fruit = ref('apple')
</script>

A styled wrapper around the native `<select>` element, bound with `v-model`.

<div class="demo" style="display:block">
  <NativeSelect v-model="fruit">
    <NativeSelectOptGroup label="Fruit">
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
    </NativeSelectOptGroup>
  </NativeSelect>
  <p style="margin-top:.75rem;font-size:13px;color:hsl(var(--muted-foreground))">Selected: {{ fruit }}</p>
</div>

## Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NativeSelect, NativeSelectOption, NativeSelectOptGroup } from '@jaltech/vuejs-ui/native-select'
const fruit = ref('apple')
</script>

<template>
  <NativeSelect v-model="fruit">
    <NativeSelectOptGroup label="Fruit">
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
    </NativeSelectOptGroup>
  </NativeSelect>
</template>
```
