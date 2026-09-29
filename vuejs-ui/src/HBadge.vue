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
  green: 'bg-[var(--h-green-50)] text-[var(--h-green-700)]',
  amber: 'bg-[var(--h-amber-50)] text-[var(--h-amber-700)]',
  red: 'bg-[var(--h-red-50)] text-[var(--h-red-700)]',
  blue: 'bg-[var(--h-blue-50)] text-[var(--h-blue-800)]',
  purple: 'bg-[var(--h-purple-50)] text-[var(--h-purple-700)]',
  gray: 'bg-[var(--h-surface2)] text-[var(--h-text-2)] border-[0.5px] border-[var(--h-border)]',
}[props.variant];
</script>
