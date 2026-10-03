import { type App, type InjectionKey, type MaybeRefOrGetter, provide } from 'vue';

/**
 * Textes affichés par `Combobox`. Chacun se règle par prop sur un composant, ou une seule fois
 * pour toute l'application (ou un sous-arbre) avec `provideComboboxTexts` / `COMBOBOX_TEXTS_KEY`.
 * Ordre de priorité : prop > textes fournis > textes par défaut (français).
 */
export interface ComboboxTexts {
  /** Déclencheur sans valeur choisie. */
  placeholder?: string;
  /** Champ de recherche de la liste. */
  searchPlaceholder?: string;
  /** Aucune option ne correspond à la recherche. */
  emptyText?: string;
  /** Bouton qui vide la sélection (choix multiple). */
  clearAllLabel?: string;
  /** Déclencheur quand plus de deux valeurs sont choisies (choix multiple). */
  selectedCountLabel?: (count: number) => string;
}

export const defaultComboboxTexts: Required<ComboboxTexts> = {
  placeholder: 'Sélectionner…',
  searchPlaceholder: 'Rechercher…',
  emptyText: 'Aucun résultat',
  clearAllLabel: 'Tout désélectionner',
  selectedCountLabel: (count) => `${count} sélectionnés`,
};

/**
 * Clé d'injection des textes du Combobox. La valeur peut être un objet, une ref ou un getter :
 * un getter qui lit la langue courante (vue-i18n…) rend les textes réactifs au changement de langue.
 */
export const COMBOBOX_TEXTS_KEY: InjectionKey<MaybeRefOrGetter<ComboboxTexts>> = Symbol('ComboboxTexts');

/** Fournit les textes du Combobox au sous-arbre du composant appelant (dans un `setup`). */
export function provideComboboxTexts(texts: MaybeRefOrGetter<ComboboxTexts>) {
  provide(COMBOBOX_TEXTS_KEY, texts);
}

/** Fournit les textes du Combobox à toute une application (`app.provide`). */
export function installComboboxTexts(application: App, texts: MaybeRefOrGetter<ComboboxTexts>) {
  application.provide(COMBOBOX_TEXTS_KEY, texts);
}
