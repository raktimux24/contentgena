import React, { useState } from 'react';
import { Menu, Moon, Sun, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname.startsWith('/auth');
  const user = auth.currentUser;

  if (isAuthPage) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b-4 border-black dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-black tracking-tight">CONTENT.AI</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="font-bold hover:underline">Home</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="font-bold hover:underline">Dashboard</Link>
                <Link to="/profile" className="font-bold hover:underline">Profile</Link>
              </>
            ) : (
              <>
                <a href="/#features" className="font-bold hover:underline">Features</a>
                <a href="/#about" className="font-bold hover:underline">About</a>
                <a href="/#contact" className="font-bold hover:underline">Contact</a>
              </>
            )}
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <Link 
                to="/auth/login"
                className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            >
              {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
            <button
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t-2 border-black dark:border-gray-700">
          <nav className="flex flex-col px-4 py-2 space-y-2 bg-white dark:bg-gray-900">
            <Link to="/" className="py-2 font-bold hover:underline">Home</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="py-2 font-bold hover:underline">Dashboard</Link>
                <Link to="/profile" className="py-2 font-bold hover:underline">Profile</Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/#features" className="py-2 font-bold hover:underline">Features</a>
                <a href="/#about" className="py-2 font-bold hover:underline">About</a>
                <a href="/#contact" className="py-2 font-bold hover:underline">Contact</a>
                <Link
                  to="/auth/login"
                  className="w-full px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}