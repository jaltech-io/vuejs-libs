# Avatar

<script setup>
import { Avatar, AvatarFallback, AvatarImage } from '@jaltech/vuejs-ui/avatar'
</script>

An image element with a text fallback for representing a user.

<div class="demo">
  <Avatar>
    <AvatarImage src="https://github.com/vuejs.png" alt="Vue" />
    <AvatarFallback>VU</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="" alt="" />
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
</div>

## Code

```vue
<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@jaltech/vuejs-ui/avatar'
</script>

<template>
  <Avatar>
    <AvatarImage src="https://github.com/vuejs.png" alt="Vue" />
    <AvatarFallback>VU</AvatarFallback>
  </Avatar>
</template>
```
