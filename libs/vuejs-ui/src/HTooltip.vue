<template>
  <div class="relative inline-flex" ref="wrapRef" @mouseenter="show = true" @mouseleave="show = false" @focus="show = true" @blur="show = false">
    <slot />
    <Teleport to="body">
      <div
        v-if="show && text"
        class="pointer-events-none bg-[var(--h-text)] text-[var(--h-bg,#fff)] text-[11.5px] font-medium px-2 py-1 rounded-md
               whitespace-nowrap shadow-[0_2px_8px_rgba(0,0,0,0.18)] tracking-[0.01em] font-[Inter,_sans-serif]
               animate-[h-tip-fade_0.12s_ease-out_both] dark:bg-[#e2e8f0] dark:text-[#0f172a]"
        :style="bubbleStyle"
      >{{ text }}</div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { type CSSProperties, computed, ref } from 'vue';

const props = defineProps<{ text: string; placement?: 'top' | 'top-end' | 'bottom' | 'left' }>();

const show = ref(false);
const wrapRef = ref<HTMLElement | null>(null);

const bubbleStyle = computed<CSSProperties>(() => {
  if (!show.value) return {};
  const el = wrapRef.value;
  if (!el) return {};
  const r = el.getBoundingClientRect();
  const p = props.placement ?? 'top';
  if (p === 'top-end') {
    return {
      position: 'fixed',
      top: `${r.top - 4}px`,
      left: `${r.right}px`,
      transform: 'translate(-100%, -100%)',
      zIndex: '9999',
    };
  }
  if (p === 'left') {
    return {
      position: 'fixed',
      top: `${r.top + r.height / 2}px`,
      left: `${r.left - 4}px`,
      transform: 'translate(-100%, -50%)',
      zIndex: '9999',
    };
  }
  const above = p === 'top';
  return {
    position: 'fixed',
    left: `${r.left + r.width / 2}px`,
    top: above ? `${r.top - 4}px` : `${r.bottom + 4}px`,
    transform: above ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
    zIndex: '9999',
  };
});
</script>

<style>
/* Tailwind ne genere pas de @keyframes — reference uniquement via animate-[...] */
@keyframes h-tip-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
</style>
