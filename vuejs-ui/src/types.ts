export interface FilterItem {
  /** Champ filtré : la `value` d'un des `filterFields` du tableau. */
  field: string;
  value: string;
  isMulti: boolean;
}

export interface FilterParams {
  operator?: 'and' | 'or';
  sort?: string;
  filters?: FilterItem[];
}

/**
 * Vue enregistrée d'un tableau. Les vues sont PERSONNELLES : aucune notion de partage.
 * `programReference` / `ownerEmail` sont tolérés (renvoyés par certaines API) mais ignorés par la lib.
 */
export interface ViewItem {
  id: string;
  name: string;
  /** Colonnes visibles (ids), `null` = toutes. */
  columns: string[] | null;
  filterParams: FilterParams | null;
  programReference?: string;
  ownerEmail?: string | null;
}

/** Données d'une vue à créer ou à modifier. */
export interface ViewPayload {
  name: string;
  columns?: string[];
  filterParams?: FilterParams;
}

/**
 * Réponse d'un callback de vue. Échec : `{ status: 'error', message }` — `message` est affiché tel
 * quel (à traduire avant de le renvoyer). Création : `{ view: { id } }` rend la vue créée active.
 */
export interface ViewActionResult {
  status?: 'success' | 'error' | (string & {});
  message?: string;
  view?: { id: string };
}

/** Résultat attendu d'un callback de vue (`void` = succès sans information). Les callbacks sont typés `Promise<unknown>` : une réponse d'API plus riche est acceptée, seuls ces champs sont lus. */
export type ViewCallbackResult = ViewActionResult | undefined | void;

/** Création d'une vue (`DataTableAdvancedToolbar`, `ViewFormModal`, `DataTableViewsDropdown`). */
export type CreateViewCallback = (payload: ViewPayload) => Promise<unknown>;
/** Modification d'une vue. */
export type UpdateViewCallback = (id: string, payload: ViewPayload) => Promise<unknown>;
/** Suppression d'une vue, par son IDENTIFIANT (la lib a déjà demandé confirmation). */
export type DeleteViewCallback = (id: string) => Promise<unknown>;

/** Champ filtrable de la barre d'outils avancée (`filterFields`) : `value` = id de la colonne. */
export interface DataTableFilterField {
  label: string;
  value: string;
  placeholder?: string;
  /** Valeurs proposées : champ « à options » (filtre `oneOf` sur la colonne). Absent = texte libre. */
  options?: { label: string; value: string }[];
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

/**
 * Accès aux vues enregistrées d'un tableau, fourni par l'application à `SavedViewsDataTable` (la
 * lib n'appelle aucune API). `list` est rappelé après chaque création, modification ou suppression.
 * `list` gère ses propres erreurs (notification) et peut lever : la dernière liste est conservée.
 */
export interface SavedViewsSource {
  list: () => Promise<ViewItem[]>;
  create: CreateViewCallback;
  update: UpdateViewCallback;
  delete: DeleteViewCallback;
}
