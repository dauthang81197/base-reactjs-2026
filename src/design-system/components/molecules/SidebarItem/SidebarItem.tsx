import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../../../foundation/cn';
import { Badge } from '../../atoms/Badge';
import { sidebarItemVariants } from './SidebarItem.variants';

export { sidebarItemVariants };

export interface SidebarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarItemVariants> {
  icon?:    React.ReactNode;
  label:    string;
  badge?:   string | number;
  /** Show a colored dot instead of badge text */
  dot?:     boolean;
  href?:    string;
}

export const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ icon, label, badge, dot, active, collapsed, theme, className, href, onClick, ...props }, ref) => {
    const content = (
      <>
        {icon && (
          <span
            className={cn(
              'shrink-0 h-5 w-5 flex items-center justify-center',
              active ? 'text-brand-primary dark:text-brand-accent' : 'text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-100',
              theme === 'dark' && 'text-white/80'
            )}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}

        {!collapsed && (
          <span className="flex-1 truncate text-left">{label}</span>
        )}

        {!collapsed && badge !== undefined && (
          <Badge variant="subtle" color="brand" size="sm">
            {badge}
          </Badge>
        )}

        {!collapsed && dot && (
          <span className="h-2 w-2 rounded-full bg-danger shrink-0" aria-hidden="true" />
        )}
      </>
    );

    const cls = cn(sidebarItemVariants({ active, collapsed, theme }), className);

    if (href) {
      return (
        <a href={href} className={cls} aria-current={active ? 'page' : undefined}>
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        aria-current={active ? 'page' : undefined}
        aria-label={collapsed ? label : undefined}
        className={cls}
        onClick={onClick}
        {...props}
      >
        {content}
      </button>
    );
  }
);

SidebarItem.displayName = 'SidebarItem';

