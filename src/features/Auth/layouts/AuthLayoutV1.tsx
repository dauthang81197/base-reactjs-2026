import React from 'react';

interface AuthLayoutV1Props {
    children: React.ReactNode;
}

/**
 * Auth Layout V1 - Simple centered layout
 * Used for: Login V1, Register V1, Forgot Password V1, Reset Password V1, Lock Screen V1
 */
export const AuthLayoutV1: React.FC<AuthLayoutV1Props> = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#e8edf2] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {children}
            </div>
        </div>
    );
};

export default AuthLayoutV1;
