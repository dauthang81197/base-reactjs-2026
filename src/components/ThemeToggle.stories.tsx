import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Toggle button để chuyển đổi giữa Light và Dark mode. Sử dụng hook `useDarkMode` từ store.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};

export const InHeader: Story = {
  render: () => (
    <div className="bg-white dark:bg-gray-800 px-6 py-4 flex items-center justify-between rounded-lg shadow">
      <span className="text-xl font-bold text-gray-900 dark:text-white">💰 FinanceHub</span>
      <ThemeToggle />
    </div>
  ),
};

