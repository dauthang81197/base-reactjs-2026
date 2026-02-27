import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from './LoadingSpinner';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Kích thước spinner',
    },
    text: {
      control: 'text',
      description: 'Text hiển thị bên dưới spinner',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingSpinner>;

export const Default: Story = {
  args: {
    size: 'md',
    text: 'Loading...',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    text: 'Loading...',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    text: 'Loading data...',
  },
};

export const WithCustomText: Story = {
  args: {
    size: 'md',
    text: 'Fetching transactions...',
  },
};

export const NoText: Story = {
  args: {
    size: 'md',
    text: '',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-12">
      <LoadingSpinner size="sm" text="Small" />
      <LoadingSpinner size="md" text="Medium" />
      <LoadingSpinner size="lg" text="Large" />
    </div>
  ),
};

