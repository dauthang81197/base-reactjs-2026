import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../../foundation/cn';
import { SidebarItem } from '../../molecules/SidebarItem';
import { Avatar } from '../../atoms/Avatar';

// ── Types ─────────────────────────────────────────────────────────────────────
export interface NavItem {
  key:      string;
  label:    string;
  icon?:    React.ReactNode;
  badge?:   string | number;
  dot?:     boolean;
  href?:    string;
  children?: NavItem[];
}

export interface SidebarUser {
  name:   string;
  role?:  string;
  avatar?: string;
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  items:          NavItem[];
  activeKey?:     string;
  onItemClick?:   (key: string) => void;
  logo?:          React.ReactNode;
  appName?:       string;
  user?:          SidebarUser;
  theme?:         'light' | 'dark';
  collapsible?:   boolean;
  defaultCollapsed?: boolean;
  onCollapse?:    (collapsed: boolean) => void;
  footerItems?:   NavItem[];
}

// ── Component ─────────────────────────────────────────────────────────────────
export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      items,
      activeKey,
      onItemClick,
      logo,
      appName = 'FinanceHub',
      user,
      theme = 'light',
      collapsible = true,
      defaultCollapsed = false,
      onCollapse,
      footerItems,
      className,
      ...props
    },
    ref
  ) => {
    const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

    const handleCollapse = () => {
      const next = !collapsed;
      setCollapsed(next);
      onCollapse?.(next);
    };

    const isDark = theme === 'dark';

    return (
      <aside
        ref={ref}
        aria-label="Main navigation"
        className={cn(
          'flex flex-col h-full transition-all duration-200',
          collapsed ? 'w-16' : 'w-60',
          isDark
            ? 'bg-brand-primary text-white'
            : 'bg-white border-r border-neutral-200 dark:bg-neutral-900 dark:border-neutral-700',
          className
        )}
        {...props}
      >
        {/* ── Logo / Brand ── */}
        <div
          className={cn(
            'flex items-center gap-3 px-3 py-4 shrink-0',
            collapsed && 'justify-center'
          )}
        >
          {logo ?? (
            <div className="h-8 w-8 rounded-md bg-brand-accent flex items-center justify-center shrink-0">
              <span className="text-brand-primary font-bold text-sm">💰</span>
            </div>
          )}
          {!collapsed && (
            <span
              className={cn(
                'text-title-md font-bold truncate',
                isDark ? 'text-white' : 'text-neutral-900 dark:text-neutral-50'
              )}
            >
              {appName}
            </span>
          )}
        </div>

        {/* ── Nav Items ── */}
        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5" role="menu">
          {items.map(item => (
            <SidebarItem
              key={item.key}
              label={item.label}
              icon={item.icon}
              badge={item.badge}
              dot={item.dot}
              href={item.href}
              active={activeKey === item.key}
              collapsed={collapsed}
              theme={theme}
              onClick={() => onItemClick?.(item.key)}
            />
          ))}
        </nav>

        {/* ── Footer Items ── */}
        {footerItems && footerItems.length > 0 && (
          <div
            className={cn(
              'px-2 py-2 space-y-0.5 border-t',
              isDark ? 'border-white/10' : 'border-neutral-200 dark:border-neutral-700'
            )}
          >
            {footerItems.map(item => (
              <SidebarItem
                key={item.key}
                label={item.label}
                icon={item.icon}
                badge={item.badge}
                href={item.href}
                active={activeKey === item.key}
                collapsed={collapsed}
                theme={theme}
                onClick={() => onItemClick?.(item.key)}
              />
            ))}
          </div>
        )}

        {/* ── User ── */}
        {user && (
          <div
            className={cn(
              'flex items-center gap-3 p-3 border-t shrink-0',
              isDark ? 'border-white/10' : 'border-neutral-200 dark:border-neutral-700',
              collapsed && 'justify-center'
            )}
          >
            <Avatar
              name={user.name}
              src={user.avatar}
              size="sm"
              color="accent"
              className="shrink-0"
            />
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className={cn('text-label-md font-medium truncate',
                  isDark ? 'text-white' : 'text-neutral-900 dark:text-neutral-50'
                )}>
                  {user.name}
                </p>
                {user.role && (
                  <p className={cn('text-label-sm truncate',
                    isDark ? 'text-white/60' : 'text-neutral-500'
                  )}>
                    {user.role}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Collapse Toggle ── */}
        {collapsible && (
          <button
            type="button"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={handleCollapse}
            className={cn(
              'flex items-center justify-center h-8 w-full border-t',
              'transition-colors duration-150',
              isDark
                ? 'border-white/10 text-white/60 hover:text-white hover:bg-white/5'
                : 'border-neutral-200 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200 dark:hover:bg-neutral-800'
            )}
          >
            {collapsed
              ? <ChevronRight className="h-4 w-4" />
              : <ChevronLeft  className="h-4 w-4" />
            }
          </button>
        )}
      </aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';

