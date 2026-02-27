import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text', description: 'CSS class tùy chỉnh' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <p className="text-gray-700 dark:text-gray-300">
        This is the card body content. You can place any content here.
      </p>
    ),
  },
};

export const WithHeader: Story = {
  args: {
    header: <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Card Title</h3>,
    children: (
      <p className="text-gray-700 dark:text-gray-300">
        Card body with a header section.
      </p>
    ),
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Transaction Summary</h3>,
    children: (
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Income</span>
          <span className="text-green-600 font-medium">+$5,200</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Expenses</span>
          <span className="text-red-600 font-medium">-$3,100</span>
        </div>
        <div className="flex justify-between border-t pt-2">
          <span className="font-semibold text-gray-900 dark:text-white">Balance</span>
          <span className="font-bold text-blue-600">$2,100</span>
        </div>
      </div>
    ),
    footer: (
      <p className="text-xs text-gray-500 dark:text-gray-400">Last updated: today</p>
    ),
  },
};

export const StatCard: Story = {
  args: {
    children: (
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Total Balance</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">$12,450</p>
        <p className="text-sm text-green-600 mt-1">↑ 12% from last month</p>
      </div>
    ),
  },
};

export const GridOfCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Card>
        <p className="text-sm text-gray-500 dark:text-gray-400">Total Balance</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">$12,450</p>
      </Card>
      <Card>
        <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Income</p>
        <p className="text-2xl font-bold text-green-600">$5,200</p>
      </Card>
      <Card>
        <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Expenses</p>
        <p className="text-2xl font-bold text-red-600">$3,100</p>
      </Card>
    </div>
  ),
};

