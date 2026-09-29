<template>
  <div>
    <DataTableAdvancedToolbar
      :filterFields="filterFields"
      :views="views"
      :onCreateView="createView"
      :onUpdateView="updateView"
      :onDeleteView="deleteViewById"
      defaultLabel="All projects"
      hide-views-dropdown
    >
      <div class="flex items-center gap-1.5">
        <button
          class="flex size-7 items-center justify-center rounded-md border border-input bg-background hover:bg-accent"
          title="Export CSV"
          @click="noop"
        >
          <DownloadIcon class="size-3.5" />
        </button>
      </div>
      <template #selection>
        <TableSelectionBar :selected-count="selectedCount" @clear="table.toggleAllRowsSelected(false)">
          <TableSelectionBarButton title="Export selection" @click="noop">
            <DownloadIcon class="size-3.5" />
          </TableSelectionBarButton>
          <TableSelectionBarButton title="Delete selection" destructive @click="noop">
            <TrashIcon class="size-3.5" />
          </TableSelectionBarButton>
        </TableSelectionBar>
      </template>
    </DataTableAdvancedToolbar>

    <div class="mt-2 flex items-start gap-4 max-md:flex-col">
      <ViewsSidebar
        :views="views"
        default-label="All projects"
        :on-update-view="updateView"
        :on-delete-view="deleteView"
        @create="openCreate"
      />

      <div class="min-w-0 w-full flex-1">
        <div class="flex flex-col overflow-hidden rounded-[var(--h-radius-lg)] border-[0.5px] border-[var(--h-border)] bg-[var(--h-surface)] shadow-[0_1px_3px_rgba(0,0,0,0.07),0_4px_14px_rgba(0,0,0,0.05)]">
          <DataTable :table="table" :columns="columns" />
          <div class="shrink-0 border-t-[0.5px] border-t-[var(--h-border)] bg-[var(--h-surface2)] px-2.5 py-[3px]">
            <DataTablePagination :table="table" />
          </div>
        </div>
      </div>
    </div>

    <ViewFormModal
      v-model:open="viewModalOpen"
      mode="create"
      :columns="currentColumns"
      :filter-params="currentFilterParams"
      :on-create-view="createView"
      :on-update-view="updateView"
      :on-delete-view="deleteViewById"
    />
  </div>
</template>

<script setup lang="ts">
import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  useVueTable,
  type VisibilityState,
} from '@tanstack/vue-table';
import { computed, h, ref } from 'vue';
import { useRoute } from 'vue-router';
import { provideTableInstance } from '@jaltech/vuejs-ui/composables';
import {
  DataTable,
  DataTableAdvancedToolbar,
  DataTableColumnHeader,
  DataTablePagination,
} from '@jaltech/vuejs-ui/data-table';
import {
  buildFilterOptionsFromQuery,
  calcFilterParams,
  ViewFormModal,
  ViewsSidebar,
} from '@jaltech/vuejs-ui/data-table/advanced/views';
import { Badge } from '@jaltech/vuejs-ui/badge';
import { TableSelectionBar, TableSelectionBarButton } from '@jaltech/vuejs-ui';
import type { FilterParams, ViewItem } from '@jaltech/vuejs-ui/types';
import { BuildingIcon, DownloadIcon, GlobeIcon, LockIcon, TrashIcon } from 'lucide-vue-next';

interface Project {
  id: string;
  name: string;
  status: 'active' | 'archived';
  visibility: 'public' | 'internal' | 'private';
  healthStatus: 'green' | 'amber' | 'red' | 'none';
  priority: 'critical' | 'high' | 'medium' | 'low';
}

const STATUS_LABEL: Record<string, string> = { active: 'Active', archived: 'Archived' };
const VIS_LABEL: Record<string, string> = { public: 'Public', internal: 'Internal', private: 'Private' };
const HEALTH: Record<string, { label: string; color: string }> = {
  green: { label: 'On track', color: '#22c55e' },
  amber: { label: 'At risk', color: '#f59e0b' },
  red: { label: 'Off track', color: '#ef4444' },
  none: { label: 'Undefined', color: '#9aa0a6' },
};
const PRIORITY_LABEL: Record<string, string> = {
  critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low',
};

const NAMES = [
  'Apollo', 'Atlas', 'Beacon', 'Cascade', 'Cobalt', 'Comet', 'Delta', 'Echo',
  'Fusion', 'Halo', 'Horizon', 'Lumen', 'Meridian', 'Nimbus', 'Orbit', 'Pulse',
  'Quartz', 'Relay', 'Summit', 'Tempo', 'Vertex', 'Vortex', 'Zenith', 'Zephyr',
];
const STATUSES = ['active', 'active', 'active', 'archived'] as const;
const VIS = ['public', 'internal', 'private'] as const;
const HEALTHS = ['green', 'amber', 'red', 'none'] as const;
const PRIOS = ['critical', 'high', 'medium', 'low'] as const;

const projects = ref<Project[]>(
  NAMES.map((n, i) => ({
    id: `p${i}`,
    name: `Project ${n}`,
    status: STATUSES[i % STATUSES.length],
    visibility: VIS[i % VIS.length],
    healthStatus: HEALTHS[i % HEALTHS.length],
    priority: PRIOS[i % PRIOS.length],
  })),
);

const filterFields = [
  { label: 'Name', value: 'name', placeholder: 'Search by name…' },
  { label: 'Status', value: 'status', options: [
    { label: 'Active', value: 'active' }, { label: 'Archived', value: 'archived' },
  ] },
  { label: 'Visibility', value: 'visibility', options: [
    { label: 'Public', value: 'public' }, { label: 'Internal', value: 'internal' }, { label: 'Private', value: 'private' },
  ] },
  { label: 'Health', value: 'healthStatus', options: [
    { label: 'On track', value: 'green' }, { label: 'At risk', value: 'amber' },
    { label: 'Off track', value: 'red' }, { label: 'Undefined', value: 'none' },
  ] },
  { label: 'Priority', value: 'priority', options: [
    { label: 'Critical', value: 'critical' }, { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' }, { label: 'Low', value: 'low' },
  ] },
];

// Hand-rolled selection checkbox (no native control), mirroring the real app.
function checkbox(checked: boolean, indeterminate: boolean, onClick: (e: MouseEvent) => void) {
  const state = checked ? 'border-primary bg-primary text-primary-foreground'
    : indeterminate ? 'border-primary bg-primary/50 text-primary-foreground'
    : 'border-input bg-background hover:border-primary';
  return h('div', { class: 'flex items-center justify-center', onClick },
    h('div', { class: `flex size-4 cursor-pointer items-center justify-center rounded border transition-colors ${state}` },
      checked || indeterminate
        ? h('svg', { viewBox: '0 0 12 12', width: 10, height: 10, fill: 'none' },
            h('path', { d: checked ? 'M2.5 6.5l2.5 2.5 4.5-5' : 'M3 6h6', stroke: 'currentColor', 'stroke-width': 1.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }))
        : null));
}

const columns: ColumnDef<Project, any>[] = [
  {
    id: 'select',
    size: 40,
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) =>
      checkbox(table.getIsAllPageRowsSelected(), table.getIsSomePageRowsSelected(),
        () => table.toggleAllPageRowsSelected(!table.getIsAllPageRowsSelected())),
    cell: ({ row }) =>
      checkbox(row.getIsSelected(), false, (e) => { e.stopPropagation(); row.toggleSelected(!row.getIsSelected()); }),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Project' }),
    cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.name),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Status' }),
    filterFn: (r, id, value) => (value as string[]).includes(r.getValue(id)),
    cell: ({ row }) => h(Badge, { variant: row.original.status === 'active' ? 'default' : 'secondary' }, () => STATUS_LABEL[row.original.status]),
  },
  {
    accessorKey: 'visibility',
    header: 'Visibility',
    filterFn: (r, id, value) => (value as string[]).includes(r.getValue(id)),
    cell: ({ row }) => {
      const v = row.original.visibility;
      const Icon = v === 'private' ? LockIcon : v === 'internal' ? BuildingIcon : GlobeIcon;
      return h('span', { class: 'inline-flex items-center gap-1.5 text-[13px]' }, [
        h(Icon, { class: 'size-3 text-muted-foreground shrink-0' }), VIS_LABEL[v],
      ]);
    },
  },
  {
    accessorKey: 'healthStatus',
    header: 'Health',
    filterFn: (r, id, value) => (value as string[]).includes(r.getValue(id)),
    cell: ({ row }) => {
      const hh = HEALTH[row.original.healthStatus];
      return h('span', { class: 'inline-flex items-center gap-1.5 text-[13px]' }, [
        h('span', { style: `width:8px;height:8px;border-radius:9999px;background:${hh.color}` }), hh.label,
      ]);
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Priority' }),
    filterFn: (r, id, value) => (value as string[]).includes(r.getValue(id)),
    cell: ({ row }) => h(Badge, { variant: 'outline' }, () => PRIORITY_LABEL[row.original.priority]),
  },
];

const columnFilters = ref<ColumnFiltersState>([]);
const sorting = ref<SortingState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref<RowSelectionState>({});
const pagination = ref<PaginationState>({ pageIndex: 0, pageSize: 8 });

const table = useVueTable({
  get data() { return projects.value; },
  columns,
  state: {
    get columnFilters() { return columnFilters.value; },
    get sorting() { return sorting.value; },
    get columnVisibility() { return columnVisibility.value; },
    get rowSelection() { return rowSelection.value; },
    get pagination() { return pagination.value; },
  },
  enableRowSelection: true,
  onColumnFiltersChange: (u) => { columnFilters.value = typeof u === 'function' ? u(columnFilters.value) : u; },
  onSortingChange: (u) => { sorting.value = typeof u === 'function' ? u(sorting.value) : u; },
  onColumnVisibilityChange: (u) => { columnVisibility.value = typeof u === 'function' ? u(columnVisibility.value) : u; },
  onRowSelectionChange: (u) => { rowSelection.value = typeof u === 'function' ? u(rowSelection.value) : u; },
  onPaginationChange: (u) => { pagination.value = typeof u === 'function' ? u(pagination.value) : u; },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
});

provideTableInstance(table, columnVisibility);

const selectedCount = computed(() => table.getFilteredSelectedRowModel().rows.length);

// ── In-memory saved views ────────────────────────────────────────────────
const views = ref<ViewItem[]>([]);
let vid = 0;
function createView(p: { name: string; columns?: string[]; filterParams?: FilterParams }) {
  const v: ViewItem = { id: `v${++vid}`, name: p.name, columns: p.columns ?? null, filterParams: p.filterParams ?? null };
  views.value = [...views.value, v];
  return Promise.resolve(v);
}
function updateView(id: string, p: { name: string; columns?: string[]; filterParams?: FilterParams }) {
  views.value = views.value.map((v) => (v.id === id ? { ...v, ...p } : v));
  return Promise.resolve(views.value.find((v) => v.id === id));
}
function deleteView(view: ViewItem) {
  views.value = views.value.filter((v) => v.id !== view.id);
  return Promise.resolve();
}
function deleteViewById(id: string) {
  const v = views.value.find((x) => x.id === id);
  return v ? deleteView(v) : Promise.resolve();
}

// ── View creation modal ──────────────────────────────────────────────────
const route = useRoute();
const viewModalOpen = ref(false);
const allFilterOptions = computed(() =>
  filterFields.map((f) => ({ id: f.value, label: f.label, value: f.value, options: (f as any).options ?? [] })),
);
const currentFilterParams = computed(() =>
  calcFilterParams(
    buildFilterOptionsFromQuery(allFilterOptions.value, route.query as Record<string, string>),
    route.query as Record<string, string>,
  ),
);
const currentColumns = computed(() =>
  table.getVisibleFlatColumns().filter((c) => typeof c.accessorFn !== 'undefined' && c.getCanHide()).map((c) => c.id),
);
function openCreate() { viewModalOpen.value = true; }
function noop() {}
</script>
