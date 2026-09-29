# Attachment

<script setup>
import { Attachment, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle } from '@jaltech/vuejs-ui/attachment'
</script>

A card that represents an uploaded or attached file.

<div class="demo" style="display:block">
  <Attachment>
    <AttachmentMedia>📄</AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>report.pdf</AttachmentTitle>
      <AttachmentDescription>1.2 MB</AttachmentDescription>
    </AttachmentContent>
  </Attachment>
</div>

## Code

```vue
<script setup lang="ts">
import { Attachment, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle } from '@jaltech/vuejs-ui/attachment'
</script>

<template>
  <Attachment>
    <AttachmentMedia>📄</AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>report.pdf</AttachmentTitle>
      <AttachmentDescription>1.2 MB</AttachmentDescription>
    </AttachmentContent>
  </Attachment>
</template>
```
