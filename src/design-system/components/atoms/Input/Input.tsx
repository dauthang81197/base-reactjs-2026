import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../../foundation/cn';
import { inputVariants } from './Input.variants';

// eslint-disable-next-line react-refresh/only-export-components
export { inputVariants };

// ── Types ─────────────────────────────────────────────────────────────────────
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
  VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  /** Pass react-hook-form register return */
  register?: Record<string, unknown>;
}

// ── Component ─────────────────────────────────────────────────────────────────
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputSize,
      label,
      helperText,
      errorText,
      leftAddon,
      rightAddon,
      required,
      register,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const hasError = Boolean(errorText);
    const state = hasError ? 'error' : 'default';

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-label-md font-medium text-neutral-700 dark:text-neutral-300"
          >
            {label}
            {required && (
              <span className="text-danger ml-0.5" aria-hidden="true">*</span>
            )}
          </label>
        )}

        <div className="relative flex items-center">
          {leftAddon && (
            <span className="absolute left-3 text-neutral-500 pointer-events-none flex items-center">
              {leftAddon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            required={required}
            aria-invalid={hasError}
            aria-describedby={
              errorText ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            className={cn(
              inputVariants({ inputSize, state }),
              leftAddon && 'pl-9',
              rightAddon && 'pr-9',
              className
            )}
            {...(register as object)}
            {...props}
          />
          {rightAddon && (
            <span className="absolute right-3 text-neutral-500 pointer-events-none flex items-center">
              {rightAddon}
            </span>
          )}
        </div>

        {errorText && (
          <p id={`${inputId}-error`} className="text-label-sm text-danger-text" role="alert">
            {errorText}
          </p>
        )}
        {helperText && !errorText && (
          <p id={`${inputId}-helper`} className="text-label-sm text-neutral-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

