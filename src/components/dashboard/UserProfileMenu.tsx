import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Settings } from 'lucide-react';

interface UserProfileMenuProps {
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  onLogout: () => void;
}

export default function UserProfileMenu({ 
  user = {
    name: 'John Doe',
    email: 'john@example.com'
  },
  onLogout 
}: UserProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 rounded-full border-2 border-black dark:border-gray-700 overflow-hidden
          hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-controls="user-menu"
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <User className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </div>
        )}
      </button>

      {isOpen && (
        <div
          id="user-menu"
          role="menu"
          className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-700 
            rounded-lg shadow-lg transform -rotate-1 origin-top-right
            animate-in fade-in slide-in-from-top-5 duration-200"
          onKeyDown={handleKeyDown}
        >
          {/* User Info */}
          <div className="p-4 border-b-4 border-black dark:border-gray-700">
            <p className="font-bold text-lg">{user.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <Link
              to="/dashboard/settings"
              role="menuitem"
              className="flex items-center gap-3 w-full p-2 text-left font-bold rounded-md
                hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-5 h-5" />
              Settings
            </Link>
            <button
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="flex items-center gap-3 w-full p-2 text-left font-bold rounded-md text-red-600 dark:text-red-400
                hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}