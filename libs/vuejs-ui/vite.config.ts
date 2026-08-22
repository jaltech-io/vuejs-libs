import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

const source = fileURLToPath(new URL('./src', import.meta.url));
const entry = (path: string) => fileURLToPath(new URL(`./src/${path}`, import.meta.url));
const externals = [
  '@tabler/icons-vue',
  '@tanstack/vue-table',
  'clsx',
  'lucide-vue-next',
  'radix-vue',
  'tailwind-merge',
  'vue',
  'vue-router',
];

export default defineConfig({
  plugins: [vue({ isProduction: true })],
  resolve: {
    alias: {
      '@profeskills/vuejs-ui': source,
    },
  },
  build: {
    cssCodeSplit: false,
    emptyOutDir: true,
    outDir: '../../dist/libs/vuejs-ui',
    lib: {
      cssFileName: 'styles',
      formats: ['es'],
      entry: {
        index: entry('index.ts'),
        'badge/index': entry('badge/index.ts'),
        'checkbox/index': entry('checkbox/index.ts'),
        'data-table/index': entry('data-table/index.ts'),
        'dialog/index': entry('dialog/index.ts'),
        'dropdown-menu/index': entry('dropdown-menu/index.ts'),
        'select/index': entry('select/index.ts'),
        'separator/index': entry('separator/index.ts'),
        'sheet/index': entry('sheet/index.ts'),
        'tabs/index': entry('tabs/index.ts'),
        'tooltip/index': entry('tooltip/index.ts'),
        'composables/useConfirm': entry('composables/useConfirm.ts'),
        'composables/useTableInstance': entry('composables/useTableInstance.ts'),
        types: entry('types.ts'),
        utils: entry('utils.ts'),
      },
    },
    rollupOptions: {
      external: (id) => externals.some((dependency) => id === dependency || id.startsWith(`${dependency}/`)),
      output: {
        assetFileNames: '[name][extname]',
        chunkFileNames: 'chunks/[name]-[hash].js',
        entryFileNames: '[name].js',
      },
    },
  },
});
