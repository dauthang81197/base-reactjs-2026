import { apiClient as api } from './api';
import type {
    LoginCredentials,
    RegisterData,
    ForgotPasswordData,
    ResetPasswordData,
    AuthResponse,
    User,
} from '../features/Auth/types';
import type { ApiResponse } from '../types';

const AUTH_TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'auth_user';
const LOCKED_USER_KEY = 'locked_user';

class AuthService {
    // ── Token Management ────────────────────────────────────────────────────────
    getToken(): string | null {
        return localStorage.getItem(AUTH_TOKEN_KEY);
    }

    setToken(token: string): void {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    }

    removeToken(): void {
        localStorage.removeItem(AUTH_TOKEN_KEY);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    }

    setRefreshToken(token: string): void {
        localStorage.setItem(REFRESH_TOKEN_KEY, token);
    }

    removeRefreshToken(): void {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    }

    // ── User Management ─────────────────────────────────────────────────────────
    getStoredUser(): User | null {
        const userStr = localStorage.getItem(USER_KEY);
        if (userStr) {
            try {
                return JSON.parse(userStr) as User;
            } catch {
                return null;
            }
        }
        return null;
    }

    setStoredUser(user: User): void {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    removeStoredUser(): void {
        localStorage.removeItem(USER_KEY);
    }

    // ── Lock Screen ─────────────────────────────────────────────────────────────
    getLockedUser(): User | null {
        const userStr = localStorage.getItem(LOCKED_USER_KEY);
        if (userStr) {
            try {
                return JSON.parse(userStr) as User;
            } catch {
                return null;
            }
        }
        return null;
    }

    setLockedUser(user: User): void {
        localStorage.setItem(LOCKED_USER_KEY, JSON.stringify(user));
    }

    removeLockedUser(): void {
        localStorage.removeItem(LOCKED_USER_KEY);
    }

    // ── Auth Status ─────────────────────────────────────────────────────────────
    isAuthenticated(): boolean {
        const token = this.getToken();
        const user = this.getStoredUser();
        return Boolean(token && user);
    }

    isLocked(): boolean {
        return Boolean(this.getLockedUser());
    }

    // ── API Calls ───────────────────────────────────────────────────────────────
    async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
        try {
            const response = await api.post<AuthResponse>('/auth/login', credentials);

            if (response.success && response.data) {
                this.setToken(response.data.accessToken);
                this.setStoredUser(response.data.user);
                if (response.data.refreshToken) {
                    this.setRefreshToken(response.data.refreshToken);
                }
                // Clear locked state on successful login
                this.removeLockedUser();
            }

            return response;
        } catch {
            // For demo purposes, simulate successful login
            const mockUser: User = {
                id: '1',
                email: credentials.email,
                fullName: 'Regina Cooper',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
                role: 'admin',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            const mockToken = 'mock_jwt_token_' + Date.now();

            this.setToken(mockToken);
            this.setStoredUser(mockUser);
            this.removeLockedUser();

            return {
                success: true,
                data: {
                    user: mockUser,
                    accessToken: mockToken,
                },
            };
        }
    }

    async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
        try {
            const response = await api.post<AuthResponse>('/auth/register', data);

            if (response.success && response.data) {
                this.setToken(response.data.accessToken);
                this.setStoredUser(response.data.user);
            }

            return response;
        } catch {
            // For demo purposes, simulate successful registration
            const mockUser: User = {
                id: '1',
                email: data.email,
                fullName: data.fullName,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            const mockToken = 'mock_jwt_token_' + Date.now();

            this.setToken(mockToken);
            this.setStoredUser(mockUser);

            return {
                success: true,
                data: {
                    user: mockUser,
                    accessToken: mockToken,
                },
            };
        }
    }

    async forgotPassword(data: ForgotPasswordData): Promise<ApiResponse<{ message: string }>> {
        try {
            return await api.post<{ message: string }>('/auth/forgot-password', data);
        } catch {
            // For demo purposes, simulate successful request
            return {
                success: true,
                data: {
                    message: 'Password reset email sent successfully',
                },
            };
        }
    }

    async resetPassword(data: ResetPasswordData): Promise<ApiResponse<{ message: string }>> {
        try {
            return await api.post<{ message: string }>('/auth/reset-password', data);
        } catch {
            // For demo purposes, simulate successful reset
            return {
                success: true,
                data: {
                    message: 'Password reset successfully',
                },
            };
        }
    }

    async unlockScreen(password: string): Promise<ApiResponse<AuthResponse>> {
        const lockedUser = this.getLockedUser();

        if (!lockedUser) {
            return {
                success: false,
                error: 'No locked user found',
            };
        }

        try {
            const response = await api.post<AuthResponse>('/auth/unlock', {
                userId: lockedUser.id,
                password,
            });

            if (response.success && response.data) {
                this.setToken(response.data.accessToken);
                this.setStoredUser(response.data.user);
                this.removeLockedUser();
            }

            return response;
        } catch {
            // For demo purposes, simulate successful unlock
            const mockToken = 'mock_jwt_token_' + Date.now();

            this.setToken(mockToken);
            this.setStoredUser(lockedUser);
            this.removeLockedUser();

            return {
                success: true,
                data: {
                    user: lockedUser,
                    accessToken: mockToken,
                },
            };
        }
    }

    async logout(): Promise<void> {
        try {
            await api.post('/auth/logout');
        } catch {
            // Silent fail - we'll clear local storage anyway
        } finally {
            this.removeToken();
            this.removeRefreshToken();
            this.removeStoredUser();
            this.removeLockedUser();
        }
    }

    lockScreen(): void {
        const user = this.getStoredUser();
        if (user) {
            this.setLockedUser(user);
            this.removeToken();
            this.removeStoredUser();
        }
    }

    async getCurrentUser(): Promise<ApiResponse<User>> {
        try {
            return await api.get<User>('/auth/me');
        } catch {
            const storedUser = this.getStoredUser();
            if (storedUser) {
                return {
                    success: true,
                    data: storedUser,
                };
            }
            return {
                success: false,
                error: 'No user found',
            };
        }
    }

    async loginWithGoogle(): Promise<void> {
        // Redirect to Google OAuth endpoint
        window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/auth/google`;
    }

    /**
     * Handle Google OAuth callback
     * Receives JWT token from URL params, fetches user profile, and stores auth data
     */
    async handleGoogleCallback(token: string): Promise<ApiResponse<AuthResponse>> {
        try {
            // Store token first so the API client can use it for the /auth/me request
            this.setToken(token);

            // Fetch user profile using the JWT token
            const response = await api.get<User>('/v1/auth/me');

            if (response.success && response.data) {
                this.setStoredUser(response.data);
                this.removeLockedUser();

                return {
                    success: true,
                    data: {
                        user: response.data,
                        accessToken: token,
                    },
                };
            }

            // If fetching user failed, clean up
            this.removeToken();
            return {
                success: false,
                error: 'Failed to fetch user profile',
            };
        } catch {
            // Clean up on error
            this.removeToken();
            return {
                success: false,
                error: 'Google authentication failed',
            };
        }
    }
}

export const authService = new AuthService();
export default authService;
