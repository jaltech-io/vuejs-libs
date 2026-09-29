<template>
  <div class="rounded-md border">
    <table class="w-full caption-bottom text-sm">
      <thead class="[&_tr]:border-b">
        <tr class="border-b">
          <th v-for="i in columnCount" :key="i" class="h-10 px-2">
            <div class="h-4 w-full rounded bg-muted animate-pulse" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in rowCount" :key="i" class="border-b">
          <td v-for="j in columnCount" :key="j" class="p-2">
            <div class="h-4 rounded bg-muted animate-pulse" :style="{ width: `${Math.random() * 40 + 60}%` }" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ rowCount?: number; columnCount?: number }>(), {
  rowCount: 10,
  columnCount: 7,
});
</script>
