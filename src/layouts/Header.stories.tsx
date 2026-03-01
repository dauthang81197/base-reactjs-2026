import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Layouts/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Header bar 66px hiển thị tiêu đề trang, nút tìm kiếm, thông báo và ThemeToggle.',
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Dashboard: Story = {};

export const Transactions: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/transactions']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Reports: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/reports']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

