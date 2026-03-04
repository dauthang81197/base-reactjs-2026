import { apiClient } from './api';
import type { ApiResponse } from '../types';
import type { Category, TransactionType } from '../features/Expenses/types';

// ── Category Types ────────────────────────────────────────────────────────────
export interface CreateCategoryData {
  name: string;
  type: TransactionType | 'INCOME' | 'EXPENSE';
  icon: string;
  color: string;
}

// ── Category Service ──────────────────────────────────────────────────────────
export const categoryService = {
  /**
   * Get all categories
   * Optional filter by type: INCOME | EXPENSE
   */
  async getCategories(type?: TransactionType | 'INCOME' | 'EXPENSE'): Promise<ApiResponse<Category[]>> {
    return apiClient.get('/flower/categories', { params: type ? { type: type.toUpperCase() } : undefined });
  },

  /**
   * Get categories by type (INCOME or EXPENSE)
   */
  async getCategoriesByType(type: 'income' | 'expense' | 'INCOME' | 'EXPENSE'): Promise<ApiResponse<Category[]>> {
    return apiClient.get('/flower/categories', { params: { type: type.toUpperCase() } });
  },

  /**
   * Create a new category
   */
  async createCategory(data: CreateCategoryData): Promise<ApiResponse<Category>> {
    return apiClient.post('/flower/categories', data);
  },

  /**
   * Update category (partial update)
   */
  async updateCategory(id: string, data: Partial<CreateCategoryData>): Promise<ApiResponse<Category>> {
    return apiClient.patch(`/flower/categories/${id}`, data);
  },

  /**
   * Delete category
   */
  async deleteCategory(id: string): Promise<ApiResponse<null>> {
    return apiClient.delete(`/flower/categories/${id}`);
  },
};


