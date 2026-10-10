<template>
  <div class="h-dt-tree" :style="{ paddingLeft: `${row.depth * TREE_INDENT}px` }">
    <span class="h-dt-tree-guides" aria-hidden="true">
      <span v-for="guide in guidesOf(row)" :key="guide.key" :class="guide.className" :style="guide.style" />
    </span>
    <button
      v-if="row.getCanExpand()"
      type="button"
      class="h-dt-tree-toggle"
      :aria-expanded="row.getIsExpanded()"
      :aria-label="toggleLabel ?? texts.dataTable.toggleRow"
      @click.stop="row.toggleExpanded()"
    >
      <IconChevronRight class="h-dt-tree-chevron" :class="{ 'h-dt-tree-chevron-open': row.getIsExpanded() }" />
    </button>
    <span v-else class="h-dt-tree-spacer" />
    <div class="h-dt-tree-content"><slot /></div>
  </div>
</template>

<script setup lang="ts">
/**
 * Cellule arborescente : indentation par profondeur (`row.depth`), lignes de liaison et bouton
 * déplier/replier (`aria-expanded`). `DataTable` l'utilise d'office pour une colonne `meta: { tree: true }`.
 * Hors `DataTable`, la cellule englobante doit être `position: relative` ; `--h-dt-tree-inset` y
 * donne son retrait gauche (padding) pour aligner les lignes de liaison.
 */
import type { Row } from '@tanstack/vue-table';
import { IconChevronRight } from '@tabler/icons-vue';
import type { CSSProperties } from 'vue';
import { useLibraryTexts } from '../texts';
import { isLastSiblingRow } from './tree';

defineProps<{
  row: Row<any>;
  /** Nom accessible du bouton déplier/replier. Défaut : textes de la lib (`dataTable.toggleRow`). */
  toggleLabel?: string;
}>();

const texts = useLibraryTexts();

/** Retrait par niveau, en px — aussi la largeur du bouton (lignes de liaison centrées dessus). */
const TREE_INDENT = 20;
const center = (level: number) => `${level * TREE_INDENT + TREE_INDENT / 2}px`;

interface Guide {
  key: string;
  className: string;
  style: CSSProperties;
}

// Calculé à chaque rendu (pas de computed) : le tri réordonne `subRows` sans changer d'objet ligne.
function guidesOf(row: Row<any>): Guide[] {
  const guides: Guide[] = [];
  const depth = row.depth;
  if (depth > 0) {
    // Ancêtres de la racine au parent : un trait continue tant que l'ancêtre a des frères en dessous.
    const ancestors = row.getParentRows();
    for (let level = 0; level < depth - 1; level++) {
      const ancestor = ancestors[level + 1];
      if (ancestor && !isLastSiblingRow(ancestor)) {
        guides.push({ key: `a${level}`, className: 'h-dt-tree-vertical', style: { left: center(level), top: 0, bottom: 0 } });
      }
    }
    // Trait du niveau de la ligne : jusqu'au milieu pour le dernier enfant, puis la branche vers la ligne.
    guides.push({
      key: 'own',
      className: 'h-dt-tree-vertical',
      style: { left: center(depth - 1), top: 0, bottom: isLastSiblingRow(row) ? '50%' : 0 },
    });
    guides.push({
      key: 'branch',
      className: 'h-dt-tree-horizontal',
      style: { left: center(depth - 1), top: '50%', width: row.getCanExpand() ? '10px' : '26px' },
    });
  }
  // Ligne dépliée : trait sous le chevron vers ses enfants.
  if (row.getIsExpanded() && row.subRows.length > 0) {
    guides.push({
      key: 'children',
      className: 'h-dt-tree-vertical',
      style: { left: center(depth), top: 'calc(50% + 8px)', bottom: 0 },
    });
  }
  return guides;
}
</script>

<style scoped>
.h-dt-tree {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}
.h-dt-tree-guides {
  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--h-dt-tree-inset, 0px);
  width: 0;
  pointer-events: none;
}
.h-dt-tree-vertical {
  position: absolute;
  width: 0;
  border-left: 1px solid var(--h-border-strong);
}
.h-dt-tree-horizontal {
  position: absolute;
  height: 0;
  border-top: 1px solid var(--h-border-strong);
}
.h-dt-tree-toggle,
.h-dt-tree-spacer {
  position: relative;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}
.h-dt-tree-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--h-radius, 6px);
  color: var(--h-text-3);
  background: transparent;
  cursor: pointer;
}
.h-dt-tree-toggle:hover {
  /* La ligne survolée est déjà sur --h-surface2 : un ton au-dessus pour rester visible. */
  background: var(--h-border);
  color: var(--h-text);
}
.h-dt-tree-toggle:focus-visible {
  outline: 2px solid var(--h-blue-600);
  outline-offset: 1px;
}
.h-dt-tree-chevron {
  width: 14px;
  height: 14px;
  transition: transform 0.15s ease;
}
.h-dt-tree-chevron-open {
  transform: rotate(90deg);
}
.h-dt-tree-content {
  min-width: 0;
}
</style>
