import React from 'react';
import { useFinanceStore } from '../../store/financeStore';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { formatCurrency } from '../../utils/helpers';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const WalletsPage: React.FC = () => {
  const wallets = useFinanceStore((state) => state.wallets);
  const deleteWallet = useFinanceStore((state) => state.deleteWallet);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this wallet?')) {
      deleteWallet(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Wallets
        </h1>
        <Button
          variant="primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Wallet
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallets.map((wallet) => (
          <Card key={wallet.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg ${wallet.color} flex items-center justify-center text-2xl`}>
                  {wallet.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {wallet.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {wallet.type.charAt(0).toUpperCase() + wallet.type.slice(1)}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(wallet.id)}
                  className="p-2 text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Balance
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(wallet.balance, wallet.currency)}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {wallets.length === 0 && (
        <Card>
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No wallets yet
            </p>
            <Button
              variant="primary"
            >
              Create Your First Wallet
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};





