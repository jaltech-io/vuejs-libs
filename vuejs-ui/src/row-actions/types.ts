import type { Component } from 'vue';

/** Une action de ligne affichée par `RowActions`. */
export interface RowAction {
  /** Identifiant stable (clé de rendu). */
  key: string;
  /** Libellé : infobulle et nom accessible de l'icône, texte de l'entrée du menu « ⋯ ». */
  label: string;
  /** Icône (composant, ex. `IconPencil` de `@tabler/icons-vue`). */
  icon: Component;
  onClick: () => void;
  /** Action destructive : survol rouge (icône), entrée rouge (menu). */
  danger?: boolean;
  /** Action non affichée (droits, état de la ligne). */
  hidden?: boolean;
  disabled?: boolean;
}
