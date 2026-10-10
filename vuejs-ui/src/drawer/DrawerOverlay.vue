<script lang="ts" setup>
import { reactiveOmit } from '@vueuse/core';
import type { DialogOverlayProps } from 'reka-ui';
import { DrawerOverlay } from 'vaul-vue';
import type { HTMLAttributes } from 'vue';
import { useDialogLayer } from '../composables/useLayer';
import { cn } from '../utils';

const props = defineProps<DialogOverlayProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');
const zIndex = useDialogLayer();
</script>

<template>
  <DrawerOverlay
    data-slot="drawer-overlay"
    :style="{ zIndex }"
    v-bind="delegatedProps"
    :class="cn('data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 bg-black/80', props.class)"
  />
</template>
