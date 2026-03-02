import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Plus, TrendingUp, AlertTriangle, CheckCircle, Loader2, AlertCircle, RefreshCw, Trash2, X } from 'lucide-react';
import { Card, CardBody } from '../../../design-system/components/atoms/Card';
import { Button } from '../../../design-system/components/atoms/Button';
import { Input } from '../../../design-system/components/atoms/Input';
import { budgetService } from '../../../services/budgetService';
import type { Budget, CreateBudgetData } from '../../../services/budgetService';
import { categoryService } from '../../../services/categoryService';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';
import type { Category } from '../types';

// ── Add Budget Modal ──────────────────────────────────────────────────────────
interface AddBudgetModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (budget: CreateBudgetData) => Promise<void>;
    categories: Category[];
    loading?: boolean;
}

const AddBudgetModal: React.FC<AddBudgetModalProps> = ({ isOpen, onClose, onSave, categories, loading }) => {
    const [categoryId, setCategoryId] = useState('');
    const [budgetAmount, setBudgetAmount] = useState('');
    const [period, setPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

    const expenseCategories = categories.filter(c => c.type === 'expense' || c.type === 'EXPENSE');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const now = new Date();
        await onSave({
            categoryId,
            budgetAmount: parseFloat(budgetAmount),
            period,
            month: now.getMonth() + 1,
            year: now.getFullYear(),
        });
        setCategoryId('');
        setBudgetAmount('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white dark:bg-neutral-900 rounded-xl shadow-xl w-full max-w-md mx-4">
                <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Create Budget</h2>
                    <button onClick={onClose} className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        <X className="h-5 w-5 text-neutral-500" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Category</label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                        >
                            <option value="">Select category</option>
                            {expenseCategories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Budget Amount</label>
                        <Input type="number" value={budgetAmount} onChange={(e) => setBudgetAmount(e.target.value)} required placeholder="0.00" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Period</label>
                        <select
                            value={period}
                            onChange={(e) => setPeriod(e.target.value as 'weekly' | 'monthly' | 'yearly')}
                            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                        >
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="primary" className="flex-1" disabled={loading}>
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const BudgetsPage: React.FC = () => {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    // Get current month and year
    const now = new Date();
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const [budgetsRes, categoriesRes] = await Promise.all([
                budgetService.getBudgets({ month: selectedMonth, year: selectedYear }),
                categoryService.getCategories(),
            ]);
            if (budgetsRes.success && budgetsRes.data) {
                // Handle both array and paginated response
                const rawData = budgetsRes.data as Budget[] | { items?: Budget[]; data?: Budget[] };
                const budgetList = Array.isArray(rawData)
                    ? rawData
                    : (rawData as { items?: Budget[]; data?: Budget[] }).items
                    || (rawData as { items?: Budget[]; data?: Budget[] }).data
                    || [];
                setBudgets(budgetList);
            } else {
                setError(budgetsRes.error || 'Failed to load budgets');
            }
            if (categoriesRes.success && categoriesRes.data) {
                const rawCats = categoriesRes.data as Category[] | { items?: Category[]; data?: Category[] };
                const catList = Array.isArray(rawCats)
                    ? rawCats
                    : (rawCats as { items?: Category[]; data?: Category[] }).items
                    || (rawCats as { items?: Category[]; data?: Category[] }).data
                    || [];
                setCategories(catList);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [selectedMonth, selectedYear]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleAddBudget = async (data: CreateBudgetData) => {
        try {
            setSaving(true);
            const response = await budgetService.createBudget(data);
            if (response.success) {
                await fetchData();
            }
        } catch (err) {
            console.error('Failed to create budget:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteBudget = async (id: string) => {
        if (!confirm('Are you sure you want to delete this budget?')) return;
        try {
            const response = await budgetService.deleteBudget(id);
            if (response.success) {
                await fetchData();
            }
        } catch (err) {
            console.error('Failed to delete budget:', err);
        }
    };

    const getCategoryById = (id: string) => categories.find(c => c.id === id);

    // Calculate totals (ensure budgets is always a safe array)
    const safeBudgets = Array.isArray(budgets) ? budgets : [];
    const totalBudget = safeBudgets.reduce((sum, b) => sum + (Number(b.budgetAmount) || 0), 0);
    const totalSpent = safeBudgets.reduce((sum, b) => sum + (Number(b.spentAmount) || 0), 0);
    const overallPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

    const getBudgetStatus = (spent: number, amount: number) => {
        const percentage = amount > 0 ? (spent / amount) * 100 : 0;
        if (percentage >= 100) return 'exceeded';
        if (percentage >= 80) return 'warning';
        return 'good';
    };

    const statusColors = {
        good: { bg: 'bg-emerald-500', text: 'text-emerald-600', icon: CheckCircle },
        warning: { bg: 'bg-amber-500', text: 'text-amber-600', icon: AlertTriangle },
        exceeded: { bg: 'bg-red-500', text: 'text-red-500', icon: AlertTriangle },
    };

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <Card>
                <CardBody className="flex flex-col items-center py-12">
                    <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                    <p className="text-neutral-500 mb-4">{error}</p>
                    <Button variant="outline" size="sm" leftIcon={<RefreshCw className="h-4 w-4" />} onClick={fetchData}>
                        Try Again
                    </Button>
                </CardBody>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        Budgets
                    </h1>
                    <p className="text-neutral-500 dark:text-neutral-400">
                        Set spending limits and track your progress
                    </p>
                </div>
                <div className="flex gap-2">
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                        className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm"
                    >
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {new Date(2000, i).toLocaleString('default', { month: 'long' })}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm"
                    >
                        {Array.from({ length: 5 }, (_, i) => {
                            const year = now.getFullYear() - 2 + i;
                            return <option key={year} value={year}>{year}</option>;
                        })}
                    </select>
                    <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={() => setIsModalOpen(true)}>
                        Create Budget
                    </Button>
                </div>
            </div>

            {/* Overview Card */}
            <Card>
                <CardBody>
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="flex-1">
                            <p className="text-sm text-neutral-500 mb-1">Monthly Budget Overview</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-neutral-900 dark:text-white">
                                    {formatCurrency(totalSpent)}
                                </span>
                                <span className="text-neutral-500">
                                    of {formatCurrency(totalBudget)}
                                </span>
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-500">Progress</span>
                                    <span className="font-medium text-neutral-900 dark:text-white">
                                        {formatPercentage(overallPercentage)}
                                    </span>
                                </div>
                                <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${overallPercentage >= 100
                                            ? 'bg-red-500'
                                            : overallPercentage >= 80
                                                ? 'bg-amber-500'
                                                : 'bg-emerald-500'
                                            }`}
                                        style={{ width: `${Math.min(overallPercentage, 100)}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 md:gap-8">
                            <div className="text-center">
                                <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-2">
                                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                                </div>
                                <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                                    {formatCurrency(Math.max(totalBudget - totalSpent, 0))}
                                </p>
                                <p className="text-xs text-neutral-500">Remaining</p>
                            </div>
                            <div className="text-center">
                                <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-2">
                                    <span className="text-xl">📊</span>
                                </div>
                                <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                                    {budgets.length}
                                </p>
                                <p className="text-xs text-neutral-500">Active Budgets</p>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Budgets List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {budgets.map((budget) => {
                    const category = budget.category || getCategoryById(budget.categoryId);
                    const budgetAmount = budget.budgetAmount || 0;
                    const spentAmount = budget.spentAmount || 0;
                    const percentage = budget.percentageUsed || (budgetAmount > 0 ? (spentAmount / budgetAmount) * 100 : 0);
                    const remaining = budget.remaining ?? Math.max(budgetAmount - spentAmount, 0);
                    const status = getBudgetStatus(spentAmount, budgetAmount);
                    const StatusIcon = statusColors[status].icon;

                    return (
                        <Card key={budget.id} className="hover:shadow-lg transition-shadow group">
                            <CardBody>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="h-12 w-12 rounded-xl flex items-center justify-center text-xl"
                                            style={{ backgroundColor: `${category?.color}20` }}
                                        >
                                            {category?.icon}
                                        </div>
                                        <div>
                                            <p className="font-medium text-neutral-900 dark:text-white">
                                                {category?.name}
                                            </p>
                                            <p className="text-xs text-neutral-500 capitalize">
                                                {budget.period} budget
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <StatusIcon className={`h-5 w-5 ${statusColors[status].text}`} />
                                        <button
                                            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-neutral-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => handleDeleteBudget(budget.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-neutral-500">
                                            {formatCurrency(spentAmount)} spent
                                        </span>
                                        <span className="font-medium text-neutral-900 dark:text-white">
                                            {formatCurrency(budgetAmount)}
                                        </span>
                                    </div>
                                    <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${statusColors[status].bg}`}
                                            style={{ width: `${Math.min(percentage, 100)}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className={statusColors[status].text}>
                                            {formatPercentage(percentage)} used
                                        </span>
                                        <span className="text-neutral-500">
                                            {formatCurrency(remaining)} left
                                        </span>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    );
                })}

                {/* Add Budget Card */}
                <Card
                    className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-brand-primary dark:hover:border-brand-primary cursor-pointer transition-colors"
                    onClick={() => setIsModalOpen(true)}
                >
                    <CardBody className="flex flex-col items-center justify-center h-full min-h-[180px] text-neutral-500">
                        <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 mb-3">
                            <Plus className="h-6 w-6" />
                        </div>
                        <p className="font-medium">Create New Budget</p>
                        <p className="text-sm">Set a spending limit for a category</p>
                    </CardBody>
                </Card>
            </div>

            {/* Add Budget Modal */}
            <AddBudgetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddBudget}
                categories={categories}
                loading={saving}
            />
        </div>
    );
};

export default BudgetsPage;
