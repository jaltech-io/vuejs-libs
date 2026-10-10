<template>
  <div>
    <div class="flex items-center justify-between gap-2 pb-2">
      <Input
        :model-value="search"
        placeholder="Search spaces…"
        class="h-7 w-56 text-xs"
        @update:model-value="(value) => (search = String(value ?? ''))"
      />
      <DataTableExpandToggle :table="table" />
    </div>
    <div class="flex flex-col overflow-hidden rounded-[var(--h-radius-lg)] border-[0.5px] border-[var(--h-border)] bg-[var(--h-surface)] shadow-[0_1px_3px_rgba(0,0,0,0.07),0_4px_14px_rgba(0,0,0,0.05)]">
      <DataTable :table="table" :columns="columns" />
      <div class="shrink-0 border-t-[0.5px] border-t-[var(--h-border)] bg-[var(--h-surface2)] px-2.5 py-[3px]">
        <DataTablePagination :table="table" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useVueTable,
} from '@tanstack/vue-table';
import { h, ref } from 'vue';
import {
  DataTable,
  DataTableColumnHeader,
  DataTableExpandToggle,
  DataTablePagination,
  useDataTableTree,
} from '@jaltech/vuejs-ui/data-table';
import { Badge } from '@jaltech/vuejs-ui/badge';
import { Input } from '@jaltech/vuejs-ui/input';

interface Space {
  id: string;
  name: string;
  members: number;
  kind: 'company' | 'department' | 'team';
  children?: Space[];
}

const KIND_LABEL: Record<Space['kind'], string> = { company: 'Company', department: 'Department', team: 'Team' };

const spaces: Space[] = [
  { id: 'acme', name: 'Acme', members: 42, kind: 'company', children: [
    { id: 'acme-eng', name: 'Engineering', members: 24, kind: 'department', children: [
      { id: 'acme-eng-web', name: 'Web platform', members: 9, kind: 'team' },
      { id: 'acme-eng-mobile', name: 'Mobile apps', members: 7, kind: 'team' },
      { id: 'acme-eng-data', name: 'Data', members: 8, kind: 'team' },
    ] },
    { id: 'acme-sales', name: 'Sales', members: 12, kind: 'department', children: [
      { id: 'acme-sales-emea', name: 'EMEA', members: 6, kind: 'team' },
      { id: 'acme-sales-us', name: 'Americas', members: 6, kind: 'team' },
    ] },
    { id: 'acme-hr', name: 'People', members: 6, kind: 'department' },
  ] },
  { id: 'globex', name: 'Globex', members: 18, kind: 'company', children: [
    { id: 'globex-rnd', name: 'Research', members: 11, kind: 'department' },
    { id: 'globex-ops', name: 'Operations', members: 7, kind: 'department' },
  ] },
  { id: 'initech', name: 'Initech', members: 5, kind: 'company' },
  { id: 'umbrella', name: 'Umbrella', members: 15, kind: 'company', children: [
    { id: 'umbrella-lab', name: 'Lab', members: 15, kind: 'department' },
  ] },
  // More companies so that pagination (root rows only) has a second page.
  ...['Hooli', 'Massive Dynamic', 'Soylent', 'Stark', 'Tyrell', 'Vandelay', 'Wayne'].map((name, index) => ({
    id: name.toLowerCase().replace(' ', '-'),
    name,
    members: 3 + index * 2,
    kind: 'company' as const,
  })),
];

const columns: ColumnDef<Space, any>[] = [
  {
    accessorKey: 'name',
    meta: { tree: true },
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Space' }),
    cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.name),
  },
  {
    accessorKey: 'kind',
    header: 'Type',
    cell: ({ row }) => h(Badge, { variant: 'outline' }, () => KIND_LABEL[row.original.kind]),
  },
  {
    accessorKey: 'members',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Members' }),
    cell: ({ row }) => h('span', { class: 'tabular-nums' }, row.original.members),
  },
];

const tree = useDataTableTree<Space>({ getSubRows: (space) => space.children, initiallyExpanded: true });
const search = ref('');
const sorting = ref<SortingState>([]);
const pagination = ref<PaginationState>({ pageIndex: 0, pageSize: 10 });

const table = useVueTable({
  ...tree.tableOptions,
  data: spaces,
  columns,
  state: {
    get expanded() { return tree.expanded.value; },
    get globalFilter() { return search.value; },
    get sorting() { return sorting.value; },
    get pagination() { return pagination.value; },
  },
  globalFilterFn: (row, _columnId, value: string) =>
    row.original.name.toLowerCase().includes(value.toLowerCase()),
  onSortingChange: (u) => { sorting.value = typeof u === 'function' ? u(sorting.value) : u; },
  onPaginationChange: (u) => { pagination.value = typeof u === 'function' ? u(pagination.value) : u; },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});
</script>
