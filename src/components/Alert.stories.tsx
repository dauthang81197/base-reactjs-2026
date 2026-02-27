import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'info', 'warning'],
      description: 'Loại alert',
    },
    title: { control: 'text', description: 'Tiêu đề alert (tùy chọn)' },
    message: { control: 'text', description: 'Nội dung thông báo' },
    onClose: { action: 'closed', description: 'Callback khi đóng alert' },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    type: 'info',
    message: 'This is an informational message.',
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    title: 'Transaction Added!',
    message: 'Your transaction has been successfully recorded.',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Low Balance',
    message: 'Your wallet balance is below the minimum threshold.',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    title: 'Error',
    message: 'Failed to save transaction. Please try again.',
  },
};

export const WithCloseButton: Story = {
  args: {
    type: 'info',
    message: 'Click the X to close this alert.',
    onClose: () => {},
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert type="info" title="Info" message="This is an informational message." />
      <Alert type="success" title="Success" message="Operation completed successfully!" />
      <Alert type="warning" title="Warning" message="Please review before proceeding." />
      <Alert type="error" title="Error" message="Something went wrong. Please try again." />
    </div>
  ),
};

