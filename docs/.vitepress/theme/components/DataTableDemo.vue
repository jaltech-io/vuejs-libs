<template>
  <!-- Deleting a view asks for confirmation: mount <ConfirmDialog /> once (application root). -->
  <ConfirmDialog />
  <SavedViewsDataTable
    :table="table"
    :columns="columns"
    :filter-fields="filterFields"
    :views-source="viewsSource"
    default-label="All projects"
    export-filename="projects"
  >
    <template #create>
      <Button variant="hprimary" size="hbtn" @click="noop"><IconPlus />New project</Button>
    </template>
    <template #selection-actions="{ clear }">
      <TableSelectionBarButton title="Delete selection" destructive @click="clear">
        <IconTrash />
      </TableSelectionBarButton>
    </template>
  </SavedViewsDataTable>
</template>

<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table';
import { h, ref } from 'vue';
import {
  createActionsColumn,
  createSelectColumn,
  oneOf,
  SavedViewsDataTable,
  sortableHeader,
  useClientDataTable,
} from '@jaltech/vuejs-ui/data-table';
import { Button } from '@jaltech/vuejs-ui/button';
import { InitialsAvatar } from '@jaltech/vuejs-ui/avatar';
import { statusBadgeCell } from '@jaltech/vuejs-ui/status-badge';
import { ConfirmDialog, TableSelectionBarButton } from '@jaltech/vuejs-ui';
import type { Tone } from '@jaltech/vuejs-ui/tones';
import type { DataTableFilterField, SavedViewsSource, ViewItem, ViewPayload } from '@jaltech/vuejs-ui/types';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-vue';

interface Project {
  id: string;
  name: string;
  owner: string;
  status: 'active' | 'archived';
  healthStatus: 'green' | 'amber' | 'red' | 'none';
  priority: 'critical' | 'high' | 'medium' | 'low';
}

// The application maps each value to a label and a tone; the library only knows tones.
const STATUS: Record<Project['status'], { label: string; tone: Tone }> = {
  active: { label: 'Active', tone: 'green' },
  archived: { label: 'Archived', tone: 'gray' },
};
const HEALTH: Record<Project['healthStatus'], { label: string; tone: Tone }> = {
  green: { label: 'On track', tone: 'green' },
  amber: { label: 'At risk', tone: 'amber' },
  red: { label: 'Off track', tone: 'red' },
  none: { label: 'Undefined', tone: 'gray' },
};
const PRIORITY: Record<Project['priority'], { label: string; tone: Tone }> = {
  critical: { label: 'Critical', tone: 'red' },
  high: { label: 'High', tone: 'amber' },
  medium: { label: 'Medium', tone: 'blue' },
  low: { label: 'Low', tone: 'gray' },
};

const NAMES = [
  'Apollo', 'Atlas', 'Beacon', 'Cascade', 'Cobalt', 'Comet', 'Delta', 'Echo',
  'Fusion', 'Halo', 'Horizon', 'Lumen', 'Meridian', 'Nimbus', 'Orbit', 'Pulse',
  'Quartz', 'Relay', 'Summit', 'Tempo', 'Vertex', 'Vortex', 'Zenith', 'Zephyr',
];
const OWNERS = ['Ada Lovelace', 'Alan Turing', 'Grace Hopper', 'Linus Torvalds', 'Margaret Hamilton'];
const STATUSES = ['active', 'active', 'active', 'archived'] as const;
const HEALTHS = ['green', 'amber', 'red', 'none'] as const;
const PRIOS = ['critical', 'high', 'medium', 'low'] as const;

const projects = ref<Project[]>(
  NAMES.map((name, i) => ({
    id: `p${i}`,
    name: `Project ${name}`,
    owner: OWNERS[i % OWNERS.length],
    status: STATUSES[i % STATUSES.length],
    healthStatus: HEALTHS[i % HEALTHS.length],
    priority: PRIOS[(i * 3) % PRIOS.length],
  })),
);

const filterFields: DataTableFilterField[] = [
  { label: 'Name', value: 'name', placeholder: 'Search by name…' },
  { label: 'Status', value: 'status', options: Object.entries(STATUS).map(([value, { label }]) => ({ value, label })) },
  { label: 'Health', value: 'healthStatus', options: Object.entries(HEALTH).map(([value, { label }]) => ({ value, label })) },
  { label: 'Priority', value: 'priority', options: Object.entries(PRIORITY).map(([value, { label }]) => ({ value, label })) },
];

const columns: ColumnDef<Project, any>[] = [
  createSelectColumn<Project>(),
  {
    accessorKey: 'name',
    header: sortableHeader('Project'),
    cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.name),
  },
  {
    accessorKey: 'owner',
    header: sortableHeader('Owner'),
    cell: ({ row }) =>
      h('span', { class: 'inline-flex items-center gap-2' }, [
        h(InitialsAvatar, { name: row.original.owner, size: 'sm' }),
        row.original.owner,
      ]),
  },
  {
    accessorKey: 'status',
    header: sortableHeader('Status'),
    filterFn: oneOf,
    cell: ({ row }) => statusBadgeCell(STATUS[row.original.status].tone, STATUS[row.original.status].label),
  },
  {
    accessorKey: 'healthStatus',
    header: 'Health',
    filterFn: oneOf,
    cell: ({ row }) =>
      statusBadgeCell(HEALTH[row.original.healthStatus].tone, HEALTH[row.original.healthStatus].label, { dot: true }),
  },
  {
    accessorKey: 'priority',
    header: sortableHeader('Priority'),
    filterFn: oneOf,
    cell: ({ row }) => statusBadgeCell(PRIORITY[row.original.priority].tone, PRIORITY[row.original.priority].label),
  },
  createActionsColumn<Project>((project) => [
    { key: 'edit', label: 'Edit', icon: IconPencil, onClick: noop },
    { key: 'delete', label: 'Delete', icon: IconTrash, danger: true, hidden: project.status === 'archived', onClick: noop },
  ]),
];

const { table } = useClientDataTable({ data: projects, columns, getRowId: (project) => project.id, pageSize: 8 });

// ── In-memory saved views (an application would call its API here) ──────
const views = ref<ViewItem[]>([]);
let viewId = 0;
const nameTaken = (name: string, exceptId?: string) => views.value.some((v) => v.name === name && v.id !== exceptId);
const viewsSource: SavedViewsSource = {
  list: async () => views.value,
  create: async (payload: ViewPayload) => {
    if (nameTaken(payload.name)) return { status: 'error', message: `"${payload.name}" already exists` };
    const view: ViewItem = {
      id: `v${++viewId}`,
      name: payload.name,
      columns: payload.columns ?? null,
      filterParams: payload.filterParams ?? null,
    };
    views.value = [...views.value, view];
    return { status: 'success', view };
  },
  update: async (id, payload) => {
    if (nameTaken(payload.name, id)) return { status: 'error', message: `"${payload.name}" already exists` };
    views.value = views.value.map((v) => (v.id === id ? { ...v, ...payload } : v));
    return { status: 'success' };
  },
  delete: async (id) => {
    views.value = views.value.filter((v) => v.id !== id);
    return { status: 'success' };
  },
};

function noop() {}
</script>
