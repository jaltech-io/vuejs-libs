<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-[3px] flex items-center justify-center p-4 animate-[bd-in_0.15s_ease]"
      @click.self="$emit('update:modelValue', false)"
    >
      <div
        class="bg-(--h-surface) border-[0.5px] border-(--h-border-strong) rounded-(--h-radius-lg) w-full max-w-[480px] max-h-[calc(100dvh-2rem)] overflow-y-auto
               shadow-[0_24px_70px_rgba(0,0,0,0.25),0_4px_16px_rgba(0,0,0,0.1)] animate-[panel-in_0.18s_ease]"
        :style="{ maxWidth: width }"
      >
        <div class="flex items-center justify-between pt-4.5 px-5.5 pb-3.5 border-b-[0.5px] border-b-(--h-border)">
          <span class="font-semibold text-[15px] text-(--h-text) tracking-[-0.02em]">{{ title }}</span>
          <button
            class="bg-transparent border-0 cursor-pointer text-(--h-text-3) p-1 rounded-md flex items-center
                   transition-[background,color] duration-100 hover:bg-(--h-surface2) hover:text-(--h-text)"
            @click="$emit('update:modelValue', false)"
          >
            <IconX :size="16" />
          </button>
        </div>
        <div class="p-5.5 flex flex-col gap-4">
          <slot />
        </div>
        <div
          v-if="$slots.footer"
          class="pt-3.5 px-5.5 pb-4.5 flex justify-end gap-2 border-t-[0.5px] border-t-(--h-border)"
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
