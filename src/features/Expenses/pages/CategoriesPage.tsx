import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Loader2, AlertCircle, RefreshCw, X } from 'lucide-react';
import { Card, CardBody } from '../../../design-system/components/atoms/Card';
import { Button } from '../../../design-system/components/atoms/Button';
import { Input } from '../../../design-system/components/atoms/Input';
import { categoryService } from '../../../services/categoryService';
import type { CreateCategoryData } from '../../../services/categoryService';
import type { Category } from '../types';

// ── Add Category Modal ────────────────────────────────────────────────────────
interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (category: CreateCategoryData) => Promise<void>;
    loading?: boolean;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose, onSave, loading }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');
    const [icon, setIcon] = useState('📝');
    const [color, setColor] = useState('#6366F1');

    const iconOptions = ['📝', '🍔', '🚗', '🏠', '💼', '🎮', '🛒', '💰', '🎁', '📱', '✈️', '🎬', '💊', '📚', '⚡'];
    const colorOptions = ['#EF4444', '#F97316', '#F59E0B', '#84CC16', '#22C55E', '#14B8A6', '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#EC4899'];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave({ name, type, icon, color });
        setName('');
        setIcon('📝');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white dark:bg-neutral-900 rounded-xl shadow-xl w-full max-w-md mx-4">
                <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Add Category</h2>
                    <button onClick={onClose} className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        <X className="h-5 w-5 text-neutral-500" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Name</label>
                        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Category name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Type</label>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setType('EXPENSE')}
                                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${type === 'EXPENSE'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                                    }`}
                            >
                                Expense
                            </button>
                            <button
                                type="button"
                                onClick={() => setType('INCOME')}
                                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${type === 'INCOME'
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                                    }`}
                            >
                                Income
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Icon</label>
                        <div className="flex flex-wrap gap-2">
                            {iconOptions.map((opt) => (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setIcon(opt)}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${icon === opt
                                        ? 'bg-brand-primary text-white'
                                        : 'bg-neutral-100 dark:bg-neutral-800'
                                        }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Color</label>
                        <div className="flex flex-wrap gap-2">
                            {colorOptions.map((opt) => (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setColor(opt)}
                                    className={`w-8 h-8 rounded-full ${color === opt ? 'ring-2 ring-offset-2 ring-brand-primary' : ''}`}
                                    style={{ backgroundColor: opt }}
                                />
                            ))}
                        </div>
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

const CategoriesPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'all' | 'income' | 'expense'>('all');

    const fetchCategories = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await categoryService.getCategories();
            if (response.success && response.data) {
                setCategories(response.data);
            } else {
                setError(response.error || 'Failed to load categories');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleAddCategory = async (data: CreateCategoryData) => {
        try {
            setSaving(true);
            const response = await categoryService.createCategory(data);
            if (response.success) {
                await fetchCategories();
            }
        } catch (err) {
            console.error('Failed to create category:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteCategory = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category?')) return;
        try {
            const response = await categoryService.deleteCategory(id);
            if (response.success) {
                await fetchCategories();
            }
        } catch (err) {
            console.error('Failed to delete category:', err);
        }
    };

    const normalizeType = (type: string): 'income' | 'expense' => {
        return type.toLowerCase() as 'income' | 'expense';
    };

    const filteredCategories = activeTab === 'all'
        ? categories
        : categories.filter((c) => normalizeType(c.type) === activeTab);

    const incomeCategories = categories.filter((c) => normalizeType(c.type) === 'income');
    const expenseCategories = categories.filter((c) => normalizeType(c.type) === 'expense');

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
                    <Button variant="outline" size="sm" leftIcon={<RefreshCw className="h-4 w-4" />} onClick={fetchCategories}>
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
                        Categories
                    </h1>
                    <p className="text-neutral-500 dark:text-neutral-400">
                        Organize your transactions with categories
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" leftIcon={<RefreshCw className="h-4 w-4" />} onClick={fetchCategories}>
                        Refresh
                    </Button>
                    <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={() => setIsModalOpen(true)}>
                        Add Category
                    </Button>
                </div>
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
                    const categoryType = normalizeType(category.type);
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
                                                className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${categoryType === 'income'
                                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                    }`}
                                            >
                                                {categoryType}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-neutral-500 hover:text-red-500"
                                            onClick={() => handleDeleteCategory(category.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    );
                })}

                {/* Add Category Card */}
                <Card
                    className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-brand-primary dark:hover:border-brand-primary cursor-pointer transition-colors"
                    onClick={() => setIsModalOpen(true)}
                >
                    <CardBody className="flex flex-col items-center justify-center h-full min-h-[150px] text-neutral-500">
                        <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 mb-3">
                            <Plus className="h-6 w-6" />
                        </div>
                        <p className="font-medium">Add New Category</p>
                    </CardBody>
                </Card>
            </div>

            {/* Add Category Modal */}
            <AddCategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddCategory}
                loading={saving}
            />
        </div>
    );
};

export default CategoriesPage;
