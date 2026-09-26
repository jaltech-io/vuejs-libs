## 0.3.2 (2026-08-24)

### 🩹 Fixes

- **build:** build.mjs recopie la sortie locale (libs/vuejs-ui/dist, outDir du fix 0.3.1) vers dist/libs/vuejs-ui — pnpm check/verify de nouveau fonctionnels ; première publication pilotée par la CI de la FORGE de ProjectFlow

## 0.3.0 (2026-08-22)

### 🚀 Features

- **exports:** API publique complétée — chaque dossier de composant, `types`, `utils`, chaque composable, et le wildcard `./*` vers les sources (`src/` désormais publié dans le package). Couvre tous les sous-chemins réellement consommés par les applications (imports profonds de `.vue` inclus)
- **deps:** déclaration des dépendances jusqu'ici implicites (`@vueuse/core`, `class-variance-authority`, `@lucide/vue`, `vue-sonner`) ; `vee-validate` en peer optionnel

### ⚠️ Notes

- Le package expose désormais ses sources (`.vue`/`.ts`) : le consommateur doit avoir un bundler qui les compile (Vite + @vitejs/plugin-vue). Ajouter `@jaltech/vuejs-ui` à `optimizeDeps.exclude`
- Repo déplacé : gitlab.com/jalil.mestaoui/vuejs-libs (ex platform-apps/libs/vuejs-ui)

## 0.2.3 (2026-07-19)

### 🩹 Fixes

- **vuejs-ui:** retest publish pipeline after per-lib CI job split

### ❤️ Thank You

- Your Name

## 0.2.2 (2026-07-19)

### 🩹 Fixes

- **vuejs-ui:** retest publish pipeline after per-lib CI job split

### ❤️ Thank You

- Your Name

## 0.2.1 (2026-07-19)

### 🩹 Fixes

- **libs:** disable npm provenance, requires a public source repo
- **ci:** provide Sigstore OIDC token for npm provenance publishing

### ❤️ Thank You

- Your Name

## 0.2.0 (2026-07-19)

This was a version bump only for vuejs-ui to align it with other projects, there were no code changes.