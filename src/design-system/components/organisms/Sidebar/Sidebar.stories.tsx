import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Home, Wallet, BarChart3, Tag, Settings, HelpCircle } from 'lucide-react';
import { Sidebar } from './Sidebar';

const NAV_ITEMS = [
  { key: 'dashboard',    label: 'Dashboard',    icon: <Home      className="h-5 w-5" /> },
  { key: 'transactions', label: 'Transactions', icon: <Wallet    className="h-5 w-5" />, badge: 5 },
  { key: 'wallets',      label: 'Wallets',      icon: <Wallet    className="h-5 w-5" /> },
  { key: 'categories',   label: 'Categories',   icon: <Tag       className="h-5 w-5" /> },
  { key: 'reports',      label: 'Reports',      icon: <BarChart3 className="h-5 w-5" /> },
];

const FOOTER_ITEMS = [
  { key: 'settings', label: 'Settings', icon: <Settings   className="h-5 w-5" /> },
  { key: 'help',     label: 'Help',     icon: <HelpCircle className="h-5 w-5" /> },
];

const USER = { name: 'Regina Cooper', role: 'Admin', avatar: 'https://i.pravatar.cc/150?img=47' };

const meta: Meta<typeof Sidebar> = {
  title: 'Design System/Organisms/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    theme:       { control: 'select', options: ['light', 'dark'] },
    collapsible: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen">
        <Story />
        <main className="flex-1 bg-neutral-100 dark:bg-neutral-950 p-8">
          <h1 className="text-headline-sm font-semibold text-neutral-900 dark:text-neutral-50">
            Page Content
          </h1>
          <p className="text-body-md text-neutral-500 mt-2">
            The sidebar is on the left.
          </p>
        </main>
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Sidebar>;

export const LightTheme: Story = {
  render: function LightThemeStory() {
    const [active, setActive] = useState('dashboard');
    return (
      <Sidebar
        items={NAV_ITEMS}
        footerItems={FOOTER_ITEMS}
        activeKey={active}
        onItemClick={setActive}
        user={USER}
        theme="light"
        appName="FinanceHub"
      />
    );
  },
};

export const DarkTheme: Story = {
  render: function DarkThemeStory() {
    const [active, setActive] = useState('dashboard');
    return (
      <Sidebar
        items={NAV_ITEMS}
        footerItems={FOOTER_ITEMS}
        activeKey={active}
        onItemClick={setActive}
        user={USER}
        theme="dark"
        appName="FinanceHub"
      />
    );
  },
};

export const CollapsedLight: Story = {
  render: function CollapsedLightStory() {
    const [active, setActive] = useState('dashboard');
    return (
      <Sidebar
        items={NAV_ITEMS}
        footerItems={FOOTER_ITEMS}
        activeKey={active}
        onItemClick={setActive}
        user={USER}
        theme="light"
        defaultCollapsed
        appName="FinanceHub"
      />
    );
  },
};

export const CollapsedDark: Story = {
  render: function CollapsedDarkStory() {
    const [active, setActive] = useState('reports');
    return (
      <Sidebar
        items={NAV_ITEMS}
        activeKey={active}
        onItemClick={setActive}
        theme="dark"
        defaultCollapsed
        appName="FinanceHub"
      />
    );
  },
};

