<script setup lang="ts">
import { Loader2Icon } from 'lucide-vue-next';
import HTooltip from './HTooltip.vue';

defineProps<{
  title: string;
  pending?: boolean;
  disabled?: boolean;
  destructive?: boolean;
}>();

defineEmits<(e: 'click') => void>();
</script>

<template>
  <HTooltip placement="top-end" :text="title">
    <button
      type="button"
      :disabled="disabled || pending"
      @click="$emit('click')"
      class="flex size-7 items-center justify-center rounded-md border bg-secondary hover:bg-accent disabled:opacity-50"
      :class="destructive ? 'text-destructive' : ''"
    >
      <Loader2Icon v-if="pending" class="size-3.5 animate-spin" />
      <slot v-else />
    </button>
  </HTooltip>
</template>
