import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema } from '../../utils/validation';
import type { TransactionFormData } from '../../utils/validation';
import { useFinanceStore } from '../../store/financeStore';
import type { Transaction } from '../../types';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { X } from 'lucide-react';

interface TransactionModalProps {
  transaction?: Transaction | null;
  onClose: () => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  transaction,
  onClose,
}) => {
  const addTransaction = useFinanceStore((state) => state.addTransaction);
  const updateTransaction = useFinanceStore((state) => state.updateTransaction);
  const categories = useFinanceStore((state) => state.categories);
  const wallets = useFinanceStore((state) => state.wallets);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: transaction
      ? {
          amount: transaction.amount,
          type: transaction.type,
          category: transaction.category,
          note: transaction.note,
          date: transaction.date.split('T')[0],
          walletId: transaction.walletId,
        }
      : {
          type: 'expense',
          date: new Date().toISOString().split('T')[0],
        },
  });

  const transactionType = watch('type');
  const filteredCategories = categories.filter((c) => c.type === transactionType);

  const onSubmit = (data: TransactionFormData) => {
    if (transaction) {
      updateTransaction(transaction.id, {
        ...data,
        date: new Date(data.date).toISOString(),
        note: data.note || '',
      });
    } else {
      addTransaction({
        ...data,
        date: new Date(data.date).toISOString(),
        note: data.note || '',
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            {transaction ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select
            label="Type"
            options={[
              { value: 'income', label: 'Income' },
              { value: 'expense', label: 'Expense' },
            ]}
            register={register('type')}
            error={errors.type}
            required
          />

          <Input
            label="Amount"
            type="number"
            step="0.01"
            register={register('amount')}
            error={errors.amount}
            required
          />

          <Select
            label="Category"
            options={filteredCategories.map((c) => ({
              value: c.name,
              label: c.name,
            }))}
            register={register('category')}
            error={errors.category}
            required
          />

          <Select
            label="Wallet"
            options={wallets.map((w) => ({
              value: w.id,
              label: w.name,
            }))}
            register={register('walletId')}
            error={errors.walletId}
            required
          />

          <Input
            label="Date"
            type="date"
            register={register('date')}
            error={errors.date}
            required
          />

          <Input
            label="Note (Optional)"
            register={register('note')}
            error={errors.note}
          />

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              type="button"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              className="flex-1"
            >
              {transaction ? 'Update' : 'Add'} Transaction
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};




