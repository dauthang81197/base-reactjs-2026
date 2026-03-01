import React from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { Bell, Search } from 'lucide-react';

// Map route → page title
const pageTitles: Record<string, string> = {
  '/':             'Dashboard',
  '/transactions': 'Transactions',
  '/wallets':      'Wallets',
  '/reports':      'Reports',
  '/settings':     'Settings',
  '/help':         'Help',
};

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] ?? 'Page';

  return (
    <header className="flex items-center justify-between h-[66px] shrink-0 border-b border-neutral-200 bg-white px-6 dark:border-neutral-700 dark:bg-neutral-900">
      {/* Left — Page title */}
      <h1 className="text-title-lg font-bold text-neutral-900 dark:text-neutral-50">
        {title}
      </h1>

      {/* Right — Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          aria-label="Search"
        >
          <Search size={18} />
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger" />
        </button>

        {/* Theme toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
};


