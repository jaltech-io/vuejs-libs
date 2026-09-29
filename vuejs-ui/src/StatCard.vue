<script setup lang="ts">
// UI générique, plug & play : aucune logique métier, props uniquement.
import type { Component } from 'vue';

defineProps<{
  icon?: Component;
  label: string;
  value: string | number;
  delta?: string;
  up?: boolean;
}>();
</script>

<template>
  <div class="rounded-xl border bg-card p-5">
    <div class="flex items-center justify-between">
      <span v-if="icon" class="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
        <component :is="icon" class="h-5 w-5" />
      </span>
      <span v-if="delta" :class="['text-xs font-semibold', up ? 'text-emerald-500' : 'text-red-500']">{{ delta }}</span>
    </div>
    <p class="mt-4 text-2xl font-bold">{{ value }}</p>
    <p class="text-sm text-muted-foreground">{{ label }}</p>
  </div>
</template>
