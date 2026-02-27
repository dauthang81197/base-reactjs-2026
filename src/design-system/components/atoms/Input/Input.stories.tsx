import type { Meta, StoryObj } from '@storybook/react';
import { Search, Eye } from 'lucide-react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Design System/Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    inputSize: { control: 'select', options: ['sm','md','lg'] },
    state:     { control: 'select', options: ['default','error','success'] },
    disabled:  { control: 'boolean' },
    required:  { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story   = { args: { placeholder: 'Type something…' } };
export const WithLabel: Story = { args: { label: 'Email', placeholder: 'you@example.com', type: 'email' } };
export const Required: Story  = { args: { label: 'Amount', placeholder: '0.00', type: 'number', required: true } };
export const WithHelper: Story= { args: { label: 'Note', placeholder: 'Add a note', helperText: 'Optional – max 200 chars' } };
export const WithError: Story = { args: { label: 'Amount', placeholder: '0.00', errorText: 'Amount is required' } };

export const WithLeftAddon: Story = {
  args: { label: 'Search', placeholder: 'Search transactions…',
    leftAddon: <Search className="h-4 w-4" /> },
};
export const WithRightAddon: Story = {
  args: { label: 'Password', type: 'password', placeholder: '••••••••',
    rightAddon: <Eye className="h-4 w-4" /> },
};
export const Disabled: Story = {
  args: { label: 'Read only', value: 'Some value', disabled: true },
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex flex-col gap-4 p-4 max-w-sm">
      <Input inputSize="sm" placeholder="Small"  label="Small"  />
      <Input inputSize="md" placeholder="Medium" label="Medium" />
      <Input inputSize="lg" placeholder="Large"  label="Large"  />
    </div>
  ),
};

