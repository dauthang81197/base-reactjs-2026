import * as React from 'react';
import { cn } from '../../../foundation/cn';

// ── FormField wrapper ─────────────────────────────────────────────────────────
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?:      string;
  htmlFor?:    string;
  required?:   boolean;
  errorText?:  string;
  helperText?: string;
  children:    React.ReactNode;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, htmlFor, required, errorText, helperText, children, className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-1.5 w-full', className)} {...props}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-label-md font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
          {required && <span className="text-danger ml-0.5" aria-hidden>*</span>}
        </label>
      )}

      {children}

      {errorText && (
        <p className="text-label-sm text-danger-text" role="alert">
          {errorText}
        </p>
      )}
      {helperText && !errorText && (
        <p className="text-label-sm text-neutral-500">{helperText}</p>
      )}
    </div>
  )
);
FormField.displayName = 'FormField';

// ── FormRow – horizontal group of fields ─────────────────────────────────────
export interface FormRowProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
}

const colsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
} as const;

export const FormRow = React.forwardRef<HTMLDivElement, FormRowProps>(
  ({ cols = 2, children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('grid gap-4', colsMap[cols], className)}
      {...props}
    >
      {children}
    </div>
  )
);
FormRow.displayName = 'FormRow';

