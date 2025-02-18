import React, { useState } from 'react';
import { FileText, Copy, Trash2, CheckCheck, BookOpenCheck, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface ContentCardProps {
  type: 'blog' | 'twitter' | 'linkedin';
  title: string;
  date: string;
  id: string;
  status?: 'generated' | 'reviewed' | 'published';
}

const statusIcons = {
  generated: Lightbulb,
  reviewed: CheckCheck,
  published: BookOpenCheck
};

export default function ContentCard({ type, title, date, id, status = 'generated' }: ContentCardProps) {
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const StatusIcon = statusIcons[status] || Lightbulb;

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking copy
    try {
      await navigator.clipboard.writeText(title);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking delete
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        setIsDeleting(true);
        await deleteDoc(doc(db, 'generatedContent', id));
        // The parent component will handle the UI update through the Firestore listener
      } catch (error) {
        console.error('Error deleting content:', error);
        alert('Failed to delete content. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Link to={`/dashboard/content/${id}`} className="block">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border-4 border-black dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
              <StatusIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{date}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleCopy}
              disabled={copied}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors disabled:opacity-50"
            >
              {copied ? (
                <CheckCheck className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            <button 
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-md transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}