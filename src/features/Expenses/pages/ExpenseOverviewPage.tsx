import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import {
    TrendingUp,
    TrendingDown,
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    AlertCircle,
    RefreshCw,
} from 'lucide-react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import { Card, CardHeader, CardBody } from '../../../design-system/components/atoms/Card';
import { Button } from '../../../design-system/components/atoms/Button';
import { dashboardService } from '../../../services/dashboardService';
import type { DashboardOverview } from '../../../services/dashboardService';
import { formatCurrency, formatDate } from '../../../utils/formatters';

// ── Summary Card Component ────────────────────────────────────────────────────
interface SummaryCardProps {
    title: string;
    amount: number;
    trend?: number;
    icon: React.ReactNode;
    iconBg: string;
    trendType?: 'up' | 'down' | 'neutral';
    formatAmount?: (n: number) => string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
    title,
    amount,
    trend,
    icon,
    iconBg,
    trendType = 'neutral',
    formatAmount = formatCurrency,
}) => (
    <Card className="flex-1 min-w-[200px]">
        <CardBody className="flex items-center gap-4">
            <div
                className={`h-12 w-12 rounded-xl flex items-center justify-center ${iconBg}`}
            >
                {icon}
            </div>
            <div className="flex-1">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{title}</p>
                <p className="text-xl font-bold text-neutral-900 dark:text-white">
                    {formatAmount(amount)}
                </p>
                {trend !== undefined && (
                    <div
                        className={`flex items-center gap-1 text-xs font-medium ${trendType === 'up'
                            ? 'text-emerald-600'
                            : trendType === 'down'
                                ? 'text-red-500'
                                : 'text-neutral-500'
                            }`}
                    >
                        {trendType === 'up' ? (
                            <ArrowUpRight className="h-3 w-3" />
                        ) : trendType === 'down' ? (
                            <ArrowDownRight className="h-3 w-3" />
                        ) : null}
                        <span>{Math.abs(trend)}% vs last month</span>
                    </div>
                )}
            </div>
        </CardBody>
    </Card>
);

// ── Loading Skeleton ──────────────────────────────────────────────────────────
const LoadingSkeleton: React.FC = () => (
    <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-neutral-200 dark:bg-neutral-700 rounded-xl" />
            ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[350px] bg-neutral-200 dark:bg-neutral-700 rounded-xl" />
            <div className="h-[350px] bg-neutral-200 dark:bg-neutral-700 rounded-xl" />
        </div>
    </div>
);

// ── Error Component ───────────────────────────────────────────────────────────
interface ErrorDisplayProps {
    message: string;
    onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => (
    <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            Failed to load data
        </h3>
        <p className="text-neutral-500 mb-4">{message}</p>
        <Button variant="outline" size="sm" leftIcon={<RefreshCw className="h-4 w-4" />} onClick={onRetry}>
            Try Again
        </Button>
    </div>
);

// ── VND Exchange Rate ─────────────────────────────────────────────────────────
const USD_TO_VND = 26000;

const formatVND = (amount: number): string =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(amount);

// ── Expense Overview Page ─────────────────────────────────────────────────────
const ExpenseOverviewPage: React.FC = () => {
    const [data, setData] = useState<DashboardOverview | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isVND, setIsVND] = useState(false);

    // Get current month and year
    const now = new Date();
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());

    const fetchDashboardData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await dashboardService.getOverview({
                month: selectedMonth,
                year: selectedYear,
            });
            if (response.success && response.data) {
                setData(response.data);
            } else {
                setError(response.error || 'Failed to load dashboard data');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [selectedMonth, selectedYear]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return <ErrorDisplay message={error} onRetry={fetchDashboardData} />;
    }

    if (!data) {
        return <ErrorDisplay message="No data available" onRetry={fetchDashboardData} />;
    }

    const periodLabel = `${new Date(selectedYear, selectedMonth - 1).toLocaleString('default', { month: 'long' })} ${selectedYear}`;

    const conv = (amount: number) => isVND ? amount * USD_TO_VND : amount;
    const fmt = (amount: number) => isVND ? formatVND(conv(amount)) : formatCurrency(amount);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        Expense Overview
                    </h1>
                    <p className="text-neutral-500 dark:text-neutral-400">
                        Track your income and expenses for {periodLabel}
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {/* USD → VND Toggle */}
                    <label className="flex items-center gap-2 cursor-pointer select-none px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800">
                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">USD</span>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={isVND}
                            onClick={() => setIsVND((v) => !v)}
                            className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                                isVND ? 'bg-indigo-600' : 'bg-neutral-300 dark:bg-neutral-600'
                            }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
                                    isVND ? 'translate-x-4' : 'translate-x-0'
                                }`}
                            />
                        </button>
                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">VND</span>
                    </label>
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
                            return (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            );
                        })}
                    </select>
                    <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<RefreshCw className="h-4 w-4" />}
                        onClick={fetchDashboardData}
                    >
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <SummaryCard
                    title="Total Balance"
                    amount={data.totalBalance}
                    icon={<Wallet className="h-6 w-6 text-indigo-600" />}
                    iconBg="bg-indigo-100 dark:bg-indigo-900/30"
                    formatAmount={fmt}
                />
                <SummaryCard
                    title="Total Income"
                    amount={data.totalIncome}
                    trendType="up"
                    icon={<TrendingUp className="h-6 w-6 text-emerald-600" />}
                    iconBg="bg-emerald-100 dark:bg-emerald-900/30"
                    formatAmount={fmt}
                />
                <SummaryCard
                    title="Total Expenses"
                    amount={data.totalExpense}
                    trendType="down"
                    icon={<TrendingDown className="h-6 w-6 text-red-500" />}
                    iconBg="bg-red-100 dark:bg-red-900/30"
                    formatAmount={fmt}
                />
                <SummaryCard
                    title="Net Savings"
                    amount={data.netSavings}
                    trendType={data.netSavings >= 0 ? 'up' : 'down'}
                    icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
                    iconBg="bg-blue-100 dark:bg-blue-900/30"
                    formatAmount={fmt}
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Income vs Expense Line Chart */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <h3 className="font-semibold text-neutral-900 dark:text-white">
                            Income vs Expenses
                        </h3>
                        <p className="text-sm text-neutral-500">Last 6 months trend</p>
                    </CardHeader>
                    <CardBody className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.incomeVsExpenseLast6Months}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200 dark:stroke-neutral-700" />
                                <XAxis
                                    dataKey="month"
                                    tick={{ fontSize: 12, fill: '#6B7280' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fontSize: 12, fill: '#6B7280' }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(value) => isVND ? `${(value * USD_TO_VND / 1000000).toFixed(0)}M` : `$${value / 1000}k`}
                                />
                                <Tooltip
                                    formatter={(value) => fmt(Number(value ?? 0))}
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                                    }}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="income"
                                    stroke="#10B981"
                                    strokeWidth={2}
                                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                                    name="Income"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="expense"
                                    stroke="#EF4444"
                                    strokeWidth={2}
                                    dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                                    name="Expense"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardBody>
                </Card>

                {/* Category Pie Chart */}
                <Card>
                    <CardHeader>
                        <h3 className="font-semibold text-neutral-900 dark:text-white">
                            Expenses by Category
                        </h3>
                        <p className="text-sm text-neutral-500">This month breakdown</p>
                    </CardHeader>
                    <CardBody className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.expenseByCategory}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={2}
                                    dataKey="amount"
                                    nameKey="categoryName"
                                >
                                    {data.expenseByCategory.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => fmt(Number(value ?? 0))}
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '8px',
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardBody>
                </Card>
            </div>

            {/* Category Legend + Recent Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Category Legend */}
                <Card>
                    <CardHeader>
                        <h3 className="font-semibold text-neutral-900 dark:text-white">
                            Top Categories
                        </h3>
                    </CardHeader>
                    <CardBody className="space-y-3">
                        {(data.topCategories || []).slice(0, 5).map((cat) => (
                            <div key={cat.categoryId} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="h-3 w-3 rounded-full"
                                        style={{ backgroundColor: cat.color }}
                                    />
                                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                        {cat.categoryName}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                                        {fmt(cat.amount)}
                                    </p>
                                    <p className="text-xs text-neutral-500">{cat.percentage}%</p>
                                </div>
                            </div>
                        ))}
                    </CardBody>
                </Card>

                {/* Recent Transactions */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-neutral-900 dark:text-white">
                                Recent Transactions
                            </h3>
                            <p className="text-sm text-neutral-500">Latest 5 transactions</p>
                        </div>
                        <a
                            href="/expenses/transactions"
                            className="text-sm font-medium text-brand-primary hover:underline"
                        >
                            View all
                        </a>
                    </CardHeader>
                    <CardBody>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                                        <th className="text-left py-3 px-2 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th className="text-left py-3 px-2 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="text-left py-3 px-2 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="text-right py-3 px-2 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                                    {data.recentTransactions.map((tx) => {
                                        const category = tx.category;
                                        const wallet = tx.wallet;
                                        const isIncome = tx.type === 'income' || tx.type === 'INCOME';

                                        return (
                                            <tr key={tx.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                                                <td className="py-3 px-2">
                                                    <div>
                                                        <p className="text-sm font-medium text-neutral-900 dark:text-white">
                                                            {tx.description}
                                                        </p>
                                                        <p className="text-xs text-neutral-500">{wallet?.name}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                                                        <span>{category?.icon}</span>
                                                        {category?.name}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2 text-sm text-neutral-500">
                                                    {formatDate(tx.date)}
                                                </td>
                                                <td
                                                    className={`py-3 px-2 text-right text-sm font-semibold ${isIncome ? 'text-emerald-600' : 'text-red-500'
                                                        }`}
                                                >
                                                    {isIncome ? '+' : '-'}
                                                    {fmt(tx.amount)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ExpenseOverviewPage;
