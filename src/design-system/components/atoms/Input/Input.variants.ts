import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  [
    'w-full rounded-md border bg-white text-body-md text-neutral-900 placeholder:text-neutral-400',
    'transition-colors duration-150 outline-none',
    'focus:ring-2 focus:ring-brand-accent focus:border-brand-accent',
    'disabled:pointer-events-none disabled:opacity-50 disabled:bg-neutral-100',
    'dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-500',
  ],
  {
    variants: {
      inputSize: {
        sm: 'h-8  px-3 text-body-sm',
        md: 'h-9  px-3 text-body-md',
        lg: 'h-11 px-4 text-body-lg',
      },
      state: {
        default: 'border-neutral-300 dark:border-neutral-600',
        error:   'border-danger     focus:ring-danger',
        success: 'border-success    focus:ring-success',
      },
    },
    defaultVariants: {
      inputSize: 'md',
      state:     'default',
    },
  }
);

