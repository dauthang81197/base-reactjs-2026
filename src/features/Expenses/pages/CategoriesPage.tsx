import * as React from 'react';
import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../../design-system/components/atoms/Card';
import { Button } from '../../../design-system/components/atoms/Button';
import { categories, categorySummary } from '../../../data/expensesMockData';
import { formatCurrency } from '../../../utils/formatters';
import type { TransactionType } from '../types';

const CategoriesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'all' | TransactionType>('all');

    const filteredCategories =
        activeTab === 'all'
            ? categories
            : categories.filter((c) => c.type === activeTab);

    const getCategoryStats = (categoryId: string) => {
        const stats = categorySummary.find((s) => s.categoryId === categoryId);
        return stats || { amount: 0, transactionCount: 0 };
    };

    const incomeCategories = categories.filter((c) => c.type === 'income');
    const expenseCategories = categories.filter((c) => c.type === 'expense');

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        Categories
                    </h1>
                    <p className="text-neutral-500 dark:text-neutral-400">
                        Organize your transactions with categories
                    </p>
                </div>
                <Button variant="filled" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                    Add Category
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                    <CardBody className="text-center">
                        <p className="text-3xl font-bold text-neutral-900 dark:text-white">
                            {categories.length}
                        </p>
                        <p className="text-sm text-neutral-500">Total Categories</p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="text-center">
                        <p className="text-3xl font-bold text-emerald-600">
                            {incomeCategories.length}
                        </p>
                        <p className="text-sm text-neutral-500">Income Categories</p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="text-center">
                        <p className="text-3xl font-bold text-red-500">
                            {expenseCategories.length}
                        </p>
                        <p className="text-sm text-neutral-500">Expense Categories</p>
                    </CardBody>
                </Card>
            </div>

            {/* Tab Filters */}
            <div className="flex gap-2">
                {(['all', 'income', 'expense'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab
                                ? 'bg-brand-primary text-white'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                            }`}
                    >
                        {tab === 'all' ? 'All' : tab === 'income' ? 'Income' : 'Expense'}
                    </button>
                ))}
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCategories.map((category) => {
                    const stats = getCategoryStats(category.id);
                    return (
                        <Card key={category.id} className="hover:shadow-lg transition-shadow group">
                            <CardBody>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="h-12 w-12 rounded-xl flex items-center justify-center text-xl"
                                            style={{ backgroundColor: `${category.color}20` }}
                                        >
                                            {category.icon}
                                        </div>
                                        <div>
                                            <p className="font-medium text-neutral-900 dark:text-white">
                                                {category.name}
                                            </p>
                                            <span
                                                className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${category.type === 'income'
                                                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                    }`}
                                            >
                                                {category.type}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500">
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-neutral-500 hover:text-red-500">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700 flex justify-between text-sm">
                                    <div>
                                        <p className="text-neutral-500">Transactions</p>
                                        <p className="font-medium text-neutral-900 dark:text-white">
                                            {stats.transactionCount}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-neutral-500">Total Amount</p>
                                        <p
                                            className={`font-medium ${category.type === 'income' ? 'text-emerald-600' : 'text-red-500'
                                                }`}
                                        >
                                            {formatCurrency(stats.amount)}
                                        </p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    );
                })}

                {/* Add Category Card */}
                <Card className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-brand-primary dark:hover:border-brand-primary cursor-pointer transition-colors">
                    <CardBody className="flex flex-col items-center justify-center h-full min-h-[150px] text-neutral-500">
                        <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 mb-3">
                            <Plus className="h-6 w-6" />
                        </div>
                        <p className="font-medium">Add New Category</p>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default CategoriesPage;
