import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<T>(url, config);
      // Wrap raw API response in ApiResponse structure
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<T>(url, data, config);
      // Wrap raw API response in ApiResponse structure
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<T>(url, data, config);
      // Wrap raw API response in ApiResponse structure
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.patch<T>(url, data, config);
      // Wrap raw API response in ApiResponse structure
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<T>(url, config);
      // Wrap raw API response in ApiResponse structure
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): Error {
    const isAxiosError = (err: unknown): err is { response?: { data?: { error?: string }; status?: number }; message?: string } => {
      return typeof err === 'object' && err !== null;
    };

    const message = isAxiosError(error)
      ? error.response?.data?.error || error.message || 'An error occurred'
      : 'An error occurred';
    const err = new Error(message);
    err.name = isAxiosError(error) ? error.response?.status?.toString() || 'ERROR' : 'ERROR';
    return err;
  }
}

export const apiClient = new ApiClient();


