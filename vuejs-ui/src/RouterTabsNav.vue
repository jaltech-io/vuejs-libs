<template>
  <div class="flex gap-1">
    <RouterLink
      v-for="tab in tabs"
      :key="tab.to"
      :to="tab.to"
      :class="[
        'inline-flex shrink-0 whitespace-nowrap items-center gap-1.5 rounded-(--h-radius) border-[0.5px] px-3.5 py-1.5 max-sm:px-2.5 text-[12.5px] font-medium font-[inherit] no-underline cursor-pointer',
        isActive(tab)
          ? 'border-(--h-border) bg-(--h-surface2) text-(--h-text)'
          : 'border-transparent bg-none text-(--h-text-3) transition-[background,color] duration-100 hover:bg-(--h-surface2) hover:text-(--h-text)',
      ]"
    >
      <component :is="tab.icon" v-if="tab.icon" :size="14" />
      {{ tab.label }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
// Barre d'onglets GÉNÉRIQUE basée sur le routeur (RouterLink), coque réutilisable pour toute
// navigation par onglets liée à une route (planification sprints/backlog/vélocité, etc.).
// Le CONTENU (libellés, icônes, routes) est fourni par le consommateur via `tabs` — la lib ne
// connaît aucune route produit. L'onglet actif est dérivé du chemin courant, pas passé en prop.
import type { Component } from 'vue';
import { useRoute } from 'vue-router';

export interface RouterTab {
  label: string;
  to: string;
  icon?: Component;
}

defineProps<{ tabs: RouterTab[] }>();

const route = useRoute();

function isActive(tab: RouterTab): boolean {
  return route.path === tab.to || route.path.startsWith(`${tab.to}/`);
}
</script>
