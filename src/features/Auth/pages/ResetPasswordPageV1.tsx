import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardBody } from '../../../design-system/components/atoms/Card';
import { Button } from '../../../design-system/components/atoms/Button';
import { AuthLayoutV1 } from '../layouts';
import { LockIcon, EyeIcon } from '../components';
import { useAuthStore } from '../../../store/authStore';

const ResetPasswordPageV1: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { resetPassword, isLoading, error, clearError } = useAuthStore();

    const [formData, setFormData] = useState({
        email: searchParams.get('email') || 'cooper@example.com',
        password: '',
        confirmPassword: '',
        token: searchParams.get('token') || '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
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

        if (formData.password.length < 8) {
            setValidationError('Password must be at least 8 characters');
            return;
        }

        const result = await resetPassword(formData);
        if (result) {
            setSuccess(true);
        }
    };

    const displayError = validationError || error;

    if (success) {
        return (
            <AuthLayoutV1>
                <Card variant="elevated" className="shadow-xl">
                    <CardBody className="p-8 text-center">
                        <LockIcon />
                        <h1 className="text-2xl font-bold text-neutral-900 mb-4">
                            Password Reset Successful
                        </h1>
                        <p className="text-neutral-500 mb-6">
                            Your password has been reset successfully. You can now log in with your new password.
                        </p>
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => navigate('/auth/login')}
                            className="w-full bg-green-600 hover:bg-green-700"
                        >
                            Go to Login
                        </Button>
                    </CardBody>
                </Card>
            </AuthLayoutV1>
        );
    }

    return (
        <AuthLayoutV1>
            <Card variant="elevated" className="shadow-xl">
                <CardBody className="p-8">
                    {/* Lock Icon */}
                    <LockIcon />

                    {/* Header */}
                    <h1 className="text-2xl font-bold text-center text-neutral-900 mb-2">
                        Reset Your Password
                    </h1>

                    {/* Error Message */}
                    {displayError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                            {displayError}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5 mt-6">
                        {/* Email (readonly) */}
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
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg bg-neutral-50 text-neutral-600 outline-none"
                                readOnly
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
                                    placeholder="Enter new password"
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
                                    placeholder="Confirm new password"
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

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            loading={isLoading}
                            className="w-full bg-green-600 hover:bg-green-700"
                        >
                            Reset Password
                        </Button>
                    </form>

                    {/* Back to Login Link */}
                    <p className="text-center text-sm text-neutral-500 mt-6">
                        Go back to{' '}
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

export default ResetPasswordPageV1;
