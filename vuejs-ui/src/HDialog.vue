<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-[3px] flex items-center justify-center p-4 animate-[bd-in_0.15s_ease]"
      @click.self="$emit('update:modelValue', false)"
    >
      <div
        class="bg-[var(--h-surface)] border-[0.5px] border-[var(--h-border-strong)] rounded-[var(--h-radius-lg)] w-full max-w-[480px]
               shadow-[0_24px_70px_rgba(0,0,0,0.25),0_4px_16px_rgba(0,0,0,0.1)] animate-[panel-in_0.18s_ease]"
        :style="{ maxWidth: width }"
      >
        <div class="flex items-center justify-between pt-[1.125rem] px-[1.375rem] pb-[0.875rem] border-b-[0.5px] border-b-[var(--h-border)]">
          <span class="font-semibold text-[15px] text-[var(--h-text)] tracking-[-0.02em]">{{ title }}</span>
          <button
            class="bg-transparent border-0 cursor-pointer text-[var(--h-text-3)] p-1 rounded-md flex items-center
                   transition-[background,color] duration-100 hover:bg-[var(--h-surface2)] hover:text-[var(--h-text)]"
            @click="$emit('update:modelValue', false)"
          >
            <IconX :size="16" />
          </button>
        </div>
        <div class="p-[1.375rem] flex flex-col gap-4">
          <slot />
        </div>
        <div
          v-if="$slots.footer"
          class="pt-[0.875rem] px-[1.375rem] pb-[1.125rem] flex justify-end gap-2 border-t-[0.5px] border-t-[var(--h-border)]"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { IconX } from '@tabler/icons-vue';

defineProps<{ modelValue: boolean; title: string; width?: string }>();
defineEmits<{ 'update:modelValue': [v: boolean] }>();
</script>

<style scoped>
/* Tailwind ne genere pas de @keyframes — reference uniquement via animate-[...] */
@keyframes bd-in { from { opacity: 0 } to { opacity: 1 } }
@keyframes panel-in { from { transform: translateY(8px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
</style>
