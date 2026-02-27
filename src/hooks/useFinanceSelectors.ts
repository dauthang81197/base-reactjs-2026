import { useMemo } from 'react';
import { useFinanceStore } from '../store/financeStore';
import type { Transaction } from '../types';

const getCurrentMonthBounds = () => {
  const now = new Date();
  return {
    start: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
    end: new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString(),
  };
};

export const useTotalBalance = () => {
  const wallets = useFinanceStore((s) => s.wallets);
  return useMemo(
    () => wallets.reduce((sum, w) => sum + w.balance, 0),
    [wallets]
  );
};

export const useMonthlyIncome = () => {
  const transactions = useFinanceStore((s) => s.transactions);
  return useMemo(() => {
    const { start, end } = getCurrentMonthBounds();
    return transactions
      .filter((t) => t.type === 'income' && t.date >= start && t.date <= end)
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);
};

export const useMonthlyExpense = () => {
  const transactions = useFinanceStore((s) => s.transactions);
  return useMemo(() => {
    const { start, end } = getCurrentMonthBounds();
    return transactions
      .filter((t) => t.type === 'expense' && t.date >= start && t.date <= end)
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);
};

export const useExpenseByCategory = () => {
  const transactions = useFinanceStore((s) => s.transactions);
  return useMemo(() => {
    const { start, end } = getCurrentMonthBounds();
    const expenseMap: Record<string, number> = {};
    let totalExpense = 0;

    transactions
      .filter((t) => t.type === 'expense' && t.date >= start && t.date <= end)
      .forEach((t) => {
        expenseMap[t.category] = (expenseMap[t.category] || 0) + t.amount;
        totalExpense += t.amount;
      });

    return Object.entries(expenseMap).map(([category, amount]) => ({
      category,
      amount,
      percentage: totalExpense > 0 ? (amount / totalExpense) * 100 : 0,
    }));
  }, [transactions]);
};

export const useFilteredTransactions = (): Transaction[] => {
  const transactions = useFinanceStore((s) => s.transactions);
  const filters = useFinanceStore((s) => s.filters);
  const pagination = useFinanceStore((s) => s.pagination);

  return useMemo(() => {
    let filtered = transactions;

    if (filters.walletId)
      filtered = filtered.filter((t) => t.walletId === filters.walletId);
    if (filters.category)
      filtered = filtered.filter((t) => t.category === filters.category);
    if (filters.type)
      filtered = filtered.filter((t) => t.type === filters.type);
    if (filters.dateFrom)
      filtered = filtered.filter(
        (t) => new Date(t.date) >= new Date(filters.dateFrom!)
      );
    if (filters.dateTo)
      filtered = filtered.filter(
        (t) => new Date(t.date) <= new Date(filters.dateTo!)
      );

    const start = (pagination.page - 1) * pagination.limit;
    return filtered.slice(start, start + pagination.limit);
  }, [transactions, filters, pagination]);
};

