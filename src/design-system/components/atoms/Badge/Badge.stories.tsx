import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const COLORS = ['brand','success','warning','danger','info','neutral','coral','purple','cyan'] as const;
const VARIANTS = ['solid','subtle','outline'] as const;

const meta: Meta<typeof Badge> = {
  title: 'Design System/Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    color:   { control: 'select', options: COLORS  },
    size:    { control: 'select', options: ['sm','md','lg'] },
    dot:     { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story    = { args: { children: 'Badge',   variant: 'subtle',  color: 'brand'   } };
export const Success: Story    = { args: { children: 'Active',  variant: 'subtle',  color: 'success' } };
export const Warning: Story    = { args: { children: 'Pending', variant: 'subtle',  color: 'warning' } };
export const Danger: Story     = { args: { children: 'Failed',  variant: 'subtle',  color: 'danger'  } };
export const WithDot: Story    = { args: { children: 'Online',  variant: 'subtle',  color: 'success', dot: true } };

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      {VARIANTS.map(v => (
        <div key={v} className="flex flex-wrap gap-2 items-center">
          <span className="text-label-sm text-neutral-500 w-16">{v}</span>
          {COLORS.map(c => (
            <Badge key={c} variant={v} color={c}>{c}</Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

