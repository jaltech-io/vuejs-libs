# Tabs

<script setup>
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@jaltech/vuejs-ui/tabs'
</script>

Switches between panels of related content.

<ClientOnly>
<div class="demo" style="display:block">
  <Tabs default-value="account" style="max-width:360px">
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <p style="margin:0;font-size:14px">Manage your account details here.</p>
    </TabsContent>
    <TabsContent value="password">
      <p style="margin:0;font-size:14px">Change your password here.</p>
    </TabsContent>
  </Tabs>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@jaltech/vuejs-ui/tabs'
</script>

<template>
  <Tabs default-value="account">
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account">Manage your account details here.</TabsContent>
    <TabsContent value="password">Change your password here.</TabsContent>
  </Tabs>
</template>
```
