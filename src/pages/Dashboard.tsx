import React from 'react';
import { DashboardStats } from '../components/DashboardStats';
import { ExpenseChart } from '../components/ExpenseChart';
import { IncomeExpenseChart } from '../components/IncomeExpenseChart';
import { TransactionList } from '../components/TransactionList';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here's your financial overview.
        </p>
      </div>

      {/* Statistics */}
      <DashboardStats />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseChart />
        <IncomeExpenseChart />
      </div>

      {/* Recent Transactions */}
      <TransactionList />
    </div>
  );
};


