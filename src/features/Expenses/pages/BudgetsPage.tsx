import * as React from 'react';
import { Plus, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardBody } from '../../../design-system/components/atoms/Card';
import { Button } from '../../../design-system/components/atoms/Button';
import { budgets, getCategoryById } from '../../../data/expensesMockData';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';

const BudgetsPage: React.FC = () => {
    const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
    const overallPercentage = (totalSpent / totalBudget) * 100;

    const getBudgetStatus = (spent: number, amount: number) => {
        const percentage = (spent / amount) * 100;
        if (percentage >= 100) return 'exceeded';
        if (percentage >= 80) return 'warning';
        return 'good';
    };

    const statusColors = {
        good: {
            bg: 'bg-emerald-500',
            text: 'text-emerald-600',
            icon: CheckCircle,
        },
        warning: {
            bg: 'bg-amber-500',
            text: 'text-amber-600',
            icon: AlertTriangle,
        },
        exceeded: {
            bg: 'bg-red-500',
            text: 'text-red-500',
            icon: AlertTriangle,
        },
    };

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
                <Button variant="filled" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                    Create Budget
                </Button>
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
                                    {formatCurrency(totalBudget - totalSpent)}
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
                    const category = getCategoryById(budget.categoryId);
                    const percentage = (budget.spent / budget.amount) * 100;
                    const status = getBudgetStatus(budget.spent, budget.amount);
                    const StatusIcon = statusColors[status].icon;

                    return (
                        <Card key={budget.id} className="hover:shadow-lg transition-shadow">
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
                                    <StatusIcon className={`h-5 w-5 ${statusColors[status].text}`} />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-neutral-500">
                                            {formatCurrency(budget.spent)} spent
                                        </span>
                                        <span className="font-medium text-neutral-900 dark:text-white">
                                            {formatCurrency(budget.amount)}
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
                                            {formatCurrency(Math.max(budget.amount - budget.spent, 0))} left
                                        </span>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    );
                })}

                {/* Add Budget Card */}
                <Card className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-brand-primary dark:hover:border-brand-primary cursor-pointer transition-colors">
                    <CardBody className="flex flex-col items-center justify-center h-full min-h-[180px] text-neutral-500">
                        <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 mb-3">
                            <Plus className="h-6 w-6" />
                        </div>
                        <p className="font-medium">Create New Budget</p>
                        <p className="text-sm">Set a spending limit for a category</p>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default BudgetsPage;
