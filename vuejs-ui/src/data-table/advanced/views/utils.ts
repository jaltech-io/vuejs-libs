import type { DataTableFilterField, DataTableFilterOption, FilterItem, FilterParams, ViewItem } from '@jaltech/vuejs-ui/types';
import type { Table, VisibilityState } from '@tanstack/vue-table';

/** Paramètre d'URL portant les colonnes visibles (ids séparés par `.`), absent = tout visible. */
export const COLUMNS_QUERY_KEY = 'cols';

// Reconstruit les options de filtre sélectionnées à partir de la query string — utilisé au
// chargement de page et par tout code qui a besoin des filtres actifs sans passer par le
// toolbar (ex. la sauvegarde d'une vue depuis un sélecteur externe comme une sidebar).
export function buildFilterOptionsFromQuery(
  allOptions: DataTableFilterOption[],
  query: Record<string, string>,
): DataTableFilterOption[] {
  return allOptions
    .filter((o) => !!query[o.value])
    .map((o) => {
      const raw = query[o.value];
      const parts = raw.split('~');
      const rawVal = parts[0] ?? '';
      const op = parts[1] || (o.options?.length ? 'eq' : 'ilike');
      const isMulti = parts[2] === 'multi';
      const filterValues = o.options?.length
        ? rawVal.split('.').filter(Boolean)
        : op === 'empty' || op === 'not_empty'
          ? []
          : rawVal
            ? [rawVal]
            : [];
      return { ...o, filterValues, filterOperator: op, isMulti };
    });
}

export function calcFilterParams(
  selectedOptions: DataTableFilterOption[],
  query: Record<string, string>,
): FilterParams {
  const filterItems: FilterItem[] = selectedOptions
    .filter((o) => o.filterValues && o.filterValues.length > 0)
    .map((o) => ({
      field: o.value,
      value: o.options?.length
        ? `${o.filterValues!.join('.')}~${o.filterOperator}`
        : `${o.filterValues![0]}~${o.filterOperator}`,
      isMulti: !!o.isMulti,
    }));
  return {
    filters: filterItems,
    operator: (query.operator as 'and' | 'or') || 'and',
    sort: query.sort || undefined,
  };
}

/**
 * Champ filtrable minimal pour relire les filtres de l'URL : `value` (id de la colonne) et, pour un
 * champ « à options », `options` (opérateur par défaut `eq` au lieu de `ilike`).
 */
export type FilterField = Pick<DataTableFilterField, 'value'> & Partial<Pick<DataTableFilterField, 'label' | 'options'>>;

/**
 * Filtres courants (forme d'une vue enregistrée) lus dans l'URL, pour les champs donnés : même
 * résultat que la barre d'outils avancée.
 */
export function filterParamsFromQuery(query: Record<string, unknown>, fields: readonly FilterField[]): FilterParams {
  const stringQuery: Record<string, string> = {};
  for (const [key, value] of Object.entries(query)) if (typeof value === 'string') stringQuery[key] = value;
  const options: DataTableFilterOption[] = fields.map((field) => ({
    id: field.value,
    label: field.label ?? field.value,
    value: field.value,
    options: field.options ?? [],
  }));
  return calcFilterParams(buildFilterOptionsFromQuery(options, stringQuery), stringQuery);
}

/** Colonnes masquables actuellement visibles (colonnes d'une vue à enregistrer). */
export function visibleHideableColumnIds(table: Table<any>): string[] {
  const visible = new Set(table.getVisibleLeafColumns().map((column) => column.id));
  return getHideableColumnIds(table).filter((id) => visible.has(id));
}

/** Ids des colonnes que l'utilisateur peut masquer/afficher sur CETTE table. */
export function getHideableColumnIds(table: Table<any>): string[] {
  return table
    .getAllColumns()
    .filter((c) => typeof c.accessorFn !== 'undefined' && c.getCanHide())
    .map((c) => c.id);
}

/**
 * Forme canonique de paramètres de filtre, pour comparer une vue à l'état courant sans
 * dépendre de l'ordre des clés (le serveur peut les renvoyer dans un autre ordre) ni des
 * valeurs vides : filtres sans valeur ignorés, filtres triés par champ (un champ n'apparaît
 * qu'une fois, leur ordre d'ajout n'a pas de sens), opérateur ignoré tant qu'il y a moins de
 * deux filtres, tri absent = pas de tri.
 */
export function normalizeFilterParams(params: FilterParams | null | undefined): {
  filters: { field: string; value: string; isMulti: boolean }[];
  operator: string;
  sort: string;
} {
  const filters = (params?.filters ?? [])
    .filter((f) => !!f?.field && !!f.value && !f.value.startsWith('~'))
    .map((f) => ({ field: f.field, value: f.value, isMulti: !!f.isMulti }))
    .sort((a, b) => (a.field < b.field ? -1 : a.field > b.field ? 1 : 0));
  return {
    filters,
    operator: filters.length > 1 ? params?.operator || 'and' : 'and',
    sort: params?.sort || '',
  };
}

/** Vrai si les deux jeux de filtres ont le même effet (comparaison sémantique). */
export function filterParamsEqual(a: FilterParams | null | undefined, b: FilterParams | null | undefined): boolean {
  return JSON.stringify(normalizeFilterParams(a)) === JSON.stringify(normalizeFilterParams(b));
}

/**
 * Vrai si les colonnes visibles correspondent à celles d'une vue. `viewColumns` null = toutes
 * visibles ; seules les colonnes masquables de la table comptent (une colonne disparue de la
 * table depuis l'enregistrement de la vue est ignorée).
 */
export function columnsEqual(
  viewColumns: readonly string[] | null | undefined,
  visibleColumns: readonly string[],
  hideableColumns: readonly string[],
): boolean {
  const expected = new Set(viewColumns ?? hideableColumns);
  const visible = new Set(visibleColumns);
  return hideableColumns.every((id) => expected.has(id) === visible.has(id));
}

/**
 * État de visibilité tanstack correspondant à une liste de colonnes visibles (`null` = toutes
 * visibles, état vide).
 */
export function visibilityFromColumns(
  visibleColumns: readonly string[] | null | undefined,
  hideableColumns: readonly string[],
): VisibilityState {
  if (!visibleColumns) return {};
  const visible = new Set(visibleColumns);
  const state: VisibilityState = {};
  for (const id of hideableColumns) {
    if (!visible.has(id)) state[id] = false;
  }
  return state;
}

/** Colonnes visibles lues dans l'URL (`cols`), `null` si le paramètre est absent (tout visible). */
export function columnsFromQuery(query: Record<string, unknown>): string[] | null {
  const raw = query[COLUMNS_QUERY_KEY];
  if (typeof raw !== 'string') return null;
  return raw.split('.').filter(Boolean);
}

/**
 * Query string d'une vue : TOUS ses filtres (quel que soit le tableau), son opérateur, son tri,
 * ses colonnes visibles et son id. Les colonnes ne sont écrites que si la vue en masque au
 * moins une parmi `allColumns` (ids masquables de la table) ; sans `allColumns`, elles le sont
 * dès que la vue en a enregistré.
 */
export function calcViewSearchParams(view: ViewItem, allColumns?: readonly string[]): Record<string, string> {
  const params: Record<string, string> = {};
  const fp = view.filterParams;

  if (view.columns) {
    const saved = new Set(view.columns);
    const hidesSome = allColumns ? allColumns.some((id) => !saved.has(id)) : true;
    if (hidesSome) params[COLUMNS_QUERY_KEY] = view.columns.join('.');
  }

  for (const item of fp?.filters ?? []) {
    if (!item?.field || !item.value) continue;
    params[item.field] = item.isMulti ? `${item.value}~multi` : item.value;
  }
  if (fp?.operator && (fp.filters?.length ?? 0) > 0) params.operator = fp.operator;
  if (fp?.sort) params.sort = fp.sort;
  params.page = '1';
  params.viewId = view.id;
  return params;
}
