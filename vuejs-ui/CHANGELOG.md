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