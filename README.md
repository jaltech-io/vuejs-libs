# vuejs-libs — packages npm `@profeskills/*` Vue

Bibliothèques UI Vue de la plateforme (repo standalone, anciennement `platform-apps/libs/vuejs-ui`). Publiées sur [npmjs.org](https://www.npmjs.com/org/profeskills), consommées comme n'importe quelle dépendance npm par les projets (projectflow et autres).

| Package | Contenu |
|---|---|
| [`@profeskills/vuejs-ui`](libs/vuejs-ui) | Design system Vue 3 : ~65 familles de composants (button, dialog, data-table avancée, select, sheet, sidebar…), composables (`useConfirm`, `useTableInstance`), `types`, `utils` |

## Nature du package : source-first

Depuis la **0.3.0**, le package expose ses **sources** (`src/*.vue`, `src/*.ts`) via son champ `exports` — chaque dossier de composant a son entrée (`@profeskills/vuejs-ui/dialog`), les fichiers profonds passent par le wildcard (`@profeskills/vuejs-ui/data-table/DataTable.vue`). Le `dist/` compilé est aussi livré (`./styles.css` + typings pour le gate de vérification).

**Prérequis consommateur** : un bundler qui compile Vue SFC + TypeScript (Vite + `@vitejs/plugin-vue`), et :

```js
// vite.config — le prébundling esbuild ne sait pas traiter les .vue
optimizeDeps: { exclude: ['@profeskills/vuejs-ui'] }
```

Pour Tailwind, ajouter les sources de la lib au `content` :

```js
content: ['./node_modules/@profeskills/vuejs-ui/src/**/*.{vue,js,ts}']
```

## Développement

```bash
pnpm install
pnpm check        # typecheck (vue-tsc) + build (vite lib + vue-tsc d.ts) + verify
```

## Publier une version

1. Bump `version` dans `libs/vuejs-ui/package.json` + entrée `CHANGELOG.md`, merger sur `main`
2. Tagger : `git tag vuejs-ui@0.3.0 && git push origin vuejs-ui@0.3.0`
3. Le job `deploy:vuejs-ui` du pipeline du tag valide puis publie sur npm

## Variables CI/CD requises (Forgejo > Settings > Actions > Secrets)

| Variable | Rôle |
|---|---|
| `NPM_TOKEN` | Token npm "Automation" (masqué, à scoper aux tags protégés) — publication |
