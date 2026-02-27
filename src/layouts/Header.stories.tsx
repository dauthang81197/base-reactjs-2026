import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Layouts/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Header navigation của ứng dụng. Bao gồm logo, navigation links, ThemeToggle và mobile menu.',
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};

export const OnDashboard: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const OnTransactions: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/transactions']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const OnReports: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/reports']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const WithPageBelow: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <div>
          <Story />
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-500 mt-2">Welcome back! Here's your financial overview.</p>
          </div>
        </div>
      </MemoryRouter>
    ),
  ],
};

