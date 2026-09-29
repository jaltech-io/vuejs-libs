# Aspect Ratio

<script setup>
import { AspectRatio } from '@jaltech/vuejs-ui/aspect-ratio'
</script>

Constrains its content to a desired width-to-height ratio.

<div class="demo" style="display:block">
  <div style="width:320px">
    <AspectRatio :ratio="16 / 9">
      <img
        src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=800&dpr=2&q=80"
        alt="Landscape"
        style="width:100%;height:100%;object-fit:cover;border-radius:8px"
      />
    </AspectRatio>
  </div>
</div>

## Code

```vue
<script setup lang="ts">
import { AspectRatio } from '@jaltech/vuejs-ui/aspect-ratio'
</script>

<template>
  <div style="width:320px">
    <AspectRatio :ratio="16 / 9">
      <img src="/landscape.jpg" alt="Landscape" style="width:100%;height:100%;object-fit:cover" />
    </AspectRatio>
  </div>
</template>
```
