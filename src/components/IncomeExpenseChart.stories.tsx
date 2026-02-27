import type { Meta, StoryObj } from '@storybook/react';
import { IncomeExpenseChart } from './IncomeExpenseChart';

const meta: Meta<typeof IncomeExpenseChart> = {
  title: 'Components/IncomeExpenseChart',
  component: IncomeExpenseChart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Bar Chart so sánh Income vs Expense theo từng tháng trong 12 tháng gần nhất. Dữ liệu lấy từ Zustand store.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof IncomeExpenseChart>;

export const Default: Story = {};

export const FullWidth: Story = {
  render: () => (
    <div className="w-full p-4">
      <IncomeExpenseChart />
    </div>
  ),
};

