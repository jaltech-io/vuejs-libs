# @profeskills/vuejs-ui

Bibliothèque de composants Vue 3 partagée par les applications ProfesSkills.

<!-- test: retest deploy:vuejs-ui after moving publish into the deploy stage -->

## Installation

```bash
pnpm add @profeskills/vuejs-ui vue vue-router @tanstack/vue-table
```

Importez ensuite la feuille de styles une seule fois dans le point d’entrée de
l’application :

```ts
import '@profeskills/vuejs-ui/styles.css'
```

## Utilisation

```vue
<script setup lang="ts">
import { HBadge, HDialog } from '@profeskills/vuejs-ui'
</script>
```

Les groupes volumineux sont également disponibles par sous-chemins :

```ts
import { Dialog, DialogContent } from '@profeskills/vuejs-ui/dialog'
import { DataTable } from '@profeskills/vuejs-ui/data-table'
import { showConfirm } from '@profeskills/vuejs-ui/confirm'
```

La classe `dark` appliquée à l’élément racine active les variables du thème
sombre. Les variables CSS du thème peuvent être redéfinies par l’application.

## Développement

```bash
pnpm nx typecheck vuejs-ui
pnpm nx build vuejs-ui
npm pack --dry-run ./dist/libs/vuejs-ui
```

Licence MIT.
