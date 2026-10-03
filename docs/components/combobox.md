# Combobox

<script setup>
import { ref } from 'vue'
import { Combobox } from '@jaltech/vuejs-ui/combobox'

const options = [
  { id: 'vue', name: 'Vue' },
  { id: 'react', name: 'React' },
  { id: 'svelte', name: 'Svelte' },
  { id: 'solid', name: 'Solid' },
]
const single = ref(null)
const many = ref(['vue', 'react', 'svelte'])
</script>

A searchable choice list — single (`modelValue` is one value) or multiple (`multiple`, `modelValue` is an array). Options can be grouped (`groupKey`), disabled (`disabled` field), and rendered through the `option` / `value` slots.

<ClientOnly>
<div class="demo" style="display:flex;gap:1rem;flex-wrap:wrap">
  <div style="width:220px"><Combobox v-model="single" :options="options" none-label="None" /></div>
  <div style="width:220px">
    <Combobox
      v-model="many"
      :options="options"
      multiple
      placeholder="Select…"
      search-placeholder="Search…"
      empty-text="No result"
      clear-all-label="Clear selection"
      :selected-count-label="(count) => `${count} selected`"
    />
  </div>
</div>
</ClientOnly>

## Texts

Every built-in text can be set per component through a prop:

| Prop | Default |
| --- | --- |
| `placeholder` | `Sélectionner…` |
| `searchPlaceholder` | `Rechercher…` |
| `emptyText` | `Aucun résultat` |
| `clearAllLabel` | `Tout désélectionner` |
| `selectedCountLabel` | `` (count) => `${count} sélectionnés` `` |

Or once for the whole application (or a subtree with `provideComboboxTexts`). A getter keeps the texts in sync with the current language. Priority: prop > provided texts > defaults.

```ts
import { installComboboxTexts } from '@jaltech/vuejs-ui/combobox'

installComboboxTexts(app, () => ({
  placeholder: i18n.global.t('combobox.placeholder'),
  searchPlaceholder: i18n.global.t('combobox.search'),
  emptyText: i18n.global.t('combobox.empty'),
  clearAllLabel: i18n.global.t('combobox.clearAll'),
  selectedCountLabel: (count) => i18n.global.t('combobox.selectedCount', { count }),
}))
```

## Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Combobox } from '@jaltech/vuejs-ui/combobox'

const options = [
  { id: 'vue', name: 'Vue' },
  { id: 'react', name: 'React' },
]
const many = ref<string[]>([])
</script>

<template>
  <Combobox
    v-model="many"
    :options="options"
    multiple
    clear-all-label="Clear selection"
    :selected-count-label="(count) => `${count} selected`"
  />
</template>
```
