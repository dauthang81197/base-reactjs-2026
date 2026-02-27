import { apiClient } from './api';
import type { Transaction, ApiResponse, PaginatedResponse } from '../types';

export const transactionService = {
  // Get all transactions with filters
  async getTransactions(
    filters?: {
      walletId?: string;
      category?: string;
      type?: 'income' | 'expense';
      dateFrom?: string;
      dateTo?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<ApiResponse<PaginatedResponse<Transaction>>> {
    return apiClient.get('/transactions', { params: filters });
  },

  // Get single transaction
  async getTransaction(id: string): Promise<ApiResponse<Transaction>> {
    return apiClient.get(`/transactions/${id}`);
  },

  // Create transaction
  async createTransaction(data: Omit<Transaction, 'id'>): Promise<ApiResponse<Transaction>> {
    return apiClient.post('/transactions', data);
  },

  // Update transaction
  async updateTransaction(id: string, data: Partial<Transaction>): Promise<ApiResponse<Transaction>> {
    return apiClient.put(`/transactions/${id}`, data);
  },

  // Delete transaction
  async deleteTransaction(id: string): Promise<ApiResponse<null>> {
    return apiClient.delete(`/transactions/${id}`);
  },
};


