import React from 'react';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ContentAILogo from '../../public/ContentAI_byKarao.svg';
import ContentAILogoLight from '../../public/ContentAI_byKarao_Light.svg';

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t-4 border-black dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <img 
              src={isDark ? ContentAILogo : ContentAILogoLight}
              alt="Content.AI Logo"
              className="h-8 mb-4"
            />
            <p className="text-gray-600 dark:text-gray-300">
              Transform your ideas into powerful content across multiple platforms.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">Home</a></li>
              <li><a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">Features</a></li>
              <li><a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">About</a></li>
              <li><a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-300">
            {new Date().getFullYear()} Content.AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}