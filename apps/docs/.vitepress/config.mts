import { defineConfig } from 'vitepress';

// Every component that has a demo page under /components. Keep alphabetical.
const COMPONENTS = [
  'accordion', 'alert', 'alert-dialog', 'aspect-ratio', 'attachment', 'avatar',
  'badge', 'breadcrumb', 'bubble', 'button', 'button-group', 'calendar', 'card',
  'carousel', 'chart', 'checkbox', 'collapsible', 'combobox', 'command',
  'context-menu', 'data-table', 'dialog', 'drawer', 'dropdown-menu', 'empty',
  'field', 'form', 'hover-card', 'input', 'input-group', 'input-otp', 'item',
  'kbd', 'label', 'marker', 'menubar', 'message', 'message-scroller',
  'native-select', 'navigation-menu', 'number-field', 'pagination', 'pin-input',
  'popover', 'progress', 'radio-group', 'range-calendar', 'resizable',
  'scroll-area', 'select', 'separator', 'sheet', 'sidebar', 'skeleton', 'slider',
  'sonner', 'spinner', 'stepper', 'switch', 'table', 'tabs', 'tags-input',
  'textarea', 'toggle', 'toggle-group', 'tooltip',
];

const ACRONYMS: Record<string, string> = { otp: 'OTP', kbd: 'Kbd' };

function label(slug: string): string {
  return slug
    .split('-')
    .map((w) => ACRONYMS[w] ?? w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Live showcase for @jaltech/vuejs-ui. The library is consumed source-first
// (workspace:*), so Vite must not pre-bundle it and must compile its Vue SFCs
// for SSR instead of externalizing them.
export default defineConfig({
  title: '@jaltech/vuejs-ui',
  description: 'Live showcase of every @jaltech/vuejs-ui component.',
  lang: 'en-US',
  cleanUrls: true,
  ignoreDeadLinks: true,

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Components', link: '/components/button' },
      { text: 'npm', link: 'https://www.npmjs.com/package/@jaltech/vuejs-ui' },
    ],
    sidebar: {
      '/': [
        {
          text: 'Guide',
          items: [{ text: 'Getting started', link: '/guide/getting-started' }],
        },
        {
          text: 'Components',
          items: COMPONENTS.map((c) => ({ text: label(c), link: `/components/${c}` })),
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/jaltech-io/vuejs-libs' }],
    search: { provider: 'local' },
  },

  vite: {
    optimizeDeps: {
      exclude: ['@jaltech/vuejs-ui'],
    },
    ssr: {
      noExternal: ['@jaltech/vuejs-ui'],
    },
  },
});
