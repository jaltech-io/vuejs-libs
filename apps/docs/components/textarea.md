# Textarea

<script setup>
import { ref } from 'vue'
import { Textarea } from '@jaltech/vuejs-ui/textarea'
const value = ref('')
</script>

A multi-line text field bound with `v-model`.

<ClientOnly>
<div class="demo" style="display:block">
  <Textarea v-model="value" placeholder="Write your message…" style="max-width:360px" />
  <p style="margin-top:.75rem;font-size:13px;color:hsl(var(--muted-foreground))">Length: {{ value.length }}</p>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from '@jaltech/vuejs-ui/textarea'
const value = ref('')
</script>

<template>
  <Textarea v-model="value" placeholder="Write your message…" />
</template>
```
