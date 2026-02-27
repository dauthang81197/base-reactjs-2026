import type { Meta, StoryObj } from '@storybook/react';
import { Plus, Send, ChevronDown } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Design System/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary','accent','secondary','outline','ghost','danger','link'] },
    size:    { control: 'select', options: ['xs','sm','md','lg','xl','icon'] },
    loading: { control: 'boolean' },
    disabled:{ control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story  = { args: { children: 'Button', variant: 'primary' } };
export const Accent: Story   = { args: { children: 'Button', variant: 'accent'  } };
export const Secondary: Story= { args: { children: 'Button', variant: 'secondary'} };
export const Outline: Story  = { args: { children: 'Button', variant: 'outline' } };
export const Ghost: Story    = { args: { children: 'Button', variant: 'ghost'   } };
export const Danger: Story   = { args: { children: 'Button', variant: 'danger'  } };
export const LinkBtn: Story  = { args: { children: 'Button', variant: 'link'    }, name: 'Link' };

export const WithLeftIcon: Story = {
  args: { children: 'Add', variant: 'primary', leftIcon: <Plus className="h-4 w-4" /> },
};
export const WithRightIcon: Story = {
  args: { children: 'Send', variant: 'accent', rightIcon: <Send className="h-4 w-4" /> },
};
export const IconOnly: Story = {
  args: { size: 'icon', variant: 'outline', 'aria-label': 'More options',
    children: <ChevronDown className="h-4 w-4" /> },
};
export const Loading: Story  = { args: { children: 'Loading…', loading: true } };
export const Disabled: Story = { args: { children: 'Disabled',  disabled: true } };

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-wrap gap-3 p-4">
      {(['primary','accent','secondary','outline','ghost','danger'] as const).map(v => (
        <Button key={v} variant={v}>{v.charAt(0).toUpperCase()+v.slice(1)}</Button>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-4">
      {(['xs','sm','md','lg','xl'] as const).map(s => (
        <Button key={s} size={s}>{s.toUpperCase()}</Button>
      ))}
    </div>
  ),
};

