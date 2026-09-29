export interface FilterItem {
  field: 'title' | 'status' | 'priority';
  value: string;
  isMulti: boolean;
}

export interface FilterParams {
  operator?: 'and' | 'or';
  sort?: string;
  filters?: FilterItem[];
}

export interface ViewItem {
  id: string;
  programReference: string;
  name: string;
  columns: string[] | null;
  filterParams: FilterParams | null;
  ownerEmail: string | null;
  isPublic: boolean;
}

export interface DataTableFilterOption {
  id: string;
  label: string;
  value: string;
  options: { label: string; value: string; icon?: string }[];
  filterValues?: string[];
  filterOperator?: string;
  isMulti?: boolean;
}

export type ActivityEventKind =
  | 'issue_created'
  | 'status_changed'
  | 'priority_changed'
  | 'assignee_changed'
  | 'comment_added';

export interface ActivityEventItem {
  id: string;
  projectId: string;
  issueId: string | null;
  type: ActivityEventKind;
  authorEmail: string | null;
  fromValue: string | null;
  toValue: string | null;
  summary: string;
  createdAt: string;
}
