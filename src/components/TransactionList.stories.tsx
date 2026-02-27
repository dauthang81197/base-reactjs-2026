import type { Meta, StoryObj } from '@storybook/react';
import { TransactionList } from './TransactionList';

const meta: Meta<typeof TransactionList> = {
  title: 'Components/TransactionList',
  component: TransactionList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Bảng danh sách giao dịch với chức năng Edit và Delete. Dữ liệu từ Zustand store, hỗ trợ filter và pagination.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TransactionList>;

export const Default: Story = {};

export const FullPage: Story = {
  render: () => (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
      </div>
      <TransactionList />
    </div>
  ),
};

