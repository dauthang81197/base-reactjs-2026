import { z } from 'zod';

export const transactionSchema = z.object({
  amount: z.number().positive('Amount must be greater than 0'),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1, 'Category is required'),
  note: z.string().optional(),
  date: z.string().datetime('Invalid date format'),
  walletId: z.string().min(1, 'Wallet is required'),
});

export const walletSchema = z.object({
  name: z.string().min(1, 'Wallet name is required').max(50),
  type: z.enum(['cash', 'bank', 'e-wallet']),
  balance: z.number().min(0, 'Balance must be non-negative'),
  currency: z.string().length(3, 'Currency must be 3 characters'),
  icon: z.string().optional(),
  color: z.string().optional(),
});

export const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(50),
  type: z.enum(['income', 'expense']),
  icon: z.string(),
  color: z.string(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
export type WalletFormData = z.infer<typeof walletSchema>;
export type CategoryFormData = z.infer<typeof categorySchema>;

