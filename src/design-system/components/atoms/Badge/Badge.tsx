import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../../foundation/cn';
import { badgeVariants } from './Badge.variants';

// eslint-disable-next-line react-refresh/only-export-components
export { badgeVariants };

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
  VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, color, size, dot, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, color, size }), className)}
      {...props}
    >
      {dot && (
        <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      )}
      {children}
    </span>
  )
);

Badge.displayName = 'Badge';

