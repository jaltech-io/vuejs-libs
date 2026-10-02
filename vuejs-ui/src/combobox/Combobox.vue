<script setup lang="ts">
import { Check, ChevronsUpDown, X } from '@lucide/vue';
import type { AcceptableValue } from 'reka-ui';
import { computed, ref } from 'vue';
import { Button } from '../button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../command';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { cn } from '../utils';

/**
 * Liste de choix AVEC RECHERCHE — simple (`modelValue` = une valeur) ou multiple (`multiple`,
 * `modelValue` = tableau). Remplace Select partout où l'on choisit dans une liste.
 */
type GenericOption = Record<string, AcceptableValue>;

const props = withDefaults(
  defineProps<{
    modelValue: AcceptableValue | AcceptableValue[];
    options: GenericOption[];
    valueKey?: string;
    labelKey?: string;
    /** Regroupe les options par la valeur de ce champ (titre de groupe). */
    groupKey?: string;
    /** Choix multiple : `modelValue` est un tableau, la liste reste ouverte. */
    multiple?: boolean;
    /** Ajoute en tête une option « aucun » qui émet `null` (ou `[]` en multiple). */
    noneLabel?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    disabled?: boolean;
    size?: 'default' | 'sm';
    class?: string;
  }>(),
  { size: 'default' },
);

const emit = defineEmits<(e: 'update:modelValue', value: AcceptableValue | AcceptableValue[]) => void>();

defineSlots<{
  /** Rendu d'une option (pastille de couleur, badge…). */
  option?: (props: { option: GenericOption; selected: boolean }) => unknown;
  /** Rendu de la valeur dans le déclencheur (choix simple). */
  value?: (props: { option: GenericOption }) => unknown;
}>();

const valueField = computed(() => props.valueKey ?? 'id');
const labelField = computed(() => props.labelKey ?? 'name');

const open = ref(false);

const selectedValues = computed<AcceptableValue[]>(() => {
  if (props.multiple) return Array.isArray(props.modelValue) ? props.modelValue : [];
  return props.modelValue === null || props.modelValue === undefined || props.modelValue === '' ? [] : [props.modelValue as AcceptableValue];
});

const isSelected = (value: AcceptableValue) => selectedValues.value.some((selected) => selected === value);
const optionOf = (value: AcceptableValue) => props.options.find((option) => option[valueField.value] === value);
const labelOf = (value: AcceptableValue) => String(optionOf(value)?.[labelField.value] ?? value);

const groups = computed(() => {
  if (!props.groupKey) return [{ heading: undefined as string | undefined, options: props.options }];
  const byHeading = new Map<string, GenericOption[]>();
  for (const option of props.options) {
    const heading = String(option[props.groupKey] ?? '');
    byHeading.set(heading, [...(byHeading.get(heading) ?? []), option]);
  }
  return [...byHeading].map(([heading, options]) => ({ heading, options }));
});

const triggerLabel = computed(() => {
  if (!selectedValues.value.length) return null;
  if (!props.multiple) return labelOf(selectedValues.value[0]);
  if (selectedValues.value.length <= 2) return selectedValues.value.map(labelOf).join(', ');
  return `${selectedValues.value.length} sélectionnés`;
});

function select(value: AcceptableValue) {
  if (!props.multiple) {
    emit('update:modelValue', value);
    open.value = false;
    return;
  }
  const next = isSelected(value)
    ? selectedValues.value.filter((selected) => selected !== value)
    : [...selectedValues.value, value];
  emit('update:modelValue', next);
}

function selectNone() {
  emit('update:modelValue', props.multiple ? [] : null);
  if (!props.multiple) open.value = false;
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        data-slot="combobox"
        variant="outline"
        role="combobox"
        type="button"
        :aria-expanded="open"
        :disabled="props.disabled"
        :class="
          cn(
            'w-full justify-between gap-2 font-normal',
            props.size === 'sm' ? 'h-8 px-2.5 text-[12.5px]' : 'h-9',
            !triggerLabel && 'text-muted-foreground',
            props.class,
          )
        "
      >
        <span class="min-w-0 truncate text-left">
          <slot
            v-if="triggerLabel && !props.multiple && $slots.value && optionOf(selectedValues[0])"
            name="value"
            :option="optionOf(selectedValues[0])!"
          />
          <template v-else>{{ triggerLabel ?? props.placeholder ?? 'Sélectionner…' }}</template>
        </span>
        <ChevronsUpDown class="size-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-(--reka-popover-trigger-width) min-w-56 p-0" align="start">
      <Command>
        <CommandInput :placeholder="props.searchPlaceholder ?? 'Rechercher…'" />
        <CommandList>
          <CommandEmpty>{{ props.emptyText ?? 'Aucun résultat' }}</CommandEmpty>
          <template v-if="props.noneLabel">
            <CommandGroup>
              <CommandItem value="__combobox_none__" @select="selectNone">
                <Check :class="cn('mr-2 size-4', selectedValues.length ? 'opacity-0' : 'opacity-100')" />
                <span class="text-muted-foreground">{{ props.noneLabel }}</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
          </template>
          <CommandGroup v-for="group in groups" :key="group.heading ?? '__all__'" :heading="group.heading">
            <CommandItem
              v-for="option in group.options"
              :key="String(option[valueField])"
              :value="option[valueField]"
              :disabled="Boolean(option.disabled)"
              @select="() => select(option[valueField])"
            >
              <Check :class="cn('mr-2 size-4 shrink-0', isSelected(option[valueField]) ? 'opacity-100' : 'opacity-0')" />
              <slot name="option" :option="option" :selected="isSelected(option[valueField])">
                <span class="truncate">{{ option[labelField] }}</span>
              </slot>
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <div v-if="props.multiple && selectedValues.length" class="border-t p-1">
          <Button variant="ghost" size="sm" type="button" class="h-7 w-full justify-center gap-1.5 text-xs" @click="selectNone">
            <X class="size-3.5" /> Tout désélectionner
          </Button>
        </div>
      </Command>
    </PopoverContent>
  </Popover>
</template>
