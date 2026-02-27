import { create } from 'zustand';
import type { Transaction, Wallet, Category } from '../types';
import { mockTransactions, mockWallets, mockCategories } from '../services/mockData';

interface FinanceStore {
  // State
  transactions: Transaction[];
  wallets: Wallet[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  currentWallet: Wallet | null;
  filters: {
    walletId?: string;
    category?: string;
    type?: 'income' | 'expense';
    dateFrom?: string;
    dateTo?: string;
  };
  pagination: {
    page: number;
    limit: number;
  };

  // Transaction actions
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setTransactions: (transactions: Transaction[]) => void;

  // Wallet actions
  addWallet: (wallet: Omit<Wallet, 'id'>) => void;
  updateWallet: (id: string, wallet: Partial<Wallet>) => void;
  deleteWallet: (id: string) => void;
  setWallets: (wallets: Wallet[]) => void;
  setCurrentWallet: (wallet: Wallet | null) => void;

  // Category actions
  setCategories: (categories: Category[]) => void;

  // Filter and pagination
  setFilters: (filters: Partial<FinanceStore['filters']>) => void;
  setPagination: (pagination: Partial<FinanceStore['pagination']>) => void;
  resetFilters: () => void;

  // Utility
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useFinanceStore = create<FinanceStore>((set) => ({
  // Initial state
  transactions: mockTransactions,
  wallets: mockWallets,
  categories: mockCategories,
  loading: false,
  error: null,
  currentWallet: mockWallets[0],
  filters: {},
  pagination: { page: 1, limit: 10 },

  // Transaction actions
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [
        { ...transaction, id: Date.now().toString() },
        ...state.transactions,
      ],
    })),

  updateTransaction: (id, transaction) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...transaction } : t
      ),
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),

  setTransactions: (transactions) => set({ transactions }),

  // Wallet actions
  addWallet: (wallet) =>
    set((state) => ({
      wallets: [{ ...wallet, id: Date.now().toString() }, ...state.wallets],
    })),

  updateWallet: (id, wallet) =>
    set((state) => ({
      wallets: state.wallets.map((w) =>
        w.id === id ? { ...w, ...wallet } : w
      ),
    })),

  deleteWallet: (id) =>
    set((state) => ({
      wallets: state.wallets.filter((w) => w.id !== id),
      currentWallet:
        state.currentWallet?.id === id ? state.wallets[0] : state.currentWallet,
    })),

  setWallets: (wallets) => set({ wallets }),
  setCurrentWallet: (wallet) => set({ currentWallet: wallet }),

  // Category actions
  setCategories: (categories) => set({ categories }),

  // Filter and pagination
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
      pagination: { ...state.pagination, page: 1 },
    })),

  setPagination: (pagination) =>
    set((state) => ({
      pagination: { ...state.pagination, ...pagination },
    })),

  resetFilters: () =>
    set({ filters: {}, pagination: { page: 1, limit: 10 } }),

  // Utility
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));





