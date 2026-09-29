# Spinner

<script setup>
import { Spinner } from '@jaltech/vuejs-ui/spinner'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

An animated loading indicator.

<div class="demo">
  <Spinner />
  <Button disabled>
    <Spinner />
    Loading…
  </Button>
</div>

## Code

```vue
<script setup lang="ts">
import { Spinner } from '@jaltech/vuejs-ui/spinner'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

<template>
  <Spinner />
  <Button disabled>
    <Spinner />
    Loading…
  </Button>
</template>
```
