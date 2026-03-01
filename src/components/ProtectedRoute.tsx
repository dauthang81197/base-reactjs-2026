import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

/**
 * ProtectedRoute component
 * - Checks if user is authenticated
 * - If locked, redirects to lock screen
 * - If not authenticated, redirects to login
 * - Otherwise, renders the protected content
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const { isAuthenticated, isLocked, initializeAuth } = useAuthStore();

    // Initialize auth state from localStorage on mount
    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    // If user is locked, redirect to lock screen
    if (isLocked) {
        return <Navigate to="/auth/lock-screen" state={{ from: location }} replace />;
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    // User is authenticated, render children
    return <>{children}</>;
};

/**
 * PublicRoute component
 * - Redirects authenticated users away from auth pages
 * - Allows non-authenticated users to access auth pages
 */
export const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, isLocked, initializeAuth } = useAuthStore();

    // Initialize auth state from localStorage on mount
    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    // If user is locked, always allow access to lock screen
    if (isLocked) {
        return <>{children}</>;
    }

    // If authenticated, redirect to dashboard
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    // User is not authenticated, render auth pages
    return <>{children}</>;
};

export default ProtectedRoute;
