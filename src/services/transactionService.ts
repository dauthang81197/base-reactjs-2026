import { apiClient } from './api';
import type { ApiResponse, PaginatedResponse } from '../types';
import type { Transaction, TransactionType } from '../features/Expenses/types';

// ── Transaction Filter Types ──────────────────────────────────────────────────
export interface TransactionFilters {
  type?: TransactionType | 'INCOME' | 'EXPENSE';
  categoryId?: string;
  walletId?: string;
  fromDate?: string;
  toDate?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface CreateTransactionData {
  type: TransactionType | 'INCOME' | 'EXPENSE';
  amount: number;
  categoryId: string;
  walletId: string;
  description: string;
  date: string;
  note?: string;
  tags?: string[];
  currency?: string;
}

// ── Transaction Service ───────────────────────────────────────────────────────
export const transactionService = {
  /**
   * Get all transactions with pagination and filters
   * Filters: type, categoryId, walletId, fromDate, toDate, search description
   */
  async getTransactions(
    filters?: TransactionFilters
  ): Promise<ApiResponse<PaginatedResponse<Transaction>>> {
    return apiClient.get('/flower/transactions', { params: filters });
  },

  /**
   * Get single transaction by ID
   */
  async getTransaction(id: string): Promise<ApiResponse<Transaction>> {
    return apiClient.get(`/flower/transactions/${id}`);
  },

  /**
   * Create transaction
   * - If type = EXPENSE → wallet balance is decreased
   * - If type = INCOME → wallet balance is increased
   */
  async createTransaction(data: CreateTransactionData): Promise<ApiResponse<Transaction>> {
    return apiClient.post('/flower/transactions', data);
  },

  /**
   * Update transaction (partial update)
   */
  async updateTransaction(id: string, data: Partial<CreateTransactionData>): Promise<ApiResponse<Transaction>> {
    return apiClient.patch(`/flower/transactions/${id}`, data);
  },

  /**
   * Delete transaction
   */
  async deleteTransaction(id: string): Promise<ApiResponse<null>> {
    return apiClient.delete(`/flower/transactions/${id}`);
  },
};


