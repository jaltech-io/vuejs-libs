<template>
  <div class="relative" ref="rootRef">
    <!-- Chip filtre -->
    <div
      class="inline-flex h-7 cursor-pointer select-none items-center rounded-md border text-xs font-medium transition-all overflow-hidden"
      :class="hasValue
        ? 'border-foreground/20 bg-foreground/5 hover:bg-foreground/10'
        : 'border-input bg-background text-muted-foreground hover:bg-accent'"
    >
      <!-- Zone cliquable -->
      <span class="flex items-center gap-1 pl-2 pr-1.5 h-full" @click="toggleOpen">
        <TypeIcon v-if="option.value === 'title'" class="size-3 shrink-0 opacity-50" />
        <ListIcon v-else class="size-3 shrink-0 opacity-50" />
        <span class="capitalize font-semibold text-foreground">{{ option.label }}</span>
        <template v-if="hasValue">
          <span class="text-muted-foreground font-normal">{{ activeOperatorLabel }}</span>
          <span class="max-w-[100px] truncate font-semibold text-foreground">{{ valueLabel }}</span>
        </template>
      </span>
      <!-- Séparateur + bouton supprimer -->
      <span class="mx-1 h-3.5 w-px bg-border/70" />
      <span
        class="flex h-full items-center px-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        @click.stop="onRemove"
      >
        <XIcon class="size-3" />
      </span>
    </div>

    <!-- Panel -->
    <Teleport to="body">
      <div
        v-if="open"
        :style="panelStyle"
        class="fixed z-600 w-72 rounded-md border bg-popover shadow-xl"
        @mousedown.stop
        @click.stop
      >
        <!-- Header: field name + operator picker -->
        <div class="flex items-center gap-2 border-b px-3 py-2">
          <span class="text-xs font-semibold capitalize text-foreground">{{ option.label }}</span>
          <div class="relative ml-auto" ref="opRef">
            <button
              type="button"
              @click.stop="opOpen = !opOpen"
              class="inline-flex h-6 items-center gap-1 rounded border border-input bg-background px-2 text-xs hover:bg-accent"
            >
              {{ activeOperatorLabel }}
              <ChevronDownIcon class="size-3 opacity-60" />
            </button>
            <div
              v-if="opOpen"
              class="absolute left-0 top-full z-700 mt-1 min-w-[140px] rounded-md border bg-popover shadow-md"
            >
              <div
                v-for="op in operators"
                :key="op.value"
                @mousedown.prevent.stop="selectOperator(op.value)"
                class="flex cursor-pointer items-center px-3 py-1.5 text-xs hover:bg-accent"
                :class="{ 'bg-accent font-medium': localOperator === op.value }"
              >{{ op.label }}</div>
            </div>
          </div>
        </div>

        <!-- Body -->
        <div class="p-2">
          <!-- "is empty" / "is not empty" — no value needed -->
          <template v-if="localOperator === 'empty' || localOperator === 'not_empty'">
            <p class="px-2 py-3 text-center text-xs text-muted-foreground italic">{{ texts.dataTableFilters.noValueNeeded }}</p>
          </template>

          <!-- Text input for title-like fields -->
          <template v-else-if="!option.options?.length">
            <input
              ref="inputRef"
              v-model="textValue"
              :placeholder="texts.dataTableFilters.textPlaceholder(option.label)"
              class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-hidden placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
              @keyup.escape="open = false"
            />
          </template>

          <!-- Checkboxes for enum fields -->
          <template v-else>
            <div class="relative mb-2">
              <SearchIcon class="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                v-model="optionSearch"
                :placeholder="texts.dataTableFilters.searchPlaceholder"
                class="w-full rounded-md border border-input bg-background py-1.5 pl-7 pr-3 text-xs outline-hidden placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
              />
            </div>
            <div class="max-h-44 space-y-0.5 overflow-y-auto">
              <div
                v-for="opt in filteredOptions"
                :key="opt.value"
                class="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
                @mousedown.prevent.stop="toggleEnumValue(opt.value)"
              >
                <div
                  class="flex size-4 shrink-0 items-center justify-center rounded border"
                  :class="selectedValues.includes(opt.value) ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-background'"
                >
                  <svg v-if="selectedValues.includes(opt.value)" viewBox="0 0 12 12" class="size-3 fill-none stroke-current" stroke-width="2" stroke-linecap="round">
                    <polyline points="1,6 4,10 11,2"/>
                  </svg>
                </div>
                <span class="capitalize">{{ opt.label }}</span>
              </div>
              <p v-if="filteredOptions.length === 0" class="py-2 text-center text-xs text-muted-foreground">{{ texts.dataTableFilters.noOption }}</p>
            </div>
          </template>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { DataTableFilterOption } from '@jaltech/vuejs-ui/types';
import { ChevronDownIcon, ListIcon, SearchIcon, TypeIcon, XIcon } from 'lucide-vue-next';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useLibraryTexts } from '../../texts';

const props = defineProps<{
  option: DataTableFilterOption;
  autoOpen?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update', opt: DataTableFilterOption): void;
  (e: 'remove', opt: DataTableFilterOption): void;
}>();

const rootRef = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const opRef = ref<HTMLElement | null>(null);
const open = ref(false);
const opOpen = ref(false);
const panelStyle = ref<Record<string, string>>({});
const optionSearch = ref('');

const texts = useLibraryTexts();

const textOperators = computed(() => {
  const labels = texts.value.dataTableFilters;
  return [
    { label: labels.contains, value: 'ilike' },
    { label: labels.notContains, value: 'not ilike' },
    { label: labels.equals, value: 'eq' },
    { label: labels.notEquals, value: 'ne' },
    { label: labels.startsWith, value: 'startswith' },
    { label: labels.endsWith, value: 'endswith' },
    { label: labels.isEmpty, value: 'empty' },
    { label: labels.isNotEmpty, value: 'not_empty' },
  ];
});
const enumOperators = computed(() => {
  const labels = texts.value.dataTableFilters;
  return [
    { label: labels.is, value: 'eq' },
    { label: labels.isNot, value: 'ne' },
    { label: labels.isEmpty, value: 'empty' },
    { label: labels.isNotEmpty, value: 'not_empty' },
  ];
});

const operators = computed(() => (props.option.options?.length ? enumOperators.value : textOperators.value));

const localOperator = ref(props.option.filterOperator ?? (props.option.options?.length ? 'eq' : 'ilike'));
const textValue = ref(props.option.filterValues?.[0] ?? '');
const selectedValues = ref<string[]>([...(props.option.filterValues ?? [])]);

const activeOperatorLabel = computed(
  () => operators.value.find((o) => o.value === localOperator.value)?.label ?? localOperator.value,
);

const hasValue = computed(() => {
  if (localOperator.value === 'empty' || localOperator.value === 'not_empty') return true;
  return props.option.options?.length ? selectedValues.value.length > 0 : !!textValue.value.trim();
});

const valueLabel = computed(() => {
  if (localOperator.value === 'empty' || localOperator.value === 'not_empty') return '';
  return props.option.options?.length ? selectedValues.value.join(', ') : textValue.value;
});

const filteredOptions = computed(() =>
  (props.option.options ?? []).filter((o) => o.label.toLowerCase().includes(optionSearch.value.toLowerCase())),
);

function calcPos() {
  if (!rootRef.value) return;
  const r = rootRef.value.getBoundingClientRect();
  const panelW = 288;
  const left = Math.min(r.left, window.innerWidth - panelW - 8);
  panelStyle.value = { top: `${r.bottom + 4}px`, left: `${Math.max(4, left)}px` };
}

function toggleOpen() {
  if (open.value) {
    open.value = false;
    return;
  }
  calcPos();
  open.value = true;
  nextTick(() => inputRef.value?.focus());
}

function onRemove() {
  open.value = false;
  emit('remove', props.option);
}

function selectOperator(op: string) {
  localOperator.value = op;
  opOpen.value = false;
  emitUpdate();
  if (op !== 'empty' && op !== 'not_empty') {
    nextTick(() => inputRef.value?.focus());
  }
}

function toggleEnumValue(val: string) {
  const idx = selectedValues.value.indexOf(val);
  if (idx >= 0) selectedValues.value.splice(idx, 1);
  else selectedValues.value.push(val);
  emitUpdate();
}

function emitUpdate() {
  let values: string[];
  if (localOperator.value === 'empty' || localOperator.value === 'not_empty') {
    values = [];
  } else if (props.option.options?.length) {
    values = [...selectedValues.value];
  } else {
    values = textValue.value.trim() ? [textValue.value.trim()] : [];
  }
  emit('update', { ...props.option, filterValues: values, filterOperator: localOperator.value });
}

watch(textValue, () => {
  if (!props.option.options?.length) emitUpdate();
});

function handleOutside(e: MouseEvent) {
  if (!open.value) return;
  if (rootRef.value?.contains(e.target as Node)) return;
  open.value = false;
  opOpen.value = false;
}

onMounted(() => {
  document.addEventListener('mousedown', handleOutside);
  if (props.autoOpen) {
    nextTick(() => {
      calcPos();
      open.value = true;
      nextTick(() => inputRef.value?.focus());
    });
  }
});
onUnmounted(() => document.removeEventListener('mousedown', handleOutside));

// Fix : autoOpen passe false → true après le mount (timing nextTick dans addOption)
watch(
  () => props.autoOpen,
  (val) => {
    if (val && !open.value) {
      nextTick(() => {
        calcPos();
        open.value = true;
        nextTick(() => inputRef.value?.focus());
      });
    }
  },
);

watch(
  () => props.option.filterValues,
  (v) => {
    if (props.option.options?.length) selectedValues.value = [...(v ?? [])];
    else textValue.value = v?.[0] ?? '';
  },
);
watch(
  () => props.option.filterOperator,
  (v) => {
    if (v) localOperator.value = v;
  },
);
</script>
