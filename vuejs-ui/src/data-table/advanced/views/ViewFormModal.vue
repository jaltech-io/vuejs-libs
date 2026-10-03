<template>
  <FormDialog
    v-model:open="openModel"
    :title="mode === 'create' ? texts.dataTableViews.formNewTitle : texts.dataTableViews.formEditTitle"
    hide-trigger
    content-class="sm:max-w-sm"
    :submit-label="mode === 'create' ? texts.dataTableViews.formCreate : texts.dataTableViews.formUpdate"
    :pending-label="mode === 'create' ? texts.dataTableViews.formCreating : texts.dataTableViews.formUpdating"
    :pending="pending"
    @submit="onSubmit"
  >
    <div class="space-y-1.5">
      <label class="text-sm font-medium">{{ texts.dataTableViews.formNameLabel }} <span class="text-destructive">*</span></label>
      <input
        ref="nameInputRef"
        v-model="name"
        :placeholder="texts.dataTableViews.formNamePlaceholder"
        class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
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
      {{ deleting ? texts.dataTableViews.formDeleting : texts.dataTableViews.formDelete }}
    </button>
  </FormDialog>
</template>

<script setup lang="ts">
import { showConfirm } from '@jaltech/vuejs-ui/composables/useConfirm';
import type { FilterParams, ViewItem } from '@jaltech/vuejs-ui/types';
import { TrashIcon } from 'lucide-vue-next';
import { computed, nextTick, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FormDialog from '../../../FormDialog.vue';
import { useLibraryTexts } from '../../../texts';

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

const texts = useLibraryTexts();
const router = useRouter();
const route = useRoute();

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

// Une seule soumission : Entrée dans le champ déclenche la soumission implicite du formulaire
// (FormDialog), le bouton passe par le même chemin, et `pending` bloque les doublons.
async function onSubmit() {
  if (pending.value) return;
  error.value = '';
  if (!name.value.trim()) {
    error.value = texts.value.dataTableViews.formNameRequired;
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
    // Message d'échec renvoyé par le consommateur, affiché tel quel (à lui de le traduire).
    if (res?.status === 'error') {
      error.value = res.message ?? '';
      return;
    }
    // La vue créée devient la vue active (même comportement que les autres chemins de création).
    if (props.mode === 'create' && res?.view?.id) {
      router.replace({ path: route.path, query: { ...(route.query as Record<string, any>), viewId: res.view.id, page: '1' } });
    }
    openModel.value = false;
  } finally {
    pending.value = false;
  }
}

async function onDelete() {
  if (!props.view) return;
  const view = props.view;
  const ok = await showConfirm({
    title: texts.value.dataTableViews.deleteTitle,
    description: texts.value.dataTableViews.deleteDescription(view.name),
    confirmLabel: texts.value.dataTableViews.deleteConfirm,
    variant: 'destructive',
  });
  if (!ok) return;
  deleting.value = true;
  try {
    const res = await props.onDeleteView(view.id);
    if (res?.status === 'error') {
      error.value = res.message ?? '';
      return;
    }
    // Supprimer la vue active ramène à « Tous ».
    if (route.query.viewId === view.id) router.replace({ path: route.path, query: {} });
    openModel.value = false;
  } finally {
    deleting.value = false;
  }
}
</script>
