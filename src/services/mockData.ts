import type { Transaction, Wallet, Category } from '../types';

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 5000,
    type: 'income',
    category: 'Salary',
    note: 'Monthly salary',
    date: new Date(2026, 1, 20).toISOString(),
    walletId: '1',
  },
  {
    id: '2',
    amount: 1500,
    type: 'expense',
    category: 'Food & Dining',
    note: 'Grocery shopping',
    date: new Date(2026, 1, 22).toISOString(),
    walletId: '1',
  },
  {
    id: '3',
    amount: 800,
    type: 'expense',
    category: 'Transportation',
    note: 'Gas and maintenance',
    date: new Date(2026, 1, 23).toISOString(),
    walletId: '1',
  },
  {
    id: '4',
    amount: 2000,
    type: 'expense',
    category: 'Entertainment',
    note: 'Movie tickets and games',
    date: new Date(2026, 1, 24).toISOString(),
    walletId: '2',
  },
  {
    id: '5',
    amount: 500,
    type: 'income',
    category: 'Freelance',
    note: 'Project payment',
    date: new Date(2026, 1, 25).toISOString(),
    walletId: '2',
  },
  {
    id: '6',
    amount: 1200,
    type: 'expense',
    category: 'Utilities',
    note: 'Electric and water',
    date: new Date(2026, 1, 26).toISOString(),
    walletId: '1',
  },
];

// Mock Wallets
export const mockWallets: Wallet[] = [
  {
    id: '1',
    name: 'Cash Wallet',
    type: 'cash',
    balance: 2000,
    currency: 'USD',
    icon: '💵',
    color: 'bg-green-500',
  },
  {
    id: '2',
    name: 'Bank Account',
    type: 'bank',
    balance: 15000,
    currency: 'USD',
    icon: '🏦',
    color: 'bg-blue-500',
  },
  {
    id: '3',
    name: 'E-Wallet',
    type: 'e-wallet',
    balance: 5000,
    currency: 'USD',
    icon: '📱',
    color: 'bg-purple-500',
  },
];

// Mock Categories
export const mockCategories: Category[] = [
  // Income categories
  {
    id: '1',
    name: 'Salary',
    type: 'income',
    icon: '💼',
    color: 'bg-green-100',
  },
  {
    id: '2',
    name: 'Freelance',
    type: 'income',
    icon: '💻',
    color: 'bg-green-100',
  },
  {
    id: '3',
    name: 'Investment',
    type: 'income',
    icon: '📈',
    color: 'bg-green-100',
  },
  {
    id: '4',
    name: 'Bonus',
    type: 'income',
    icon: '🎁',
    color: 'bg-green-100',
  },

  // Expense categories
  {
    id: '5',
    name: 'Food & Dining',
    type: 'expense',
    icon: '🍔',
    color: 'bg-red-100',
  },
  {
    id: '6',
    name: 'Transportation',
    type: 'expense',
    icon: '🚗',
    color: 'bg-orange-100',
  },
  {
    id: '7',
    name: 'Entertainment',
    type: 'expense',
    icon: '🎮',
    color: 'bg-purple-100',
  },
  {
    id: '8',
    name: 'Utilities',
    type: 'expense',
    icon: '💡',
    color: 'bg-yellow-100',
  },
  {
    id: '9',
    name: 'Shopping',
    type: 'expense',
    icon: '🛍️',
    color: 'bg-pink-100',
  },
  {
    id: '10',
    name: 'Healthcare',
    type: 'expense',
    icon: '🏥',
    color: 'bg-red-100',
  },
  {
    id: '11',
    name: 'Education',
    type: 'expense',
    icon: '📚',
    color: 'bg-blue-100',
  },
  {
    id: '12',
    name: 'Other',
    type: 'expense',
    icon: '📌',
    color: 'bg-gray-100',
  },
];


