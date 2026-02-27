import React, { useState } from 'react';
import { useFinanceStore } from '../store/financeStore';
import { Card } from './Card';
import { Button } from './Button';
import { formatCurrency, formatDate } from '../utils/helpers';
import { Edit2, Trash2 } from 'lucide-react';
import type { Transaction } from '../types';
import { TransactionModal } from '../features/Transactions/TransactionModal';
import { useFilteredTransactions } from '../hooks/useFinanceSelectors';

export const TransactionList: React.FC = () => {
  const transactions = useFilteredTransactions();
  const deleteTransaction = useFinanceStore((state) => state.deleteTransaction);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  if (transactions.length === 0) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No transactions found</p>
          <Button variant="primary" size="sm">
            Add Transaction
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card
        header={
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <Button variant="primary" size="sm">
              Add Transaction
            </Button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Category
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Note
                </th>
                <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Amount
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                    {transaction.category}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {transaction.note}
                  </td>
                  <td
                    className={`px-4 py-3 text-sm font-semibold text-right ${
                      transaction.type === 'income'
                        ? 'text-success-600'
                        : 'text-danger-600'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-4 py-3 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEdit(transaction)}
                      className="p-1 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="p-1 text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-900/20 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {isModalOpen && (
        <TransactionModal
          transaction={editingTransaction}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};


