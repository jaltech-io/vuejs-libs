<template>
  <div class="px-6 py-14 text-center text-[var(--h-text-3)] [&_p]:mt-3 [&_p]:text-[13px]">
    <slot />
  </div>
</template>

<script setup lang="ts">
// État vide / chargement du design-system ProjectFlow — reprend À L'IDENTIQUE l'ex-classe
// globale `.h-empty-state` (+ `.h-empty-state p`) de l'app, pour ne plus laisser ce style de
// composant en CSS global. Contenu libre en slot (typiquement un `<p>` de message, éventuellement
// une icône). Distinct du `Empty` shadcn (bordure pointillée) qui a un autre rendu.
</script>
