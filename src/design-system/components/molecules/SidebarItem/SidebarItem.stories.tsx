import type { Meta, StoryObj } from '@storybook/react';
import { Home, Wallet, BarChart3, Settings, Tag } from 'lucide-react';
import { SidebarItem } from './SidebarItem';

const meta: Meta<typeof SidebarItem> = {
  title: 'Design System/Molecules/SidebarItem',
  component: SidebarItem,
  tags: ['autodocs'],
  argTypes: {
    active:    { control: 'boolean' },
    collapsed: { control: 'boolean' },
    theme:     { control: 'select', options: ['light', 'dark'] },
    onClick:   { action: 'clicked' },
  },
};
export default meta;
type Story = StoryObj<typeof SidebarItem>;

export const Default: Story = {
  args: { label: 'Dashboard', icon: <Home className="h-5 w-5" />, active: false },
};
export const Active: Story = {
  args: { label: 'Dashboard', icon: <Home className="h-5 w-5" />, active: true },
};
export const WithBadge: Story = {
  args: { label: 'Transactions', icon: <Wallet className="h-5 w-5" />, badge: 12 },
};
export const WithDot: Story = {
  args: { label: 'Notifications', icon: <Tag className="h-5 w-5" />, dot: true },
};
export const Collapsed: Story = {
  args: { label: 'Reports', icon: <BarChart3 className="h-5 w-5" />, collapsed: true },
};

export const LightSidebar: Story = {
  render: () => (
    <div className="w-60 bg-white border border-neutral-200 rounded-lg p-2 space-y-1">
      {[
        { label: 'Dashboard',    icon: <Home className="h-5 w-5" />,     active: true  },
        { label: 'Transactions', icon: <Wallet className="h-5 w-5" />,   badge: 5      },
        { label: 'Reports',      icon: <BarChart3 className="h-5 w-5" />              },
        { label: 'Settings',     icon: <Settings className="h-5 w-5" />              },
      ].map(item => (
        <SidebarItem key={item.label} theme="light" {...item} />
      ))}
    </div>
  ),
};

export const DarkSidebar: Story = {
  render: () => (
    <div className="w-60 bg-brand-primary rounded-lg p-2 space-y-1">
      {[
        { label: 'Dashboard',    icon: <Home className="h-5 w-5" />,   active: true },
        { label: 'Transactions', icon: <Wallet className="h-5 w-5" />, badge: 3     },
        { label: 'Reports',      icon: <BarChart3 className="h-5 w-5" />            },
        { label: 'Settings',     icon: <Settings className="h-5 w-5" />            },
      ].map(item => (
        <SidebarItem key={item.label} theme="dark" {...item} />
      ))}
    </div>
  ),
};

