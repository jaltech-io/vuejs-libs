<template>
  <div class="relative" ref="rootRef">
    <button
      type="button"
      @click="toggleOpen"
      class="flex h-7 w-36 shrink-0 items-center justify-between rounded-md border border-input bg-background px-2.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-hidden"
      :title="texts.dataTableViews.openViewsHint(`${isMac ? '⌘' : 'Ctrl'}+V`)"
    >
      <span class="truncate">{{ currentView?.name || props.defaultLabel || texts.dataTableViews.all }}</span>
      <IconChevronDown class="ml-1 size-4 shrink-0 opacity-50" />
    </button>

    <Teleport to="body">
      <div
        v-if="open"
        :style="[panelStyle, { zIndex }]"
        class="fixed w-[200px] rounded-md border bg-popover shadow-md"
        @mousedown.stop
        @click.stop
      >

        <!-- Create form -->
        <template v-if="mode === 'create'">
          <div class="flex items-center border-b px-3 py-2">
            <button type="button" @click="mode = 'list'" class="mr-2 rounded p-0.5 hover:bg-accent">
              <IconChevronLeft class="size-4" />
            </button>
            <span class="text-sm font-medium">{{ texts.dataTableViews.newView }}</span>
          </div>
          <div class="p-3 space-y-2">
            <input
              ref="createInputRef"
              v-model="createName"
              :placeholder="texts.dataTableViews.namePlaceholder"
              class="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm outline-hidden focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              @keyup.enter="handleCreate"
              @keyup.escape="mode = 'list'"
            />
            <label class="flex items-center gap-2 text-xs text-muted-foreground">
              <input type="checkbox" v-model="createIsPublic" />
              {{ texts.dataTableViews.makePublic }}
            </label>
            <p v-if="createError" class="text-xs text-destructive">{{ createError }}</p>
            <button
              type="button"
              @click="handleCreate"
              :disabled="creating"
              class="w-full rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {{ creating ? texts.dataTableViews.saving : texts.dataTableViews.save }}
            </button>
          </div>
        </template>

        <!-- Edit form -->
        <template v-else-if="mode === 'edit' && editingView">
          <div class="flex items-center border-b px-3 py-2">
            <button type="button" @click="mode = 'list'" class="mr-2 rounded p-0.5 hover:bg-accent">
              <IconChevronLeft class="size-4" />
            </button>
            <span class="text-sm font-medium">{{ texts.dataTableViews.editView }}</span>
          </div>
          <div class="p-3 space-y-2">
            <input
              ref="editInputRef"
              v-model="editName"
              :placeholder="texts.dataTableViews.namePlaceholder"
              class="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm outline-hidden focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              @keyup.enter="handleEdit"
              @keyup.escape="mode = 'list'"
            />
            <label class="flex items-center gap-2 text-xs text-muted-foreground">
              <input type="checkbox" v-model="editIsPublic" />
              {{ texts.dataTableViews.makePublic }}
            </label>
            <p v-if="editError" class="text-xs text-destructive">{{ editError }}</p>
            <div class="flex gap-2">
              <button
                type="button"
                @click="handleEdit"
                :disabled="editing"
                class="flex-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {{ editing ? texts.dataTableViews.saving : texts.dataTableViews.update }}
              </button>
              <button
                type="button"
                @click="handleDelete"
                :disabled="deleting"
                class="rounded-md border border-destructive px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 disabled:opacity-50"
              >
                {{ deleting ? '…' : texts.dataTableViews.delete }}
              </button>
            </div>
          </div>
        </template>

        <!-- List -->
        <template v-else>
          <div class="flex items-center border-b px-3 py-1.5">
            <IconSearch class="mr-2 size-4 shrink-0 opacity-50" />
            <input
              v-model="search"
              :placeholder="texts.dataTableViews.searchViews"
              class="h-8 w-full bg-transparent py-1 text-sm outline-hidden placeholder:text-muted-foreground"
            />
          </div>

          <div class="max-h-52 overflow-auto p-1">
            <button
              type="button"
              class="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
              :class="{ 'bg-accent text-accent-foreground': !currentView }"
              @click="selectView(null)"
            >
              {{ props.defaultLabel || texts.dataTableViews.all }}
            </button>

            <!-- Saved views -->
            <div
              v-for="view in filteredViews"
              :key="view.id"
              class="group flex w-full cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
              :class="{ 'bg-accent text-accent-foreground': currentView?.id === view.id }"
              @click="selectView(view)"
            >
              <span class="truncate">{{ view.name }}</span>
              <span v-if="view.isPublic" class="ml-1 shrink-0 rounded bg-accent px-1 text-2xs uppercase text-muted-foreground">{{ texts.dataTableViews.public }}</span>
              <span
                class="invisible ml-auto flex size-5 shrink-0 items-center justify-center rounded p-0.5 hover:bg-neutral-200 group-hover:visible dark:hover:bg-neutral-700"
                @click.stop="openEdit(view)"
              >
                <IconPencil class="size-3" />
              </span>
            </div>

            <p
              v-if="filteredViews.length === 0 && search"
              class="py-4 text-center text-xs text-muted-foreground"
            >{{ texts.dataTableViews.noViewFound }}</p>
          </div>

          <div class="border-t p-1">
            <button
              type="button"
              class="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
              @click="mode = 'create'; nextTick(() => createInputRef?.focus())"
            >
              <IconPlus class="mr-2 size-4" />
              {{ texts.dataTableViews.addView }}
            </button>
          </div>
        </template>

      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useLayer } from '../../../composables/useLayer';
import { showConfirm } from '@jaltech/vuejs-ui/composables/useConfirm';
import { useTableInstance } from '@jaltech/vuejs-ui/composables/useTableInstance';
import type { FilterParams, ViewItem } from '@jaltech/vuejs-ui/types';
import { getIsMacOS } from '@jaltech/vuejs-ui/utils';
import { IconChevronDown, IconChevronLeft, IconPencil, IconPlus, IconSearch } from '@tabler/icons-vue';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLibraryTexts } from '../../../texts';
import { calcViewSearchParams, getHideableColumnIds } from './utils';

const props = defineProps<{
  views: ViewItem[];
  filterParams: FilterParams;
  onCreateView: (p: {
    name: string;
    columns?: string[];
    filterParams?: FilterParams;
    isPublic?: boolean;
  }) => Promise<any>;
  onUpdateView: (
    id: string,
    p: { name: string; columns?: string[]; filterParams?: FilterParams; isPublic?: boolean },
  ) => Promise<any>;
  onDeleteView: (id: string) => Promise<any>;
  defaultLabel?: string;
}>();

const router = useRouter();
const route = useRoute();
const { table } = useTableInstance();
const isMac = getIsMacOS();
const texts = useLibraryTexts();

const rootRef = ref<HTMLElement | null>(null);
const createInputRef = ref<HTMLInputElement | null>(null);
const editInputRef = ref<HTMLInputElement | null>(null);

const open = ref(false);
// Panneau téléporté dans <body> : rang de couche pris à l'ouverture (au-dessus d'une fiche ouverte).
const zIndex = useLayer(open);
const panelStyle = ref<Record<string, string>>({});
const mode = ref<'list' | 'create' | 'edit'>('list');
const search = ref('');
const createName = ref('');
const createError = ref('');
const createIsPublic = ref(false);
const creating = ref(false);
const editName = ref('');
const editError = ref('');
const editIsPublic = ref(false);
const editing = ref(false);
const deleting = ref(false);
const editingView = ref<ViewItem | null>(null);

const currentView = computed(() => props.views.find((v) => v.id === (route.query.viewId as string)) ?? null);
const filteredViews = computed(() =>
  props.views.filter((v) => v.name.toLowerCase().includes(search.value.toLowerCase())),
);

function calcPos() {
  if (!rootRef.value) return;
  const r = rootRef.value.getBoundingClientRect();
  panelStyle.value = { top: `${r.bottom + 4}px`, left: `${r.left}px` };
}

function toggleOpen() {
  if (open.value) {
    open.value = false;
    return;
  }
  calcPos();
  open.value = true;
}

function close() {
  open.value = false;
  mode.value = 'list';
  search.value = '';
}

// Reste sur la route courante ; la query de la vue porte ses filtres ET ses colonnes (`cols`,
// relu par DataTableColumnsVisibility).
function selectView(view: ViewItem | null) {
  router.replace({
    path: route.path,
    query: view ? calcViewSearchParams(view, getHideableColumnIds(table)) : {},
  });
  close();
}

function openEdit(view: ViewItem) {
  editingView.value = view;
  editName.value = view.name;
  editError.value = '';
  editIsPublic.value = view.isPublic;
  mode.value = 'edit';
  nextTick(() => editInputRef.value?.focus());
}

async function handleCreate() {
  createError.value = '';
  if (!createName.value.trim()) {
    createError.value = texts.value.dataTableViews.dropdownNameRequired;
    return;
  }
  if (creating.value) return;
  creating.value = true;
  const visible = new Set(table.getVisibleFlatColumns().map((c) => c.id));
  let res: any;
  try {
    res = await props.onCreateView({
      name: createName.value.trim(),
      columns: getHideableColumnIds(table).filter((id) => visible.has(id)),
      filterParams: props.filterParams,
      isPublic: createIsPublic.value,
    });
  } finally {
    creating.value = false;
  }
  if (res?.status === 'error') {
    createError.value = res.message ?? '';
    return;
  }

  // ✅ Navigate to the new view
  if (res?.view?.id) {
    const newViewParams: Record<string, string> = { ...(route.query as any), viewId: res.view.id, page: '1' };
    router.replace({ query: newViewParams });
  }
  createName.value = '';
  createIsPublic.value = false;
  close();
}

async function handleEdit() {
  editError.value = '';
  if (!editName.value.trim() || !editingView.value) {
    editError.value = texts.value.dataTableViews.dropdownNameRequired;
    return;
  }
  if (editing.value) return;
  editing.value = true;
  let res: any;
  try {
    res = await props.onUpdateView(editingView.value.id, {
      name: editName.value.trim(),
      columns: editingView.value.columns ?? undefined,
      filterParams: editingView.value.filterParams ?? undefined,
      isPublic: editIsPublic.value,
    });
  } finally {
    editing.value = false;
  }
  if (res?.status === 'error') {
    editError.value = res.message ?? '';
    return;
  }
  mode.value = 'list';
}

async function handleDelete() {
  if (!editingView.value) return;
  const view = editingView.value;
  const ok = await showConfirm({
    title: texts.value.dataTableViews.deleteTitle,
    description: texts.value.dataTableViews.deleteDescription(view.name),
    confirmLabel: texts.value.dataTableViews.deleteConfirm,
    variant: 'destructive',
  });
  if (!ok) return;
  deleting.value = true;
  let res: any;
  try {
    res = await props.onDeleteView(view.id);
  } finally {
    deleting.value = false;
  }
  if (res?.status === 'error') {
    editError.value = res.message ?? '';
    return;
  }
  // Supprimer la vue active ramène à « Tous », sur la route courante.
  if (route.query.viewId === view.id) {
    router.replace({ path: route.path, query: {} });
  }
  mode.value = 'list';
}

// Outside click
function handleOutside(e: MouseEvent) {
  if (!open.value) return;
  if (rootRef.value?.contains(e.target as Node)) return;
  close();
}

// Keyboard shortcut Ctrl/Cmd+V
function handleKeydown(e: KeyboardEvent) {
  const tag = (document.activeElement as HTMLElement)?.tagName;
  if ((e.metaKey || e.ctrlKey) && e.key === 'v' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
    e.preventDefault();
    setTimeout(() => {
      calcPos();
      open.value = true;
    }, 100);
  }
  if (e.key === 'Escape' && open.value) close();
}

onMounted(() => {
  document.addEventListener('mousedown', handleOutside);
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('scroll', calcPos, true);
  window.addEventListener('resize', calcPos);
});
onUnmounted(() => {
  document.removeEventListener('mousedown', handleOutside);
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('scroll', calcPos, true);
  window.removeEventListener('resize', calcPos);
});

watch(open, (v) => {
  if (!v) {
    mode.value = 'list';
    search.value = '';
  }
});
</script>
