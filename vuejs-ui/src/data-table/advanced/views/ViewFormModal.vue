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
    <FormField v-slot="{ id, controlAttributes }" :label="texts.dataTableViews.formNameLabel" required :error="error">
      <Input
        :id="id"
        ref="nameInputRef"
        v-model="name"
        v-bind="controlAttributes"
        :placeholder="texts.dataTableViews.formNamePlaceholder"
      />
    </FormField>

    <Button
      v-if="mode === 'edit'"
      type="button"
      variant="outline"
      size="sm"
      class="self-start border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
      :pending="deleting"
      @click="onDelete"
    >
      <IconTrash />
      {{ deleting ? texts.dataTableViews.formDeleting : texts.dataTableViews.formDelete }}
    </Button>
  </FormDialog>
</template>

<script setup lang="ts">
// Création (ou renommage / suppression) d'une vue enregistrée. En création, les colonnes visibles
// et les filtres courants sont lus d'eux-mêmes sur la table partagée (`provideTableInstance`) et
// dans l'URL : les props `columns` / `filterParams` ne servent qu'à forcer d'autres valeurs.
import { IconTrash } from '@tabler/icons-vue';
import { computed, inject, nextTick, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Button } from '../../../button';
import { showConfirm } from '../../../composables/useConfirm';
import { TableInstanceKey } from '../../../composables/useTableInstance';
import FormDialog from '../../../FormDialog.vue';
import { FormField } from '../../../form-field';
import { Input } from '../../../input';
import { useLibraryTexts } from '../../../texts';
import type {
  CreateViewCallback,
  DeleteViewCallback,
  FilterParams,
  UpdateViewCallback,
  ViewCallbackResult,
  ViewItem,
} from '../../../types';
import { type FilterField, filterParamsFromQuery, visibleHideableColumnIds } from './utils';

const props = defineProps<{
  open: boolean;
  mode: 'create' | 'edit';
  view?: ViewItem | null;
  /** Colonnes de la vue créée. Défaut : colonnes masquables visibles de la table partagée. */
  columns?: string[];
  /** Filtres de la vue créée. Défaut : filtres courants lus dans l'URL. */
  filterParams?: FilterParams;
  /** Champs filtrables (ceux de la barre d'outils) ; défaut : les colonnes de la table partagée. */
  filterFields?: FilterField[];
  onCreateView: CreateViewCallback;
  onUpdateView: UpdateViewCallback;
  onDeleteView: DeleteViewCallback;
}>();
const emit = defineEmits<(e: 'update:open', v: boolean) => void>();

const texts = useLibraryTexts();
const router = useRouter();
const route = useRoute();
// Table partagée facultative : sans elle, `columns` / `filterParams` doivent être fournis.
const tableContext = inject(TableInstanceKey, undefined);

const openModel = computed({ get: () => props.open, set: (v) => emit('update:open', v) });

const name = ref('');
const error = ref('');
const pending = ref(false);
const deleting = ref(false);
const nameInputRef = ref<{ $el?: HTMLInputElement } | null>(null);

function currentColumns(): string[] | undefined {
  if (props.columns) return props.columns;
  return tableContext ? visibleHideableColumnIds(tableContext.table) : undefined;
}

function currentFilterParams(): FilterParams | undefined {
  if (props.filterParams) return props.filterParams;
  const fields = props.filterFields ?? tableContext?.table.getAllLeafColumns().map((column) => ({ value: column.id }));
  return fields ? filterParamsFromQuery(route.query, fields) : undefined;
}

watch(
  () => props.open,
  (v) => {
    if (v) {
      name.value = props.mode === 'edit' ? (props.view?.name ?? '') : '';
      error.value = '';
      nextTick(() => nameInputRef.value?.$el?.focus());
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
    const res = (
      props.mode === 'create'
        ? await props.onCreateView({
            name: name.value.trim(),
            columns: currentColumns(),
            filterParams: currentFilterParams(),
          })
        : await props.onUpdateView(props.view!.id, {
            name: name.value.trim(),
            columns: props.view!.columns ?? undefined,
            filterParams: props.view!.filterParams ?? undefined,
          })
    ) as ViewCallbackResult;
    // Message d'échec renvoyé par le consommateur, affiché tel quel (à lui de le traduire).
    if (res?.status === 'error') {
      error.value = res.message ?? '';
      return;
    }
    // La vue créée devient la vue active (même comportement que les autres chemins de création).
    if (props.mode === 'create' && res?.view?.id) {
      router.replace({ path: route.path, query: { ...route.query, viewId: res.view.id, page: '1' } });
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
    const res = (await props.onDeleteView(view.id)) as ViewCallbackResult;
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
