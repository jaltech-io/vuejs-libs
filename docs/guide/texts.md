# Texts & languages

Every text the library renders by itself (buttons, empty states, accessible names, relative dates…) can be translated. Nothing is frozen in one language.

- **Defaults** are the historical texts (`defaultLibraryTexts`, mostly French): an application that provides nothing sees no change.
- **Once for the whole application**: `installLibraryTexts(app, texts)`. Pass a **getter** to follow the current language (vue-i18n…): texts are re-read when the language changes.
- **For a subtree**: `provideLibraryTexts(texts)` inside a `setup`.
- **Per component**: a prop (`placeholder`, `submitLabel`, `cancelLabel`, `label`…) always wins.

Priority: **prop > provided texts > defaults**. Every section and every key is optional — what you leave out keeps its default. Plurals are functions `(count) => string`.

```ts
import { installLibraryTexts } from '@jaltech/vuejs-ui/texts'

installLibraryTexts(app, () => ({
  locale: i18n.global.locale.value, // dates: DatePicker, ActivityFeed, issue panel
  confirmDialog: { cancel: t('cancel'), confirm: t('confirm') },
  selectionBar: {
    selectedCount: (count) => t('selectedCount', { count }, count),
    clearSelection: t('clearSelection'),
  },
  dataTable: { noResults: t('noResults'), selectAll: t('selectAll'), selectRow: t('selectRow') },
  datePicker: { placeholder: t('pickDate'), clear: t('clearDate') },
}))
```

## Sections

| Section | Used by |
| --- | --- |
| `locale` | `DatePicker` (calendar + displayed date), `ActivityFeed` (dates older than a week), issue panel dates |
| `combobox` | `Combobox` |
| `selectionBar` | `TableSelectionBar` |
| `confirmDialog` | `ConfirmDialog` / `showConfirm` |
| `formDialog` | `FormDialog` |
| `rowActions` | `RowActions` / `rowActionsCell` (« ⋯ » trigger) |
| `datePicker` | `DatePicker` |
| `dataTable` | `DataTable`, `createSelectColumn`, `DataTableColumnHeader`, `DataTableColumnsVisibility` |
| `dataTableFilters` | advanced toolbar filters and operators |
| `dataTableViews` | saved views (toolbar, dropdown, `ViewFormModal`, `ViewsSidebar`) |
| `activityFeed` | `ActivityFeed` (counter, filters, relative dates) |
| `issuePanel`, `aiDevPanel`, `tenantPanel` | the panel components |
| `dialog`, `sheet`, `pagination`, `carousel`, `breadcrumb`, `sidebar`, `spinner`, `messageScroller`, `command` | accessible names of the shadcn-vue primitives |

The full list of keys, with their default values, is the `LibraryTextsDefinition` type and the `defaultLibraryTexts` object exported by `@jaltech/vuejs-ui/texts`.

`installComboboxTexts` (Combobox only) still works; it takes precedence over the `combobox` section.
