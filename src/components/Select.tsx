import React from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: FieldError;
  options: Array<{ value: string | number; label: string }>;
  register?: UseFormRegisterReturn;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
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
      <select
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors ${
          error ? 'border-danger-500' : 'border-gray-300 dark:border-gray-600'
        } ${className}`}
        {...register}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-danger-600">{error.message}</p>}
    </div>
  );
};


