// Types volontairement dupliqués (et non importés depuis l'app) — libs/vuejs-ui ne doit dépendre
// d'aucun code applicatif (voir CLAUDE.md, libs/vuejs-ui : "Technical UI only"). Les valeurs
// correspondent exactement à IssueStatus/IssuePriority/IssueType de
// apps/pf-admin_front-app/src/shared/types.

export type IssuePanelStatus = 'open' | 'in-progress' | 'in-review' | 'done' | 'closed';
export type IssuePanelPriority = 'critical' | 'high' | 'medium' | 'low';
export type IssuePanelType = 'bug' | 'feature' | 'task' | 'improvement';

export interface IssuePanelIssue {
  id: string;
  code: string;
  title: string;
  status: IssuePanelStatus;
  priority: IssuePanelPriority;
  type: IssuePanelType;
  assigneeId: string | null;
  sprintId: string | null;
  storyPoints: number | null;
  dueDate: string | null;
  labels: string[] | null;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IssuePanelMember {
  id: string;
  name: string;
  email: string;
}

export interface IssuePanelSibling {
  id: string;
  code: string;
  title: string;
  parentId?: string | null;
}
