<script setup lang="ts">
// Avatar à initiales (1-2 lettres) sur une pastille de tonalité — personne, membre, auteur.
import type { HTMLAttributes } from 'vue';
import { computed } from 'vue';
import { chipToneClasses, type Tone } from '../tones';
import { cn, getInitials } from '../utils';
import type { InitialsAvatarSize } from './types';

const props = withDefaults(
  defineProps<{
    /** Nom complet (ou e-mail) : les initiales en sont tirées, et l'infobulle native l'affiche. */
    name?: string | null;
    /** Tonalité de la pastille. Défaut : `blue`. */
    tone?: Tone;
    /** `xs` 20 px, `sm` 24 px, `md` 28 px (défaut), `lg` 48 px. */
    size?: InitialsAvatarSize;
    /** Infobulle native ; défaut : `name`. `false` pour aucune. */
    title?: string | false;
    class?: HTMLAttributes['class'];
  }>(),
  { tone: 'blue', size: 'md', title: undefined },
);

const sizeClasses: Record<InitialsAvatarSize, string> = {
  xs: 'size-5 text-2xs',
  sm: 'size-6 text-2xs',
  md: 'size-7 text-xs',
  lg: 'size-12 text-base',
};

const initials = computed(() => getInitials(props.name));
const tooltip = computed(() => (props.title === false ? undefined : (props.title ?? props.name ?? undefined)));
</script>

<template>
  <span
    data-slot="initials-avatar"
    :title="tooltip"
    :aria-label="name ?? undefined"
    role="img"
    :class="cn(
      'inline-flex shrink-0 select-none items-center justify-center rounded-full font-bold leading-none',
      sizeClasses[props.size],
      chipToneClasses[props.tone],
      props.class,
    )"
  >
    <span aria-hidden="true">{{ initials }}</span>
  </span>
</template>
