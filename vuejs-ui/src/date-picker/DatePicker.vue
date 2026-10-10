<script setup lang="ts">
import { getLocalTimeZone, parseDate } from '@internationalized/date';
import { IconCalendar, IconX } from '@tabler/icons-vue';
import type { DateValue } from 'reka-ui';
import { computed, ref } from 'vue';
import { Button } from '../button';
import { Calendar } from '../calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { useLibraryTexts } from '../texts';
import { cn } from '../utils';

/**
 * Sélecteur de date (shadcn : Popover + Calendar) — remplace `<input type="date">`.
 * La valeur est une date ISO `AAAA-MM-JJ` (ou `null`), comme celle d'un champ date natif.
 */
const props = withDefaults(
  defineProps<{
    modelValue?: string | null;
    placeholder?: string;
    /** Affiche une croix pour vider la date. */
    clearable?: boolean;
    disabled?: boolean;
    /** Langue du calendrier et de la date affichée. Défaut : `locale` des textes de la lib (`fr-FR`). */
    locale?: string;
    size?: 'default' | 'sm';
    class?: string;
  }>(),
  { clearable: true, size: 'default' },
);

const emit = defineEmits<{ 'update:modelValue': [value: string | null] }>();

const texts = useLibraryTexts();
const locale = computed(() => props.locale ?? texts.value.locale);

const open = ref(false);

const value = computed<DateValue | undefined>(() => {
  if (!props.modelValue) return undefined;
  try {
    return parseDate(props.modelValue.slice(0, 10));
  } catch {
    return undefined;
  }
});

const label = computed(() =>
  value.value
    ? new Intl.DateTimeFormat(locale.value, { dateStyle: 'medium' }).format(value.value.toDate(getLocalTimeZone()))
    : null,
);

function select(date: DateValue | undefined) {
  emit('update:modelValue', date ? date.toString().slice(0, 10) : null);
  open.value = false;
}
</script>

<template>
  <div data-slot="date-picker" :class="cn('relative w-full', props.class)">
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          type="button"
          :disabled="props.disabled"
          :class="
            cn(
              'w-full justify-start gap-2 font-normal',
              props.size === 'sm' ? 'h-8 px-2.5 text-compact' : 'h-9',
              !label && 'text-muted-foreground',
              props.clearable && label && 'pr-8',
            )
          "
        >
          <IconCalendar class="size-4 shrink-0 opacity-60" />
          <span class="truncate">{{ label ?? props.placeholder ?? texts.datePicker.placeholder }}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0" align="start">
        <Calendar
          :model-value="value"
          :default-placeholder="value"
          :locale="locale"
          :week-starts-on="1"
          initial-focus
          @update:model-value="(date) => select(date as DateValue | undefined)"
        />
      </PopoverContent>
    </Popover>
    <button
      v-if="props.clearable && label && !props.disabled"
      type="button"
      :aria-label="texts.datePicker.clear"
      class="absolute top-1/2 right-1.5 grid size-6 -translate-y-1/2 place-items-center rounded-sm text-muted-foreground hover:bg-accent hover:text-foreground"
      @click="emit('update:modelValue', null)"
    >
      <IconX class="size-3.5" />
    </button>
  </div>
</template>
