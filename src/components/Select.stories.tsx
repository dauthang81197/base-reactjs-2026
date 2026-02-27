import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label của select' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: 'Transaction Type',
    options: [
      { value: 'income', label: 'Income' },
      { value: 'expense', label: 'Expense' },
    ],
  },
};

export const CategorySelect: Story = {
  args: {
    label: 'Category',
    required: true,
    options: [
      { value: 'food', label: '🍔 Food & Dining' },
      { value: 'transport', label: '🚗 Transport' },
      { value: 'shopping', label: '🛍️ Shopping' },
      { value: 'utilities', label: '💡 Utilities' },
      { value: 'entertainment', label: '🎮 Entertainment' },
      { value: 'health', label: '🏥 Health' },
    ],
  },
};

export const WalletSelect: Story = {
  args: {
    label: 'Wallet',
    required: true,
    options: [
      { value: 'wallet-1', label: '💵 Cash' },
      { value: 'wallet-2', label: '🏦 Bank Account' },
      { value: 'wallet-3', label: '📱 E-Wallet' },
    ],
  },
};

export const WithError: Story = {
  args: {
    label: 'Category',
    options: [
      { value: 'food', label: 'Food & Dining' },
      { value: 'transport', label: 'Transport' },
    ],
    error: { message: 'Category is required', type: 'required' },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Type',
    options: [
      { value: 'income', label: 'Income' },
      { value: 'expense', label: 'Expense' },
    ],
    disabled: true,
  },
};

