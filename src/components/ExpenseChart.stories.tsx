import type { Meta, StoryObj } from '@storybook/react';
import { ExpenseChart } from './ExpenseChart';

const meta: Meta<typeof ExpenseChart> = {
  title: 'Components/ExpenseChart',
  component: ExpenseChart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Biểu đồ Pie Chart hiển thị chi tiêu theo danh mục. Dữ liệu được lấy từ Zustand store thông qua hook `useExpenseByCategory`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExpenseChart>;

export const Default: Story = {};

export const InDashboard: Story = {
  render: () => (
    <div className="max-w-lg p-4">
      <ExpenseChart />
    </div>
  ),
};

