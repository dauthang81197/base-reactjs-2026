// ── Expense Feature Types ─────────────────────────────────────────────────────

export type TransactionType = 'income' | 'expense' | 'INCOME' | 'EXPENSE';

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
    type: 'CASH' | 'BANK' | 'CREDIT' | 'E_WALLET' | 'INVESTMENT';
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
    category?: Category;
    walletId: string;
    wallet?: Wallet;
    description: string;
    date?: string; // ISO date string
    createdAt?: string;
    updatedAt?: string;
    note?: string;
    tags?: string[];
}

export interface Budget {
    id: string;
    categoryId: string;
    category?: Category;
    amount: number;
    budgetAmount: number;
    spent: number;
    spentAmount: number;
    remaining: number;
    percentageUsed: number;
    period: 'weekly' | 'monthly' | 'yearly';
    startDate?: string;
    endDate?: string;
    month?: number;
    year?: number;
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

// ── Dashboard Types ───────────────────────────────────────────────────────────
export interface DashboardOverview {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
    netSavings: number;
    incomeVsExpenseLast6Months: MonthlyTrend[];
    expenseByCategory: CategorySummary[];
    topCategories: CategorySummary[];
    recentTransactions: Transaction[];
}

// ── Wallet Summary ────────────────────────────────────────────────────────────
export interface WalletSummary {
    totalAssets: number;
    totalLiabilities: number;
    netWorth: number;
}
