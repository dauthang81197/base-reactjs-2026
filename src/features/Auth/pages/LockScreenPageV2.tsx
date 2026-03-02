import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../design-system/components/atoms/Button';
import { Avatar } from '../../../design-system/components/atoms/Avatar';
import { AuthLayoutV2 } from '../layouts';
import { EyeIcon } from '../components';
import { useAuthStore } from '../../../store/authStore';

const LockScreenPageV2: React.FC = () => {
    const navigate = useNavigate();
    const { unlockScreen, lockedUser, isLoading, error, clearError } = useAuthStore();

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Default user if no locked user
    const user = lockedUser || {
        fullName: 'Ronald Robertson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        email: 'ronald@example.com',
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (error) clearError();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await unlockScreen(password);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <AuthLayoutV2>
            {/* Avatar */}
            <div className="flex justify-center mb-4">
                <Avatar
                    src={user.avatar}
                    name={user.fullName ?? undefined}
                    size="2xl"
                    className="ring-4 ring-[#e8a87c] ring-offset-2"
                />
            </div>

            {/* User Name */}
            <h1 className="text-xl font-bold text-center text-neutral-900 mb-1">
                {user.fullName}
            </h1>

            {/* Subtitle */}
            <p className="text-sm text-neutral-500 text-center mb-6">
                Enter your password to access the admin.
            </p>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
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
                            value={password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 pr-12 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                            placeholder="Enter your password"
                            required
                            autoFocus
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <EyeIcon
                                visible={showPassword}
                                onClick={() => setShowPassword(!showPassword)}
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
                    className="w-full bg-[#1d8348] hover:bg-[#186d3c] rounded-full"
                >
                    Unlock
                </Button>
            </form>

            {/* Not You Link */}
            <p className="text-center text-sm text-neutral-500 mt-6">
                Not you?{' '}
                <Link
                    to="/auth/login-v2"
                    className="text-green-600 hover:text-green-700 font-medium"
                >
                    Sign in
                </Link>
            </p>
        </AuthLayoutV2>
    );
};

export default LockScreenPageV2;
