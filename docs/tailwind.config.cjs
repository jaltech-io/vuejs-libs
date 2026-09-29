const path = require('node:path');

// Reuse the library's Tailwind theme (HSL color tokens, radius scale,
// preflight:false, tailwindcss-animate) so demo markup renders exactly like
// the components do. `content` is overridden below because a preset's own
// content globs resolve relative to the wrong base.
const libPreset = require('../vuejs-ui/tailwind.config.cjs');

const libSrc = path.join(__dirname, '../vuejs-ui/src/**/*.{vue,js,ts}');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [libPreset],
  content: [
    './index.md',
    './components/**/*.md',
    './.vitepress/**/*.{vue,ts,js}',
    libSrc,
  ],
};
