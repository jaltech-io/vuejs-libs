<script setup lang="ts">
import { Check, ChevronsUpDown } from '@lucide/vue';
import type { AcceptableValue } from 'reka-ui';
import { ref } from 'vue';
import { Button } from '../button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../command';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { cn } from '../utils';

type GenericOption = Record<string, AcceptableValue>;

const props = defineProps<{
  modelValue: AcceptableValue;
  options: GenericOption[];
  valueKey?: string;
  labelKey?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  class?: string;
}>();

const emit = defineEmits<(e: 'update:modelValue', value: AcceptableValue) => void>();

const valueField = props.valueKey ?? 'id';
const labelField = props.labelKey ?? 'name';

const open = ref(false);

const labelOf = (value: AcceptableValue) => props.options.find((option) => option[valueField] === value)?.[labelField];

function select(value: AcceptableValue) {
  emit('update:modelValue', value);
  open.value = false;
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        type="button"
        :disabled="props.disabled"
        :class="cn('w-full justify-between font-normal', !props.modelValue && 'text-muted-foreground', props.class)"
      >
        <span class="truncate">
          {{ props.modelValue ? (labelOf(props.modelValue) ?? props.modelValue) : (props.placeholder ?? 'Sélectionner…') }}
        </span>
        <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-(--reka-popover-trigger-width) p-0" align="start">
      <Command>
        <CommandInput :placeholder="props.searchPlaceholder ?? 'Rechercher…'" />
        <CommandEmpty>{{ props.emptyText ?? 'Aucun résultat' }}</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="option in props.options"
              :key="String(option[valueField])"
              :value="option[valueField]"
              @select="() => select(option[valueField])"
            >
              <Check :class="cn('mr-2 size-4', props.modelValue === option[valueField] ? 'opacity-100' : 'opacity-0')" />
              {{ option[labelField] }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
