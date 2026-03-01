import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  ArrowLeftRight,
  Wallet,
  BarChart3,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { Sidebar } from '../design-system/components/organisms/Sidebar';
import type { NavItem } from '../design-system/components/organisms/Sidebar';
import { Header } from './Header';

// ── Navigation config ─────────────────────────────────────────────────────────
const mainNav: NavItem[] = [
  { key: '/',             label: 'Dashboard',    icon: <Home size={20} /> },
  { key: '/transactions', label: 'Transactions', icon: <ArrowLeftRight size={20} /> },
  { key: '/wallets',      label: 'Wallets',      icon: <Wallet size={20} /> },
  { key: '/reports',      label: 'Reports',      icon: <BarChart3 size={20} /> },
];

const footerNav: NavItem[] = [
  { key: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  { key: '/help',     label: 'Help',     icon: <HelpCircle size={20} /> },
];

// ── Layout ────────────────────────────────────────────────────────────────────
interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleItemClick = (key: string) => {
    navigate(key);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-100 dark:bg-neutral-950">
      {/* ── Sidebar (fixed left, 270px / 64px collapsed) ── */}
      <Sidebar
        items={mainNav}
        footerItems={footerNav}
        activeKey={location.pathname}
        onItemClick={handleItemClick}
        theme="dark"
        collapsible
        defaultCollapsed={false}
        onCollapse={setCollapsed}
        user={{ name: 'Darius Nguyen', role: 'Admin' }}
        className="shrink-0"
      />

      {/* ── Right column: Header + Content ── */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header — h-[66px] */}
        <Header />

        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

