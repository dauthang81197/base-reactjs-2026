import * as React from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '../../../foundation/cn';
import { SidebarItem } from '../../molecules/SidebarItem';
import { Avatar } from '../../atoms/Avatar';

// ── Types ─────────────────────────────────────────────────────────────────────
export interface NavItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  dot?: boolean;
  href?: string;
  children?: NavItem[];
}

export interface SidebarUser {
  name: string;
  role?: string;
  avatar?: string;
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: NavItem[];
  activeKey?: string;
  onItemClick?: (key: string) => void;
  logo?: React.ReactNode;
  appName?: string;
  user?: SidebarUser;
  theme?: 'light' | 'dark';
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  footerItems?: NavItem[];
}

// ── Nested Nav Item Component ─────────────────────────────────────────────────
interface NavItemRendererProps {
  item: NavItem;
  activeKey?: string;
  collapsed: boolean;
  theme: 'light' | 'dark';
  onItemClick?: (key: string) => void;
  level?: number;
}

const NavItemRenderer: React.FC<NavItemRendererProps> = ({
  item,
  activeKey,
  collapsed,
  theme,
  onItemClick,
  level = 0,
}) => {
  const [expanded, setExpanded] = React.useState(() => {
    // Auto-expand if any child is active
    if (item.children) {
      return item.children.some(
        (child) => activeKey === child.key || activeKey?.startsWith(child.key + '/')
      );
    }
    return false;
  });

  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeKey === item.key || activeKey?.startsWith(item.key + '/');
  const isChildActive = hasChildren && item.children!.some(
    (child) => activeKey === child.key || activeKey?.startsWith(child.key + '/')
  );
  const isDark = theme === 'dark';

  const handleClick = () => {
    if (hasChildren) {
      setExpanded(!expanded);
    } else {
      onItemClick?.(item.key);
    }
  };

  // Auto-expand when child becomes active
  React.useEffect(() => {
    if (isChildActive && !expanded) {
      setExpanded(true);
    }
  }, [isChildActive, expanded]);

  if (hasChildren) {
    return (
      <div>
        <button
          type="button"
          role="menuitem"
          onClick={handleClick}
          className={cn(
            'group flex items-center gap-2 w-full px-3 py-2 rounded-lg text-left transition-colors',
            isActive || isChildActive
              ? isDark
                ? 'bg-white/10 text-white'
                : 'bg-brand-accent/10 text-brand-primary dark:bg-brand-accent/20'
              : isDark
                ? 'text-white/80 hover:bg-white/5 hover:text-white'
                : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800',
            collapsed && 'justify-center px-2'
          )}
        >
          {item.icon && (
            <span
              className={cn(
                'shrink-0 h-5 w-5 flex items-center justify-center',
                isActive || isChildActive
                  ? 'text-brand-primary dark:text-brand-accent'
                  : 'text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-100',
                isDark && 'text-white/80'
              )}
            >
              {item.icon}
            </span>
          )}
          {!collapsed && (
            <>
              <span className="flex-1 truncate text-sm font-medium">{item.label}</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  expanded && 'rotate-180'
                )}
              />
            </>
          )}
        </button>

        {/* Children */}
        {!collapsed && expanded && (
          <div className="mt-1 ml-4 pl-3 border-l border-neutral-200 dark:border-neutral-700 space-y-0.5">
            {item.children!.map((child) => (
              <NavItemRenderer
                key={child.key}
                item={child}
                activeKey={activeKey}
                collapsed={collapsed}
                theme={theme}
                onItemClick={onItemClick}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <SidebarItem
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
  );
};

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
          collapsed ? 'w-16' : 'w-[270px]',
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
          {items.map((item) => (
            <NavItemRenderer
              key={item.key}
              item={item}
              activeKey={activeKey}
              collapsed={collapsed}
              theme={theme}
              onItemClick={onItemClick}
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
              : <ChevronLeft className="h-4 w-4" />
            }
          </button>
        )}
      </aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';

