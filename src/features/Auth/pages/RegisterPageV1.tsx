import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody } from '../../../design-system/components/atoms/Card';
import { Button } from '../../../design-system/components/atoms/Button';
import { AuthLayoutV1 } from '../layouts';
import { GoogleButton, AuthDivider, EyeIcon } from '../components';
import { useAuthStore } from '../../../store/authStore';
import type { RegisterData } from '../types';

const RegisterPageV1: React.FC = () => {
    const navigate = useNavigate();
    const { register, loginWithGoogle, isLoading, error, clearError } = useAuthStore();

    const [formData, setFormData] = useState<RegisterData>({
        fullName: 'Regina Cooper',
        email: 'cooper@example.com',
        password: '',
        confirmPassword: '',
        acceptTerms: true,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (error) clearError();
        if (validationError) setValidationError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setValidationError('Passwords do not match');
            return;
        }

        if (!formData.acceptTerms) {
            setValidationError('Please accept the Terms and Conditions');
            return;
        }

        const success = await register(formData);
        if (success) {
            navigate('/dashboard');
        }
    };

    const handleGoogleSignUp = async () => {
        await loginWithGoogle();
    };

    const displayError = validationError || error;

    return (
        <AuthLayoutV1>
            <Card variant="elevated" className="shadow-xl">
                <CardBody className="p-8">
                    {/* Header */}
                    <h1 className="text-2xl font-bold text-center text-neutral-900 mb-8">
                        Create Account
                    </h1>

                    {/* Google Sign Up */}
                    <GoogleButton onClick={handleGoogleSignUp} text="Sign Up with Google" />

                    {/* Divider */}
                    <AuthDivider text="OR SIGN UP WITH EMAIL" />

                    {/* Error Message */}
                    {displayError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                            {displayError}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label
                                htmlFor="fullName"
                                className="block text-sm font-medium text-neutral-500 mb-1.5"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

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

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-neutral-500 mb-1.5"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pr-12 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                                    placeholder="Confirm your password"
                                    required
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <EyeIcon
                                        visible={showConfirmPassword}
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="acceptTerms"
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                className="w-4 h-4 text-green-600 border-neutral-300 rounded focus:ring-green-500"
                            />
                            <span className="text-sm text-neutral-600">
                                I accept{' '}
                                <Link
                                    to="/terms"
                                    className="text-green-600 hover:text-green-700 font-medium"
                                >
                                    Terms and Conditions
                                </Link>
                            </span>
                        </label>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            loading={isLoading}
                            className="w-full bg-green-600 hover:bg-green-700"
                        >
                            Create Account
                        </Button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center text-sm text-neutral-500 mt-6">
                        Already have an account?{' '}
                        <Link
                            to="/auth/login"
                            className="text-green-600 hover:text-green-700 font-medium"
                        >
                            Login
                        </Link>
                    </p>
                </CardBody>
            </Card>
        </AuthLayoutV1>
    );
};

export default RegisterPageV1;
