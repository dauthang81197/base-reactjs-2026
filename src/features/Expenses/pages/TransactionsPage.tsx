import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Search, Plus, Download, X, Loader2, AlertCircle, RefreshCw, Trash2 } from 'lucide-react';
import { Card, CardBody } from '../../../design-system/components/atoms/Card';
import { Button } from '../../../design-system/components/atoms/Button';
import { Input } from '../../../design-system/components/atoms/Input';
import { transactionService } from '../../../services/transactionService';
import type { TransactionFilters, CreateTransactionData } from '../../../services/transactionService';
import { categoryService } from '../../../services/categoryService';
import { walletService } from '../../../services/walletService';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import type { Transaction, Category, Wallet } from '../types';

// ── Add Transaction Modal ─────────────────────────────────────────────────────
interface AddTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (transaction: CreateTransactionData) => Promise<void>;
    categories: Category[];
    wallets: Wallet[];
    loading?: boolean;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
    isOpen,
    onClose,
    onSave,
    categories,
    wallets,
    loading = false,
}) => {
    const [type, setType] = useState<'expense' | 'income'>('expense');
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [walletId, setWalletId] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [note, setNote] = useState('');

    const filteredCategories = categories.filter((c) =>
        c.type === type || c.type === type.toUpperCase()
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave({
            type: type.toUpperCase() as 'INCOME' | 'EXPENSE',
            amount: parseFloat(amount),
            currency: 'USD',
            categoryId,
            walletId,
            description,
            date: new Date(date).toISOString(),
            note: note || undefined,
        });
        // Reset form
        setAmount('');
        setCategoryId('');
        setWalletId('');
        setDescription('');
        setNote('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
                aria-hidden="true"
            />
            <div className="relative bg-white dark:bg-neutral-900 rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                        Add Transaction
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                        <X className="h-5 w-5 text-neutral-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {/* Type Toggle */}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setType('expense')}
                            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${type === 'expense'
                                ? 'bg-red-500 text-white'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                                }`}
                        >
                            Expense
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('income')}
                            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${type === 'income'
                                ? 'bg-emerald-500 text-white'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                                }`}
                        >
                            Income
                        </button>
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                            Amount
                        </label>
                        <Input
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                            Category
                        </label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        >
                            <option value="">Select category</option>
                            {filteredCategories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.icon} {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Wallet */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                            Wallet
                        </label>
                        <select
                            value={walletId}
                            onChange={(e) => setWalletId(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        >
                            <option value="">Select wallet</option>
                            {wallets.map((wallet) => (
                                <option key={wallet.id} value={wallet.id}>
                                    {wallet.icon} {wallet.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                            Description
                        </label>
                        <Input
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                            Date
                        </label>
                        <Input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    {/* Note */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                            Note (optional)
                        </label>
                        <textarea
                            placeholder="Add a note..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" className="flex-1" disabled={loading}>
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Transaction'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// ── Transactions Page ─────────────────────────────────────────────────────────
const TransactionsPage: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    // Pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 10;

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [walletFilter, setWalletFilter] = useState('all');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch categories and wallets
    const fetchMasterData = useCallback(async () => {
        try {
            const [categoriesRes, walletsRes] = await Promise.all([
                categoryService.getCategories(),
                walletService.getWallets(),
            ]);
            if (categoriesRes.success && categoriesRes.data) {
                setCategories(categoriesRes.data);
            }
            if (walletsRes.success && walletsRes.data) {
                setWallets(walletsRes.data);
            }
        } catch (err) {
            console.error('Failed to fetch master data:', err);
        }
    }, []);

    // Fetch transactions with filters
    const fetchTransactions = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const filters: TransactionFilters = {
                page,
                limit,
            };

            if (typeFilter !== 'all') {
                filters.type = typeFilter.toUpperCase() as 'INCOME' | 'EXPENSE';
            }
            if (categoryFilter !== 'all') {
                filters.categoryId = categoryFilter;
            }
            if (walletFilter !== 'all') {
                filters.walletId = walletFilter;
            }
            if (searchTerm) {
                filters.search = searchTerm;
            }
            if (fromDate) {
                filters.fromDate = fromDate;
            }
            if (toDate) {
                filters.toDate = toDate;
            }

            const response = await transactionService.getTransactions(filters);

            if (response.success && response.data) {
                setTransactions(response.data.data);
                setTotalPages(response.data.pages);
                setTotalCount(response.data.total);
            } else {
                setError(response.error || 'Failed to load transactions');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [page, typeFilter, categoryFilter, walletFilter, searchTerm, fromDate, toDate]);

    useEffect(() => {
        fetchMasterData();
    }, [fetchMasterData]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const handleAddTransaction = async (newTx: CreateTransactionData) => {
        try {
            setSaving(true);
            const response = await transactionService.createTransaction(newTx);
            if (response.success) {
                await fetchTransactions();
            }
        } catch (err) {
            console.error('Failed to create transaction:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteTransaction = async (id: string) => {
        if (!confirm('Are you sure you want to delete this transaction?')) return;
        try {
            const response = await transactionService.deleteTransaction(id);
            if (response.success) {
                await fetchTransactions();
            }
        } catch (err) {
            console.error('Failed to delete transaction:', err);
        }
    };

    const clearFilters = () => {
        setSearchTerm('');
        setTypeFilter('all');
        setCategoryFilter('all');
        setWalletFilter('all');
        setFromDate('');
        setToDate('');
        setPage(1);
    };

    const hasActiveFilters =
        searchTerm || typeFilter !== 'all' || categoryFilter !== 'all' || walletFilter !== 'all' || fromDate || toDate;

    const getCategoryById = (id: string) => categories.find(c => c.id === id);
    const getWalletById = (id: string) => wallets.find(w => w.id === id);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        Transactions
                    </h1>
                    <p className="text-neutral-500 dark:text-neutral-400">
                        Manage all your income and expenses
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
                        Export
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        leftIcon={<Plus className="h-4 w-4" />}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add Transaction
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <CardBody className="space-y-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                <input
                                    type="text"
                                    placeholder="Search transactions..."
                                    value={searchTerm}
                                    onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Type Filter */}
                        <select
                            value={typeFilter}
                            onChange={(e) => { setTypeFilter(e.target.value as 'all' | 'income' | 'expense'); setPage(1); }}
                            className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        >
                            <option value="all">All Types</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>

                        {/* Category Filter */}
                        <select
                            value={categoryFilter}
                            onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
                            className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        >
                            <option value="all">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.icon} {cat.name}
                                </option>
                            ))}
                        </select>

                        {/* Wallet Filter */}
                        <select
                            value={walletFilter}
                            onChange={(e) => { setWalletFilter(e.target.value); setPage(1); }}
                            className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        >
                            <option value="all">All Wallets</option>
                            {wallets.map((wallet) => (
                                <option key={wallet.id} value={wallet.id}>
                                    {wallet.icon} {wallet.name}
                                </option>
                            ))}
                        </select>

                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearFilters}
                                className="text-neutral-500"
                            >
                                Clear filters
                            </Button>
                        )}
                    </div>

                    {/* Date Range Filters */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-neutral-500">From:</span>
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => { setFromDate(e.target.value); setPage(1); }}
                                className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-brand-primary focus:border-transparent text-sm"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-neutral-500">To:</span>
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => { setToDate(e.target.value); setPage(1); }}
                                className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-brand-primary focus:border-transparent text-sm"
                            />
                        </div>
                    </div>

                    {/* Results count */}
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-500">
                            Showing {transactions.length} of {totalCount} transactions
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />}
                            onClick={fetchTransactions}
                            disabled={loading}
                        >
                            Refresh
                        </Button>
                    </div>
                </CardBody>
            </Card>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
                </div>
            )}

            {/* Error State */}
            {error && !loading && (
                <Card>
                    <CardBody className="flex flex-col items-center py-8">
                        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                        <p className="text-neutral-500 mb-4">{error}</p>
                        <Button variant="outline" size="sm" onClick={fetchTransactions}>
                            Try Again
                        </Button>
                    </CardBody>
                </Card>
            )}

            {/* Transactions Table */}
            {!loading && !error && (
                <Card>
                    <CardBody>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                                        <th className="text-left py-3 px-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th className="text-left py-3 px-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="text-left py-3 px-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Wallet
                                        </th>
                                        <th className="text-left py-3 px-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="text-right py-3 px-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="text-right py-3 px-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                                    {transactions.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="py-8 text-center text-neutral-500">
                                                No transactions found
                                            </td>
                                        </tr>
                                    ) : (
                                        transactions.map((tx) => {
                                            const category = tx.category || getCategoryById(tx.categoryId);
                                            const wallet = tx.wallet || getWalletById(tx.walletId);
                                            const isIncome = tx.type === 'income' || tx.type === 'INCOME';

                                            return (
                                                <tr
                                                    key={tx.id}
                                                    className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                                                >
                                                    <td className="py-4 px-4">
                                                        <div>
                                                            <p className="text-sm font-medium text-neutral-900 dark:text-white">
                                                                {tx.description}
                                                            </p>
                                                            {tx.note && (
                                                                <p className="text-xs text-neutral-500 truncate max-w-[200px]">
                                                                    {tx.note}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span
                                                            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium"
                                                            style={{
                                                                backgroundColor: `${category?.color}20`,
                                                                color: category?.color,
                                                            }}
                                                        >
                                                            <span>{category?.icon}</span>
                                                            {category?.name}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                                            {wallet?.icon} {wallet?.name}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 text-sm text-neutral-500">
                                                        {formatDate(tx.date || tx.createdAt)}
                                                    </td>
                                                    <td
                                                        className={`py-4 px-4 text-right text-sm font-semibold ${isIncome ? 'text-emerald-600' : 'text-red-500'
                                                            }`}
                                                    >
                                                        {isIncome ? '+' : '-'}
                                                        {formatCurrency(tx.amount)}
                                                    </td>
                                                    <td className="py-4 px-4 text-right">
                                                        <div className="flex justify-end gap-1">
                                                            <button
                                                                className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-neutral-500 hover:text-red-500"
                                                                onClick={() => handleDeleteTransaction(tx.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                <span className="text-sm text-neutral-500">
                                    Page {page} of {totalPages}
                                </span>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardBody>
                </Card>
            )}

            {/* Add Transaction Modal */}
            <AddTransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddTransaction}
                categories={categories}
                wallets={wallets}
                loading={saving}
            />
        </div>
    );
};

export default TransactionsPage;
