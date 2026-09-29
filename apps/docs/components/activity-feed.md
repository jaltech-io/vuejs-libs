# ActivityFeed

<script setup>
import ActivityFeed from '@jaltech/vuejs-ui/ActivityFeed.vue'

const events = [
  { id: '1', projectId: 'p1', issueId: 'i1', type: 'issue_created', authorEmail: 'ada@example.com', fromValue: null, toValue: null, summary: 'Ada a créé la tâche « Configurer le CI »', createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: '2', projectId: 'p1', issueId: 'i1', type: 'status_changed', authorEmail: 'alan@example.com', fromValue: 'À faire', toValue: 'En cours', summary: 'Alan a changé le statut', createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
  { id: '3', projectId: 'p1', issueId: 'i1', type: 'comment_added', authorEmail: 'grace@example.com', fromValue: null, toValue: null, summary: 'Grace a ajouté un commentaire', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString() },
]
</script>

A timeline of project activity events, with author avatars, from/to value changes, and relative timestamps.

**Built on:** shadcn-vue's Avatar.

<ClientOnly>
<div class="demo" style="display:block">
  <ActivityFeed :events="events" />
</div>
</ClientOnly>

## Code

```vue
<script setup lang="ts">
import ActivityFeed from '@jaltech/vuejs-ui/ActivityFeed.vue'
import type { ActivityEventItem } from '@jaltech/vuejs-ui/types'

const events: ActivityEventItem[] = [
  { id: '1', projectId: 'p1', issueId: 'i1', type: 'issue_created', authorEmail: 'ada@example.com', fromValue: null, toValue: null, summary: 'Ada a créé la tâche « Configurer le CI »', createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: '2', projectId: 'p1', issueId: 'i1', type: 'status_changed', authorEmail: 'alan@example.com', fromValue: 'À faire', toValue: 'En cours', summary: 'Alan a changé le statut', createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
  { id: '3', projectId: 'p1', issueId: 'i1', type: 'comment_added', authorEmail: 'grace@example.com', fromValue: null, toValue: null, summary: 'Grace a ajouté un commentaire', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString() },
]
</script>

<template>
  <ActivityFeed :events="events" />
</template>
```
