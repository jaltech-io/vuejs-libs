# Stepper

<script setup>
import { Stepper, StepperItem, StepperTrigger, StepperIndicator, StepperTitle, StepperSeparator } from '@jaltech/vuejs-ui/stepper'
</script>

Guides a user through a sequence of steps, tracking the active one.

<ClientOnly>
<div class="demo">
  <Stepper :default-value="2">
    <StepperItem :step="1">
      <StepperTrigger>
        <StepperIndicator>1</StepperIndicator>
        <StepperTitle>Details</StepperTitle>
      </StepperTrigger>
      <StepperSeparator style="width:2rem;height:2px" />
    </StepperItem>
    <StepperItem :step="2">
      <StepperTrigger>
        <StepperIndicator>2</StepperIndicator>
        <StepperTitle>Shipping</StepperTitle>
      </StepperTrigger>
      <StepperSeparator style="width:2rem;height:2px" />
    </StepperItem>
    <StepperItem :step="3">
      <StepperTrigger>
        <StepperIndicator>3</StepperIndicator>
        <StepperTitle>Payment</StepperTitle>
      </StepperTrigger>
    </StepperItem>
  </Stepper>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { Stepper, StepperItem, StepperTrigger, StepperIndicator, StepperTitle, StepperSeparator } from '@jaltech/vuejs-ui/stepper'
</script>

<template>
  <Stepper :default-value="2">
    <StepperItem :step="1">
      <StepperTrigger>
        <StepperIndicator>1</StepperIndicator>
        <StepperTitle>Details</StepperTitle>
      </StepperTrigger>
      <StepperSeparator class="w-8 h-0.5" />
    </StepperItem>
    <StepperItem :step="2">
      <StepperTrigger>
        <StepperIndicator>2</StepperIndicator>
        <StepperTitle>Shipping</StepperTitle>
      </StepperTrigger>
      <StepperSeparator class="w-8 h-0.5" />
    </StepperItem>
    <StepperItem :step="3">
      <StepperTrigger>
        <StepperIndicator>3</StepperIndicator>
        <StepperTitle>Payment</StepperTitle>
      </StepperTrigger>
    </StepperItem>
  </Stepper>
</template>
```
