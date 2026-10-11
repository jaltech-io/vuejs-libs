import type { Row, Table } from '@tanstack/vue-table';

export interface TableCsvOptions {
  /** Nom du fichier, sans extension. Défaut : `export`. */
  filename?: string;
  /** Colonnes exclues (ids). Défaut : `select` et `actions`. */
  excludeColumns?: string[];
  /** Lignes sélectionnées seulement (après filtres). Défaut : toutes les lignes filtrées et triées. */
  onlySelected?: boolean;
}

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  const text = value instanceof Date ? value.toISOString() : typeof value === 'object' ? JSON.stringify(value) : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

/** Contenu CSV d'une table : une ligne d'en-tête (ids des colonnes ou en-têtes textuels), puis les lignes. */
export function tableToCsv<TData>(table: Table<TData>, options: TableCsvOptions = {}): string {
  const { excludeColumns = ['select', 'actions'], onlySelected = false } = options;
  const columns = table.getAllLeafColumns().filter((column) => !excludeColumns.includes(column.id));
  const headers = columns.map((column) =>
    typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id,
  );
  // Toutes les lignes filtrées et triées, pas seulement la page affichée.
  const rows: Row<TData>[] = onlySelected
    ? table.getFilteredSelectedRowModel().flatRows
    : table.getPrePaginationRowModel().rows;
  return [
    headers.map(csvCell).join(','),
    ...rows.map((row) => columns.map((column) => csvCell(row.getValue(column.id))).join(',')),
  ].join('\n');
}

/** Télécharge le CSV d'une table (navigateur uniquement). */
export function exportTableToCsv<TData>(table: Table<TData>, options: TableCsvOptions = {}): void {
  if (typeof document === 'undefined') return;
  const blob = new Blob([tableToCsv(table, options)], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${options.filename ?? 'export'}.csv`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
