<script setup lang="ts">
import { Check } from '@lucide/vue';
import { ref, watch } from 'vue';
import { Button } from '../button';
import { Input } from '../input';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { cn } from '../utils';
import { DEFAULT_COLOR_PRESETS } from './presets';

/**
 * Sélecteur de couleur (Popover : pastilles + saisie hexadécimale) — remplace `<input type="color">`.
 * La valeur est une couleur hexadécimale `#rrggbb`, comme celle d'un champ couleur natif.
 */
const props = withDefaults(
  defineProps<{
    modelValue?: string | null;
    /** Pastilles proposées (couleurs hexadécimales). */
    presets?: string[];
    disabled?: boolean;
    size?: 'default' | 'sm';
    class?: string;
  }>(),
  { presets: () => DEFAULT_COLOR_PRESETS, size: 'default' },
);

const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const HEX = /^#[0-9a-f]{6}$/i;

const open = ref(false);
const draft = ref(props.modelValue ?? '');

watch(
  () => props.modelValue,
  (value) => {
    draft.value = value ?? '';
  },
);

function choose(color: string) {
  emit('update:modelValue', color.toLowerCase());
}

// La saisie n'est émise que lorsqu'elle forme une couleur complète (#rrggbb).
function onDraft(value: string | number | null) {
  let text = String(value ?? '').trim();
  if (text && !text.startsWith('#')) text = `#${text}`;
  draft.value = text;
  if (HEX.test(text)) choose(text);
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        data-slot="color-picker"
        variant="outline"
        type="button"
        :disabled="props.disabled"
        :class="cn('justify-start gap-2 font-mono font-normal', props.size === 'sm' ? 'h-8 px-2.5 text-compact' : 'h-9', props.class)"
      >
        <span
          class="size-4 shrink-0 rounded-sm border border-black/10"
          :style="{ background: props.modelValue || 'transparent' }"
        />
        <span class="truncate">{{ props.modelValue || '—' }}</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-60 p-3" align="start">
      <div class="grid grid-cols-6 gap-2">
        <button
          v-for="color in props.presets"
          :key="color"
          type="button"
          :aria-label="color"
          class="grid size-7 place-items-center rounded-md border border-black/10 transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden"
          :style="{ background: color }"
          @click="choose(color)"
        >
          <Check v-if="props.modelValue?.toLowerCase() === color.toLowerCase()" class="size-3.5 text-white drop-shadow" />
        </button>
      </div>
      <div class="mt-3 flex items-center gap-2">
        <span class="size-8 shrink-0 rounded-md border" :style="{ background: HEX.test(draft) ? draft : 'transparent' }" />
        <Input
          :model-value="draft"
          class="h-8 font-mono text-compact"
          placeholder="#rrggbb"
          maxlength="7"
          @update:model-value="onDraft"
        />
      </div>
    </PopoverContent>
  </Popover>
</template>
