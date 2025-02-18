import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthInput from '../../components/auth/AuthInput';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password reset logic
  };

  return (
    <AuthLayout title="Reset Password">
      <button
        onClick={() => navigate(-1)}
        className="group mb-8 font-bold flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      <div className="text-center mb-8">
        <p className="text-gray-600 dark:text-gray-300">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <AuthInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
        />

        <button
          type="submit"
          className="w-full px-8 py-4 bg-black dark:bg-white text-white dark:text-black 
            font-bold rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 
            transform hover:-rotate-1 hover:scale-105 transition-transform"
        >
          Send Reset Link
        </button>

        <p className="text-center text-sm">
          Remember your password?{' '}
          <Link 
            to="/auth/login"
            className="font-bold hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}