import React, { useState } from 'react';
import { useFinanceStore } from '../../store/financeStore';
import { Card } from '../../components/Card';
import { formatCurrency } from '../../utils/helpers';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const ReportsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'month' | 'year'>('month');
  const transactions = useFinanceStore((state) => state.transactions);

  // Generate monthly data
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (11 - i));
    const month = date.toLocaleString('default', { month: 'short' });

    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const income = transactions
      .filter(
        (t) =>
          t.type === 'income' &&
          new Date(t.date) >= monthStart &&
          new Date(t.date) <= monthEnd
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter(
        (t) =>
          t.type === 'expense' &&
          new Date(t.date) >= monthStart &&
          new Date(t.date) <= monthEnd
      )
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      month,
      income,
      expense,
      net: income - expense,
    };
  });

  // Summary stats
  const totalIncome = monthlyData.reduce((sum, m) => sum + m.income, 0);
  const totalExpense = monthlyData.reduce((sum, m) => sum + m.expense, 0);
  const netIncome = totalIncome - totalExpense;
  const averageMonthly = monthlyData.length > 0 ? totalExpense / monthlyData.length : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Reports
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeRange === 'month'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeRange === 'year'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Total Income
            </p>
            <p className="text-2xl font-bold text-success-600">
              {formatCurrency(totalIncome)}
            </p>
          </div>
        </Card>

        <Card>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Total Expense
            </p>
            <p className="text-2xl font-bold text-danger-600">
              {formatCurrency(totalExpense)}
            </p>
          </div>
        </Card>

        <Card>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Net Income
            </p>
            <p className={`text-2xl font-bold ${netIncome >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
              {formatCurrency(netIncome)}
            </p>
          </div>
        </Card>

        <Card>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Average Monthly
            </p>
            <p className="text-2xl font-bold text-primary-600">
              {formatCurrency(averageMonthly)}
            </p>
          </div>
        </Card>
      </div>

      {/* Trend Chart */}
      <Card header={<h3 className="text-lg font-semibold">Trend Analysis</h3>}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#22c55e" name="Income" />
            <Line type="monotone" dataKey="expense" stroke="#ef4444" name="Expense" />
            <Line type="monotone" dataKey="net" stroke="#0ea5e9" name="Net" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Detailed breakdown */}
      <Card header={<h3 className="text-lg font-semibold">Monthly Breakdown</h3>}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-2 text-left text-sm font-semibold">Month</th>
                <th className="px-4 py-2 text-right text-sm font-semibold">Income</th>
                <th className="px-4 py-2 text-right text-sm font-semibold">Expense</th>
                <th className="px-4 py-2 text-right text-sm font-semibold">Net</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((row, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3 text-sm font-medium">{row.month}</td>
                  <td className="px-4 py-3 text-sm text-right text-success-600">
                    {formatCurrency(row.income)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-danger-600">
                    {formatCurrency(row.expense)}
                  </td>
                  <td className={`px-4 py-3 text-sm text-right font-semibold ${row.net >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                    {formatCurrency(row.net)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

