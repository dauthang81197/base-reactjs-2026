import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../design-system/components/atoms/Button';
import { AuthLayoutV2 } from '../layouts';
import { GoogleButton, AuthDivider, EyeIcon } from '../components';
import { useAuthStore } from '../../../store/authStore';
import type { LoginCredentials } from '../types';

const LoginPageV2: React.FC = () => {
    const navigate = useNavigate();
    const { login, loginWithGoogle, isLoading, error, clearError } = useAuthStore();

    const [formData, setFormData] = useState<LoginCredentials>({
        email: 'cooper@example.com',
        password: '',
        rememberMe: true,
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (error) clearError();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(formData);
        if (success) {
            navigate('/dashboard');
        }
    };

    const handleGoogleLogin = async () => {
        await loginWithGoogle();
    };

    return (
        <AuthLayoutV2>
            {/* Header */}
            <h1 className="text-2xl font-bold text-center text-neutral-900 mb-8">
                Login To Your Account
            </h1>

            {/* Google Login */}
            <GoogleButton onClick={handleGoogleLogin} text="Login with Google" />

            {/* Divider */}
            <AuthDivider text="OR LOGIN WITH EMAIL" />

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-neutral-500 mb-1.5"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {/* Password */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-neutral-500 mb-1.5"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 pr-12 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                            placeholder="Enter your password"
                            required
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <EyeIcon
                                visible={showPassword}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                    </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            className="w-4 h-4 text-green-600 border-neutral-300 rounded focus:ring-green-500"
                        />
                        <span className="text-sm text-neutral-600">Remember Me</span>
                    </label>
                    <Link
                        to="/auth/forgot-password-v2"
                        className="text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                        Forgot Password?
                    </Link>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isLoading}
                    className="w-full bg-[#1d8348] hover:bg-[#186d3c] rounded-full"
                >
                    Log In
                </Button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-neutral-500 mt-6">
                Don't have an account?{' '}
                <Link
                    to="/auth/register-v2"
                    className="text-green-600 hover:text-green-700 font-medium"
                >
                    Sign Up
                </Link>
            </p>
        </AuthLayoutV2>
    );
};

export default LoginPageV2;
