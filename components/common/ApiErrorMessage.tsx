import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

interface ApiErrorMessageProps {
  message: string | null;
}

const ApiErrorMessage: React.FC<ApiErrorMessageProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg relative flex items-center gap-3 text-sm">
      <FiAlertTriangle className="w-5 h-5 flex-shrink-0" />
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ApiErrorMessage;