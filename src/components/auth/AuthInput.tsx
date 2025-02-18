import React from 'react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function AuthInput({ label, error, ...props }: AuthInputProps) {
  return (
    <div className="space-y-2">
      <label className="block font-bold">
        {label}
      </label>
      <input
        {...props}
        className={`w-full px-4 py-3 border-2 border-black dark:border-gray-700 rounded-md 
          bg-gray-50 dark:bg-gray-900 
          focus:outline-none focus:ring-2 focus:ring-indigo-500 
          transform hover:-rotate-1 transition-transform
          ${error ? 'border-red-500 dark:border-red-500' : ''}`}
      />
      {error && (
        <p className="text-red-500 text-sm font-medium">{error}</p>
      )}
    </div>
  );
}