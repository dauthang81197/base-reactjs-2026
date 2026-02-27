import { apiClient } from './api';
import type { Category, ApiResponse } from '../types';

export const categoryService = {
  // Get all categories
  async getCategories(): Promise<ApiResponse<Category[]>> {
    return apiClient.get('/categories');
  },

  // Get categories by type
  async getCategoriesByType(type: 'income' | 'expense'): Promise<ApiResponse<Category[]>> {
    return apiClient.get('/categories', { params: { type } });
  },

  // Create category
  async createCategory(data: Omit<Category, 'id'>): Promise<ApiResponse<Category>> {
    return apiClient.post('/categories', data);
  },

  // Update category
  async updateCategory(id: string, data: Partial<Category>): Promise<ApiResponse<Category>> {
    return apiClient.put(`/categories/${id}`, data);
  },

  // Delete category
  async deleteCategory(id: string): Promise<ApiResponse<null>> {
    return apiClient.delete(`/categories/${id}`);
  },
};


