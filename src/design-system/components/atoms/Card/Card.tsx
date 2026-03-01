import * as React from 'react';
import { cn } from '../../../foundation/cn';

// ── Card Root ─────────────────────────────────────────────────────────────────
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'elevated' | 'outlined' | 'filled';
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

const cardVariants = {
    elevated:
        'bg-white dark:bg-neutral-900 shadow-md border border-neutral-100 dark:border-neutral-800',
    outlined:
        'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700',
    filled: 'bg-neutral-50 dark:bg-neutral-800/50',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ variant = 'elevated', padding = 'none', className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('rounded-xl overflow-hidden', cardVariants[variant], className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Card.displayName = 'Card';

// ── Card Header ───────────────────────────────────────────────────────────────
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    divider?: boolean;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ divider = false, className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'px-5 py-4',
                    divider && 'border-b border-neutral-200 dark:border-neutral-700',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
CardHeader.displayName = 'CardHeader';

// ── Card Body ─────────────────────────────────────────────────────────────────
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> { }

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('px-5 py-4', className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);
CardBody.displayName = 'CardBody';

// ── Card Footer ───────────────────────────────────────────────────────────────
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    divider?: boolean;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
    ({ divider = true, className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'px-5 py-4',
                    divider && 'border-t border-neutral-200 dark:border-neutral-700',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
CardFooter.displayName = 'CardFooter';
