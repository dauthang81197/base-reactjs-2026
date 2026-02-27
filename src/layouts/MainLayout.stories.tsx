import type { Meta, StoryObj } from '@storybook/react';
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
          'Layout chính của ứng dụng. Bọc nội dung trong container `max-w-7xl` với padding thích hợp.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MainLayout>;

export const Default: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <p className="text-sm text-gray-500">Total Balance</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">$12,450</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-500">Income</p>
            <p className="text-2xl font-bold text-green-600">$5,200</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-500">Expenses</p>
            <p className="text-2xl font-bold text-red-600">$3,100</p>
          </Card>
        </div>
      </div>
    ),
  },
};

export const WithPageContent: Story = {
  args: {
    children: (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your income and expenses</p>
        </div>
        <Card>
          <div className="space-y-3">
            {[
              { label: 'Coffee', amount: '-$5.50', type: 'expense', date: 'Today' },
              { label: 'Salary', amount: '+$3,200', type: 'income', date: 'Yesterday' },
              { label: 'Groceries', amount: '-$85.20', type: 'expense', date: 'Feb 24' },
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{tx.label}</p>
                  <p className="text-sm text-gray-500">{tx.date}</p>
                </div>
                <span
                  className={`font-semibold ${
                    tx.type === 'income' ? 'text-green-600' : 'text-red-600'
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

