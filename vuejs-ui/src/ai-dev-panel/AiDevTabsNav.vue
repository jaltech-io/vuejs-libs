<template>
  <div class="flex gap-1 border-b-[0.5px] border-b-(--h-border) mb-5">
    <RouterLink
      v-for="tab in TABS" :key="tab.routeName"
      class="flex items-center gap-1.5 py-[9px] px-3.5 border-0 bg-none cursor-pointer no-underline text-[13px]
             font-medium text-(--h-text-3) border-b-2 border-b-transparent -mb-px font-[inherit]
             transition-[color,border-color] duration-100 hover:text-(--h-text-2)"
      active-class="h-ai-dev-tab-active"
      :to="{ name: tab.routeName }"
    >
      <component :is="tab.icon" :size="14" /> {{ tab.label }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { IconRobot, IconRobotFace, IconRocket } from '@tabler/icons-vue';

// Icônes theme IA (robot) + labels qui gardent un ancrage technique — routeName
// inchangé, seule la présentation change (2026-08-09). "Déployer" (IconRocket) n'a pas de
// persona IA derrière (voir DeployService, aucun appel LLM) — reste dans ce même bandeau
// d'onglets car c'est la même famille d'outils développeur/plateforme, pas parce que c'est
// un agent.
const TABS = [
  { routeName: 'fullstack-developer', label: 'Dev', icon: IconRobot },
  { routeName: 'lead-dev', label: 'Merge', icon: IconRobotFace },
  { routeName: 'deploy', label: 'Déployer', icon: IconRocket },
];
</script>

<style scoped>
@reference "../styles.css";
.h-ai-dev-tab-active { @apply text-(--h-blue-600)! border-b-[var(--h-blue-600)]; }
</style>
