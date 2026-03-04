import { apiClient } from './api';
import type { ApiResponse } from '../types';
import type { Wallet } from '../features/Expenses/types';

// ── Wallet Summary Type ───────────────────────────────────────────────────────
export interface WalletSummary {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
}

export interface CreateWalletData {
  name: string;
  type: 'CASH' | 'BANK' | 'CREDIT' | 'E_WALLET' | 'INVESTMENT';
  balance: number;
  currency: string;
  color?: string;
  icon?: string;
}

// ── Wallet Service ────────────────────────────────────────────────────────────
export const walletService = {
  /**
   * Get all wallets
   */
  async getWallets(): Promise<ApiResponse<Wallet[]>> {
    return apiClient.get('/flower/wallets');
  },

  /**
   * Get single wallet by ID
   */
  async getWallet(id: string): Promise<ApiResponse<Wallet>> {
    return apiClient.get(`/flower/wallets/${id}`);
  },

  /**
   * Get wallet summary (total assets, liabilities, net worth)
   */
  async getWalletSummary(): Promise<ApiResponse<WalletSummary>> {
    return apiClient.get('/flower/wallets/summary');
  },

  /**
   * Create a new wallet
   */
  async createWallet(data: CreateWalletData): Promise<ApiResponse<Wallet>> {
    return apiClient.post('/flower/wallets', data);
  },

  /**
   * Update wallet (partial update)
   */
  async updateWallet(id: string, data: Partial<CreateWalletData>): Promise<ApiResponse<Wallet>> {
    return apiClient.patch(`/flowers/wallets/${id}`, data);
  },

  /**
   * Delete wallet
   */
  async deleteWallet(id: string): Promise<ApiResponse<null>> {
    return apiClient.delete(`/flower/wallets/${id}`);
  },
};


