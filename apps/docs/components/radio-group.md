# Radio Group

<script setup>
import { ref } from 'vue'
import { RadioGroup, RadioGroupItem } from '@jaltech/vuejs-ui/radio-group'
const value = ref('comfortable')
</script>

A set of checkable buttons where only one can be selected at a time.

<ClientOnly>
<div class="demo" style="display:block">
  <RadioGroup v-model="value">
    <div style="display:flex;align-items:center;gap:.5rem">
      <RadioGroupItem id="r1" value="default" />
      <label for="r1" style="font-size:14px">Default</label>
    </div>
    <div style="display:flex;align-items:center;gap:.5rem">
      <RadioGroupItem id="r2" value="comfortable" />
      <label for="r2" style="font-size:14px">Comfortable</label>
    </div>
    <div style="display:flex;align-items:center;gap:.5rem">
      <RadioGroupItem id="r3" value="compact" />
      <label for="r3" style="font-size:14px">Compact</label>
    </div>
  </RadioGroup>
  <p style="margin-top:.75rem;font-size:13px;color:hsl(var(--muted-foreground))">Selected: {{ value }}</p>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup, RadioGroupItem } from '@jaltech/vuejs-ui/radio-group'
const value = ref('comfortable')
</script>

<template>
  <RadioGroup v-model="value">
    <div>
      <RadioGroupItem id="r1" value="default" />
      <label for="r1">Default</label>
    </div>
    <div>
      <RadioGroupItem id="r2" value="comfortable" />
      <label for="r2">Comfortable</label>
    </div>
    <div>
      <RadioGroupItem id="r3" value="compact" />
      <label for="r3">Compact</label>
    </div>
  </RadioGroup>
</template>
```
