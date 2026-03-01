import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody } from '../../../design-system/components/atoms/Card';
import { Button } from '../../../design-system/components/atoms/Button';
import { AuthLayoutV1 } from '../layouts';
import { LockIcon } from '../components';
import { useAuthStore } from '../../../store/authStore';

const ForgotPasswordPageV1: React.FC = () => {
    const navigate = useNavigate();
    const { forgotPassword, isLoading, error, clearError } = useAuthStore();

    const [email, setEmail] = useState('cooper@example.com');
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (error) clearError();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await forgotPassword({ email });
        if (result) {
            setSuccess(true);
        }
    };

    if (success) {
        return (
            <AuthLayoutV1>
                <Card variant="elevated" className="shadow-xl">
                    <CardBody className="p-8 text-center">
                        <LockIcon />
                        <h1 className="text-2xl font-bold text-neutral-900 mb-4">
                            Check Your Email
                        </h1>
                        <p className="text-neutral-500 mb-6">
                            We've sent a password reset link to <strong>{email}</strong>
                        </p>
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => navigate('/auth/login')}
                            className="w-full bg-green-600 hover:bg-green-700"
                        >
                            Back to Login
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
                        Recover Your Password
                    </h1>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5 mt-6">
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
                                value={email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            loading={isLoading}
                            className="w-full bg-green-600 hover:bg-green-700"
                        >
                            Recover Password
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

export default ForgotPasswordPageV1;
