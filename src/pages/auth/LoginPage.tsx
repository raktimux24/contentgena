import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthInput from '../../components/auth/AuthInput';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Failed to sign in');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back">
      <button
        onClick={() => navigate(-1)}
        className="group mb-8 font-bold flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-100 dark:bg-red-900/30 rounded-md">
            {error}
          </div>
        )}

        <AuthInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          disabled={loading}
        />

        <AuthInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          disabled={loading}
        />

        <div className="flex items-center justify-between text-sm">
          <Link 
            to="/auth/reset-password"
            className="font-bold hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-8 py-4 bg-black dark:bg-white text-white dark:text-black 
            font-bold rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 
            transform hover:-rotate-1 hover:scale-105 transition-transform
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p className="text-center text-sm">
          Don't have an account?{' '}
          <Link 
            to="/auth/register"
            className="font-bold hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}