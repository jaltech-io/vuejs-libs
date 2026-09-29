# Marker

<script setup>
import { Marker, MarkerContent } from '@jaltech/vuejs-ui/marker'
</script>

A small labelled marker used to annotate content, with an optional separator variant.

<div class="demo" style="display:block">
  <Marker>
    <MarkerContent>Today</MarkerContent>
  </Marker>
  <Marker variant="separator" style="margin-top:.75rem">
    <MarkerContent>New messages</MarkerContent>
  </Marker>
</div>

## Code

```vue
<script setup lang="ts">
import { Marker, MarkerContent } from '@jaltech/vuejs-ui/marker'
</script>

<template>
  <Marker>
    <MarkerContent>Today</MarkerContent>
  </Marker>

  <Marker variant="separator">
    <MarkerContent>New messages</MarkerContent>
  </Marker>
</template>
```
