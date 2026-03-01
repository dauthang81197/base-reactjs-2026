import * as React from 'react';
import { Plus, MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardBody } from '../../../design-system/components/atoms/Card';
import { Button } from '../../../design-system/components/atoms/Button';
import { wallets, getTotalBalance } from '../../../data/expensesMockData';
import { formatCurrency } from '../../../utils/formatters';

// ── Wallet Icon Map ───────────────────────────────────────────────────────────
const walletTypeColors: Record<string, string> = {
    cash: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600',
    bank: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
    credit: 'bg-red-100 dark:bg-red-900/30 text-red-600',
    'e-wallet': 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
    investment: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600',
};

const WalletsPage: React.FC = () => {
    const totalBalance = getTotalBalance();
    const totalAssets = wallets
        .filter((w) => w.balance > 0)
        .reduce((sum, w) => sum + w.balance, 0);
    const totalLiabilities = Math.abs(
        wallets.filter((w) => w.balance < 0).reduce((sum, w) => sum + w.balance, 0)
    );

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
                <Button variant="filled" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                    Add Wallet
                </Button>
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
                                {formatCurrency(totalBalance)}
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
                    <Card key={wallet.id} className="hover:shadow-lg transition-shadow">
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
                                        <p className="text-xs text-neutral-500 capitalize">{wallet.type}</p>
                                    </div>
                                </div>
                                <button className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    <MoreHorizontal className="h-5 w-5 text-neutral-400" />
                                </button>
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
                <Card className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-brand-primary dark:hover:border-brand-primary cursor-pointer transition-colors">
                    <CardBody className="flex flex-col items-center justify-center h-full min-h-[180px] text-neutral-500">
                        <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 mb-3">
                            <Plus className="h-6 w-6" />
                        </div>
                        <p className="font-medium">Add New Wallet</p>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default WalletsPage;
