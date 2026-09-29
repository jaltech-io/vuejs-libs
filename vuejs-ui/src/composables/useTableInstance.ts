import type { Table, VisibilityState } from '@tanstack/vue-table';
import { type InjectionKey, inject, provide, type Ref } from 'vue';

export interface TableInstanceContext<TData = unknown> {
  table: Table<TData>;
  columnVisibility: Ref<VisibilityState>;
}

export const TableInstanceKey: InjectionKey<TableInstanceContext<any>> = Symbol('TableInstance');

export function provideTableInstance<TData>(table: Table<TData>, columnVisibility: Ref<VisibilityState>) {
  provide(TableInstanceKey, { table, columnVisibility });
}

export function useTableInstance<TData = any>(): TableInstanceContext<TData> {
  const context = inject(TableInstanceKey) as TableInstanceContext<TData> | undefined;
  if (!context) {
    throw new Error('useTableInstance must be used within a TableInstanceProvider');
  }
  return context;
}
