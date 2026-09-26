<template>
  <FormDialog
    v-model:open="openModel"
    :title="mode === 'create' ? 'Nouvelle vue' : 'Modifier la vue'"
    hide-trigger
    content-class="sm:max-w-sm"
    :submit-label="mode === 'create' ? 'Créer' : 'Mettre à jour'"
    :pending-label="mode === 'create' ? 'Création…' : 'Mise à jour…'"
    :pending="pending"
    @submit="onSubmit"
  >
    <div class="space-y-1.5">
      <label class="text-sm font-medium">Nom <span class="text-destructive">*</span></label>
      <input
        ref="nameInputRef"
        v-model="name"
        placeholder="Nom de la vue"
        class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        @keyup.enter="onSubmit"
      />
      <p v-if="error" class="text-xs text-destructive">{{ error }}</p>
    </div>

    <button
      v-if="mode === 'edit'"
      type="button"
      :disabled="deleting"
      class="inline-flex h-8 items-center gap-1.5 self-start rounded-md border border-destructive px-3 text-xs font-medium text-destructive hover:bg-destructive/10 disabled:opacity-50"
      @click="onDelete"
    >
      <TrashIcon class="size-3.5" />
      {{ deleting ? 'Suppression…' : 'Supprimer la vue' }}
    </button>
  </FormDialog>
</template>

<script setup lang="ts">
import { showConfirm } from '@jaltech/vuejs-ui/composables/useConfirm';
import type { FilterParams, ViewItem } from '@jaltech/vuejs-ui/types';
import { TrashIcon } from 'lucide-vue-next';
import { computed, nextTick, ref, watch } from 'vue';
import FormDialog from '../../../FormDialog.vue';

const props = defineProps<{
  open: boolean;
  mode: 'create' | 'edit';
  view?: ViewItem | null;
  columns: string[];
  filterParams: FilterParams;
  onCreateView: (p: { name: string; columns?: string[]; filterParams?: FilterParams }) => Promise<any>;
  onUpdateView: (id: string, p: { name: string; columns?: string[]; filterParams?: FilterParams }) => Promise<any>;
  onDeleteView: (id: string) => Promise<any>;
}>();
const emit = defineEmits<(e: 'update:open', v: boolean) => void>();

const openModel = computed({ get: () => props.open, set: (v) => emit('update:open', v) });

const name = ref('');
const error = ref('');
const pending = ref(false);
const deleting = ref(false);
const nameInputRef = ref<HTMLInputElement | null>(null);

watch(
  () => props.open,
  (v) => {
    if (v) {
      name.value = props.mode === 'edit' ? (props.view?.name ?? '') : '';
      error.value = '';
      nextTick(() => nameInputRef.value?.focus());
    }
  },
);

async function onSubmit() {
  error.value = '';
  if (!name.value.trim()) {
    error.value = 'Le nom est requis';
    return;
  }
  pending.value = true;
  try {
    const res =
      props.mode === 'create'
        ? await props.onCreateView({
            name: name.value.trim(),
            columns: props.columns,
            filterParams: props.filterParams,
          })
        : await props.onUpdateView(props.view!.id, {
            name: name.value.trim(),
            columns: props.view!.columns ?? undefined,
            filterParams: props.view!.filterParams ?? undefined,
          });
    if (res?.status === 'error') {
      error.value = res.message;
      return;
    }
    openModel.value = false;
  } finally {
    pending.value = false;
  }
}

async function onDelete() {
  if (!props.view) return;
  const ok = await showConfirm({
    title: 'Supprimer la vue',
    description: `Supprimer définitivement la vue "${props.view.name}" ?`,
    confirmLabel: 'Supprimer',
    variant: 'destructive',
  });
  if (!ok) return;
  deleting.value = true;
  try {
    await props.onDeleteView(props.view.id);
    openModel.value = false;
  } finally {
    deleting.value = false;
  }
}
</script>
