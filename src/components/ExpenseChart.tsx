import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card } from './Card';
import { useExpenseByCategory } from '../hooks/useFinanceSelectors';

const COLORS = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6', '#06b6d4'];

export const ExpenseChart: React.FC = () => {
  const data = useExpenseByCategory();

  if (data.length === 0) {
    return (
      <Card header={<h3 className="text-lg font-semibold">Expense by Category</h3>}>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No expense data available
        </div>
      </Card>
    );
  }

  const chartData = data.map((item) => ({
    name: item.category,
    value: item.amount,
  }));

  return (
    <Card header={<h3 className="text-lg font-semibold">Expense by Category</h3>}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent = 0 }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {data.map((item, index) => (
          <div key={item.category} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <div className="text-sm">
              <p className="text-gray-600 dark:text-gray-400">{item.category}</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                ${item.amount.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};


