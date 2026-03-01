import * as React from 'react';
import { useState, useMemo } from 'react';
import { Search, Plus, Download, X } from 'lucide-react';
import { Card, CardBody } from '../../../design-system/components/atoms/Card';
import { Button } from '../../../design-system/components/atoms/Button';
import { Input } from '../../../design-system/components/atoms/Input';
import {
    transactions as allTransactions,
    categories,
    wallets,
    getCategoryById,
    getWalletById,
} from '../../../data/expensesMockData';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import type { Transaction, TransactionType } from '../types';

// ── Add Transaction Modal ─────────────────────────────────────────────────────
interface AddTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (transaction: Omit<Transaction, 'id'>) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
    isOpen,
    onClose,
    onSave,
}) => {
    const [type, setType] = useState<TransactionType>('expense');
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [walletId, setWalletId] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [note, setNote] = useState('');

    const filteredCategories = categories.filter((c) => c.type === type);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            type,
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
                        <Button type="button" variant="outlined" className="flex-1" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="filled" className="flex-1">
                            Save Transaction
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// ── Transactions Page ─────────────────────────────────────────────────────────
const TransactionsPage: React.FC = () => {
    const [transactions, setTransactions] = useState(allTransactions);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<'all' | TransactionType>('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [walletFilter, setWalletFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter transactions
    const filteredTransactions = useMemo(() => {
        return transactions.filter((tx) => {
            const matchesSearch = tx.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesType = typeFilter === 'all' || tx.type === typeFilter;
            const matchesCategory =
                categoryFilter === 'all' || tx.categoryId === categoryFilter;
            const matchesWallet =
                walletFilter === 'all' || tx.walletId === walletFilter;
            return matchesSearch && matchesType && matchesCategory && matchesWallet;
        });
    }, [transactions, searchTerm, typeFilter, categoryFilter, walletFilter]);

    const handleAddTransaction = (newTx: Omit<Transaction, 'id'>) => {
        const transaction: Transaction = {
            ...newTx,
            id: `tx-${Date.now()}`,
        };
        setTransactions([transaction, ...transactions]);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setTypeFilter('all');
        setCategoryFilter('all');
        setWalletFilter('all');
    };

    const hasActiveFilters =
        searchTerm || typeFilter !== 'all' || categoryFilter !== 'all' || walletFilter !== 'all';

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
                    <Button variant="outlined" size="sm" leftIcon={<Download className="h-4 w-4" />}>
                        Export
                    </Button>
                    <Button
                        variant="filled"
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
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Type Filter */}
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value as 'all' | TransactionType)}
                            className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        >
                            <option value="all">All Types</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>

                        {/* Category Filter */}
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
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
                            onChange={(e) => setWalletFilter(e.target.value)}
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
                                variant="text"
                                size="sm"
                                onClick={clearFilters}
                                className="text-neutral-500"
                            >
                                Clear filters
                            </Button>
                        )}
                    </div>

                    {/* Results count */}
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-500">
                            Showing {filteredTransactions.length} of {transactions.length} transactions
                        </span>
                    </div>
                </CardBody>
            </Card>

            {/* Transactions Table */}
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
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                                {filteredTransactions.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-neutral-500">
                                            No transactions found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredTransactions.map((tx) => {
                                        const category = getCategoryById(tx.categoryId);
                                        const wallet = getWalletById(tx.walletId);
                                        const isIncome = tx.type === 'income';

                                        return (
                                            <tr
                                                key={tx.id}
                                                className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer"
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
                                                    {formatDate(tx.date)}
                                                </td>
                                                <td
                                                    className={`py-4 px-4 text-right text-sm font-semibold ${isIncome ? 'text-emerald-600' : 'text-red-500'
                                                        }`}
                                                >
                                                    {isIncome ? '+' : '-'}
                                                    {formatCurrency(tx.amount)}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>

            {/* Add Transaction Modal */}
            <AddTransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddTransaction}
            />
        </div>
    );
};

export default TransactionsPage;
