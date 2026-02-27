import type { Meta, StoryObj } from '@storybook/react';
import { FormField, FormRow } from './FormField';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';

const meta: Meta<typeof FormField> = {
  title: 'Design System/Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: () => (
    <div className="max-w-sm p-4">
      <FormField label="Amount" htmlFor="amt" required helperText="Enter in VND">
        <Input id="amt" type="number" placeholder="0" />
      </FormField>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="max-w-sm p-4">
      <FormField label="Email" htmlFor="email" required errorText="Invalid email address">
        <Input id="email" type="email" placeholder="you@example.com" />
      </FormField>
    </div>
  ),
};

export const FullTransactionForm: Story = {
  render: () => (
    <div className="max-w-lg p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md">
      <h2 className="text-title-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-6">
        Add Transaction
      </h2>
      <div className="space-y-4">
        <FormRow cols={2}>
          <FormField label="Amount" required htmlFor="f-amount">
            <Input id="f-amount" type="number" placeholder="0.00" />
          </FormField>
          <FormField label="Date" required htmlFor="f-date">
            <Input id="f-date" type="date" />
          </FormField>
        </FormRow>
        <FormField label="Note" htmlFor="f-note" helperText="Optional">
          <Input id="f-note" placeholder="Add a note…" />
        </FormField>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Save</Button>
        </div>
      </div>
    </div>
  ),
};

