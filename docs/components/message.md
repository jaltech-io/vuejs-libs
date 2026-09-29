# Message

<script setup>
import { Message, MessageAvatar, MessageContent, MessageHeader, MessageFooter, MessageGroup } from '@jaltech/vuejs-ui/message'
</script>

A chat message row with an avatar, content, and optional header/footer, alignable to either side.

<div class="demo" style="display:block">
  <MessageGroup style="max-width:420px">
    <Message align="start">
      <MessageAvatar style="width:2rem;height:2rem">AI</MessageAvatar>
      <MessageContent>
        <MessageHeader>Assistant</MessageHeader>
        <div>How can I help you today?</div>
      </MessageContent>
    </Message>
    <Message align="end">
      <MessageContent>
        <div>Show me the docs.</div>
        <MessageFooter>Just now</MessageFooter>
      </MessageContent>
    </Message>
  </MessageGroup>
</div>

## Code

```vue
<script setup lang="ts">
import { Message, MessageAvatar, MessageContent, MessageHeader, MessageFooter, MessageGroup } from '@jaltech/vuejs-ui/message'
</script>

<template>
  <MessageGroup>
    <Message align="start">
      <MessageAvatar>AI</MessageAvatar>
      <MessageContent>
        <MessageHeader>Assistant</MessageHeader>
        <div>How can I help you today?</div>
      </MessageContent>
    </Message>
    <Message align="end">
      <MessageContent>
        <div>Show me the docs.</div>
        <MessageFooter>Just now</MessageFooter>
      </MessageContent>
    </Message>
  </MessageGroup>
</template>
```
