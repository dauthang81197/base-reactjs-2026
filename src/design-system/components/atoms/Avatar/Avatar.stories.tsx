import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Design System/Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size:   { control: 'select', options: ['xs','sm','md','lg','xl','2xl'] },
    color:  { control: 'select', options: ['brand','accent','coral','green','purple','cyan','neutral'] },
    status: { control: 'select', options: [undefined,'online','offline','busy','away'] },
  },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story    = { args: { src: 'https://i.pravatar.cc/150?img=3', alt: 'John Doe', size: 'md' } };
export const WithInitials: Story = { args: { name: 'Regina Cooper', size: 'md', color: 'brand' } };
export const WithStatus: Story   = { args: { src: 'https://i.pravatar.cc/150?img=5', status: 'online', size: 'md' } };
export const Fallback: Story     = { args: { name: 'Angela Harper', color: 'coral', size: 'lg' } };

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex items-end gap-4 p-4">
      {(['xs','sm','md','lg','xl','2xl'] as const).map(s => (
        <Avatar key={s} name="JD" size={s} color="brand" />
      ))}
    </div>
  ),
};

export const AllColors: Story = {
  name: 'All Colors',
  render: () => (
    <div className="flex flex-wrap gap-3 p-4">
      {(['brand','accent','coral','green','purple','cyan','neutral'] as const).map(c => (
        <Avatar key={c} name="AB" color={c} size="md" />
      ))}
    </div>
  ),
};

export const AllStatuses: Story = {
  name: 'All Statuses',
  render: () => (
    <div className="flex gap-6 p-4">
      {(['online','offline','busy','away'] as const).map(s => (
        <div key={s} className="flex flex-col items-center gap-2">
          <Avatar src="https://i.pravatar.cc/150?img=4" status={s} size="md" />
          <span className="text-xs text-neutral-500">{s}</span>
        </div>
      ))}
    </div>
  ),
};

export const Group: Story = {
  name: 'AvatarGroup',
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <AvatarGroup max={3} size="md">
        <Avatar src="https://i.pravatar.cc/150?img=1" />
        <Avatar src="https://i.pravatar.cc/150?img=2" />
        <Avatar src="https://i.pravatar.cc/150?img=3" />
        <Avatar name="Jane Wilson" color="coral" />
        <Avatar name="Bob Smith"   color="purple" />
      </AvatarGroup>
      <AvatarGroup max={4} size="sm">
        <Avatar name="Regina Cooper" color="brand" />
        <Avatar name="Angela Harper" color="green" />
        <Avatar name="John Doe"      color="cyan"  />
        <Avatar name="Alice Lee"     color="purple"/>
        <Avatar name="Tom Brown"     color="coral" />
      </AvatarGroup>
    </div>
  ),
};
