import type { Meta, StoryObj } from '@storybook/react';
import { TransactionModal } from './TransactionModal';

const meta: Meta<typeof TransactionModal> = {
  title: 'Features/TransactionModal',
  component: TransactionModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Modal form để thêm mới hoặc chỉnh sửa giao dịch. Sử dụng React Hook Form + Zod validation.',
      },
    },
  },
  argTypes: {
    onClose: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<typeof TransactionModal>;

export const AddTransaction: Story = {
  args: {
    transaction: null,
    onClose: () => {},
  },
  parameters: {
    docs: {
      description: { story: 'Form thêm mới giao dịch với các trường bắt buộc.' },
    },
  },
};

export const EditTransaction: Story = {
  args: {
    transaction: {
      id: 'tx-1',
      amount: 1500,
      type: 'expense',
      category: 'Food & Dining',
      note: 'Grocery shopping',
      date: new Date(2026, 1, 22).toISOString(),
      walletId: '1',
    },
    onClose: () => {},
  },
  parameters: {
    docs: {
      description: { story: 'Form chỉnh sửa giao dịch đã có, pre-filled với dữ liệu hiện tại.' },
    },
  },
};

export const EditIncomeTransaction: Story = {
  args: {
    transaction: {
      id: 'tx-2',
      amount: 5000,
      type: 'income',
      category: 'Salary',
      note: 'Monthly salary',
      date: new Date(2026, 1, 20).toISOString(),
      walletId: '1',
    },
    onClose: () => {},
  },
};

