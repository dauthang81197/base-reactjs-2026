// ── Auth Types ────────────────────────────────────────────────────────────────

export interface User {
    id: string;
    email: string;
    fullName?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    middleName?: string | null;
    username?: string;
    phoneNumber?: string | null;
    avatar?: string;
    role?: 'admin' | 'user' | 'moderator';
    organizationId?: string;
    organization?: {
        id: string;
        name?: string;
        createdAt: string;
        updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
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
    accessToken: string;
    refreshToken?: string;
}

export interface AuthLayoutVariant {
    variant: 'v1' | 'v2';
}
