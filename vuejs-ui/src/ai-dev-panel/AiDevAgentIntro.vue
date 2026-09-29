<template>
  <div
    class="mb-4 flex items-center gap-2.5 rounded-[var(--h-radius)] border-[0.5px] border-[var(--h-border)]
           bg-[var(--h-surface2)] px-3.5 py-2.5 animate-[h-fade-in_0.3s_ease]"
  >
    <div class="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--h-blue-50)]">
      <span class="absolute inset-0 rounded-full bg-[var(--h-blue-50)] animate-ping" />
      <component :is="icon" :size="15" class="relative text-[var(--h-blue-600)]" />
    </div>
    <span class="text-[13px] font-semibold text-[var(--h-text)] shrink-0">{{ title }}</span>
    <span class="text-[13px] text-[var(--h-text-3)]">{{ description }}</span>
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
