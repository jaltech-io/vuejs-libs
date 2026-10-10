import { injectDialogRootContext } from 'reka-ui';
import {
  inject,
  onScopeDispose,
  provide,
  readonly,
  ref,
  toValue,
  watch,
  type InjectionKey,
  type MaybeRefOrGetter,
  type Ref,
} from 'vue';

/**
 * Échelle des couches (z-index) de la bibliothèque — UNE seule, partagée par tous les composants
 * qui s'affichent au-dessus de la page.
 *
 * | Rang          | Qui                                                                            |
 * | ------------- | ------------------------------------------------------------------------------ |
 * | < 1000        | la page de l'application (barre latérale, en-têtes collants, bandeaux…)        |
 * | 1000 + n      | couches EMPILÉES : modales (Dialog, HDialog, FormDialog, ConfirmDialog,        |
 * |               | AlertDialog), Sheet, Drawer, Popover (Combobox, DatePicker), menus, Select,    |
 * |               | HoverCard, panneaux du tableau de données                                      |
 * | 9999          | infobulles (Tooltip, HTooltip) : éphémères, toujours au-dessus                 |
 *
 * Règle des couches empilées : une couche qui s'OUVRE prend le rang suivant le plus haut rang
 * ouvert ; elle passe donc au-dessus de toutes les couches déjà ouvertes (voile compris), quel
 * que soit l'ordre de MONTAGE des composants. L'ordre du DOM ne suffit pas : les portails
 * (Teleport) sont insérés dans `<body>` au montage du composant, pas à l'ouverture — une
 * confirmation montée à la racine de l'application se retrouvait ainsi SOUS une fiche montée
 * plus tard, à z-index égal.
 *
 * Une modale et son voile partagent le même rang (`useDialogLayer`) : le voile précède le
 * contenu dans le portail, le contenu le recouvre.
 */
export const LAYER_BASE_Z_INDEX = 1000;
export const TOOLTIP_Z_INDEX = 9999;

// Pile partagée par toutes les copies du module (une application qui chargerait la lib deux
// fois garde UNE seule échelle).
const STACK_KEY = Symbol.for('@jaltech/vuejs-ui/layers');

function openLayers(): Map<symbol, number> {
  const scope = globalThis as unknown as Record<symbol, Map<symbol, number> | undefined>;
  return (scope[STACK_KEY] ??= new Map());
}

/**
 * Rang (z-index) d'une couche, attribué à chaque ouverture : au-dessus de toutes les couches
 * ouvertes à cet instant. Le rang est gardé à la fermeture (animation de sortie) et libéré
 * dans la pile ; il est recalculé à la réouverture.
 *
 * @example
 * const open = ref(false);
 * const zIndex = useLayer(open);
 * // <div v-if="open" :style="{ zIndex }">…</div>
 */
export function useLayer(open: MaybeRefOrGetter<boolean>): Readonly<Ref<number>> {
  const id = Symbol('layer');
  const zIndex = ref(LAYER_BASE_Z_INDEX + 1);

  const release = () => {
    openLayers().delete(id);
  };

  // flush 'pre' (défaut) : le rang est posé avant le rendu de la couche qui s'ouvre.
  watch(
    () => toValue(open),
    (isOpen) => {
      const layers = openLayers();
      if (!isOpen) {
        release();
        return;
      }
      if (layers.has(id)) return;
      zIndex.value = Math.max(LAYER_BASE_Z_INDEX, ...layers.values()) + 1;
      layers.set(id, zIndex.value);
    },
    { immediate: true },
  );

  onScopeDispose(release);

  return readonly(zIndex);
}

type DialogRootContext = ReturnType<typeof injectDialogRootContext>;

const DIALOG_LAYER_KEY: InjectionKey<{ root: DialogRootContext; zIndex: Readonly<Ref<number>> }> =
  Symbol('dialog layer');

/**
 * Rang de couche d'une modale bâtie sur le Dialog de reka-ui (Dialog, Sheet, Drawer, AlertDialog),
 * PARTAGÉ entre son contenu et son voile : le contenu (composant parent) prend le rang à
 * l'ouverture, le voile (enfant, même portail, placé avant le contenu) le réutilise. À rang égal,
 * le contenu recouvre son voile ; les deux passent au-dessus des couches déjà ouvertes.
 * Un voile utilisé seul prend son propre rang.
 */
export function useDialogLayer(): Readonly<Ref<number>> {
  const root = injectDialogRootContext();
  const shared = inject(DIALOG_LAYER_KEY, null);
  if (shared && shared.root === root) return shared.zIndex;
  const zIndex = useLayer(root.open);
  provide(DIALOG_LAYER_KEY, { root, zIndex });
  return zIndex;
}
