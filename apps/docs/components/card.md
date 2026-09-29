# Card

<script setup>
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@jaltech/vuejs-ui/card'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

A surface that groups related content and actions.

<div class="demo" style="display:block">
  <Card style="max-width:360px">
    <CardHeader>
      <CardTitle>Project settings</CardTitle>
      <CardDescription>Manage your project preferences.</CardDescription>
    </CardHeader>
    <CardContent>
      <p style="margin:0;font-size:14px">Card content goes here.</p>
    </CardContent>
    <CardFooter>
      <Button size="sm">Save</Button>
    </CardFooter>
  </Card>
</div>

## Code

```vue
<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@jaltech/vuejs-ui/card'
import { Button } from '@jaltech/vuejs-ui/button'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Project settings</CardTitle>
      <CardDescription>Manage your project preferences.</CardDescription>
    </CardHeader>
    <CardContent>Card content goes here.</CardContent>
    <CardFooter>
      <Button size="sm">Save</Button>
    </CardFooter>
  </Card>
</template>
```
