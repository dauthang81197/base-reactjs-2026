import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Plus, TrendingUp, TrendingDown, Loader2, AlertCircle, RefreshCw, Trash2, X } from 'lucide-react';
import { Card, CardBody } from '../../../design-system/components/atoms/Card';
import { Button } from '../../../design-system/components/atoms/Button';
import { Input } from '../../../design-system/components/atoms/Input';
import { walletService } from '../../../services/walletService';
import type { CreateWalletData, WalletSummary } from '../../../services/walletService';
import { formatCurrency } from '../../../utils/formatters';
import type { Wallet } from '../types';

// ── Wallet Icon Map ───────────────────────────────────────────────────────────
const walletTypeColors: Record<string, string> = {
    CASH: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600',
    BANK: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
    CREDIT: 'bg-red-100 dark:bg-red-900/30 text-red-600',
    E_WALLET: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
    INVESTMENT: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600',
};

// ── Add Wallet Modal ──────────────────────────────────────────────────────────
interface AddWalletModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (wallet: CreateWalletData) => Promise<void>;
    loading?: boolean;
}

const AddWalletModal: React.FC<AddWalletModalProps> = ({ isOpen, onClose, onSave, loading }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState<Wallet['type']>('BANK');
    const [balance, setBalance] = useState('');
    const currency = 'USD';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave({
            name,
            type,
            balance: parseFloat(balance) || 0,
            currency,
        });
        setName('');
        setType('BANK');
        setBalance('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white dark:bg-neutral-900 rounded-xl shadow-xl w-full max-w-md mx-4">
                <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Add Wallet</h2>
                    <button onClick={onClose} className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        <X className="h-5 w-5 text-neutral-500" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Name</label>
                        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Wallet name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value as Wallet['type'])}
                            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                        >
                            <option value="CASH">Cash</option>
                            <option value="BANK">Bank</option>
                            <option value="CREDIT">Credit Card</option>
                            <option value="E_WALLET">E-Wallet</option>
                            <option value="INVESTMENT">Investment</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Initial Balance</label>
                        <Input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} placeholder="0.00" />
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

const WalletsPage: React.FC = () => {
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [summary, setSummary] = useState<WalletSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    const fetchWallets = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const [walletsRes, summaryRes] = await Promise.all([
                walletService.getWallets(),
                walletService.getWalletSummary(),
            ]);
            if (walletsRes.success && walletsRes.data) {
                setWallets(walletsRes.data);
            } else {
                setError(walletsRes.error || 'Failed to load wallets');
            }
            if (summaryRes.success && summaryRes.data) {
                setSummary(summaryRes.data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchWallets();
    }, [fetchWallets]);

    const handleAddWallet = async (data: CreateWalletData) => {
        try {
            setSaving(true);
            const response = await walletService.createWallet(data);
            if (response.success) {
                await fetchWallets();
            }
        } catch (err) {
            console.error('Failed to create wallet:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteWallet = async (id: string) => {
        if (!confirm('Are you sure you want to delete this wallet?')) return;
        try {
            const response = await walletService.deleteWallet(id);
            if (response.success) {
                await fetchWallets();
            }
        } catch (err) {
            console.error('Failed to delete wallet:', err);
        }
    };

    // Calculate totals from wallets if summary is not available
    const totalAssets = summary?.totalAssets ?? wallets.filter(w => w.balance > 0).reduce((sum, w) => sum + w.balance, 0);
    const totalLiabilities = summary?.totalLiabilities ?? Math.abs(wallets.filter(w => w.balance < 0).reduce((sum, w) => sum + w.balance, 0));
    const netWorth = summary?.netWorth ?? wallets.reduce((sum, w) => sum + w.balance, 0);

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
                    <Button variant="outline" size="sm" leftIcon={<RefreshCw className="h-4 w-4" />} onClick={fetchWallets}>
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
                        Wallets
                    </h1>
                    <p className="text-neutral-500 dark:text-neutral-400">
                        Manage your accounts and track balances
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" leftIcon={<RefreshCw className="h-4 w-4" />} onClick={fetchWallets}>
                        Refresh
                    </Button>
                    <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={() => setIsModalOpen(true)}>
                        Add Wallet
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                    <CardBody className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/30">
                            <TrendingUp className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500">Net Worth</p>
                            <p className="text-xl font-bold text-neutral-900 dark:text-white">
                                {formatCurrency(netWorth)}
                            </p>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30">
                            <TrendingUp className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500">Total Assets</p>
                            <p className="text-xl font-bold text-emerald-600">
                                {formatCurrency(totalAssets)}
                            </p>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-red-100 dark:bg-red-900/30">
                            <TrendingDown className="h-6 w-6 text-red-500" />
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500">Total Liabilities</p>
                            <p className="text-xl font-bold text-red-500">
                                {formatCurrency(totalLiabilities)}
                            </p>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Wallets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wallets.map((wallet) => (
                    <Card key={wallet.id} className="hover:shadow-lg transition-shadow group">
                        <CardBody>
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl ${walletTypeColors[wallet.type] || 'bg-neutral-100'
                                            }`}
                                    >
                                        {wallet.icon}
                                    </div>
                                    <div>
                                        <p className="font-medium text-neutral-900 dark:text-white">
                                            {wallet.name}
                                        </p>
                                        <p className="text-xs text-neutral-500">
                                            {{ CASH: 'Cash', BANK: 'Bank', CREDIT: 'Credit Card', E_WALLET: 'E-Wallet', INVESTMENT: 'Investment' }[wallet.type] || wallet.type}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-neutral-500 hover:text-red-500"
                                        onClick={() => handleDeleteWallet(wallet.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700">
                                <p className="text-sm text-neutral-500">Balance</p>
                                <p
                                    className={`text-2xl font-bold ${wallet.balance >= 0 ? 'text-neutral-900 dark:text-white' : 'text-red-500'
                                        }`}
                                >
                                    {formatCurrency(wallet.balance)}
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                ))}

                {/* Add Wallet Card */}
                <Card
                    className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-brand-primary dark:hover:border-brand-primary cursor-pointer transition-colors"
                    onClick={() => setIsModalOpen(true)}
                >
                    <CardBody className="flex flex-col items-center justify-center h-full min-h-[180px] text-neutral-500">
                        <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 mb-3">
                            <Plus className="h-6 w-6" />
                        </div>
                        <p className="font-medium">Add New Wallet</p>
                    </CardBody>
                </Card>
            </div>

            {/* Add Wallet Modal */}
            <AddWalletModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddWallet}
                loading={saving}
            />
        </div>
    );
};

export default WalletsPage;
