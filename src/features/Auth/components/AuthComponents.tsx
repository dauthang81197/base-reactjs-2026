import React from 'react';

interface GoogleButtonProps {
    onClick?: () => void;
    text?: string;
    loading?: boolean;
}

/**
 * Google Sign In/Up Button
 */
export const GoogleButton: React.FC<GoogleButtonProps> = ({
    onClick,
    text = 'Login with Google',
    loading = false,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-neutral-300 rounded-lg bg-white hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {/* Google Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                />
                <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                />
                <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                />
                <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                />
            </svg>
            <span className="text-neutral-700 font-medium">{text}</span>
        </button>
    );
};

/**
 * Auth Divider with text
 */
export const AuthDivider: React.FC<{ text?: string }> = ({ text = 'OR LOGIN WITH EMAIL' }) => {
    return (
        <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider">{text}</span>
            <div className="flex-1 h-px bg-neutral-200" />
        </div>
    );
};

/**
 * Password visibility toggle icon
 */
export const EyeIcon: React.FC<{ visible: boolean; onClick: () => void }> = ({ visible, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label={visible ? 'Hide password' : 'Show password'}
        >
            {visible ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
            ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            )}
        </button>
    );
};

/**
 * Lock Icon for password recovery pages
 */
export const LockIcon: React.FC = () => {
    return (
        <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Lock body */}
                    <rect x="12" y="22" width="24" height="18" rx="3" fill="#f4c542" />
                    {/* Lock shackle */}
                    <path
                        d="M16 22V16C16 11.5817 19.5817 8 24 8C28.4183 8 32 11.5817 32 16V22"
                        stroke="#e6b635"
                        strokeWidth="4"
                        fill="none"
                    />
                    {/* Keyhole */}
                    <circle cx="24" cy="30" r="2" fill="#1a1a2e" />
                    <rect x="23" y="30" width="2" height="5" fill="#1a1a2e" />
                </svg>
            </div>
        </div>
    );
};

export default GoogleButton;
