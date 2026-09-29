import {
  IconAlertTriangle,
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconBug,
  IconCheckbox,
  IconCircle,
  IconCircleCheck,
  IconCircleDot,
  IconCircleHalf,
  IconCircleX,
  IconStars,
  IconTrendingUp,
} from '@tabler/icons-vue';
import type { IssuePanelPriority, IssuePanelStatus, IssuePanelType } from './types';

export const STATUS_LABEL: Record<IssuePanelStatus, string> = {
  open: 'Ouvert',
  'in-progress': 'En cours',
  'in-review': 'En revue',
  done: 'Terminé',
  closed: 'Fermé',
};
export const STATUS_ICON: Record<IssuePanelStatus, any> = {
  open: IconCircle,
  'in-progress': IconCircleDot,
  'in-review': IconCircleHalf,
  done: IconCircleCheck,
  closed: IconCircleX,
};
export const PRIO_LABEL: Record<IssuePanelPriority, string> = {
  critical: 'Critique',
  high: 'Haute',
  medium: 'Moyenne',
  low: 'Basse',
};
export const PRIO_ICON: Record<IssuePanelPriority, any> = {
  critical: IconAlertTriangle,
  high: IconArrowUp,
  medium: IconArrowRight,
  low: IconArrowDown,
};
export const TYPE_LABEL: Record<IssuePanelType, string> = {
  bug: 'Bug',
  feature: 'Feature',
  task: 'Tâche',
  improvement: 'Amélioration',
};
export const TYPE_ICON: Record<IssuePanelType, any> = {
  bug: IconBug,
  feature: IconStars,
  task: IconCheckbox,
  improvement: IconTrendingUp,
};

export function statusBadgeClasses(status: IssuePanelStatus) {
  const map: Record<IssuePanelStatus, string> = {
    open: 'bg-[var(--h-surface2)] text-[var(--h-text-2)]',
    'in-progress': 'bg-[var(--h-blue-50)] text-[var(--h-blue-600)]',
    'in-review': 'bg-[var(--h-purple-50)] text-[var(--h-purple-700)]',
    done: 'bg-[var(--h-green-50,#f0fdf4)] text-[var(--h-green-700,#15803d)]',
    closed: 'bg-[var(--h-surface2)] text-[var(--h-text-3)]',
  };
  return map[status];
}
export function typeBadgeClasses(type: IssuePanelType) {
  const map: Record<IssuePanelType, string> = {
    bug: 'bg-[#fef2f2] text-[#dc2626]',
    feature: 'bg-[var(--h-blue-50)] text-[var(--h-blue-600)]',
    task: 'bg-[var(--h-surface2)] text-[var(--h-text-2)]',
    improvement: 'bg-[var(--h-purple-50)] text-[var(--h-purple-700)]',
  };
  return map[type];
}
export function priorityColorClass(priority: IssuePanelPriority) {
  const map: Record<IssuePanelPriority, string> = {
    critical: 'text-[#dc2626]',
    high: 'text-[#ea580c]',
    medium: 'text-[#d97706]',
    low: 'text-[var(--h-text-3)]',
  };
  return map[priority];
}

export function fmtIssueDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
}
