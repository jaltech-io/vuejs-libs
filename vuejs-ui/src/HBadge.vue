<template>
  <span :class="['text-[11px] px-[9px] py-[3px] rounded-full font-medium whitespace-nowrap', variantClass]"><slot /></span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'green' | 'amber' | 'red' | 'blue' | 'purple' | 'gray';
  }>(),
  { variant: 'gray' },
);

const variantClass = {
  green: 'bg-(--h-green-50) text-(--h-green-700)',
  amber: 'bg-(--h-amber-50) text-(--h-amber-700)',
  red: 'bg-(--h-red-50) text-(--h-red-700)',
  blue: 'bg-(--h-blue-50) text-(--h-blue-800)',
  purple: 'bg-(--h-purple-50) text-(--h-purple-700)',
  gray: 'bg-(--h-surface2) text-(--h-text-2) border-[0.5px] border-(--h-border)',
}[props.variant];
</script>
