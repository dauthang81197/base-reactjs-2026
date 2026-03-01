import React from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { Bell, Search, Menu } from 'lucide-react';
import { Avatar } from '../design-system/components/atoms/Avatar';

// Map route → page title
const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/dashboard': 'Dashboard',
  '/tasks': 'Tasks',
  '/ecommerce': 'E-Commerce',
  '/calendar': 'Calendar',
  '/mail': 'Mail',
  '/chat': 'Chat',
  '/projects': 'Projects',
  '/file-manager': 'File Manager',
  '/notes': 'Notes',
  '/contacts': 'Contacts',
};

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] ?? 'Page';

  return (
    <header className="layout-header">
      {/* Left — Menu button (mobile) + Page title */}
      <div className="layout-header__left">
        {onMenuClick && (
          <button
            type="button"
            className="layout-header__menu-btn"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        )}
        <h1 className="layout-header__title">
          {title}
        </h1>
      </div>

      {/* Right — Actions */}
      <div className="layout-header__actions">
        {/* Search */}
        <button
          type="button"
          className="layout-header__icon-btn"
          aria-label="Search"
        >
          <Search size={18} />
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="layout-header__icon-btn layout-header__icon-btn--notification"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="layout-header__notification-dot" />
        </button>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* User Avatar */}
        <div className="layout-header__user">
          <Avatar
            size="sm"
            name="ArtTemplate"
            color="brand"
          />
          <span className="layout-header__username">ArtTemplate</span>
        </div>
      </div>
    </header>
  );
};


