import type {
    Category,
    Wallet,
    Transaction,
    Budget,
    CategorySummary,
    MonthlyTrend,
} from '../features/Expenses/types';

// ── Categories ────────────────────────────────────────────────────────────────
export const categories: Category[] = [
    { id: 'cat-1', name: 'Salary', icon: '💼', color: '#10B981', type: 'income' },
    { id: 'cat-2', name: 'Freelance', icon: '💻', color: '#3B82F6', type: 'income' },
    { id: 'cat-3', name: 'Investment', icon: '📈', color: '#8B5CF6', type: 'income' },
    { id: 'cat-4', name: 'Gift', icon: '🎁', color: '#F59E0B', type: 'income' },
    { id: 'cat-5', name: 'Food & Dining', icon: '🍔', color: '#EF4444', type: 'expense' },
    { id: 'cat-6', name: 'Shopping', icon: '🛍️', color: '#EC4899', type: 'expense' },
    { id: 'cat-7', name: 'Transport', icon: '🚗', color: '#6366F1', type: 'expense' },
    { id: 'cat-8', name: 'Entertainment', icon: '🎬', color: '#F97316', type: 'expense' },
    { id: 'cat-9', name: 'Bills & Utilities', icon: '💡', color: '#14B8A6', type: 'expense' },
    { id: 'cat-10', name: 'Health', icon: '💊', color: '#06B6D4', type: 'expense' },
    { id: 'cat-11', name: 'Education', icon: '📚', color: '#84CC16', type: 'expense' },
    { id: 'cat-12', name: 'Travel', icon: '✈️', color: '#A855F7', type: 'expense' },
];

// ── Wallets ───────────────────────────────────────────────────────────────────
export const wallets: Wallet[] = [
    {
        id: 'wallet-1',
        name: 'Cash',
        type: 'cash',
        balance: 1250.0,
        currency: 'USD',
        color: '#10B981',
        icon: '💵',
    },
    {
        id: 'wallet-2',
        name: 'Chase Bank',
        type: 'bank',
        balance: 15420.75,
        currency: 'USD',
        color: '#3B82F6',
        icon: '🏦',
    },
    {
        id: 'wallet-3',
        name: 'Credit Card',
        type: 'credit',
        balance: -2340.5,
        currency: 'USD',
        color: '#EF4444',
        icon: '💳',
    },
    {
        id: 'wallet-4',
        name: 'PayPal',
        type: 'e-wallet',
        balance: 890.25,
        currency: 'USD',
        color: '#6366F1',
        icon: '📱',
    },
    {
        id: 'wallet-5',
        name: 'Investment Account',
        type: 'investment',
        balance: 45000.0,
        currency: 'USD',
        color: '#8B5CF6',
        icon: '📊',
    },
];

// ── Transactions ──────────────────────────────────────────────────────────────
export const transactions: Transaction[] = [
    {
        id: 'tx-1',
        type: 'income',
        amount: 5500.0,
        currency: 'USD',
        categoryId: 'cat-1',
        walletId: 'wallet-2',
        description: 'Monthly Salary',
        date: '2025-01-15T09:00:00Z',
        note: 'January 2025 salary',
        tags: ['salary', 'work'],
    },
    {
        id: 'tx-2',
        type: 'expense',
        amount: 85.5,
        currency: 'USD',
        categoryId: 'cat-5',
        walletId: 'wallet-3',
        description: 'Grocery shopping at Whole Foods',
        date: '2025-01-14T14:30:00Z',
        tags: ['groceries'],
    },
    {
        id: 'tx-3',
        type: 'expense',
        amount: 45.0,
        currency: 'USD',
        categoryId: 'cat-7',
        walletId: 'wallet-1',
        description: 'Gas station fill-up',
        date: '2025-01-14T08:15:00Z',
        tags: ['car', 'fuel'],
    },
    {
        id: 'tx-4',
        type: 'income',
        amount: 1200.0,
        currency: 'USD',
        categoryId: 'cat-2',
        walletId: 'wallet-4',
        description: 'Freelance project payment',
        date: '2025-01-13T11:00:00Z',
        note: 'Website redesign project',
        tags: ['freelance', 'design'],
    },
    {
        id: 'tx-5',
        type: 'expense',
        amount: 129.99,
        currency: 'USD',
        categoryId: 'cat-6',
        walletId: 'wallet-3',
        description: 'Amazon - Electronics',
        date: '2025-01-12T16:45:00Z',
        tags: ['shopping', 'electronics'],
    },
    {
        id: 'tx-6',
        type: 'expense',
        amount: 65.0,
        currency: 'USD',
        categoryId: 'cat-9',
        walletId: 'wallet-2',
        description: 'Electric bill',
        date: '2025-01-10T10:00:00Z',
        tags: ['bills', 'utilities'],
    },
    {
        id: 'tx-7',
        type: 'expense',
        amount: 32.0,
        currency: 'USD',
        categoryId: 'cat-5',
        walletId: 'wallet-1',
        description: 'Lunch with colleagues',
        date: '2025-01-10T12:30:00Z',
        tags: ['food', 'social'],
    },
    {
        id: 'tx-8',
        type: 'expense',
        amount: 15.99,
        currency: 'USD',
        categoryId: 'cat-8',
        walletId: 'wallet-3',
        description: 'Netflix subscription',
        date: '2025-01-08T00:00:00Z',
        tags: ['subscription', 'entertainment'],
    },
    {
        id: 'tx-9',
        type: 'expense',
        amount: 250.0,
        currency: 'USD',
        categoryId: 'cat-10',
        walletId: 'wallet-2',
        description: 'Doctor appointment',
        date: '2025-01-07T15:00:00Z',
        tags: ['health', 'medical'],
    },
    {
        id: 'tx-10',
        type: 'income',
        amount: 350.0,
        currency: 'USD',
        categoryId: 'cat-3',
        walletId: 'wallet-5',
        description: 'Stock dividends',
        date: '2025-01-05T09:00:00Z',
        tags: ['investment', 'dividends'],
    },
    {
        id: 'tx-11',
        type: 'expense',
        amount: 89.0,
        currency: 'USD',
        categoryId: 'cat-11',
        walletId: 'wallet-2',
        description: 'Online course - React Advanced',
        date: '2025-01-04T20:00:00Z',
        tags: ['education', 'learning'],
    },
    {
        id: 'tx-12',
        type: 'expense',
        amount: 420.0,
        currency: 'USD',
        categoryId: 'cat-12',
        walletId: 'wallet-3',
        description: 'Weekend trip hotel',
        date: '2025-01-03T14:00:00Z',
        tags: ['travel', 'vacation'],
    },
];

// ── Budgets ───────────────────────────────────────────────────────────────────
export const budgets: Budget[] = [
    {
        id: 'budget-1',
        categoryId: 'cat-5',
        amount: 500,
        spent: 117.5,
        period: 'monthly',
        startDate: '2025-01-01',
        endDate: '2025-01-31',
    },
    {
        id: 'budget-2',
        categoryId: 'cat-6',
        amount: 300,
        spent: 129.99,
        period: 'monthly',
        startDate: '2025-01-01',
        endDate: '2025-01-31',
    },
    {
        id: 'budget-3',
        categoryId: 'cat-7',
        amount: 200,
        spent: 45.0,
        period: 'monthly',
        startDate: '2025-01-01',
        endDate: '2025-01-31',
    },
    {
        id: 'budget-4',
        categoryId: 'cat-8',
        amount: 100,
        spent: 15.99,
        period: 'monthly',
        startDate: '2025-01-01',
        endDate: '2025-01-31',
    },
];

// ── Category Summary for Pie Chart ────────────────────────────────────────────
export const categorySummary: CategorySummary[] = [
    {
        categoryId: 'cat-5',
        categoryName: 'Food & Dining',
        color: '#EF4444',
        amount: 117.5,
        percentage: 17.5,
        transactionCount: 2,
    },
    {
        categoryId: 'cat-6',
        categoryName: 'Shopping',
        color: '#EC4899',
        amount: 129.99,
        percentage: 19.4,
        transactionCount: 1,
    },
    {
        categoryId: 'cat-7',
        categoryName: 'Transport',
        color: '#6366F1',
        amount: 45.0,
        percentage: 6.7,
        transactionCount: 1,
    },
    {
        categoryId: 'cat-8',
        categoryName: 'Entertainment',
        color: '#F97316',
        amount: 15.99,
        percentage: 2.4,
        transactionCount: 1,
    },
    {
        categoryId: 'cat-9',
        categoryName: 'Bills & Utilities',
        color: '#14B8A6',
        amount: 65.0,
        percentage: 9.7,
        transactionCount: 1,
    },
    {
        categoryId: 'cat-10',
        categoryName: 'Health',
        color: '#06B6D4',
        amount: 250.0,
        percentage: 15.3,
        transactionCount: 1,
    },
    {
        categoryId: 'cat-11',
        categoryName: 'Education',
        color: '#84CC16',
        amount: 89.0,
        percentage: 13.3,
        transactionCount: 1,
    },
    {
        categoryId: 'cat-12',
        categoryName: 'Travel',
        color: '#A855F7',
        amount: 420.0,
        percentage: 15.7,
        transactionCount: 1,
    },
];

// ── Monthly Trend Data ────────────────────────────────────────────────────────
export const monthlyTrends: MonthlyTrend[] = [
    { month: 'Aug', income: 6200, expense: 4100 },
    { month: 'Sep', income: 5800, expense: 3800 },
    { month: 'Oct', income: 7100, expense: 4500 },
    { month: 'Nov', income: 6500, expense: 4200 },
    { month: 'Dec', income: 8200, expense: 5800 },
    { month: 'Jan', income: 7050, expense: 1132.48 },
];

// ── Helper Functions ──────────────────────────────────────────────────────────
export const getCategoryById = (id: string): Category | undefined =>
    categories.find((c) => c.id === id);

export const getWalletById = (id: string): Wallet | undefined =>
    wallets.find((w) => w.id === id);

export const getExpenseSummary = () => {
    const totalIncome = transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    return {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
        period: 'January 2025',
    };
};

export const getTotalBalance = () =>
    wallets.reduce((sum, w) => sum + w.balance, 0);
