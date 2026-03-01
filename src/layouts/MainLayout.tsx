import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  ShoppingCart,
  Calendar,
  Mail,
  MessageSquare,
  FolderKanban,
  FolderOpen,
  FileText,
  Users,
  X,
} from 'lucide-react';
import { Sidebar } from '../design-system/components/organisms/Sidebar';
import type { NavItem } from '../design-system/components/organisms/Sidebar';
import { Header } from './Header';
import { cn } from '../design-system/foundation/cn';

// ── Navigation config ─────────────────────────────────────────────────────────
const mainNav: NavItem[] = [
  { key: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { key: '/tasks', label: 'Task', icon: <CheckSquare size={20} /> },
  { key: '/ecommerce', label: 'E-Commerce', icon: <ShoppingCart size={20} /> },
  { key: '/calendar', label: 'Calendar', icon: <Calendar size={20} /> },
  { key: '/mail', label: 'Mail', icon: <Mail size={20} />, dot: true },
  { key: '/chat', label: 'Chat', icon: <MessageSquare size={20} /> },
  { key: '/projects', label: 'Projects', icon: <FolderKanban size={20} /> },
  { key: '/file-manager', label: 'File Manager', icon: <FolderOpen size={20} /> },
  { key: '/notes', label: 'Notes', icon: <FileText size={20} /> },
  { key: '/contacts', label: 'Contacts', icon: <Users size={20} /> },
];

// ── Responsive breakpoints ────────────────────────────────────────────────────
const TABLET_BREAKPOINT = 1024;
const MOBILE_BREAKPOINT = 768;

// ── Layout ────────────────────────────────────────────────────────────────────
interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // ── Handle responsive behavior ──────────────────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < MOBILE_BREAKPOINT);
      setIsTablet(width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT);

      // Auto-collapse on tablet
      if (width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT) {
        setCollapsed(true);
      }
      // Close mobile drawer when resizing to desktop
      if (width >= MOBILE_BREAKPOINT) {
        setMobileDrawerOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleItemClick = (key: string) => {
    navigate(key);
    // Close drawer on mobile after navigation
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  // Determine active key - handle root redirect to dashboard
  const activeKey = location.pathname === '/' ? '/dashboard' : location.pathname;

  return (
    <div className="layout-container">
      {/* ── Mobile Overlay ── */}
      {isMobile && mobileDrawerOpen && (
        <div
          className="layout-overlay"
          onClick={() => setMobileDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={cn(
          'layout-sidebar',
          isMobile && 'layout-sidebar--mobile',
          isMobile && mobileDrawerOpen && 'layout-sidebar--open',
          isTablet && 'layout-sidebar--collapsed'
        )}
      >
        {/* Mobile close button */}
        {isMobile && (
          <button
            type="button"
            className="layout-sidebar__close"
            onClick={() => setMobileDrawerOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}

        <Sidebar
          items={mainNav}
          activeKey={activeKey}
          onItemClick={handleItemClick}
          theme="dark"
          appName="FLOWER"
          collapsible={!isMobile}
          defaultCollapsed={isTablet}
          onCollapse={setCollapsed}
          user={{ name: 'ArtTemplate', role: 'Admin' }}
          className="h-full"
        />
      </aside>

      {/* ── Right column: Header + Content ── */}
      <div className="layout-main">
        {/* Header */}
        <Header onMenuClick={isMobile ? toggleMobileDrawer : undefined} />

        {/* Scrollable main content */}
        <main className="layout-content">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

