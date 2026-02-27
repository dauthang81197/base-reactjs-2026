import { cva } from 'class-variance-authority';

export const sidebarItemVariants = cva(
  [
    'group flex items-center gap-3 w-full rounded-md px-3 py-2 text-body-md font-medium',
    'transition-colors duration-150 cursor-pointer select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent',
  ],
  {
    variants: {
      active: {
        true:  'bg-brand-accent/20 text-brand-primary dark:bg-brand-accent/10 dark:text-brand-accent',
        false: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100',
      },
      collapsed: {
        true:  'justify-center px-2',
        false: '',
      },
      theme: {
        dark:  '',
        light: '',
      },
    },
    compoundVariants: [
      // dark sidebar active
      { theme: 'dark', active: true,  className: 'bg-white/15 text-white' },
      // dark sidebar inactive
      { theme: 'dark', active: false, className: 'text-white/70 hover:bg-white/10 hover:text-white' },
    ],
    defaultVariants: { active: false, collapsed: false, theme: 'light' },
  }
);

