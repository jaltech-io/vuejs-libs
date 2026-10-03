import {
  type App,
  type ComputedRef,
  computed,
  hasInjectionContext,
  type InjectionKey,
  inject,
  type MaybeRefOrGetter,
  provide,
  toValue,
} from 'vue';
import { type ComboboxTexts, defaultComboboxTexts } from '../combobox/texts';

/**
 * Textes de TOUTE la bibliothèque, fournis une seule fois pour l'application (`installLibraryTexts`)
 * ou pour un sous-arbre (`provideLibraryTexts`). Chaque section est facultative et partielle :
 * ce qui n'est pas fourni garde sa valeur par défaut (`defaultLibraryTexts`, textes historiques).
 * Ordre de priorité : prop du composant > textes fournis > textes par défaut.
 * Un pluriel est une fonction `(count) => string`.
 */
export interface LibraryTextsDefinition {
  /** Langue des dates (BCP 47) : DatePicker, ActivityFeed, panneau de ticket. */
  locale: string;
  combobox: Required<ComboboxTexts>;
  selectionBar: {
    /** « 3 sélectionnés » — ignoré si le composant reçoit `label` / `pluralLabel`. */
    selectedCount: (count: number) => string;
    clearSelection: string;
  };
  confirmDialog: { cancel: string; confirm: string };
  formDialog: { submit: string; cancel: string };
  datePicker: { placeholder: string; clear: string };
  dataTable: {
    noResults: string;
    selectAll: string;
    selectRow: string;
    columnsTooltip: string;
    columnsTitle: string;
    sortAscending: string;
    sortDescending: string;
    hideColumn: string;
  };
  dataTableFilters: {
    filter: string;
    add: string;
    filterBy: string;
    addInGroup: string;
    noValueNeeded: string;
    textPlaceholder: (fieldLabel: string) => string;
    searchPlaceholder: string;
    noOption: string;
    contains: string;
    notContains: string;
    equals: string;
    notEquals: string;
    startsWith: string;
    endsWith: string;
    isEmpty: string;
    isNotEmpty: string;
    is: string;
    isNot: string;
  };
  dataTableViews: {
    /** Vue « toutes les lignes » (quand `defaultLabel` n'est pas fourni). */
    all: string;
    reset: string;
    saveView: string;
    saveNamePlaceholder: string;
    saveHint: string;
    cancelHint: string;
    updateView: string;
    nameRequired: string;
    openViewsHint: (shortcut: string) => string;
    newView: string;
    editView: string;
    namePlaceholder: string;
    makePublic: string;
    saving: string;
    save: string;
    update: string;
    delete: string;
    searchViews: string;
    public: string;
    noViewFound: string;
    addView: string;
    dropdownNameRequired: string;
    deleteTitle: string;
    deleteDescription: (viewName: string) => string;
    deleteConfirm: string;
    formNewTitle: string;
    formEditTitle: string;
    formCreate: string;
    formUpdate: string;
    formCreating: string;
    formUpdating: string;
    formNameLabel: string;
    formNamePlaceholder: string;
    formNameRequired: string;
    formDeleting: string;
    formDelete: string;
    sidebarTitle: string;
    sidebarNewView: string;
    sidebarEdit: string;
    sidebarDelete: string;
  };
  activityFeed: {
    eventCount: (count: number) => string;
    empty: string;
    filterAll: string;
    filterCreations: string;
    filterStatusChanges: string;
    filterComments: string;
    filterAssignments: string;
    justNow: string;
    minutesAgo: (minutes: number) => string;
    hoursAgo: (hours: number) => string;
    daysAgo: (days: number) => string;
  };
  issuePanel: {
    statuses: Record<'open' | 'in-progress' | 'in-review' | 'done' | 'closed', string>;
    priorities: Record<'critical' | 'high' | 'medium' | 'low', string>;
    types: Record<'bug' | 'feature' | 'task' | 'improvement', string>;
    status: string;
    priority: string;
    type: string;
    assignee: string;
    unassigned: string;
    sprint: string;
    linkedSprint: string;
    noSprint: string;
    points: string;
    dueDate: string;
    parent: string;
    detach: string;
    attach: string;
    chooseParent: string;
    labels: string;
    none: string;
    createdAt: string;
    updatedAt: string;
    tabDescription: string;
    tabSubtasks: string;
    tabComments: string;
    tabAttachments: string;
    tabTime: string;
    tabActivity: string;
    tabRelations: string;
  };
  aiDevPanel: { tabDev: string; tabMerge: string; tabDeploy: string };
  tenantPanel: {
    tabInformations: string;
    tabPrograms: string;
    statuses: Record<string, string>;
  };
  dialog: { close: string };
  sheet: { close: string };
  pagination: { first: string; previous: string; next: string; last: string; morePages: string };
  carousel: { previous: string; next: string };
  breadcrumb: { label: string; more: string };
  sidebar: { toggle: string; title: string; description: string };
  spinner: { label: string };
  messageScroller: { label: string; scrollToEnd: string; scrollToStart: string };
  command: { title: string; description: string };
}

type DeepPartial<T> = {
  [Key in keyof T]?: T[Key] extends (...args: never[]) => unknown
    ? T[Key]
    : T[Key] extends Record<string, unknown>
      ? DeepPartial<T[Key]>
      : T[Key];
};

/** Textes fournis par l'application : toutes les sections et toutes les clés sont facultatives. */
export type LibraryTexts = DeepPartial<LibraryTextsDefinition>;

export const defaultLibraryTexts: LibraryTextsDefinition = {
  locale: 'fr-FR',
  combobox: defaultComboboxTexts,
  selectionBar: {
    selectedCount: (count) => `${count} ${count > 1 ? 'sélectionnés' : 'sélectionné'}`,
    clearSelection: 'Effacer la sélection',
  },
  confirmDialog: { cancel: 'Annuler', confirm: 'Confirmer' },
  formDialog: { submit: 'Créer', cancel: 'Annuler' },
  datePicker: { placeholder: 'Choisir une date', clear: 'Effacer la date' },
  dataTable: {
    noResults: 'Aucun résultat.',
    selectAll: 'Tout sélectionner',
    selectRow: 'Sélectionner la ligne',
    columnsTooltip: 'Colonnes visibles',
    columnsTitle: 'Toggle columns',
    sortAscending: 'Asc',
    sortDescending: 'Desc',
    hideColumn: 'Hide',
  },
  dataTableFilters: {
    filter: 'Filtrer',
    add: 'Ajouter',
    filterBy: 'Filtrer par',
    addInGroup: 'Add',
    noValueNeeded: 'No value needed for this operator',
    textPlaceholder: (fieldLabel) => `Type to filter ${fieldLabel.toLowerCase()}…`,
    searchPlaceholder: 'Search…',
    noOption: 'No option found',
    contains: 'contains',
    notContains: 'does not contain',
    equals: 'equals',
    notEquals: 'does not equal',
    startsWith: 'starts with',
    endsWith: 'ends with',
    isEmpty: 'is empty',
    isNotEmpty: 'is not empty',
    is: 'is',
    isNot: 'is not',
  },
  dataTableViews: {
    all: 'Tout',
    reset: 'Reinitialiser',
    saveView: 'Sauvegarder la vue',
    saveNamePlaceholder: 'Nom de la vue...',
    saveHint: 'Sauvegarder (Entree)',
    cancelHint: 'Annuler (Echap)',
    updateView: 'Mettre a jour',
    nameRequired: 'Nom requis',
    openViewsHint: (shortcut) => `Open views (${shortcut})`,
    newView: 'New view',
    editView: 'Edit view',
    namePlaceholder: 'View name',
    makePublic: 'Rendre publique (visible par tous)',
    saving: 'Saving…',
    save: 'Save view',
    update: 'Update',
    delete: 'Delete',
    searchViews: 'Search views…',
    public: 'Public',
    noViewFound: 'No view found.',
    addView: 'Add view',
    dropdownNameRequired: 'Name is required',
    deleteTitle: 'Supprimer la vue',
    deleteDescription: (viewName) => `Supprimer définitivement la vue "${viewName}" ?`,
    deleteConfirm: 'Supprimer',
    formNewTitle: 'Nouvelle vue',
    formEditTitle: 'Modifier la vue',
    formCreate: 'Créer',
    formUpdate: 'Mettre à jour',
    formCreating: 'Création…',
    formUpdating: 'Mise à jour…',
    formNameLabel: 'Nom',
    formNamePlaceholder: 'Nom de la vue',
    formNameRequired: 'Le nom est requis',
    formDeleting: 'Suppression…',
    formDelete: 'Supprimer la vue',
    sidebarTitle: 'Vues',
    sidebarNewView: 'Nouvelle vue',
    sidebarEdit: 'Modifier',
    sidebarDelete: 'Supprimer',
  },
  activityFeed: {
    eventCount: (count) => `${count} événement${count > 1 ? 's' : ''}`,
    empty: 'Aucun événement dans cette catégorie.',
    filterAll: 'Tout',
    filterCreations: 'Créations',
    filterStatusChanges: 'Changements de statut',
    filterComments: 'Commentaires',
    filterAssignments: 'Assignations',
    justNow: "à l'instant",
    minutesAgo: (minutes) => `il y a ${minutes} min`,
    hoursAgo: (hours) => `il y a ${hours}h`,
    daysAgo: (days) => `il y a ${days}j`,
  },
  issuePanel: {
    statuses: { open: 'Ouvert', 'in-progress': 'En cours', 'in-review': 'En revue', done: 'Terminé', closed: 'Fermé' },
    priorities: { critical: 'Critique', high: 'Haute', medium: 'Moyenne', low: 'Basse' },
    types: { bug: 'Bug', feature: 'Feature', task: 'Tâche', improvement: 'Amélioration' },
    status: 'Statut',
    priority: 'Priorité',
    type: 'Type',
    assignee: 'Assigné à',
    unassigned: 'Non assigné',
    sprint: 'Sprint',
    linkedSprint: 'Sprint lié',
    noSprint: 'Aucun sprint',
    points: 'Points',
    dueDate: 'Échéance',
    parent: 'Parent',
    detach: 'Détacher',
    attach: 'Rattacher…',
    chooseParent: '— Choisir un parent —',
    labels: 'Labels',
    none: 'Aucun',
    createdAt: 'Créé le',
    updatedAt: 'Modifié le',
    tabDescription: 'Description',
    tabSubtasks: 'Sous-tâches',
    tabComments: 'Commentaires',
    tabAttachments: 'Pièces jointes',
    tabTime: 'Temps',
    tabActivity: 'Activité',
    tabRelations: 'Relations',
  },
  aiDevPanel: { tabDev: 'Dev', tabMerge: 'Merge', tabDeploy: 'Déployer' },
  tenantPanel: {
    tabInformations: 'Informations générales',
    tabPrograms: 'Programmes',
    statuses: { active: 'Actif', trial: 'Essai', suspended: 'Suspendu' },
  },
  dialog: { close: 'Close' },
  sheet: { close: 'Close' },
  pagination: { first: 'First', previous: 'Previous', next: 'Next', last: 'Last', morePages: 'More pages' },
  carousel: { previous: 'Previous Slide', next: 'Next Slide' },
  breadcrumb: { label: 'breadcrumb', more: 'More' },
  sidebar: { toggle: 'Toggle Sidebar', title: 'Sidebar', description: 'Displays the mobile sidebar.' },
  spinner: { label: 'Loading' },
  messageScroller: { label: 'Messages', scrollToEnd: 'Scroll to end', scrollToStart: 'Scroll to start' },
  command: { title: 'Command Palette', description: 'Search for a command to run...' },
};

/**
 * Clé d'injection des textes de la bibliothèque. La valeur peut être un objet, une ref ou un
 * getter : un getter qui lit la langue courante (vue-i18n…) rend les textes réactifs.
 */
export const LIBRARY_TEXTS_KEY: InjectionKey<MaybeRefOrGetter<LibraryTexts>> = Symbol('LibraryTexts');

/** Fournit les textes de la bibliothèque à toute une application (`app.provide`). */
export function installLibraryTexts(application: App, texts: MaybeRefOrGetter<LibraryTexts>) {
  application.provide(LIBRARY_TEXTS_KEY, texts);
}

/** Fournit les textes de la bibliothèque au sous-arbre du composant appelant (dans un `setup`). */
export function provideLibraryTexts(texts: MaybeRefOrGetter<LibraryTexts>) {
  provide(LIBRARY_TEXTS_KEY, texts);
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

function mergeTexts<T>(defaults: T, provided: unknown): T {
  if (!isPlainObject(defaults) || !isPlainObject(provided)) return defaults;
  const merged: Record<string, unknown> = { ...defaults };
  for (const [key, value] of Object.entries(provided)) {
    if (value === undefined || value === null) continue;
    const base = (defaults as Record<string, unknown>)[key];
    merged[key] = isPlainObject(base) && isPlainObject(value) ? { ...mergeTexts(base, value) } : value;
  }
  return merged as T;
}

/** Fusionne des textes fournis (partiels) avec les textes par défaut. */
export function resolveLibraryTexts(texts?: LibraryTexts | null): LibraryTextsDefinition {
  return mergeTexts(defaultLibraryTexts, texts ?? undefined);
}

/**
 * Textes fournis par l'application, tels quels (sans défauts). Utilisable dans un `setup`, ou au
 * rendu d'une fonction `h()` (colonnes de tableau) ; `undefined` hors contexte d'injection.
 */
export function injectLibraryTexts(): MaybeRefOrGetter<LibraryTexts> | undefined {
  return hasInjectionContext() ? inject(LIBRARY_TEXTS_KEY, undefined) : undefined;
}

/** Textes résolus (fournis + défauts), réactifs au changement de langue. À appeler dans un `setup`. */
export function useLibraryTexts(): ComputedRef<LibraryTextsDefinition> {
  const provided = injectLibraryTexts();
  return computed(() => resolveLibraryTexts(toValue(provided)));
}
