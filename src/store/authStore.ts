import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, LoginCredentials, RegisterData, ForgotPasswordData, ResetPasswordData } from '../features/Auth/types';
import { authService } from '../services/authService';

interface AuthStore {
    // State
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLocked: boolean;
    lockedUser: User | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (credentials: LoginCredentials) => Promise<boolean>;
    register: (data: RegisterData) => Promise<boolean>;
    logout: () => Promise<void>;
    lockScreen: () => void;
    unlockScreen: (password: string) => Promise<boolean>;
    forgotPassword: (data: ForgotPasswordData) => Promise<boolean>;
    resetPassword: (data: ResetPasswordData) => Promise<boolean>;
    loginWithGoogle: () => Promise<void>;
    handleGoogleCallback: (token: string) => Promise<boolean>;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearError: () => void;
    initializeAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            // Initial state
            user: null,
            token: null,
            isAuthenticated: false,
            isLocked: false,
            lockedUser: null,
            isLoading: false,
            error: null,

            // Initialize auth from localStorage
            initializeAuth: () => {
                const token = authService.getToken();
                const user = authService.getStoredUser();
                const lockedUser = authService.getLockedUser();

                if (lockedUser) {
                    set({
                        isLocked: true,
                        lockedUser,
                        isAuthenticated: false,
                        user: null,
                        token: null,
                    });
                } else if (token && user) {
                    set({
                        isAuthenticated: true,
                        user,
                        token,
                        isLocked: false,
                        lockedUser: null,
                    });
                } else {
                    set({
                        isAuthenticated: false,
                        user: null,
                        token: null,
                        isLocked: false,
                        lockedUser: null,
                    });
                }
            },

            // Login action
            login: async (credentials: LoginCredentials) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authService.login(credentials);
                    if (response.success && response.data) {
                        set({
                            isAuthenticated: true,
                            user: response.data.user,
                            token: response.data.accessToken,
                            isLoading: false,
                            error: null,
                            isLocked: false,
                            lockedUser: null,
                        });
                        return true;
                    } else {
                        set({
                            isLoading: false,
                            error: response.error || 'Login failed',
                        });
                        return false;
                    }
                } catch (error) {
                    set({
                        isLoading: false,
                        error: error instanceof Error ? error.message : 'Login failed',
                    });
                    return false;
                }
            },

            // Register action
            register: async (data: RegisterData) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authService.register(data);
                    if (response.success && response.data) {
                        set({
                            isAuthenticated: true,
                            user: response.data.user,
                            token: response.data.accessToken,
                            isLoading: false,
                            error: null,
                        });
                        return true;
                    } else {
                        set({
                            isLoading: false,
                            error: response.error || 'Registration failed',
                        });
                        return false;
                    }
                } catch (error) {
                    set({
                        isLoading: false,
                        error: error instanceof Error ? error.message : 'Registration failed',
                    });
                    return false;
                }
            },

            // Logout action
            logout: async () => {
                set({ isLoading: true });
                await authService.logout();
                set({
                    isAuthenticated: false,
                    user: null,
                    token: null,
                    isLoading: false,
                    error: null,
                    isLocked: false,
                    lockedUser: null,
                });
            },

            // Lock screen action
            lockScreen: () => {
                const { user } = get();
                if (user) {
                    authService.lockScreen();
                    set({
                        isLocked: true,
                        lockedUser: user,
                        isAuthenticated: false,
                        user: null,
                        token: null,
                    });
                }
            },

            // Unlock screen action
            unlockScreen: async (password: string) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authService.unlockScreen(password);
                    if (response.success && response.data) {
                        set({
                            isAuthenticated: true,
                            user: response.data.user,
                            token: response.data.accessToken,
                            isLoading: false,
                            error: null,
                            isLocked: false,
                            lockedUser: null,
                        });
                        return true;
                    } else {
                        set({
                            isLoading: false,
                            error: response.error || 'Invalid password',
                        });
                        return false;
                    }
                } catch (error) {
                    set({
                        isLoading: false,
                        error: error instanceof Error ? error.message : 'Unlock failed',
                    });
                    return false;
                }
            },

            // Forgot password action
            forgotPassword: async (data: ForgotPasswordData) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authService.forgotPassword(data);
                    set({ isLoading: false });
                    return response.success;
                } catch (error) {
                    set({
                        isLoading: false,
                        error: error instanceof Error ? error.message : 'Request failed',
                    });
                    return false;
                }
            },

            // Reset password action
            resetPassword: async (data: ResetPasswordData) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authService.resetPassword(data);
                    set({ isLoading: false });
                    return response.success;
                } catch (error) {
                    set({
                        isLoading: false,
                        error: error instanceof Error ? error.message : 'Reset failed',
                    });
                    return false;
                }
            },

            // Google login - redirect to backend
            loginWithGoogle: async () => {
                await authService.loginWithGoogle();
            },

            // Handle Google OAuth callback
            handleGoogleCallback: async (token: string) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authService.handleGoogleCallback(token);
                    if (response.success && response.data) {
                        set({
                            isAuthenticated: true,
                            user: response.data.user,
                            token: response.data.accessToken,
                            isLoading: false,
                            error: null,
                            isLocked: false,
                            lockedUser: null,
                        });
                        return true;
                    } else {
                        set({
                            isLoading: false,
                            error: response.error || 'Google login failed',
                        });
                        return false;
                    }
                } catch (error) {
                    set({
                        isLoading: false,
                        error: error instanceof Error ? error.message : 'Google login failed',
                    });
                    return false;
                }
            },

            // Utility actions
            setUser: (user: User | null) => set({ user }),
            setLoading: (isLoading: boolean) => set({ isLoading }),
            setError: (error: string | null) => set({ error }),
            clearError: () => set({ error: null }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                isLocked: state.isLocked,
                lockedUser: state.lockedUser,
            }),
        }
    )
);

export default useAuthStore;
