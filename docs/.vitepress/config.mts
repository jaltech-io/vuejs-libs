import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitepress';

// This site documents ONLY the components @jaltech/vuejs-ui adds on top of
// shadcn-vue — its own complete/composed components and the ones that don't
// exist in shadcn-vue. The raw shadcn-vue primitives are intentionally not
// re-documented here; shadcn-vue is credited as the foundation (see footer).
export default defineConfig({
  title: '@jaltech/vuejs-ui',
  description: 'Complete Vue 3 components built on shadcn-vue.',
  lang: 'en-US',
  cleanUrls: true,
  ignoreDeadLinks: true,

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Components', link: '/components/form-dialog' },
      { text: 'npm', link: 'https://www.npmjs.com/package/@jaltech/vuejs-ui' },
    ],
    sidebar: {
      '/': [
        {
          text: 'Guide',
          items: [{ text: 'Getting started', link: '/guide/getting-started' }],
        },
        {
          text: 'Complete components',
          items: [
            { text: 'FormDialog', link: '/components/form-dialog' },
            { text: 'ConfirmDialog', link: '/components/confirm-dialog' },
            { text: 'Combobox', link: '/components/combobox' },
            { text: 'ActivityFeed', link: '/components/activity-feed' },
            { text: 'StatCard', link: '/components/stat-card' },
            { text: 'MetricCard', link: '/components/metric-card' },
            { text: 'RouterTabsNav', link: '/components/router-tabs-nav' },
            { text: 'TableSelectionBar', link: '/components/table-selection-bar' },
            { text: 'EmptyState', link: '/components/empty-state' },
            { text: 'HDialog', link: '/components/h-dialog' },
            { text: 'HTooltip', link: '/components/h-tooltip' },
          ],
        },
        {
          text: 'Beyond shadcn-vue',
          items: [
            { text: 'Attachment', link: '/components/attachment' },
            { text: 'Bubble', link: '/components/bubble' },
            { text: 'Message', link: '/components/message' },
            { text: 'MessageScroller', link: '/components/message-scroller' },
            { text: 'Marker', link: '/components/marker' },
          ],
        },
        {
          text: 'Data',
          items: [{ text: 'DataTable (advanced)', link: '/components/data-table' }],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/jaltech-io/vuejs-libs' }],
    search: { provider: 'local' },
    footer: {
      message:
        'Built on <a href="https://www.shadcn-vue.com/" target="_blank" rel="noreferrer">shadcn-vue</a>, ' +
        '<a href="https://reka-ui.com/" target="_blank" rel="noreferrer">Reka UI</a> and ' +
        '<a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">Tailwind CSS</a>. ' +
        '@jaltech/vuejs-ui is a layer of complete components on top of shadcn-vue, not a replacement for it.',
      copyright: 'MIT — © 2026 Jaltech',
    },
  },

  vite: {
    plugins: [tailwindcss()],
    // Force a single copy of vue / vue-router across the docs app and the
    // source-first library, so vue-router's inject symbols match and the
    // library's useRoute/useRouter resolve (otherwise: "reading 'query' of
    // undefined" in the advanced data-table toolbar).
    resolve: { dedupe: ['vue', 'vue-router'] },
    optimizeDeps: { exclude: ['@jaltech/vuejs-ui'] },
    ssr: { noExternal: ['@jaltech/vuejs-ui'] },
  },
});
