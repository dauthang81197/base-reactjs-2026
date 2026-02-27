import * as React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../../foundation/cn';
import { Button, type ButtonProps } from '../../atoms/Button';

// ── Types ─────────────────────────────────────────────────────────────────────
export interface DropdownOption {
  value:    string;
  label:    string;
  icon?:    React.ReactNode;
  disabled?: boolean;
}

export interface DropdownProps {
  options:       DropdownOption[];
  value?:        string;
  placeholder?:  string;
  onChange?:     (value: string) => void;
  disabled?:     boolean;
  /** Inherits button size */
  size?:         ButtonProps['size'];
  className?:    string;
  triggerClassName?: string;
  menuClassName?: string;
  /** Label shown above */
  label?:        string;
}

// ── Component ─────────────────────────────────────────────────────────────────
export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      options,
      value,
      placeholder = 'Select option',
      onChange,
      disabled,
      size = 'md',
      className,
      triggerClassName,
      menuClassName,
      label,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const containerRef   = React.useRef<HTMLDivElement>(null);
    const selected = options.find(o => o.value === value);

    // Close on outside click
    React.useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(o => !o); }
    };

    return (
      <div ref={ref} className={cn('relative w-full', className)}>
        {label && (
          <label className="block text-label-md font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
            {label}
          </label>
        )}

        <div ref={containerRef}>
          <Button
            variant="outline"
            size={size}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
            onKeyDown={handleKeyDown}
            className={cn('w-full justify-between font-normal', triggerClassName)}
            rightIcon={
              <ChevronDown
                className={cn('h-4 w-4 text-neutral-500 transition-transform duration-150',
                  open && 'rotate-180')}
              />
            }
          >
            <span className={cn(!selected && 'text-neutral-400')}>
              {selected ? (
                <span className="flex items-center gap-2">
                  {selected.icon}
                  {selected.label}
                </span>
              ) : placeholder}
            </span>
          </Button>

          {open && (
            <ul
              role="listbox"
              aria-label={label}
              className={cn(
                'absolute z-dropdown mt-1 w-full rounded-md border border-neutral-200',
                'bg-white dark:bg-neutral-800 dark:border-neutral-600',
                'shadow-md py-1 max-h-60 overflow-auto',
                menuClassName
              )}
            >
              {options.map(opt => (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={opt.value === value}
                  aria-disabled={opt.disabled}
                  onClick={() => {
                    if (!opt.disabled) { onChange?.(opt.value); setOpen(false); }
                  }}
                  className={cn(
                    'flex items-center justify-between gap-2 px-3 py-2 text-body-md cursor-pointer',
                    'text-neutral-900 dark:text-neutral-100',
                    'hover:bg-neutral-100 dark:hover:bg-neutral-700',
                    opt.disabled && 'opacity-40 cursor-not-allowed',
                    opt.value === value && 'bg-neutral-50 font-medium dark:bg-neutral-700/50'
                  )}
                >
                  <span className="flex items-center gap-2">
                    {opt.icon}
                    {opt.label}
                  </span>
                  {opt.value === value && (
                    <Check className="h-4 w-4 text-brand-primary shrink-0" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

