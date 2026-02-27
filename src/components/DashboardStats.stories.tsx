import type { Meta, StoryObj } from '@storybook/react';
import { DashboardStats } from './DashboardStats';

const meta: Meta<typeof DashboardStats> = {
  title: 'Components/DashboardStats',
  component: DashboardStats,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Hiển thị 4 thẻ thống kê: Total Balance, Monthly Income, Monthly Expense và Net Balance. Dữ liệu lấy từ Zustand store.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DashboardStats>;

export const Default: Story = {};

export const InGrid: Story = {
  render: () => (
    <div className="p-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Financial Overview
      </h2>
      <DashboardStats />
    </div>
  ),
};

