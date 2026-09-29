import DefaultTheme from 'vitepress/theme';
import { createMemoryHistory, createRouter } from 'vue-router';
import type { Theme } from 'vitepress';
import './custom.css';

// Some library components (e.g. the advanced data-table views) call
// `useRoute`/`useRouter` from vue-router. VitePress ships its own router, so we
// install a minimal vue-router instance to satisfy those injections without
// interfering with VitePress navigation.
const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: { render: () => null } }],
});

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(router);
  },
} satisfies Theme;
