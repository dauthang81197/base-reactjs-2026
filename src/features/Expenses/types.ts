// ── Expense Feature Types ─────────────────────────────────────────────────────

export type TransactionType = 'income' | 'expense';

export interface Category {
    id: string;
    name: string;
    icon: string;
    color: string;
    type: TransactionType;
}

export interface Wallet {
    id: string;
    name: string;
    type: 'cash' | 'bank' | 'credit' | 'e-wallet' | 'investment';
    balance: number;
    currency: string;
    color: string;
    icon: string;
}

export interface Transaction {
    id: string;
    type: TransactionType;
    amount: number;
    currency: string;
    categoryId: string;
    walletId: string;
    description: string;
    date: string; // ISO date string
    note?: string;
    tags?: string[];
}

export interface Budget {
    id: string;
    categoryId: string;
    amount: number;
    spent: number;
    period: 'weekly' | 'monthly' | 'yearly';
    startDate: string;
    endDate: string;
}

export interface ExpenseSummary {
    totalIncome: number;
    totalExpense: number;
    balance: number;
    period: string;
}

export interface CategorySummary {
    categoryId: string;
    categoryName: string;
    color: string;
    amount: number;
    percentage: number;
    transactionCount: number;
}

export interface MonthlyTrend {
    month: string;
    income: number;
    expense: number;
}
