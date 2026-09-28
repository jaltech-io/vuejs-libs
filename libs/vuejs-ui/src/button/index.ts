import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as Button } from './Button.vue';

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        // ── Variantes « design-system ProjectFlow » (tokens --h-*) ─────────────
        // Reprennent À L'IDENTIQUE les anciennes classes globales .h-btn-* de
        // globals.css (couleur/bordure/hover) pour ne plus laisser de style de
        // composant en CSS global. La géométrie (padding/taille/texte) est portée
        // par les tailles `hbtn`/`hicon` ci-dessous. À utiliser ensemble.
        hprimary: 'border-[var(--h-blue-600)] bg-[var(--h-blue-600)] text-white hover:bg-[var(--h-blue-800)]',
        hneutral: 'border-[var(--h-border-strong)] bg-[var(--h-surface)] text-[var(--h-text)] hover:bg-[var(--h-surface2)]',
        hdanger:
          'border-[var(--h-danger)] bg-[var(--h-danger)] text-white hover:border-[var(--h-danger-hover)] hover:bg-[var(--h-danger-hover)]',
        hpurple: 'border-[var(--h-purple-600)] bg-[var(--h-purple-600)] text-white hover:bg-[var(--h-purple-700)]',
        hicon:
          'border-[var(--h-border-strong)] bg-[var(--h-surface)] text-[var(--h-text-3)] hover:bg-[var(--h-surface2)] hover:text-[var(--h-text)]',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-xs': "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
        // Géométrie des ex-.h-btn-* (bouton texte) et .h-icon-btn (bouton icône).
        hbtn: 'h-auto gap-1.5 rounded-[var(--h-radius)] border-[0.5px] px-3.5 py-[7px] text-[13px] font-normal whitespace-nowrap disabled:opacity-55',
        hicon: 'size-7 rounded-md border-[0.5px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
export type ButtonVariants = VariantProps<typeof buttonVariants>;
