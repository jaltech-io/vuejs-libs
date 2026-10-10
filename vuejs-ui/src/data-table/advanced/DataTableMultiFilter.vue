<template>
  <div class="flex items-center gap-2 rounded-md border border-dashed px-2 py-1">
    <!-- Operator toggle -->
    <button
      @click="toggle"
      class="shrink-0 rounded border px-1.5 py-0.5 text-xs font-medium hover:bg-accent uppercase tracking-wide"
    >
      {{ localOperator }}
    </button>

    <!-- Individual items -->
    <div class="flex flex-wrap items-center gap-1">
      <div
        v-for="opt in options"
        :key="opt.id"
        class="flex items-center gap-1 rounded-sm bg-accent px-1.5 py-0.5 text-xs"
      >
        <span class="capitalize">{{ opt.label }}</span>
        <span v-if="opt.filterValues?.length" class="text-muted-foreground">
          : {{ opt.filterValues.join(', ') }}
        </span>
        <button @click="removeFilter(opt)" class="ml-0.5 hover:text-destructive">
          <IconX class="size-3" />
        </button>
      </div>

      <!-- Add inside multi-filter -->
      <div v-if="addableOptions.length" class="relative" ref="addRef">
        <button
          @click="addOpen = !addOpen"
          class="inline-flex h-6 items-center gap-1 rounded-full border border-dashed px-2 text-xs hover:bg-accent"
        >
          <IconPlus class="size-3" />
          {{ texts.dataTableFilters.addInGroup }}
        </button>
        <Teleport to="body">
          <div
            v-if="addOpen"
            :style="addStyle"
            class="fixed z-300 w-44 rounded-md border bg-popover p-1 shadow-md"
          >
            <button
              v-for="opt in addableOptions"
              :key="opt.id"
              @click="addFilter(opt)"
              class="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent capitalize"
            >
              {{ opt.label }}
            </button>
          </div>
        </Teleport>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DataTableFilterOption } from '@jaltech/vuejs-ui/types';
import { IconPlus, IconX } from '@tabler/icons-vue';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useLibraryTexts } from '../../texts';

const props = defineProps<{
  options: DataTableFilterOption[];
  allOptions: DataTableFilterOption[];
  selectedOptions: DataTableFilterOption[];
  operator: string;
}>();

const emit = defineEmits<{
  (e: 'update:operator', v: string): void;
  (e: 'update:selectedOptions', v: DataTableFilterOption[]): void;
}>();

const texts = useLibraryTexts();

const addOpen = ref(false);
const addRef = ref<HTMLElement | null>(null);
const addStyle = ref({});
const localOperator = ref(props.operator || 'and');

const addableOptions = computed(() =>
  props.allOptions.filter((o) => !props.selectedOptions.some((s) => s.value === o.value)),
);

function toggle() {
  localOperator.value = localOperator.value === 'and' ? 'or' : 'and';
  emit('update:operator', localOperator.value);
}

function removeFilter(opt: DataTableFilterOption) {
  const updated = props.selectedOptions.filter((o) => o.id !== opt.id);
  emit('update:selectedOptions', updated);
}

function addFilter(opt: DataTableFilterOption) {
  const newOpt: DataTableFilterOption = {
    ...opt,
    id: opt.value,
    filterValues: [],
    filterOperator: opt.options?.length ? 'eq' : 'ilike',
    isMulti: true,
  };
  emit('update:selectedOptions', [...props.selectedOptions, newOpt]);
  addOpen.value = false;
}

watch(addOpen, (v) => {
  if (v && addRef.value) {
    const r = addRef.value.getBoundingClientRect();
    addStyle.value = { top: `${r.bottom + 4}px`, left: `${r.left}px` };
  }
});

watch(
  () => props.operator,
  (v) => {
    localOperator.value = v || 'and';
  },
);

function handleOutside(e: MouseEvent) {
  if (addOpen.value && addRef.value && !addRef.value.contains(e.target as Node)) {
    addOpen.value = false;
  }
}
onMounted(() => document.addEventListener('mousedown', handleOutside));
onUnmounted(() => document.removeEventListener('mousedown', handleOutside));
</script>
