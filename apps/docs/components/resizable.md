# Resizable

<script setup>
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@jaltech/vuejs-ui/resizable'
</script>

Panels arranged into resizable groups with draggable handles.

<ClientOnly>
<div class="demo">
  <ResizablePanelGroup direction="horizontal" class="rounded-lg border" style="max-width:520px;height:200px">
    <ResizablePanel :default-size="50">
      <div style="display:flex;align-items:center;justify-content:center;height:100%;padding:1.5rem;font-size:14px">One</div>
    </ResizablePanel>
    <ResizableHandle with-handle />
    <ResizablePanel :default-size="50">
      <div style="display:flex;align-items:center;justify-content:center;height:100%;padding:1.5rem;font-size:14px">Two</div>
    </ResizablePanel>
  </ResizablePanelGroup>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@jaltech/vuejs-ui/resizable'
</script>

<template>
  <ResizablePanelGroup direction="horizontal" class="rounded-lg border">
    <ResizablePanel :default-size="50">One</ResizablePanel>
    <ResizableHandle with-handle />
    <ResizablePanel :default-size="50">Two</ResizablePanel>
  </ResizablePanelGroup>
</template>
```
