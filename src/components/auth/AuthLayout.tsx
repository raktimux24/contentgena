import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        {/* Logo */}
        <div>
          <Link to="/" className="flex justify-center">
            <h1 className="text-2xl font-black tracking-tight">CONTENT.AI</h1>
          </Link>
        </div>

        {/* Auth Container */}
        <div className="bg-white dark:bg-gray-800 p-8 border-4 border-black dark:border-gray-700 rounded-lg transform hover:-rotate-1 transition-transform">
          <h2 className="text-3xl font-black text-center mb-8 transform rotate-1">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
}