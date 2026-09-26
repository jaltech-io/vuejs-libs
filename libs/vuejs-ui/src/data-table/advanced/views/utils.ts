import type { DataTableFilterOption, FilterItem, FilterParams, ViewItem } from '@jaltech/vuejs-ui/types';

export const COLUMNS = ['title', 'status', 'priority', 'createdAt'] as const;
export const FILTERABLE_FIELDS = ['title', 'status', 'priority', 'sort', 'operator'] as const;

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
      field: o.value as FilterItem['field'],
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

export function calcViewSearchParams(view: ViewItem): Record<string, string> {
  const params: Record<string, string> = {};
  const fp = view.filterParams;

  // Colonnes visibles sauvegardees dans la vue
  if (view.columns && view.columns.length > 0 && view.columns.length < COLUMNS.length) {
    params.cols = view.columns.join('.');
  }

  if (!fp) {
    params.viewId = view.id;
    params.page = '1';
    params.per_page = '10';
    return params;
  }
  for (const item of fp.filters ?? []) {
    if (FILTERABLE_FIELDS.includes(item.field as any)) {
      params[item.field] = item.isMulti ? `${item.value}~multi` : item.value;
    }
  }
  if (fp.operator) params.operator = fp.operator;
  if (fp.sort) params.sort = fp.sort;
  params.page = '1';
  params.per_page = '10';
  params.viewId = view.id;
  return params;
}

export function getIsFiltered(query: Record<string, string>): boolean {
  const filterable = ['title', 'status', 'priority'];
  return (
    filterable.some((f) => !!query[f]) ||
    (!!query.sort && query.sort !== 'createdAt.desc') ||
    (!!query.operator && query.operator !== 'and')
  );
}
