import React, { useState } from 'react';
import { useFinanceStore } from '../../store/financeStore';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { TransactionModal } from './TransactionModal';
import { TransactionList } from '../../components/TransactionList';
import { Filter } from 'lucide-react';

export const TransactionsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filters = useFinanceStore((state) => state.filters);
  const setFilters = useFinanceStore((state) => state.setFilters);
  const resetFilters = useFinanceStore((state) => state.resetFilters);
  const categories = useFinanceStore((state) => state.categories);
  const wallets = useFinanceStore((state) => state.wallets);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Transactions
        </h1>
        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Transaction
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            value={filters.type || ''}
            onChange={(e) =>
              e.target.value
                ? setFilters({ type: e.target.value as 'income' | 'expense' })
                : resetFilters()
            }
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select
            value={filters.category || ''}
            onChange={(e) =>
              e.target.value
                ? setFilters({ category: e.target.value })
                : resetFilters()
            }
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={filters.walletId || ''}
            onChange={(e) =>
              e.target.value
                ? setFilters({ walletId: e.target.value })
                : resetFilters()
            }
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Wallets</option>
            {wallets.map((wallet) => (
              <option key={wallet.id} value={wallet.id}>
                {wallet.name}
              </option>
            ))}
          </select>

          <Button
            variant="outline"
            onClick={resetFilters}
            className="flex items-center justify-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Reset Filters
          </Button>
        </div>
      </Card>

      {/* Transaction List */}
      <TransactionList />

      {/* Modal */}
      {isModalOpen && (
        <TransactionModal
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

