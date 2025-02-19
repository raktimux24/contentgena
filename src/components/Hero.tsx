import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative h-[100vh] pt-48 pb-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gray-100 dark:bg-gray-800 transform -skew-x-12" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-black leading-tight mb-6 transform -rotate-1">
            Transform Your Ideas into
            <span className="block text-indigo-600 dark:text-indigo-400">
              Powerful Content
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 transform rotate-1">
            Generate blogs, tweet threads, and LinkedIn posts in one click.
            Powered by advanced AI to create engaging content that resonates.
          </p>

          <div className="flex gap-4 items-center">
            <Link
              to="/auth/register"
              className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors transform hover:-rotate-1 hover:scale-105"
            >
              Get Started Free
            </Link>
            <a href="#features" className="group flex items-center gap-2 font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
              See how it works
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}