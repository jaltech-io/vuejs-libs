# Typography & fonts

One type scale, two self-hosted fonts, tabular figures where numbers line up.

## Fonts

`@jaltech/vuejs-ui/fonts.css` ships **Inter** (text) and **JetBrains Mono** (code, ticket codes, identifiers) as self-hosted variable `woff2` files (weights 100–900, split by character set, `font-display: swap`). No request ever goes to a third-party font service. Import it once from your JavaScript entry point — the bundler copies the files:

```ts
import '@jaltech/vuejs-ui/fonts.css'
```

## Scale

`@jaltech/vuejs-ui/typography.css` declares the Tailwind v4 tokens (`@theme`): the font families behind `font-sans` / `font-mono`, and the type scale. Import it from your Tailwind stylesheet (`styles.css` already includes it):

```css
@import 'tailwindcss/theme.css' layer(theme);
@import '@jaltech/vuejs-ui/typography.css';
```

Base size is **14 px** (dense application). Never use an arbitrary size (`text-[Npx]`): pick the closest step.

| Class | Size / line height | Use |
| --- | --- | --- |
| `text-2xs` | 11 / 16 px | very small labels only: avatar initials, codes, counters, uppercase headers, chart axes |
| `text-xs` | 12 / 16 px | metadata, captions, secondary text — smallest readable text |
| `text-compact` | 13 / 20 px | dense text: table rows, lists, menus, tabs |
| `text-sm` | 14 / 20 px | application base text, fields, buttons |
| `text-base` | 16 / 24 px | section, card and dialog titles |
| `text-lg` | 18 / 28 px | page titles on small screens |
| `text-xl` | 20 / 28 px | page titles |
| `text-2xl` | 24 / 32 px | big numbers (KPI), record title |
| `text-3xl` | 30 / 36 px | display numbers |

`xs` to `3xl` keep Tailwind's standard values. `2xs` and `compact` are declared to tailwind-merge in `cn()`, so they merge as font sizes (not as colors).

## Tabular figures

`StatCard`, `HMetricCard`, `Pagination`, calendar cells, `NumberField`, `SidebarMenuBadge` and the selection bar counter use `tabular-nums`: digits share one width, so counters and values do not jitter. Add it yourself on any other element that shows **only** a number (KPI, amount, duration, numeric table cell, count badge). Never on a text container (a whole table, a text badge): Inter's `tnum` also widens punctuation such as the hyphen.
