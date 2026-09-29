# Message Scroller

<script setup>
import { ref } from 'vue'
import { MessageScroller, MessageScrollerProvider, MessageScrollerViewport, MessageScrollerContent, MessageScrollerItem, MessageScrollerButton } from '@jaltech/vuejs-ui/message-scroller'
const messages = ref(
  Array.from({ length: 12 }, (_, i) => ({ id: String(i + 1), text: `Message ${i + 1}` }))
)
</script>

A scrollable message list that keeps itself pinned to the newest item, with a jump-to-end button.

<ClientOnly>
<div class="demo" style="display:block">
  <MessageScrollerProvider :auto-scroll="true">
    <MessageScroller class="border" style="height:16rem;border-radius:var(--radius, 8px)">
      <MessageScrollerViewport style="padding:1rem">
        <MessageScrollerContent>
          <MessageScrollerItem v-for="m in messages" :key="m.id" :message-id="m.id">
            <div style="font-size:14px">{{ m.text }}</div>
          </MessageScrollerItem>
        </MessageScrollerContent>
      </MessageScrollerViewport>
      <MessageScrollerButton direction="end" />
    </MessageScroller>
  </MessageScrollerProvider>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { MessageScroller, MessageScrollerProvider, MessageScrollerViewport, MessageScrollerContent, MessageScrollerItem, MessageScrollerButton } from '@jaltech/vuejs-ui/message-scroller'

const messages = ref(
  Array.from({ length: 12 }, (_, i) => ({ id: String(i + 1), text: `Message ${i + 1}` }))
)
</script>

<template>
  <MessageScrollerProvider :auto-scroll="true">
    <MessageScroller class="h-64 rounded-md border">
      <MessageScrollerViewport class="p-4">
        <MessageScrollerContent>
          <MessageScrollerItem v-for="m in messages" :key="m.id" :message-id="m.id">
            <div>{{ m.text }}</div>
          </MessageScrollerItem>
        </MessageScrollerContent>
      </MessageScrollerViewport>
      <MessageScrollerButton direction="end" />
    </MessageScroller>
  </MessageScrollerProvider>
</template>
```
