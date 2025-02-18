import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
}

export default function StatCard({ title, value, icon: Icon, description }: StatCardProps) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border-4 border-black dark:border-gray-700 transform hover:-rotate-1 hover:scale-105 transition-transform">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-black">{value}</p>
          {description && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{description}</p>
          )}
        </div>
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
          <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>
    </div>
  );
}