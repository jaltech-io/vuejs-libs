<template>
  <div class="flex items-center gap-3.5 pt-5 px-0 pb-[18px] border-b-[0.5px] border-b-(--h-border) mb-5">
    <div class="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold shrink-0" :style="{ background: tenant.color ?? 'var(--h-blue-50)' }">{{ initials }}</div>
    <div class="flex-1">
      <div class="text-[15px] font-semibold text-(--h-text) tracking-[-0.02em]">{{ tenant.label }}</div>
      <div class="text-[12.5px] text-(--h-text-3) mt-0.5 font-mono">{{ tenant.slug }}</div>
    </div>
    <HBadge :variant="statusVariant">{{ statusLabel }}</HBadge>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import HBadge from '../HBadge.vue';
import type { TenantPanelTenant } from './types';

const props = defineProps<{ tenant: TenantPanelTenant }>();

const initials = computed(() => (props.tenant.label ?? '').slice(0, 2).toUpperCase());

const STATUS_VARIANT: Record<string, 'green' | 'amber' | 'red'> = { active: 'green', trial: 'amber', suspended: 'red' };
const STATUS_LABEL: Record<string, string> = { active: 'Actif', trial: 'Essai', suspended: 'Suspendu' };
const statusVariant = computed(() => STATUS_VARIANT[props.tenant.status ?? ''] ?? 'green');
const statusLabel = computed(() => STATUS_LABEL[props.tenant.status ?? ''] ?? props.tenant.status);
</script>
