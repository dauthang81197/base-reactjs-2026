import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label của input' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    type: {
      control: 'select',
      options: ['text', 'number', 'email', 'password', 'date'],
      description: 'Loại input',
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    helperText: { control: 'text', description: 'Text hỗ trợ bên dưới input' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Amount',
    placeholder: 'Enter amount...',
    type: 'text',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Transaction Note',
    placeholder: 'Add a note...',
  },
};

export const Required: Story = {
  args: {
    label: 'Amount',
    placeholder: '0.00',
    type: 'number',
    required: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Amount',
    placeholder: '0.00',
    type: 'number',
    helperText: 'Enter the transaction amount in VND',
  },
};

export const WithError: Story = {
  args: {
    label: 'Amount',
    placeholder: '0.00',
    type: 'number',
    error: { message: 'Amount is required', type: 'required' },
  },
};

export const DateInput: Story = {
  args: {
    label: 'Transaction Date',
    type: 'date',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Read Only Field',
    placeholder: 'This field is disabled',
    disabled: true,
    value: 'Some value',
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password...',
    required: true,
  },
};

