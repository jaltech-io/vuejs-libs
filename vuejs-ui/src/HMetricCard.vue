<template>
  <div
    class="bg-(--h-surface) border-[0.5px] border-(--h-border) rounded-(--h-radius-lg) px-5 py-[18px]
           shadow-[0_1px_3px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04)] transition-[box-shadow,border-color] duration-150
           hover:border-(--h-border-strong) hover:shadow-[0_2px_6px_rgba(0,0,0,0.09),0_4px_16px_rgba(0,0,0,0.06)]"
  >
    <div class="text-2xs font-medium tracking-[0.06em] uppercase text-(--h-text-3) mb-2">{{ label }}</div>
    <div class="text-3xl font-bold tabular-nums leading-none text-(--h-text) tracking-[-0.03em]">{{ value }}</div>
    <div v-if="sub" class="text-xs text-(--h-text-3) mt-1.5">{{ sub }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; value: string | number; sub?: string }>();
</script>
