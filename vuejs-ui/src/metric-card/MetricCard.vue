<script setup lang="ts">
// Carte de KPI UNIQUE de la lib (remplace StatCard et HMetricCard) : pastille d'icône teintée
// facultative, valeur en chiffres tabulaires, libellé, ligne secondaire facultative. Cliquable
// vers une route (`to`) ou un lien externe (`href`). Purement présentationnelle.
import type { Component, HTMLAttributes } from 'vue';
import { computed } from 'vue';
import { RouterLink, type RouteLocationRaw } from 'vue-router';
import { Card } from '../card';
import { chipToneClasses, type Tone } from '../tones';
import { cn } from '../utils';

const props = withDefaults(
  defineProps<{
    label: string;
    value: string | number;
    /** Icône (composant, ex. Tabler) dans une pastille teintée. */
    icon?: Component;
    /** Tonalité de la pastille d'icône. Défaut : `blue`. */
    tone?: Tone;
    /** Ligne secondaire sous le libellé (évolution, période…). */
    sub?: string;
    /** Route de l'application : la carte devient un lien interne. */
    to?: RouteLocationRaw;
    /** Lien externe (nouvel onglet) ; prioritaire sur `to`. */
    href?: string;
    class?: HTMLAttributes['class'];
  }>(),
  { tone: 'blue' },
);

const linked = computed(() => !!(props.href || props.to));
const root = computed(() => (props.href ? 'a' : props.to ? RouterLink : 'div'));
const rootAttributes = computed(() =>
  props.href ? { href: props.href, target: '_blank', rel: 'noopener' } : props.to ? { to: props.to } : {},
);
</script>

<template>
  <component
    :is="root"
    v-bind="rootAttributes"
    data-slot="metric-card"
    :class="cn(
      'block min-w-0',
      linked && 'group rounded-xl no-underline outline-hidden focus-visible:ring-3 focus-visible:ring-ring/50',
      props.class,
    )"
  >
    <Card
      class="h-full flex-row items-center gap-[11px] p-3.5 transition-[border-color] max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-2"
      :class="{ 'group-hover:border-(--h-border-strong)': linked }"
    >
      <div
        v-if="icon"
        class="flex size-[34px] shrink-0 items-center justify-center rounded-[9px]"
        :class="chipToneClasses[props.tone]"
      >
        <component :is="icon" class="size-4" aria-hidden="true" />
      </div>
      <div class="min-w-0">
        <div class="text-xl font-bold leading-[1.1] text-(--h-text) tabular-nums max-[560px]:text-lg">{{ value }}</div>
        <div class="mt-px text-xs text-(--h-text-3)">{{ label }}</div>
        <div v-if="sub" class="mt-1 text-xs text-(--h-text-3)">{{ sub }}</div>
      </div>
    </Card>
  </component>
</template>
