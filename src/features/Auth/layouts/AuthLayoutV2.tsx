import React from 'react';

interface AuthLayoutV2Props {
    children: React.ReactNode;
}

/**
 * Isometric Illustration Component for Auth V2 Layout
 */
const AuthIllustration: React.FC = () => (
    <svg
        viewBox="0 0 500 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-lg mx-auto"
    >
        {/* Laptop */}
        <g transform="translate(100, 80)">
            {/* Laptop Screen */}
            <path
                d="M50 20 L250 20 L250 150 L50 150 Z"
                fill="#1a1a2e"
                stroke="#333"
                strokeWidth="2"
            />
            {/* Screen Content - Chart */}
            <path d="M70 130 L100 90 L130 110 L160 70 L190 100 L220 60" stroke="#f4c542" strokeWidth="3" fill="none" />
            <rect x="70" y="50" width="40" height="8" fill="#f4c542" rx="2" />
            <rect x="70" y="65" width="80" height="4" fill="#666" rx="2" />
            {/* Laptop Base */}
            <path
                d="M40 150 L260 150 L280 180 L20 180 Z"
                fill="#2d2d44"
            />
            {/* Keyboard */}
            <path d="M60 155 L240 155 L250 170 L50 170 Z" fill="#1a1a2e" />
        </g>

        {/* Gold Bars Stack */}
        <g transform="translate(30, 200)">
            <rect x="0" y="40" width="50" height="25" fill="#f4c542" rx="3" />
            <rect x="5" y="20" width="50" height="25" fill="#e6b635" rx="3" />
            <rect x="10" y="0" width="50" height="25" fill="#d4a62a" rx="3" />
        </g>

        {/* Documents */}
        <g transform="translate(300, 250)">
            <rect x="0" y="0" width="80" height="100" fill="white" rx="4" transform="rotate(-15)" />
            <rect x="10" y="15" width="50" height="4" fill="#ddd" rx="2" transform="rotate(-15)" />
            <rect x="10" y="25" width="40" height="4" fill="#ddd" rx="2" transform="rotate(-15)" />
            <rect x="10" y="35" width="55" height="4" fill="#ddd" rx="2" transform="rotate(-15)" />
        </g>

        {/* Person 1 - Standing near laptop */}
        <g transform="translate(200, 100)">
            {/* Head */}
            <circle cx="0" cy="-10" r="12" fill="#f5d0c5" />
            {/* Hair */}
            <path d="M-10 -18 Q0 -28 10 -18 Q12 -10 10 -8 L-10 -8 Q-12 -10 -10 -18" fill="#333" />
            {/* Body */}
            <rect x="-10" y="5" width="20" height="35" fill="white" rx="3" />
            {/* Legs */}
            <rect x="-8" y="40" width="6" height="30" fill="#333" />
            <rect x="2" y="40" width="6" height="30" fill="#333" />
        </g>

        {/* Person 2 - Woman with yellow skirt */}
        <g transform="translate(320, 180)">
            {/* Head */}
            <circle cx="0" cy="-10" r="12" fill="#f5d0c5" />
            {/* Hair */}
            <path d="M-12 -8 Q-15 -20 0 -24 Q15 -20 12 -8 L10 5 Q5 8 0 8 Q-5 8 -10 5 Z" fill="#1a1a2e" />
            {/* Body */}
            <rect x="-8" y="5" width="16" height="25" fill="white" rx="2" />
            {/* Skirt */}
            <path d="M-12 30 L12 30 L15 60 L-15 60 Z" fill="#f4c542" />
            {/* Legs */}
            <rect x="-6" y="60" width="4" height="20" fill="#f5d0c5" />
            <rect x="2" y="60" width="4" height="20" fill="#f5d0c5" />
        </g>

        {/* Person 3 - Working at laptop */}
        <g transform="translate(160, 50)">
            {/* Head */}
            <circle cx="0" cy="-5" r="10" fill="#f5d0c5" />
            {/* Hair */}
            <path d="M-8 -12 Q0 -18 8 -12 Q10 -8 8 -5 L-8 -5 Q-10 -8 -8 -12" fill="#1a1a2e" />
            {/* Body - sitting */}
            <rect x="-8" y="8" width="16" height="20" fill="white" rx="2" />
            {/* Legs */}
            <rect x="-6" y="28" width="12" height="8" fill="#444" />
        </g>

        {/* Person 4 - Left side discussing */}
        <g transform="translate(70, 230)">
            {/* Head */}
            <circle cx="0" cy="-8" r="10" fill="#f5d0c5" />
            {/* Body */}
            <rect x="-8" y="5" width="16" height="25" fill="white" rx="2" />
            {/* Arms */}
            <rect x="8" y="8" width="20" height="4" fill="#f5d0c5" transform="rotate(45)" />
            {/* Pants */}
            <rect x="-6" y="30" width="5" height="25" fill="#333" />
            <rect x="1" y="30" width="5" height="25" fill="#333" />
        </g>

        {/* Person 5 - Yellow shirt person */}
        <g transform="translate(120, 250)">
            {/* Head */}
            <circle cx="0" cy="-8" r="10" fill="#f5d0c5" />
            {/* Hair */}
            <ellipse cx="0" cy="-12" rx="10" ry="8" fill="#333" />
            {/* Body - Yellow */}
            <rect x="-8" y="5" width="16" height="25" fill="#f4c542" rx="2" />
            {/* Arms */}
            <rect x="-20" y="8" width="12" height="4" fill="#f5d0c5" />
            {/* Pants */}
            <rect x="-6" y="30" width="5" height="25" fill="#666" />
            <rect x="1" y="30" width="5" height="25" fill="#666" />
        </g>

        {/* Person 6 - Reading documents */}
        <g transform="translate(350, 300)">
            {/* Head */}
            <circle cx="0" cy="-8" r="10" fill="#f5d0c5" />
            {/* Body */}
            <rect x="-8" y="5" width="16" height="25" fill="white" rx="2" />
            {/* Arms holding paper */}
            <rect x="-15" y="8" width="8" height="4" fill="#f5d0c5" />
            {/* Pants */}
            <rect x="-6" y="30" width="5" height="25" fill="#1a1a2e" />
            <rect x="1" y="30" width="5" height="25" fill="#1a1a2e" />
        </g>

        {/* Microscope/Equipment */}
        <g transform="translate(80, 160)">
            <rect x="0" y="20" width="30" height="8" fill="#666" />
            <rect x="10" y="0" width="10" height="25" fill="#888" />
            <circle cx="15" cy="-5" r="8" fill="#999" stroke="#666" strokeWidth="2" />
        </g>
    </svg>
);

/**
 * Auth Layout V2 - Split layout with illustration
 * Used for: Login V2, Register V2, Forgot Password V2, Reset Password V2, Lock Screen V2
 */
export const AuthLayoutV2: React.FC<AuthLayoutV2Props> = ({ children }) => {
    return (
        <div className="min-h-screen flex">
            {/* Left side - Illustration */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#1d8348] items-center justify-center p-8">
                <AuthIllustration />
            </div>

            {/* Right side - Auth form */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayoutV2;
