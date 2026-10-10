<script setup lang="ts">
import { IconLayoutSidebar } from '@tabler/icons-vue';
import type { HTMLAttributes } from 'vue';
import { Button } from '../button';
import { cn } from '../utils';
import { useSidebar } from './utils';
import { useLibraryTexts } from '../texts';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();

const { toggleSidebar } = useSidebar();

const texts = useLibraryTexts();
</script>

<template>
  <Button
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    variant="ghost"
    size="icon"
    :class="cn('h-7 w-7', props.class)"
    @click="toggleSidebar"
  >
    <IconLayoutSidebar />
    <span class="sr-only">{{ texts.sidebar.toggle }}</span>
  </Button>
</template>
