<script setup lang="ts">
// Champ de formulaire : libellé (astérisque si requis), contrôle (slot), aide, message d'erreur.
// Bâti sur les primitives `field/` (Field, FieldLabel, FieldDescription, FieldError). Le slot reçoit
// l'id du contrôle et les attributs d'accessibilité à poser dessus.
import type { HTMLAttributes } from 'vue';
import { computed, useId } from 'vue';
import { Field, FieldDescription, FieldError, FieldLabel } from '../field';
import { cn } from '../utils';

const props = defineProps<{
  /** Libellé du champ. */
  label?: string;
  /** Champ obligatoire : astérisque après le libellé. */
  required?: boolean;
  /** Message(s) d'erreur ; le champ passe en état invalide. */
  error?: string | string[] | null;
  /** Aide sous le contrôle. */
  description?: string;
  /** Id du contrôle (relié au libellé). Défaut : un id généré. */
  id?: string;
  class?: HTMLAttributes['class'];
}>();

defineSlots<{
  default(props: {
    /** À poser sur le contrôle (`:id="id"`) pour relier le libellé. */
    id: string;
    invalid: boolean;
    /** À étaler sur le contrôle : `aria-invalid`, `aria-describedby`, `aria-required`. */
    controlAttributes: Record<string, string | boolean | undefined>;
  }): unknown;
  label?(): unknown;
}>();

const generatedId = useId();
const controlId = computed(() => props.id ?? `form-field-${generatedId}`);
const errors = computed(() => (props.error ? (Array.isArray(props.error) ? props.error : [props.error]) : []).filter(Boolean));
const invalid = computed(() => errors.value.length > 0);
const descriptionId = computed(() => `${controlId.value}-description`);
const errorId = computed(() => `${controlId.value}-error`);
const controlAttributes = computed(() => ({
  'aria-invalid': invalid.value || undefined,
  'aria-required': props.required || undefined,
  'aria-describedby':
    [props.description ? descriptionId.value : '', invalid.value ? errorId.value : ''].filter(Boolean).join(' ') ||
    undefined,
}));
</script>

<template>
  <Field data-slot="form-field" :data-invalid="invalid || undefined" :class="cn('gap-1.5', props.class)">
    <FieldLabel v-if="label || $slots.label" :for="controlId" class="gap-1">
      <slot name="label">{{ label }}</slot>
      <span v-if="required" class="text-destructive" aria-hidden="true">*</span>
    </FieldLabel>
    <slot :id="controlId" :invalid="invalid" :control-attributes="controlAttributes" />
    <FieldDescription v-if="description" :id="descriptionId" class="text-xs">{{ description }}</FieldDescription>
    <FieldError v-if="invalid" :id="errorId" class="text-xs" :errors="errors" />
  </Field>
</template>
