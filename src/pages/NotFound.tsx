import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#e8edf2] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-lg w-full text-center">
        {/* Stylized 404 */}
        <div className="mb-6">
          <h1 className="text-[120px] font-bold text-green-600 leading-none tracking-wider">
            <span className="inline-block">4</span>
            <span className="inline-block relative">
              <span className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-green-600"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                >
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" />
                  <circle cx="35" cy="40" r="6" />
                  <circle cx="65" cy="40" r="6" />
                  <path
                    d="M35 65 Q50 55 65 65"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="opacity-0">0</span>
            </span>
            <span className="inline-block">4</span>
          </h1>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          We can't seem to find that
        </h2>
        <p className="text-neutral-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

