import React, { useState } from 'react';
import { Menu, Moon, Sun, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import ContentAILogo from '../../public/ContentAI_byKarao.svg';
import ContentAILogoLight from '../../public/ContentAI_byKarao_Light.svg';

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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src={isDark ? ContentAILogo : ContentAILogoLight} 
                alt="Content.AI Logo" 
                className="h-6 sm:h-8" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link to="/" className="font-bold hover:underline text-sm lg:text-base">Home</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="font-bold hover:underline text-sm lg:text-base">Dashboard</Link>
                <Link to="/profile" className="font-bold hover:underline text-sm lg:text-base">Profile</Link>
              </>
            ) : (
              <>
                <a href="/#features" className="font-bold hover:underline text-sm lg:text-base">Features</a>
                <a href="/#about" className="font-bold hover:underline text-sm lg:text-base">About</a>
                <a href="/#contact" className="font-bold hover:underline text-sm lg:text-base">Contact</a>
              </>
            )}
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-2 px-4 sm:px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm lg:text-base"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link 
                to="/auth/login"
                className="hidden sm:block px-4 sm:px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm lg:text-base"
              >
                Login
              </Link>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5 sm:w-6 sm:h-6" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
            <button
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t-2 border-black dark:border-gray-700">
          <nav className="flex flex-col px-3 py-2 space-y-2 bg-white dark:bg-gray-900">
            <Link 
              to="/" 
              className="py-2 px-2 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="py-2 px-2 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="py-2 px-2 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <a 
                  href="/#features" 
                  className="py-2 px-2 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="/#about" 
                  className="py-2 px-2 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
                <a 
                  href="/#contact" 
                  className="py-2 px-2 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
                <Link
                  to="/auth/login"
                  className="w-full px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm"
                  onClick={() => setIsMenuOpen(false)}
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