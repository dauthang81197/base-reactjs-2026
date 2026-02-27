import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Wallet, CreditCard, Smartphone } from 'lucide-react';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Design System/Molecules/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm','md','lg'] },
  },
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

const categoryOptions = [
  { value: 'food',          label: 'Food & Dining'     },
  { value: 'transport',     label: 'Transport'         },
  { value: 'shopping',      label: 'Shopping'          },
  { value: 'utilities',     label: 'Utilities'         },
  { value: 'entertainment', label: 'Entertainment'     },
  { value: 'health',        label: 'Health & Medical'  },
];

const walletOptions = [
  { value: 'cash',   label: 'Cash',        icon: <Wallet className="h-4 w-4 text-support-green" />  },
  { value: 'bank',   label: 'Bank Account',icon: <CreditCard className="h-4 w-4 text-info-text" />   },
  { value: 'ewallet',label: 'E-Wallet',    icon: <Smartphone className="h-4 w-4 text-support-cyan" />},
];

export const Default: Story = {
  render: function DefaultStory() {
    const [val, setVal] = useState('');
    return (
      <div className="w-64 p-4">
        <Dropdown label="Category" options={categoryOptions} value={val} onChange={setVal} placeholder="Select category" />
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: function WithIconsStory() {
    const [val, setVal] = useState('cash');
    return (
      <div className="w-64 p-4">
        <Dropdown label="Wallet" options={walletOptions} value={val} onChange={setVal} />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-64 p-4">
      <Dropdown label="Type" options={categoryOptions} value="food" disabled />
    </div>
  ),
};

