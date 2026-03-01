import * as React from 'react';
import {
    TrendingUp,
    TrendingDown,
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
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
import {
    transactions,
    categorySummary,
    monthlyTrends,
    getExpenseSummary,
    getTotalBalance,
    getCategoryById,
    getWalletById,
} from '../../../data/expensesMockData';
import { formatCurrency, formatDate } from '../../../utils/formatters';

// ── Summary Card Component ────────────────────────────────────────────────────
interface SummaryCardProps {
    title: string;
    amount: number;
    trend?: number;
    icon: React.ReactNode;
    iconBg: string;
    trendType?: 'up' | 'down' | 'neutral';
}

const SummaryCard: React.FC<SummaryCardProps> = ({
    title,
    amount,
    trend,
    icon,
    iconBg,
    trendType = 'neutral',
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
                    {formatCurrency(amount)}
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

// ── Expense Overview Page ─────────────────────────────────────────────────────
const ExpenseOverviewPage: React.FC = () => {
    const summary = getExpenseSummary();
    const totalBalance = getTotalBalance();
    const recentTransactions = transactions.slice(0, 5);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    Expense Overview
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400">
                    Track your income and expenses for {summary.period}
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <SummaryCard
                    title="Total Balance"
                    amount={totalBalance}
                    icon={<Wallet className="h-6 w-6 text-indigo-600" />}
                    iconBg="bg-indigo-100 dark:bg-indigo-900/30"
                />
                <SummaryCard
                    title="Total Income"
                    amount={summary.totalIncome}
                    trend={12.5}
                    trendType="up"
                    icon={<TrendingUp className="h-6 w-6 text-emerald-600" />}
                    iconBg="bg-emerald-100 dark:bg-emerald-900/30"
                />
                <SummaryCard
                    title="Total Expenses"
                    amount={summary.totalExpense}
                    trend={8.2}
                    trendType="down"
                    icon={<TrendingDown className="h-6 w-6 text-red-500" />}
                    iconBg="bg-red-100 dark:bg-red-900/30"
                />
                <SummaryCard
                    title="Net Savings"
                    amount={summary.balance}
                    trend={15.3}
                    trendType="up"
                    icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
                    iconBg="bg-blue-100 dark:bg-blue-900/30"
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
                            <LineChart data={monthlyTrends}>
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
                                    tickFormatter={(value) => `$${value / 1000}k`}
                                />
                                <Tooltip
                                    formatter={(value: number) => formatCurrency(value)}
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
                                    data={categorySummary}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={2}
                                    dataKey="amount"
                                    nameKey="categoryName"
                                >
                                    {categorySummary.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number) => formatCurrency(value)}
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
                        {categorySummary.slice(0, 5).map((cat) => (
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
                                        {formatCurrency(cat.amount)}
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
                                    {recentTransactions.map((tx) => {
                                        const category = getCategoryById(tx.categoryId);
                                        const wallet = getWalletById(tx.walletId);
                                        const isIncome = tx.type === 'income';

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
                                                    {formatCurrency(tx.amount)}
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
