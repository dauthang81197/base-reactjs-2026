import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { MainLayout } from './MainLayout';
import { Card } from '../components/Card';

const meta: Meta<typeof MainLayout> = {
  title: 'Layouts/MainLayout',
  component: MainLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Layout 2 cột: Sidebar 270px bên trái + Header 66px + nội dung cuộn bên phải.',
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
type Story = StoryObj<typeof MainLayout>;

export const Default: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <p className="text-sm text-neutral-500">Total Balance</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">$12,450</p>
          </Card>
          <Card>
            <p className="text-sm text-neutral-500">Income</p>
            <p className="text-2xl font-bold text-success">$5,200</p>
          </Card>
          <Card>
            <p className="text-sm text-neutral-500">Expenses</p>
            <p className="text-2xl font-bold text-danger">$3,100</p>
          </Card>
        </div>
      </div>
    ),
  },
};

export const TransactionsPage: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/transactions']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    children: (
      <div>
        <Card>
          <div className="space-y-3">
            {[
              { label: 'Coffee', amount: '-$5.50', type: 'expense', date: 'Today' },
              { label: 'Salary', amount: '+$3,200', type: 'income', date: 'Yesterday' },
              { label: 'Groceries', amount: '-$85.20', type: 'expense', date: 'Feb 24' },
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-50">{tx.label}</p>
                  <p className="text-sm text-neutral-500">{tx.date}</p>
                </div>
                <span
                  className={`font-semibold ${
                    tx.type === 'income' ? 'text-success' : 'text-danger'
                  }`}
                >
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    ),
  },
};

