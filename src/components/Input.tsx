import React from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  helperText?: string;
  register?: UseFormRegisterReturn;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  register,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {props.required && <span className="text-danger-600">*</span>}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors ${
          error ? 'border-danger-500' : 'border-gray-300 dark:border-gray-600'
        } ${className}`}
        {...register}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-danger-600">{error.message}</p>}
      {helperText && !error && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>}
    </div>
  );
};


