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
import { defaultLibraryTexts } from '../texts';
import type { IssuePanelPriority, IssuePanelStatus, IssuePanelType } from './types';

/** Libellés par défaut (français). Les composants lisent les textes fournis (`issuePanel.*`). */
export const STATUS_LABEL: Record<IssuePanelStatus, string> = defaultLibraryTexts.issuePanel.statuses;
export const STATUS_ICON: Record<IssuePanelStatus, any> = {
  open: IconCircle,
  'in-progress': IconCircleDot,
  'in-review': IconCircleHalf,
  done: IconCircleCheck,
  closed: IconCircleX,
};
export const PRIO_LABEL: Record<IssuePanelPriority, string> = defaultLibraryTexts.issuePanel.priorities;
export const PRIO_ICON: Record<IssuePanelPriority, any> = {
  critical: IconAlertTriangle,
  high: IconArrowUp,
  medium: IconArrowRight,
  low: IconArrowDown,
};
export const TYPE_LABEL: Record<IssuePanelType, string> = defaultLibraryTexts.issuePanel.types;
export const TYPE_ICON: Record<IssuePanelType, any> = {
  bug: IconBug,
  feature: IconStars,
  task: IconCheckbox,
  improvement: IconTrendingUp,
};

export function statusBadgeClasses(status: IssuePanelStatus) {
  const map: Record<IssuePanelStatus, string> = {
    open: 'bg-(--h-surface2) text-(--h-text-2)',
    'in-progress': 'bg-(--h-blue-50) text-(--h-blue-600)',
    'in-review': 'bg-(--h-purple-50) text-(--h-purple-700)',
    done: 'bg-(--h-green-50,#f0fdf4) text-(--h-green-700,#15803d)',
    closed: 'bg-(--h-surface2) text-(--h-text-3)',
  };
  return map[status];
}
export function typeBadgeClasses(type: IssuePanelType) {
  const map: Record<IssuePanelType, string> = {
    bug: 'bg-[#fef2f2] text-[#dc2626]',
    feature: 'bg-(--h-blue-50) text-(--h-blue-600)',
    task: 'bg-(--h-surface2) text-(--h-text-2)',
    improvement: 'bg-(--h-purple-50) text-(--h-purple-700)',
  };
  return map[type];
}
export function priorityColorClass(priority: IssuePanelPriority) {
  const map: Record<IssuePanelPriority, string> = {
    critical: 'text-[#dc2626]',
    high: 'text-[#ea580c]',
    medium: 'text-[#d97706]',
    low: 'text-(--h-text-3)',
  };
  return map[priority];
}

export function fmtIssueDate(d: string, locale: string = defaultLibraryTexts.locale) {
  return new Date(d).toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' });
}
