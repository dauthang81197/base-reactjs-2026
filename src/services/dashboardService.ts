import { apiClient } from './api';
import type { ApiResponse } from '../types';
import type { Transaction, CategorySummary, MonthlyTrend } from '../features/Expenses/types';

// ── Dashboard Types ───────────────────────────────────────────────────────────
export interface DashboardOverview {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
    netSavings: number;
    incomeVsExpenseLast6Months: MonthlyTrend[];
    expenseByCategory: CategorySummary[];
    topCategories: CategorySummary[];
    recentTransactions: Transaction[];
}

export interface DashboardParams {
    month?: number;
    year?: number;
}

// ── Dashboard Service ─────────────────────────────────────────────────────────
export const dashboardService = {
    /**
     * Get dashboard overview data
     * @param params - Optional month and year filters
     * @returns Dashboard overview with totals, charts, and recent transactions
     */
    async getOverview(params?: DashboardParams): Promise<ApiResponse<DashboardOverview>> {
        return apiClient.get('/flower/dashboard/overview', { params });
    },
};
