<script setup lang="ts">
import { IconDots } from '@tabler/icons-vue';
import { computed } from 'vue';
import { Button } from '../button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../dropdown-menu';
import HTooltip from '../HTooltip.vue';
import { useLibraryTexts } from '../texts';
import type { RowAction } from './types';

/**
 * Actions d'une ligne (tableau, liste) : icônes alignées à droite, un seul style (`hicon` /
 * `hicon-danger`), infobulle et nom accessible sur chaque icône. Au-delà de `max` actions visibles,
 * `max - 1` icônes puis un menu « ⋯ » avec le reste. Le clic ne remonte pas à la ligne.
 */
const props = withDefaults(
  defineProps<{
    actions: RowAction[];
    /** Nombre maximal d'éléments affichés (icônes + « ⋯ »). Défaut : 3. */
    max?: number;
    /** Nom du déclencheur « ⋯ ». Défaut : textes de la lib (« Plus d'actions »). */
    moreLabel?: string;
  }>(),
  { max: 3, moreLabel: undefined },
);

const texts = useLibraryTexts();
const moreText = computed(() => props.moreLabel ?? texts.value.rowActions.more);

const visibleActions = computed(() => props.actions.filter((action) => !action.hidden));
const overflowing = computed(() => visibleActions.value.length > Math.max(props.max, 1));
const inlineActions = computed(() =>
  overflowing.value ? visibleActions.value.slice(0, Math.max(props.max - 1, 0)) : visibleActions.value,
);
const menuActions = computed(() =>
  overflowing.value ? visibleActions.value.slice(Math.max(props.max - 1, 0)) : [],
);
</script>

<template>
  <div
    v-if="visibleActions.length"
    data-slot="row-actions"
    class="flex items-center justify-end gap-1"
    @click.stop
    @dblclick.stop
  >
    <HTooltip v-for="action in inlineActions" :key="action.key" :text="action.label">
      <Button
        type="button"
        size="hicon"
        :variant="action.danger ? 'hicon-danger' : 'hicon'"
        :aria-label="action.label"
        :disabled="action.disabled"
        @click="action.onClick()"
      >
        <component :is="action.icon" class="size-3.5" />
      </Button>
    </HTooltip>
    <DropdownMenu v-if="menuActions.length">
      <HTooltip :text="moreText">
        <DropdownMenuTrigger as-child>
          <Button type="button" size="hicon" variant="hicon" :aria-label="moreText">
            <IconDots class="size-3.5" />
          </Button>
        </DropdownMenuTrigger>
      </HTooltip>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          v-for="action in menuActions"
          :key="action.key"
          :variant="action.danger ? 'destructive' : 'default'"
          :disabled="action.disabled"
          @select="action.onClick()"
        >
          <component :is="action.icon" />
          {{ action.label }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
