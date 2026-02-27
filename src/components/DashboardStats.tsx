import React from 'react';
import { formatCurrency } from '../utils/helpers';
import { Card } from './Card';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useTotalBalance, useMonthlyIncome, useMonthlyExpense } from '../hooks/useFinanceSelectors';

export const DashboardStats: React.FC = () => {
  const totalBalance = useTotalBalance();
  const monthlyIncome = useMonthlyIncome();
  const monthlyExpense = useMonthlyExpense();
  const balance = monthlyIncome - monthlyExpense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Balance</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(totalBalance)}
            </p>
          </div>
          <Wallet className="w-8 h-8 text-primary-600" />
        </div>
      </Card>

      <Card>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly Income</p>
            <p className="text-2xl font-bold text-success-600">
              {formatCurrency(monthlyIncome)}
            </p>
          </div>
          <TrendingUp className="w-8 h-8 text-success-600" />
        </div>
      </Card>

      <Card>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly Expense</p>
            <p className="text-2xl font-bold text-danger-600">
              {formatCurrency(monthlyExpense)}
            </p>
          </div>
          <TrendingDown className="w-8 h-8 text-danger-600" />
        </div>
      </Card>

      <Card>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Net Balance</p>
            <p className={`text-2xl font-bold ${balance >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
              {formatCurrency(balance)}
            </p>
          </div>
          <div className={`w-8 h-8 rounded-full ${balance >= 0 ? 'bg-success-100' : 'bg-danger-100'}`} />
        </div>
      </Card>
    </div>
  );
};

