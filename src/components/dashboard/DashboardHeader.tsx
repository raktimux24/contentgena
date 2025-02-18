import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import UserProfileMenu from './UserProfileMenu';
import ContentAILogo from '../../../public/ContentAI_byKarao.svg';
import ContentAILogoLight from '../../../public/ContentAI_byKarao_Light.svg';

const navigation = [
  { name: 'Overview', href: '/dashboard' },
  { name: 'Generate', href: '/dashboard/generate' },
  { name: 'Content History', href: '/dashboard/content' },
  { name: 'Settings', href: '/dashboard/settings' }
];

export default function DashboardHeader() {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b-4 border-black dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center">
            <img 
              src={isDark ? ContentAILogo : ContentAILogoLight} 
              alt="Content.AI Logo" 
              className="h-8" 
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-bold hover:text-indigo-600 dark:hover:text-indigo-400 ${
                  location.pathname === item.href
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <UserProfileMenu
              user={{
                name: user?.displayName || 'User',
                email: user?.email || '',
                avatarUrl: user?.photoURL || undefined
              }}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </div>
    </header>
  );
}