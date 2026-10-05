<template>
  <div
    class="mb-4 flex items-center gap-2.5 rounded-(--h-radius) border-[0.5px] border-(--h-border)
           bg-(--h-surface2) px-3.5 py-2.5 animate-[h-fade-in_0.3s_ease]"
  >
    <div class="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-(--h-blue-50)">
      <span class="absolute inset-0 rounded-full bg-(--h-blue-50) animate-ping" />
      <component :is="icon" :size="15" class="relative text-(--h-blue-600)" />
    </div>
    <span class="text-compact font-semibold text-(--h-text) shrink-0">{{ title }}</span>
    <span class="text-compact text-(--h-text-3)">{{ description }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  icon: Component;
  title: string;
  description: string;
}>();
</script>
