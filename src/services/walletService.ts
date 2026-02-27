import { apiClient } from './api';
import type { Wallet, ApiResponse } from '../types';

export const walletService = {
  // Get all wallets
  async getWallets(): Promise<ApiResponse<Wallet[]>> {
    return apiClient.get('/wallets');
  },

  // Get single wallet
  async getWallet(id: string): Promise<ApiResponse<Wallet>> {
    return apiClient.get(`/wallets/${id}`);
  },

  // Create wallet
  async createWallet(data: Omit<Wallet, 'id'>): Promise<ApiResponse<Wallet>> {
    return apiClient.post('/wallets', data);
  },

  // Update wallet
  async updateWallet(id: string, data: Partial<Wallet>): Promise<ApiResponse<Wallet>> {
    return apiClient.put(`/wallets/${id}`, data);
  },

  // Delete wallet
  async deleteWallet(id: string): Promise<ApiResponse<null>> {
    return apiClient.delete(`/wallets/${id}`);
  },
};


