## 0.9.2

- `DataTableAdvancedToolbar` (et `SavedViewsDataTable`) : les filtres actifs s'affichent sur la ligne du bouton Filtrer, à sa droite, et passent à la ligne seulement quand la place manque ; les actions de droite restent alignées à droite. Rétrocompatible.

## 0.9.1

- `DataTable` et `SavedViewsDataTable` : emplacement `empty` pour l'état vide propre à un écran (par défaut, le texte « Aucun résultat »). Rétrocompatible.

## 0.9.0 (2026-10-11)

Le tableau avec vues devient un composant, les motifs répétés côté application passent dans la lib, et la lib perd ce qui était propre à un écran. **Version à CHANGEMENTS CASSANTS** : voir la section dédiée, chaque point dit comment migrer.

### 🚀 Features

- **`useClientDataTable({ data, columns, initialSorting?, getRowId?, tree?, pageSize?, enableRowSelection?, clearSelectionOnEscape?, provide? })`** (`@jaltech/vuejs-ui/data-table`) : table TanStack « côté client » complète — état (filtres, tri, visibilité, sélection, pagination à 20), `onXChange`, row models (dont facettes), `provideTableInstance`, Échap qui vide la sélection. Renvoie `table`, les refs d'état, `selectedRows`, `selectedCount`, `clearSelection()` (+ `expanded` en arbre). `tree` accepte le résultat de `useDataTableTree` ou ses options.
- **`SavedViewsDataTable`** (`@jaltech/vuejs-ui/data-table`) : la coque du tableau avec vues — squelette (`loading`), `DataTableAdvancedToolbar`, `ViewsSidebar`, `DataTable`, `DataTablePagination`, `ViewFormModal`, export CSV (toutes les lignes filtrées) et export de la sélection. Props `table`, `columns`, `filterFields`, `viewsSource` (`{ list, create, update, delete }`, fourni par l'appelant : la lib n'appelle aucune API), `defaultLabel`, `exportFilename`, `exportExcludeColumns`, `exportable`, `selectionLabel(s)`. Slots `create`, `actions`, `selection-actions` (`{ rows, count, clear }`). Hauteur de la carte bornée par la variable CSS `--h-table-max-height` (aucune borne sans elle).
- **Colonnes** : `createActionsColumn(actionsOf, { header?, max?, size? })` (en-tête aligné à droite, `RowActions`, ni tri ni masquage), `sortableHeader(title)` (titre ou getter lu au rendu), filtre `oneOf` (valeur parmi les valeurs choisies).
- **CSV** : `exportTableToCsv(table, { filename?, excludeColumns?, onlySelected? })`, `tableToCsv(...)` — toutes les lignes filtrées et triées, pas seulement la page affichée.
- **`Button` : prop `pending`** — spinner à la place de l'icône (ou avant le libellé), bouton désactivé, `aria-busy`. `FormDialog` et `TableSelectionBarButton` l'utilisent.
- **`FormField`** (`@jaltech/vuejs-ui/form-field`) : libellé, astérisque si `required`, contrôle en slot (`{ id, invalid, controlAttributes }`), `description`, `error` ; bâti sur les primitives `field/`.
- **`SkeletonList`** (`@jaltech/vuejs-ui/skeleton`) : `count` lignes, `itemClass`, `class`.
- **`MetricCard`** (`@jaltech/vuejs-ui/metric-card`) : LA carte de KPI — `label`, `value`, `icon?`, `tone?`, `sub?`, `to?` (route), `href?` (lien externe).
- **`StatusBadge`** (`@jaltech/vuejs-ui/status-badge`) : pastille de statut pilotée par une variante (`gray`, `blue`, `green`, `amber`, `red`, `purple`), `label` ou slot, `dot`. Cellule `statusBadgeCell(variant, label, { dot? })`.
- **`InitialsAvatar`** (`@jaltech/vuejs-ui/avatar`) : initiales sur pastille teintée, `name`, `tone`, `size` (`xs` / `sm` / `md` / `lg`).
- **Tonalités** (`@jaltech/vuejs-ui/tones`) : `Tone`, `TONES`, `badgeToneClasses`, `chipToneClasses`, partagées par `StatusBadge`, `InitialsAvatar` et `MetricCard`. Jetons `--h-blue-600` et `--h-purple-600` ajoutés à `styles.css` (déjà utilisés par la lib, jusqu'ici fournis par l'application).
- **Types** : `ViewPayload`, `ViewActionResult`, `ViewCallbackResult`, `CreateViewCallback`, `UpdateViewCallback`, `DeleteViewCallback`, `SavedViewsSource`, `DataTableFilterField` ; utilitaires `filterParamsFromQuery(query, fields)`, `visibleHideableColumnIds(table)`.
- **`ViewFormModal`** : en création, calcule lui-même les colonnes visibles (table partagée) et les filtres courants (URL, `filterFields` ou à défaut les colonnes de la table) ; `columns` / `filterParams` deviennent facultatifs. Champ du nom en `FormField` + `Input`.
- **texts** : `dataTable.actions`, `dataTable.exportCsv`, `dataTable.exportSelection`.
- Vitrine : page DataTable refaite autour de `SavedViewsDataTable` ; pages Button (pending), FormField, MetricCard, StatusBadge, InitialsAvatar, SkeletonList.

### ⚠️ CHANGEMENTS CASSANTS — migration

- **`ViewsSidebar.onDeleteView` reçoit l'IDENTIFIANT** (`(id: string) => Promise`), comme `ViewFormModal`, `DataTableAdvancedToolbar` et `DataTableViewsDropdown`, et la lib demande la confirmation elle-même (`showConfirm`, `<ConfirmDialog />` monté une fois).
  Migration : supprimer l'adaptateur `deleteViewById` ; passer la même fonction `deleteView(id)` partout ; retirer la confirmation de l'application (`confirmDelete`) dans ce callback, sinon elle s'affiche deux fois. Le retour à « Tous » quand la vue active est supprimée est déjà fait par la lib.
- **Vues personnelles : `isPublic` retiré** du type `ViewItem` et l'option « vue publique » retirée de `DataTableViewsDropdown` (`isPublic` n'est plus envoyé dans les payloads). `programReference` et `ownerEmail` deviennent facultatifs.
  Migration : supprimer `toLibraryViews` (les vues de l'API se passent telles quelles) ; retirer `makePublic` et `public` de la section `dataTableViews` des textes fournis.
- **`ViewsSidebar` : plus de largeur fixe `w-52` ni de classe `h-table-wrap`** — pleine largeur sur mobile, largeur des noms entre 10 et 16 rem au-delà ; carte autonome (jetons `--h-*`), hook `[data-slot=views-sidebar]`.
  Migration : supprimer les 24 `:deep(aside.h-table-wrap) { … }` ; définir `:root { --h-table-max-height: calc(100vh - 310px) }` pour garder la hauteur bornée.
- **Retirés (spécifiques à un écran ou inutilisés)** : `issue-panel/` (IssueHeaderCard, IssueMetaPanel, IssueTabsNav, helpers, types), `ai-dev-panel/`, `ActivityFeed` (+ types `ActivityEventKind`, `ActivityEventItem`, sous-chemin `./activity-feed`), `RouterTabsNav` (`./router-tabs-nav`), constantes de tickets `COLUMNS`, `FILTERABLE_FIELDS` et `getIsFiltered` (utils des vues). Sections de textes `activityFeed`, `issuePanel`, `aiDevPanel` retirées.
  Migration : aucun usage dans ProjectFlow ; retirer ces trois sections (et `dataTableViews.makePublic` / `public`) de `shared/i18n/libraryTexts.ts`, sans quoi le typage refuse les clés inconnues.
- **Cartes de KPI : `StatCard` et `HMetricCard` retirés** (sous-chemins `./stat-card`, `./h-metric-card`), remplacés par `MetricCard`.
  Migration : `HMetricCard label value` → `MetricCard label value` (`sub` conservé) ; la bande `OverviewKpiStrip` garde sa grille et rend des `MetricCard` (`tile.tone` devient une `Tone` : `bg-(--h-blue-50) text-(--h-blue-600)` → `blue`, `purple` → `purple`, `red` / `amber` / `green` idem, `NEUTRAL` → `gray`) ; `to` / `href` sont des props.
- **`Button` déclare `disabled`** (prop booléenne, combinée à `pending`) au lieu de le laisser passer en attribut : sans effet pour `<Button :disabled>` ; vérifier seulement un `disabled` posé sur un `Button` rendu `as="a"`.
- **`DataTableAdvancedToolbar` / `ViewFormModal` / `DataTableViewsDropdown`** : callbacks typés (`CreateViewCallback`, `UpdateViewCallback`, `DeleteViewCallback`, `Promise<unknown>`) au lieu de `any` ; `filterFields` typé `DataTableFilterField[]`. Sans effet à l'exécution.

Migration type d'un tableau ProjectFlow : le contrôleur remplace son bloc `useVueTable` (refs, `onXChange`, row models, `provideTableInstance`, Échap, `selectedXxx`) par `useClientDataTable({ data, columns, getRowId, initialSorting })` ; le composant remplace squelette + barre d'outils + `ViewsSidebar` + carte + `ViewFormModal` + calcul de `currentColumns` / `currentFilterParams` par `<SavedViewsDataTable :views-source="{ list, create, update, delete }">` (création en slot `create`, actions de sélection en slot `selection-actions`, export intégré) ; `views`/`fetchViews` du contrôleur deviennent `list` (attente de l'auth : passer `null` tant qu'elle charge) ; dans les colonnes, `oneOf` local → `oneOf` de la lib, `h(DataTableColumnHeader, { column, title })` → `sortableHeader(title)`, colonne `actions` → `createActionsColumn`, `h(HBadge, …)` → `statusBadgeCell(…)`, `Avatar`+`AvatarFallback`+`getInitials` → `InitialsAvatar` ; `<IconLoader2 v-if animate-spin>` dans un `Button` → `:pending` ; `<div class="space-y-1.5"><Label>…*</Label>…` → `FormField` ; sélecteurs e2e `.h-table-wrap table` → `[data-slot=saved-views-data-table] table` si la classe disparaît de l'application.

## 0.8.1 (2026-10-11)

Correctif, rétrocompatible : aucune API de composant ne change.

### 🩹 Fixes

- **card:** sur petit écran, le texte ne sort plus du cadre des cartes : elles rétrécissent dans une grille ou une ligne flex et coupent les mots longs (e-mail, identifiant, titre sans espace).
  - `Card` : `min-w-0` et `wrap-anywhere` (`overflow-wrap: anywhere`, hérité par tout le contenu).
  - `CardHeader` : `min-w-0` et colonne `grid-cols-[minmax(0,1fr)]` ; avec `CardAction`, `grid-cols-[minmax(0,1fr)_auto]` au lieu de `[1fr_auto]` (la colonne du titre pouvait déborder, y compris avec un titre `truncate`).
  - `StatCard`, `HMetricCard` : `min-w-0` et `wrap-anywhere`.
- **section-header:** le titre tronqué porte une infobulle native (`title`) avec le texte complet.

## 0.8.0 (2026-10-11)

Nouvelle fonctionnalité, rétrocompatible : sans `getSubRows`, un tableau se comporte exactement comme avant.

### 🚀 Features

- **data-table (mode arbre):** les lignes d'un `DataTable` peuvent s'afficher en ARBRE (espaces et sous-espaces, groupes…), sur le modèle de la table d'Horizon.
  - **`useDataTableTree({ getSubRows, initiallyExpanded?, expanded? })`** (`@jaltech/vuejs-ui/data-table`) : renvoie `tableOptions`, à étaler dans `useVueTable`, et `expanded` (état déplié : `true` = tout, ou `{ [rowId]: true }`), à brancher dans `state.expanded`. `getSubRows` porte le nom de l'option TanStack et est branché sur `getExpandedRowModel`. État contrôlable (ref `expanded` fournie par l'appelant) ; `initiallyExpanded: true` = tout déplié au départ, lignes chargées ensuite comprises.
  - Filtres, filtres de la barre d'outils avancée et recherche partent des feuilles (`filterFromLeafRows: true`) : un parent reste affiché si un de ses enfants correspond. Le tri s'applique à chaque niveau, sous le parent. La pagination porte sur les lignes RACINES (`paginateExpandedRows: false`) : un parent et ses enfants dépliés restent sur la même page et déplier ne change pas le nombre de lignes racines par page (le défaut TanStack coupait une branche entre deux pages).
  - **`meta: { tree: true }`** sur une colonne : `DataTable` rend sa cellule dans **`DataTableTreeCell`** (nouveau, exporté) — indentation par profondeur, lignes de liaison, bouton chevron déplier/replier avec `aria-expanded` ; le contenu de la cellule est inchangé, le clic ne remonte pas à la ligne. `meta.tree` est déclaré sur le `ColumnMeta` de TanStack.
  - **`DataTableExpandToggle`** (nouveau) : bouton « Tout déplier / Tout replier » de la barre d'outils, inclus par `DataTableAdvancedToolbar` en mode arbre uniquement (rien sinon, ni quand aucune ligne n'a d'enfants) ; ailleurs, prop `table`.
  - Utilitaires `isTreeTable(table)`, `isLastSiblingRow(row)`.
- **texts:** section `dataTable` : `toggleRow` (« Afficher les sous-lignes », nom accessible du chevron, l'état étant porté par `aria-expanded`), `expandAll` (« Tout déplier »), `collapseAll` (« Tout replier ») ; props `toggleLabel`, `expandAllLabel`, `collapseAllLabel` prioritaires.
- Vitrine : section « Tree mode » de la page DataTable (arbre déplié au départ, recherche, tri, pagination par racines).

## 0.7.0 (2026-10-10)

### ⚠️ Changement de comportement (couches)

- **couches (z-index):** une confirmation (`showConfirm` / `ConfirmDialog`) ouverte depuis une fiche (`HDialog`, `FormDialog`, `Dialog`…) passe TOUJOURS au-dessus d'elle, voile compris — elle s'affichait dessous, invisible, et la fiche semblait bloquée. Cause : toutes les couches étaient à `z-50` et départagées par l'ordre du DOM ; or les portails (`DialogPortal` de reka-ui, `Teleport`) sont insérés dans `<body>` au MONTAGE du composant, pas à l'ouverture : `<ConfirmDialog />`, monté une fois à la racine de l'application, précédait toute fiche montée plus tard. Même cause, mêmes effets pour le `Dialog` shadcn, `AlertDialog`, `Sheet`, `Drawer`, les popovers / menus / listes et les panneaux du tableau de données (vues, filtres, colonnes : la confirmation de suppression d'une vue passait sous le panneau).
- **couches (z-index):** UNE échelle documentée (`@jaltech/vuejs-ui/composables/useLayer`) : page de l'application `< 1000` ; couches empilées à partir de `1001` — toute couche qui S'OUVRE (modale, Sheet, Drawer, Popover, Combobox, DatePicker, DropdownMenu, ContextMenu, Menubar, Select, HoverCard, panneaux du tableau de données) prend le rang suivant le plus haut rang ouvert, quel que soit l'ordre de montage ; infobulles (`Tooltip`, `HTooltip`) à `9999`. Une modale et son voile partagent le même rang (le contenu recouvre son voile). Rang posé en style en ligne : les classes `z-50` / `z-300`…`z-700` de ces couches sont retirées.
- **useLayer** (nouveau) : `useLayer(open)` donne le rang d'une couche maison (panneau téléporté…) dans la même échelle ; `useDialogLayer()` pour un contenu bâti sur le Dialog de reka-ui ; constantes `LAYER_BASE_Z_INDEX` (1000) et `TOOLTIP_Z_INDEX` (9999).
- Vitrine : exemple « Confirmation from inside a dialog » (page HDialog, `<ConfirmDialog />` monté AVANT la fiche, comme à la racine d'une application), renvoi depuis la page ConfirmDialog.

À vérifier côté application : un élément maison qui devait passer au-dessus des modales de la lib avec un `z-index` entre 50 et 1000 passe désormais dessous (utiliser `useLayer`) ; l'habillage de la page (en-têtes, barre latérale, bandeaux) doit rester sous 1000.

## 0.6.0 (2026-10-10)

UN motif par action : composants pour les actions de ligne, les en-têtes de section et les états vides ; une seule famille d'icônes.

### 🚀 Features

- **RowActions** (nouveau, `@jaltech/vuejs-ui/row-actions`) : actions d'une ligne, alignées à droite. Props `actions: RowAction[]` (`{ key, label, icon, onClick, danger?, hidden?, disabled? }`), `max` (défaut 3), `moreLabel`. Icônes au style unique (`hicon` / `hicon-danger`, taille `hicon`), infobulle `HTooltip` + `aria-label` sur chacune ; au-delà de `max`, `max - 1` icônes puis un menu « ⋯ » (entrées `danger` en variante `destructive`). Le clic ne remonte pas à la ligne. Utilitaire `rowActionsCell(actions, options?)` pour les colonnes TanStack (`cell: ({ row }) => rowActionsCell([...])`).
- **SectionHeader** (nouveau, `@jaltech/vuejs-ui/section-header`) : UN style de titre de section (`text-base font-semibold`), props `title`, `count?` (Badge `secondary`, chiffres tabulaires), `as?` (`h1`…`h6`, défaut `h2`) ; slot `actions` aligné à droite (bouton « Nouveau … »).
- **EmptyState** (refondu) : l'état vide recommandé, construit sur les primitives `Empty*` (toujours exportées). Props `icon?` (composant), `text?` (« Aucun … ») ; slot `action` facultatif ; marges uniformes. Le slot par défaut (contenu libre) reste accepté.
- **FormDialog:** prop `submitVariant: 'default' | 'destructive'` (défaut `default`) — bouton de validation rouge pour une action négative (rejeter…). Rétrocompatible.
- **texts:** nouvelle section `rowActions` (`more` : « Plus d'actions »).

### 🩹 Changements

- **icônes:** UNE famille d'icônes, Tabler (`@tabler/icons-vue`). Les 57 composants qui importaient `lucide-vue-next` ou `@lucide/vue` (primitives shadcn : fermeture des dialogues et panneaux, combobox, case à cocher, select, menus, pagination, calendriers, sonner, data-table avancé…) passent aux équivalents Tabler (94 imports), mêmes classes de taille. Les puces des éléments radio utilisent `IconCircleFilled`.
- **deps:** `lucide-vue-next` et `@lucide/vue` retirés des dépendances. Une application qui les utilisait par transitivité doit les déclarer elle-même.
- Vitrine : pages RowActions, SectionHeader, EmptyState refaite, `submitVariant` de FormDialog ; colonne d'actions dans la démo DataTable ; icônes Tabler partout ; les boutons et titres des composants ne sont plus écrasés par les styles de VitePress (boutons transparents).

## 0.5.0 (2026-10-05)

### 🚀 Features

- **typographie:** UNE échelle typographique, base 14 px (application dense), en jetons Tailwind v4 — nouveau point d'entrée `@jaltech/vuejs-ui/typography.css` (aussi inclus dans `styles.css`) : `text-2xs` 11/16 px (très petites étiquettes uniquement), `text-xs` 12/16, `text-compact` 13/20 (texte dense : tableaux, listes, menus), `text-sm` 14/20 (base), `text-base` 16/24, `text-lg` 18/28, `text-xl` 20/28, `text-2xl` 24/32, `text-3xl` 30/36. Les pas `xs` à `3xl` gardent les valeurs standard de Tailwind ; `2xs` et `compact` sont nouveaux.
- **polices:** Inter et JetBrains Mono AUTO-HÉBERGÉES (woff2 variables, graisses 100 à 900, découpées par jeu de caractères, `font-display: swap`) — nouveau point d'entrée `@jaltech/vuejs-ui/fonts.css` (paquets Fontsource, licence OFL). `font-sans` = Inter, `font-mono` = JetBrains Mono. Plus besoin d'aucun service de polices tiers.
- **chiffres tabulaires:** `tabular-nums` sur les valeurs de `StatCard` / `HMetricCard`, `Pagination`, les cellules de `Calendar` / `RangeCalendar`, `NumberField` et le compteur de `TableSelectionBar` (`SidebarMenuBadge` l'avait déjà). Volontairement PAS sur `Table` / `DataTable` / `Badge` entiers : le `tnum` d'Inter élargit aussi le trait d'union du texte — à poser sur les cellules et badges purement numériques.
- **cn():** `text-2xs` et `text-compact` sont déclarés à tailwind-merge comme tailles de texte (sinon fusionnés comme des couleurs : `text-compact` effaçait `text-muted-foreground`).

### 🩹 Changements visuels

- Plus aucune taille arbitraire dans la lib (70 remplacements, vitrine comprise) : 10-11 px → `text-2xs` (étiquettes) ou `text-xs` (texte lisible), 11,5 px → `text-xs`, 12,5-13 px → `text-compact`, 15 px → `text-base`, 28 px → `text-3xl`. Les tailles qui portaient un interligne hérité prennent celui de l'échelle.
- Vitrine : page « Typography & fonts ».

## 0.4.10 (2026-10-03)

### 🩹 Fixes

- **data-table (vues sauvegardées):** « vue modifiée » n'est plus toujours vraie — comparaison SÉMANTIQUE des filtres (`normalizeFilterParams`, `filterParamsEqual` : ordre des clés, valeurs vides, ordre des filtres et opérateur à moins de deux filtres sans effet) et des colonnes (`columnsEqual`, colonnes masquables de la table uniquement). « Réinitialiser » / « Mettre à jour » n'apparaissent qu'en cas de vraie différence.
- **data-table:** une vue applique TOUS ses filtres, quel que soit le tableau (`calcViewSearchParams` ne filtre plus sur une liste figée de champs de tickets) ; `FilterItem.field` devient `string`.
- **data-table:** colonnes d'une vue restaurées à la sélection, à la réinitialisation ET après un rechargement de page : `DataTableColumnsVisibility` relit `cols` dans l'URL (source de vérité, absent = tout visible). Plus aucun `COLUMNS` figé (dépréciés : `COLUMNS`, `FILTERABLE_FIELDS`) ; nouveaux utilitaires `getHideableColumnIds`, `visibilityFromColumns`, `columnsFromQuery`, `COLUMNS_QUERY_KEY`.
- **ViewFormModal:** la vue créée devient la vue active (`viewId` dans l'URL) ; Entrée ne crée plus deux vues (une seule soumission, protégée par `pending`) ; supprimer la vue active ramène à « Tous ».
- **ViewsSidebar:** un renommage refusé (`{ status: 'error', message }`) n'est plus avalé — le champ reste ouvert avec le message (quitter le champ sans changer le nom abandonne) ; supprimer la vue active ramène à « Tous ».
- **DataTableAdvancedToolbar:** l'échec de « Mettre à jour la vue » est affiché ; plus de double création à l'Entrée.
- **DataTableViewsDropdown:** reste sur la route courante (naviguait vers `/`), colonnes dérivées de la table.

Contrat des callbacks de vues (documenté) : résoudre après avoir rafraîchi `views` ; `{ status: 'error', message }` en cas d'échec, `message` affiché tel quel (au consommateur de le traduire) ; la création renvoie `{ view: { id } }`.

## 0.4.9 (2026-10-03)

### 🚀 Features

- **texts:** tous les textes de la bibliothèque deviennent traduisibles par un seul mécanisme, sur le modèle du Combobox (0.4.8) : `installLibraryTexts(app, textes)` (une fois pour l'application, getter réactif possible pour suivre la langue), `provideLibraryTexts(textes)` pour un sous-arbre, `defaultLibraryTexts`, `useLibraryTexts()`, `LIBRARY_TEXTS_KEY` (nouveau point d'entrée `@jaltech/vuejs-ui/texts`). Textes partiels par section : `locale`, `combobox`, `selectionBar`, `confirmDialog`, `formDialog`, `datePicker`, `dataTable`, `dataTableFilters`, `dataTableViews`, `activityFeed`, `issuePanel`, `aiDevPanel`, `tenantPanel` et les noms accessibles des primitives (`dialog`, `sheet`, `pagination`, `carousel`, `breadcrumb`, `sidebar`, `spinner`, `messageScroller`, `command`). Pluriels en fonctions `(count) => string`. Priorité : prop > textes fournis > défauts (textes actuels, inchangés). `installComboboxTexts` reste fonctionnel et prime sur la section `combobox`.
- **locale:** la langue des dates n'est plus figée en `fr-FR` : `DatePicker` (calendrier et date affichée), `ActivityFeed` et le panneau de ticket lisent `locale` des textes fournis (la prop `locale` du DatePicker reste prioritaire). `fmtIssueDate(date, locale?)`.
- **data-table:** `createSelectColumn({ selectAllLabel, selectRowLabel })` ; sans option, les noms accessibles suivent les textes fournis (lus au rendu).

## 0.4.8 (2026-10-03)

### 🚀 Features

- **combobox:** plus aucun texte figé en français — nouvelles props `clearAllLabel` (bouton « Tout désélectionner ») et `selectedCountLabel(count)` (« N sélectionnés »), en plus de `placeholder` / `searchPlaceholder` / `emptyText`. Les textes peuvent aussi être fournis une seule fois pour toute l'application ou un sous-arbre (`installComboboxTexts(app, textes)`, `provideComboboxTexts(textes)`, `COMBOBOX_TEXTS_KEY`), y compris sous forme de getter réactif (changement de langue). Priorité : prop > textes fournis > défauts français actuels (`defaultComboboxTexts`). Rétrocompatible.

## 0.4.7 (2026-10-02)

### 🚀 Features

- **data-table:** `createSelectColumn()` — colonne de sélection prête à l'emploi (Checkbox de la lib, état intermédiaire, noms accessibles).
- **button:** variante `hicon-danger` (bouton icône de suppression, survol rouge) à utiliser avec la taille `hicon`.
- **TableSelectionBarButton:** prop `success` (action favorable en vert).

### 🩹 Fixes

- **FormDialog:** boutons de la lib (`Button`) au lieu de `<button>` bruts, icônes tabler, déclencheur `iconOnly` avec `aria-label`, formulaire qui défile dans une `ScrollArea` bornée à l'écran (en-tête et pied fixes), prop `submitDisabled`.
- **ConfirmDialog:** boutons de la lib (`outline` + `default`/`destructive`).
- **TableSelectionBar / TableSelectionBarButton:** boutons de la lib avec nom accessible (« Effacer la sélection », `title` du bouton).
- **HDialog:** construit sur le `Dialog` de la lib (piège du focus, Échap) au lieu d'un overlay fait main ; contenu en `ScrollArea`.
- **HTooltip:** s'affiche aussi au focus clavier (`focusin`/`focusout`).

## 0.4.6 (2026-10-02)

### 🚀 Features

- **combobox:** `Combobox` devient la liste de choix de référence, toujours avec recherche : choix multiple (`multiple`, `modelValue` tableau, liste qui reste ouverte, « Tout désélectionner »), option « aucun » (`noneLabel`, émet `null` / `[]`), groupes (`groupKey`), taille `sm`, options désactivables (`disabled`), slots `option` et `value` pour un rendu personnalisé. Rétrocompatible.

## 0.4.5 (2026-10-02)

### 🩹 Fixes

- **color-picker:** les pastilles par défaut sortent du `<script setup>` (`presets.ts`) : `defineProps` ne peut pas référencer une constante locale, ce qui cassait la compilation chez le consommateur.

## 0.4.4 (2026-10-02)

### 🚀 Features

- **color-picker:** nouveau composant `ColorPicker` (Popover : pastilles + saisie hexadécimale) qui remplace `<input type="color">` ; valeur `#rrggbb`, pastilles personnalisables (`presets`), tailles `default`/`sm`.

## 0.4.3 (2026-10-02)

### 🩹 Fixes

- **date-picker:** le calendrier s'ouvre sur le mois de la date choisie, et non sur le mois courant.

## 0.4.2 (2026-10-02)

### 🚀 Features

- **date-picker:** nouveau composant `DatePicker` (Popover + Calendar) qui remplace `<input type="date">` ; valeur ISO `AAAA-MM-JJ` ou `null`, croix pour effacer, tailles `default`/`sm`, locale `fr-FR` par défaut.

## 0.4.1 (2026-10-01)

### 🩹 Fixes

- **responsive:** `DialogContent` et `HDialog` ne dépassent plus l'écran (hauteur max + défilement) ; `DialogScrollContent` resserré sur téléphone.
- **responsive:** la barre d'outils `DataTableAdvancedToolbar` passe à la ligne ; `ViewsSidebar` prend toute la largeur sous `md`.
- **responsive:** `NativeSelect` ne dépasse plus son conteneur (`max-w-full`) ; les onglets de `RouterTabsNav` ne se tassent plus (ils défilent dans leur conteneur).

## 0.4.0 (2026-09-29)

### ⚠️ Breaking / Migration

- **tailwind:** migrated to **Tailwind CSS v4**. `styles.css` now uses `@import "tailwindcss/*"` + `@theme` + `@custom-variant` (no more `tailwind.config.cjs`); component `<style>` blocks that use `@apply` carry a `@reference`. Consumers must be on Tailwind v4 (use the `@tailwindcss/vite` plugin) and no longer need the JS preset/content globs. Preflight is still not shipped (source-first, non-clobbering). `tailwindcss-animate` → `tw-animate-css`.

## 0.3.14 (2026-09-29)

### 🏡 Chore

- **repo:** flattened the monorepo (`libs/vuejs-ui` → `vuejs-ui`, `apps/docs` → `docs`); fixed `repository.directory` and `homepage` metadata accordingly. No package content change.

## 0.3.13 (2026-09-29)

### 🚀 Features

- **exports:** added folder barrels so consumers import from clean paths instead of deep `.vue` files — `@jaltech/vuejs-ui/composables`, `@jaltech/vuejs-ui/data-table/advanced`, `@jaltech/vuejs-ui/data-table/advanced/views` (ViewsSidebar, ViewFormModal), plus per-component subpaths for the composed components (`form-dialog`, `confirm-dialog`, `empty-state`, `h-dialog`, `h-tooltip`, `stat-card`, `h-metric-card`, `activity-feed`, `router-tabs-nav`, `table-selection-bar`).
- **exports:** the root barrel now also exports `EmptyState` and `RouterTabsNav` (were missing).

## 0.3.12 (2026-09-29)

### 📝 Documentation

- Rewrote the README as standalone, English, OSS-standard documentation (badges, features, requirements, quick start, usage, contributing, license); removed all origin-project references.
- Added a pre-release "not production-ready" notice (to be removed at 1.0.0).
- Cleaned package metadata (`description`, `keywords`, `author`); added a repository-root MIT LICENSE.

## 0.3.11 (2026-09-29)

### 🩹 Fixes

- **data-table:** the DataTable/ViewsSidebar styling now lives inside the components (scoped `<style>` / inline classes) instead of relying on the consuming app global CSS, so the table renders correctly regardless of the host app stylesheet.

## 0.3.2 (2026-08-24)

### 🩹 Fixes

- **build:** build.mjs copies the local output (`libs/vuejs-ui/dist`) to `dist/libs/vuejs-ui` so `pnpm check`/`verify` work again; first CI-driven publish

## 0.3.0 (2026-08-22)

### 🚀 Features

- **exports:** completed the public API — every component folder, `types`, `utils`, each composable, and the `./*` wildcard to the sources (`src/` is now published in the package). Covers all consumed subpaths, including deep `.vue` imports
- **deps:** declared previously implicit dependencies (`@vueuse/core`, `class-variance-authority`, `@lucide/vue`, `vue-sonner`); `vee-validate` as an optional peer

### ⚠️ Notes

- The package now exposes its sources (`.vue`/`.ts`): consumers need a bundler that compiles them (Vite + @vitejs/plugin-vue), and must add `@jaltech/vuejs-ui` to `optimizeDeps.exclude`

## 0.2.3 (2026-07-19)

### 🩹 Fixes

- **vuejs-ui:** retest publish pipeline after per-lib CI job split

### ❤️ Thank You

- Jaltech

## 0.2.2 (2026-07-19)

### 🩹 Fixes

- **vuejs-ui:** retest publish pipeline after per-lib CI job split

### ❤️ Thank You

- Jaltech

## 0.2.1 (2026-07-19)

### 🩹 Fixes

- **libs:** disable npm provenance, requires a public source repo
- **ci:** provide Sigstore OIDC token for npm provenance publishing

### ❤️ Thank You

- Jaltech

## 0.2.0 (2026-07-19)

This was a version bump only for vuejs-ui to align it with other projects, there were no code changes.