# Carousel

<script setup>
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@jaltech/vuejs-ui/carousel'
</script>

A slideshow for cycling through a set of items, with previous/next controls.

<ClientOnly>
<div class="demo">
  <Carousel style="width:240px">
    <CarouselContent>
      <CarouselItem v-for="n in 5" :key="n">
        <div style="display:flex;align-items:center;justify-content:center;height:160px;border:1px solid hsl(var(--border));border-radius:8px;font-size:2rem;font-weight:600">
          {{ n }}
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@jaltech/vuejs-ui/carousel'
</script>

<template>
  <Carousel style="width:240px">
    <CarouselContent>
      <CarouselItem v-for="n in 5" :key="n">
        <div class="slide">{{ n }}</div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
```
