import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';

/**
 * GoogleCallbackPage
 *
 * Handles the OAuth callback from:
 *   /auth/google/callback?token=JWT_TOKEN
 *
 * Flow:
 *   1. Extract token from URL search params
 *   2. Call handleGoogleCallback to store JWT & fetch user profile
 *   3. Redirect to /dashboard on success or /auth/login on failure
 */
const GoogleCallbackPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { handleGoogleCallback, isLoading, error } = useAuthStore();
    const hasProcessed = useRef(false);

    useEffect(() => {
        // Prevent double processing in React StrictMode
        if (hasProcessed.current) return;
        hasProcessed.current = true;

        const token = searchParams.get('token');

        if (!token) {
            navigate('/auth/login', { replace: true });
            return;
        }

        const processCallback = async () => {
            const success = await handleGoogleCallback(token);
            if (success) {
                navigate('/dashboard', { replace: true });
            } else {
                navigate('/auth/login', { replace: true });
            }
        };

        processCallback();
    }, [searchParams, handleGoogleCallback, navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-900">
            {error ? (
                <div className="text-center">
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm max-w-md">
                        {error}
                    </div>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                        Redirecting to login...
                    </p>
                </div>
            ) : (
                <div className="text-center">
                    {/* Spinner */}
                    <div className="mb-4 flex justify-center">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                        {isLoading ? 'Signing you in with Google...' : 'Processing...'}
                    </p>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
                        Please wait while we verify your account.
                    </p>
                </div>
            )}
        </div>
    );
};

export default GoogleCallbackPage;

