import { apiClient } from './api';
import type { ApiResponse } from '../types';
import type { Category } from '../features/Expenses/types';

// ── Budget Types ──────────────────────────────────────────────────────────────
export interface Budget {
    id: string;
    categoryId: string;
    category: Category;
    budgetAmount: number;
    spentAmount: number;
    remaining: number;
    percentageUsed: number;
    period: 'weekly' | 'monthly' | 'yearly';
    month?: number;
    year?: number;
}

export interface CreateBudgetData {
    categoryId: string;
    budgetAmount: number;
    period: 'weekly' | 'monthly' | 'yearly';
    month?: number;
    year?: number;
}

export interface BudgetParams {
    month?: number;
    year?: number;
}

// ── Budget Service ────────────────────────────────────────────────────────────
export const budgetService = {
    /**
     * Get all budgets with optional month/year filter
     * Returns budgets with spent amount and remaining calculated
     */
    async getBudgets(params?: BudgetParams): Promise<ApiResponse<Budget[]>> {
        return apiClient.get('/expenses/budgets', { params });
    },

    /**
     * Create a new budget
     */
    async createBudget(data: CreateBudgetData): Promise<ApiResponse<Budget>> {
        return apiClient.post('/expenses/budgets', data);
    },

    /**
     * Update an existing budget
     */
    async updateBudget(id: string, data: Partial<CreateBudgetData>): Promise<ApiResponse<Budget>> {
        return apiClient.patch(`/expenses/budgets/${id}`, data);
    },

    /**
     * Delete a budget
     */
    async deleteBudget(id: string): Promise<ApiResponse<null>> {
        return apiClient.delete(`/expenses/budgets/${id}`);
    },
};
