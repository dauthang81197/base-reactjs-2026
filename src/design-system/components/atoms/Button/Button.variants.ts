import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  // base
  [
    'inline-flex items-center justify-center gap-2 font-medium rounded-md',
    'transition-colors duration-150 cursor-pointer select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary:   'bg-brand-primary text-white hover:bg-brand-primary-hover active:bg-brand-primary-hover',
        accent:    'bg-brand-accent text-brand-primary hover:bg-brand-accent-hover active:bg-brand-accent-hover',
        secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700',
        outline:   'border border-neutral-300 text-neutral-700 bg-transparent hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800',
        ghost:     'text-neutral-700 bg-transparent hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800',
        danger:    'bg-danger text-white hover:bg-danger-600 active:bg-danger-600',
        link:      'text-brand-accent underline-offset-4 hover:underline bg-transparent p-0 h-auto',
      },
      size: {
        xs: 'h-7  px-2.5 text-label-sm',
        sm: 'h-8  px-3   text-label-md',
        md: 'h-9  px-4   text-label-lg',
        lg: 'h-11 px-5   text-body-md',
        xl: 'h-12 px-6   text-body-lg',
        icon: 'h-9 w-9 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size:    'md',
    },
  }
);

