// ── Auth Types ────────────────────────────────────────────────────────────────

export interface User {
    id: string;
    email: string;
    fullName: string;
    avatar?: string;
    role: 'admin' | 'user' | 'moderator';
    createdAt: string;
    updatedAt: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface RegisterData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
}

export interface ForgotPasswordData {
    email: string;
}

export interface ResetPasswordData {
    email: string;
    password: string;
    confirmPassword: string;
    token: string;
}

export interface LockScreenData {
    password: string;
}

export interface AuthResponse {
    user: User;
    token: string;
    refreshToken?: string;
}

export interface AuthLayoutVariant {
    variant: 'v1' | 'v2';
}
