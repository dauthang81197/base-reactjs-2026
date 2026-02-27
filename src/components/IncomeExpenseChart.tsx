import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useFinanceStore } from '../store/financeStore';
import { Card } from './Card';

export const IncomeExpenseChart: React.FC = () => {
  const transactions = useFinanceStore((state) => state.transactions);

  // Get data for the last 12 months
  const data = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (11 - i));
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

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
      month: `${month} ${year.toString().slice(-2)}`,
      income,
      expense,
    };
  });

  return (
    <Card header={<h3 className="text-lg font-semibold">Income vs Expense</h3>}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#22c55e" name="Income" />
          <Bar dataKey="expense" fill="#ef4444" name="Expense" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

