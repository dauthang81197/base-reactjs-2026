import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

interface AlertProps {
  type?: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  onClose?: () => void;
}

const alertIcons = {
  success: <CheckCircle className="w-5 h-5 text-success-600" />,
  error: <AlertCircle className="w-5 h-5 text-danger-600" />,
  info: <Info className="w-5 h-5 text-primary-600" />,
  warning: <AlertTriangle className="w-5 h-5 text-warning-600" />,
};

const alertBgClasses = {
  success: 'bg-success-50 border-success-200',
  error: 'bg-danger-50 border-danger-200',
  info: 'bg-primary-50 border-primary-200',
  warning: 'bg-warning-50 border-warning-200',
};

const alertTextClasses = {
  success: 'text-success-800',
  error: 'text-danger-800',
  info: 'text-primary-800',
  warning: 'text-warning-800',
};

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  message,
  onClose,
}) => {
  return (
    <div className={`border rounded-lg p-4 flex gap-3 ${alertBgClasses[type]}`}>
      <div className="flex-shrink-0">{alertIcons[type]}</div>
      <div className="flex-grow">
        {title && <h3 className={`font-semibold ${alertTextClasses[type]}`}>{title}</h3>}
        <p className={alertTextClasses[type]}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-500 hover:text-gray-700 dark:text-gray-400"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

