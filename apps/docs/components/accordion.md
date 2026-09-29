# Accordion

<script setup>
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@jaltech/vuejs-ui/accordion'
</script>

A vertically stacked set of headings that each reveal a section of content.

<ClientOnly>
<div class="demo" style="display:block">
  <Accordion type="single" collapsible style="max-width:420px">
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>Yes. It follows the WAI-ARIA design pattern.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Can I open one at a time?</AccordionTrigger>
      <AccordionContent>Yes, with <code>type="single"</code> and <code>collapsible</code>.</AccordionContent>
    </AccordionItem>
  </Accordion>
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@jaltech/vuejs-ui/accordion'
</script>

<template>
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>Yes. It follows the WAI-ARIA design pattern.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Can I open one at a time?</AccordionTrigger>
      <AccordionContent>Yes, with <code>type="single"</code> and <code>collapsible</code>.</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
```
