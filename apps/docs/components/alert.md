# Alert

<script setup>
import { Alert, AlertTitle, AlertDescription } from '@jaltech/vuejs-ui/alert'
</script>

A callout that draws attention to important information.

<div class="demo" style="display:block">
  <Alert style="max-width:420px">
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
  </Alert>
  <Alert variant="destructive" style="max-width:420px;margin-top:.75rem">
    <AlertTitle>Something went wrong</AlertTitle>
    <AlertDescription>Your changes could not be saved. Please try again.</AlertDescription>
  </Alert>
</div>

## Code

```vue
<script setup lang="ts">
import { Alert, AlertTitle, AlertDescription } from '@jaltech/vuejs-ui/alert'
</script>

<template>
  <Alert>
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
  </Alert>

  <Alert variant="destructive">
    <AlertTitle>Something went wrong</AlertTitle>
    <AlertDescription>Your changes could not be saved. Please try again.</AlertDescription>
  </Alert>
</template>
```
