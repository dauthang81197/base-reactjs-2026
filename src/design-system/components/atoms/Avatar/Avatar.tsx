import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../foundation/cn';

// ── CVA ───────────────────────────────────────────────────────────────────────
const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full select-none',
  {
    variants: {
      size: {
        xs: 'h-6  w-6  text-label-sm',
        sm: 'h-8  w-8  text-label-md',
        md: 'h-10 w-10 text-label-lg',
        lg: 'h-12 w-12 text-title-sm',
        xl: 'h-16 w-16 text-title-md',
        '2xl': 'h-24 w-24 text-title-lg',
      },
      // Figma shows colored avatars for initials
      color: {
        brand: 'bg-brand-primary   text-white',
        accent: 'bg-brand-accent    text-brand-primary',
        coral: 'bg-support-coral   text-white',
        green: 'bg-support-green   text-white',
        purple: 'bg-support-purple  text-white',
        cyan: 'bg-support-cyan    text-neutral-900',
        neutral: 'bg-neutral-300     text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200',
      },
    },
    defaultVariants: { size: 'md', color: 'brand' },
  }
);

// ── Status dot ────────────────────────────────────────────────────────────────
const statusVariants = cva(
  'absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-neutral-800',
  {
    variants: {
      status: {
        online: 'bg-success',
        offline: 'bg-neutral-400',
        busy: 'bg-danger',
        away: 'bg-warning',
      },
      size: {
        xs: 'h-1.5 w-1.5',
        sm: 'h-2   w-2',
        md: 'h-2.5 w-2.5',
        lg: 'h-3   w-3',
        xl: 'h-3.5 w-3.5',
        '2xl': 'h-4   w-4',
      },
    },
    defaultVariants: { status: 'online', size: 'md' },
  }
);

// ── Types ─────────────────────────────────────────────────────────────────────
export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
  VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  name?: string; // used for initials fallback
  status?: 'online' | 'offline' | 'busy' | 'away';
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

// ── Component ─────────────────────────────────────────────────────────────────
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, color, src, alt, name, status, ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false);
    const showImage = src && !imgError;
    const initials = name ? getInitials(name) : '?';

    return (
      <span
        ref={ref}
        role="img"
        aria-label={alt ?? name ?? 'avatar'}
        className={cn(avatarVariants({ size, color }), className)}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt ?? name ?? ''}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span aria-hidden="true" className="font-medium leading-none">
            {initials}
          </span>
        )}

        {status && (
          <span
            className={cn(statusVariants({ status, size }))}
            aria-label={status}
          />
        )}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';

// ── Avatar Group ──────────────────────────────────────────────────────────────
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarProps['size'];
  children: React.ReactNode;
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max = 4, size = 'md', className, ...props }, ref) => {
    const items = React.Children.toArray(children);
    const visible = max ? items.slice(0, max) : items;
    const overflow = items.length - visible.length;

    return (
      <div ref={ref} className={cn('flex -space-x-2', className)} {...props}>
        {visible.map((child, i) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<AvatarProps>, {
              key: i,
              size,
              className: cn(
                'ring-2 ring-white dark:ring-neutral-800',
                (child as React.ReactElement<AvatarProps>).props.className
              ),
            })
            : child
        )}
        {overflow > 0 && (
          <span
            className={cn(
              avatarVariants({ size, color: 'neutral' }),
              'ring-2 ring-white dark:ring-neutral-800 font-medium'
            )}
            aria-label={`${overflow} more`}
          >
            +{overflow}
          </span>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

