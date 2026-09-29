# Input OTP

<script setup>
import { ref } from 'vue'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@jaltech/vuejs-ui/input-otp'
const code = ref('')
</script>

A one-time-password input bound with `v-model`, split into individual slots.

<ClientOnly>
<div class="demo" style="display:block">
  <InputOTP :maxlength="6" v-model="code">
    <InputOTPGroup>
      <InputOTPSlot :index="0" />
      <InputOTPSlot :index="1" />
      <InputOTPSlot :index="2" />
    </InputOTPGroup>
    <InputOTPSeparator />
    <InputOTPGroup>
      <InputOTPSlot :index="3" />
      <InputOTPSlot :index="4" />
      <InputOTPSlot :index="5" />
    </InputOTPGroup>
  </InputOTP>
  <p style="margin-top:.75rem;font-size:13px;color:hsl(var(--muted-foreground))">Value: {{ code || '—' }}</p>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@jaltech/vuejs-ui/input-otp'
const code = ref('')
</script>

<template>
  <InputOTP :maxlength="6" v-model="code">
    <InputOTPGroup>
      <InputOTPSlot :index="0" />
      <InputOTPSlot :index="1" />
      <InputOTPSlot :index="2" />
    </InputOTPGroup>
    <InputOTPSeparator />
    <InputOTPGroup>
      <InputOTPSlot :index="3" />
      <InputOTPSlot :index="4" />
      <InputOTPSlot :index="5" />
    </InputOTPGroup>
  </InputOTP>
</template>
```
