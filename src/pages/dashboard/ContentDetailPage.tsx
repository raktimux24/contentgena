import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, ExternalLink, Trash2, FileText, Twitter, Linkedin, CheckCheck } from 'lucide-react';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import ReactMarkdown from 'react-markdown';

// Custom components for markdown rendering
const MarkdownComponents = {
  h1: ({ ...props }) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props} />
  ),
  h2: ({ ...props }) => (
    <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-800 dark:text-gray-100" {...props} />
  ),
  h3: ({ ...props }) => (
    <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-100" {...props} />
  ),
  p: ({ ...props }) => (
    <p className="text-base leading-relaxed mb-4 text-gray-700 dark:text-gray-300" {...props} />
  ),
  ul: ({ ...props }) => (
    <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
  ),
  ol: ({ ...props }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />
  ),
  li: ({ ...props }) => (
    <li className="text-gray-700 dark:text-gray-300" {...props} />
  ),
  blockquote: ({ ...props }) => (
    <blockquote 
      className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 italic text-gray-600 dark:text-gray-400" 
      {...props} 
    />
  ),
  a: ({ ...props }) => (
    <a 
      className="text-blue-600 dark:text-blue-400 hover:underline" 
      target="_blank"
      rel="noopener noreferrer"
      {...props} 
    />
  ),
  code: ({ inline, ...props }) => (
    inline ? 
      <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono" {...props} /> :
      <code className="block bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm font-mono overflow-x-auto my-4" {...props} />
  ),
  pre: ({ ...props }) => (
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4" {...props} />
  ),
  hr: ({ ...props }) => (
    <hr className="my-8 border-gray-300 dark:border-gray-600" {...props} />
  ),
  img: ({ alt, ...props }) => (
    <img className="max-w-full h-auto rounded-lg my-4" alt={alt || ''} {...props} />
  ),
  table: ({ ...props }) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600" {...props} />
    </div>
  ),
  th: ({ ...props }) => (
    <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 font-semibold text-left" {...props} />
  ),
  td: ({ ...props }) => (
    <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700" {...props} />
  ),
};

type ContentType = 'blog' | 'twitter' | 'linkedin' | 'blogTranslate';

interface ContentData {
  topic: string;
  blog: string;
  tweet: string;
  linkedIn: string;
  blogTranslate: string;
  createdAt: any;
  status: 'generated' | 'reviewed' | 'published';
  publishedAt?: any;
}

interface TabProps {
  type: ContentType;
  isActive: boolean;
  onClick: () => void;
  icon: typeof FileText;
  label: string;
}

function Tab({ type, isActive, onClick, icon: Icon, label }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 font-bold rounded-t-lg transition-colors text-sm sm:text-base whitespace-nowrap
        ${isActive 
          ? 'bg-white dark:bg-gray-800 text-black dark:text-white border-4 border-b-0 border-black dark:border-gray-700' 
          : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
    >
      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      {label}
    </button>
  );
}

export default function ContentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ContentType>('blog');
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [publishDate, setPublishDate] = useState<string>('');

  useEffect(() => {
    const fetchContent = async () => {
      if (!id) return;
      
      try {
        const docRef = doc(db, 'generatedContent', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data() as ContentData;
          setContent(data);
          
          // Set initial active tab based on available content
          if (data.tweet) setActiveTab('twitter');
          else if (data.linkedIn) setActiveTab('linkedin');
          else if (data.blogTranslate) setActiveTab('blogTranslate');
          else setActiveTab('blog');
        } else {
          setError('Content not found');
        }
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this content?')) return;

    try {
      await deleteDoc(doc(db, 'generatedContent', id));
      navigate('/dashboard/content');
    } catch (error) {
      console.error('Error deleting content:', error);
      alert('Failed to delete content. Please try again.');
    }
  };

  const handleCopy = async () => {
    if (!content) return;

    try {
      const contentToCopy = activeTab === 'twitter' 
        ? content.tweet
        : activeTab === 'linkedin'
          ? content.linkedIn
          : activeTab === 'blogTranslate'
            ? content.blogTranslate
            : content.blog;

      await navigator.clipboard.writeText(contentToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleStatusChange = async (newStatus: 'generated' | 'reviewed' | 'published') => {
    if (!id || !content) return;

    try {
      const docRef = doc(db, 'generatedContent', id);
      const updateData: Partial<ContentData> = { status: newStatus };

      if (newStatus === 'published') {
        setShowDatePicker(true);
      } else {
        await updateDoc(docRef, updateData);
        setContent({ ...content, ...updateData });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  const handlePublishDateConfirm = async () => {
    if (!id || !content || !publishDate) return;

    try {
      const docRef = doc(db, 'generatedContent', id);
      const updateData = {
        status: 'published',
        publishedAt: new Date(publishDate)
      };

      await updateDoc(docRef, updateData);
      setContent({ ...content, ...updateData });
      setShowDatePicker(false);
    } catch (error) {
      console.error('Error updating publish date:', error);
      alert('Failed to update publish date. Please try again.');
    }
  };

  const formatDate = (date: any) => {
    if (!date) return '';
    
    try {
      if (date?.seconds) {
        return new Date(date.seconds * 1000).toLocaleDateString();
      }
      if (typeof date === 'string') {
        return new Date(date).toLocaleDateString();
      }
      return new Date().toLocaleDateString();
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  const tabs = [
    { type: 'blog' as const, icon: FileText, label: 'Blog Post' },
    { type: 'twitter' as const, icon: Twitter, label: 'Tweet Thread' },
    { type: 'linkedin' as const, icon: Linkedin, label: 'LinkedIn Post' },
    { type: 'blogTranslate' as const, icon: FileText, label: 'Translated Blog' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardHeader />
        <main className="pt-20 sm:pt-24 pb-8 sm:pb-12 px-3 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardHeader />
        <main className="pt-20 sm:pt-24 pb-8 sm:pb-12 px-3 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              {error || 'Content not found'}
            </h1>
            <button
              onClick={() => navigate('/dashboard/content')}
              className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
            >
              Return to Content History
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      
      <main className="pt-20 sm:pt-24 pb-8 sm:pb-12 px-3 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="group mb-6 sm:mb-8 font-bold flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm sm:text-base">Back to Content History</span>
          </button>

          {/* Title Section */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-black mb-2 transform -rotate-1">
              {content.topic}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Created: {formatDate(content.createdAt)}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Status: {content.status}
            </p>
            {content.status === 'published' && content.publishedAt && (
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Published: {formatDate(content.publishedAt)}
              </p>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 sm:gap-2 mb-[-4px] overflow-x-auto pb-1 scrollbar-hide">
            {tabs.map((tab) => (
              <Tab
                key={tab.type}
                type={tab.type}
                isActive={activeTab === tab.type}
                onClick={() => setActiveTab(tab.type)}
                icon={tab.icon}
                label={tab.label}
              />
            ))}
          </div>

          {/* Content Container */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border-4 border-black dark:border-gray-700">
            {/* Action Toolbar */}
            <div className="p-2 sm:p-4 border-b-4 border-black dark:border-gray-700 flex flex-wrap sm:flex-nowrap items-center justify-end gap-2">
              <select
                value={content.status || 'generated'}
                onChange={(e) => handleStatusChange(e.target.value as 'generated' | 'reviewed' | 'published')}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="generated">Generated</option>
                <option value="reviewed">Reviewed</option>
                <option value="published">Published</option>
              </select>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  disabled={copied}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors disabled:opacity-50"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <CheckCheck className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-md transition-colors"
                  title="Delete content"
                >
                  <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4 sm:p-8">
              <div className="prose dark:prose-invert max-w-none prose-sm sm:prose-base">
                {activeTab === 'twitter' ? (
                  <div className="space-y-3 sm:space-y-4">
                    {content.tweet.split('\n').map((tweet, index) => (
                      tweet.trim() && (
                        <div
                          key={index}
                          className="p-3 sm:p-4 text-sm sm:text-base bg-gray-50 dark:bg-gray-900 rounded-md"
                        >
                          {tweet}
                        </div>
                      )
                    ))}
                  </div>
                ) : (
                  <ReactMarkdown components={MarkdownComponents}>
                    {activeTab === 'linkedin' 
                      ? content.linkedIn 
                      : activeTab === 'blogTranslate' 
                        ? content.blogTranslate 
                        : content.blog}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      {showDatePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Select Publish Date</h3>
            <input
              type="datetime-local"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-4"
            />
            <div className="flex justify-end gap-3 sm:gap-4">
              <button
                onClick={() => setShowDatePicker(false)}
                className="px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handlePublishDateConfirm}
                className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
                disabled={!publishDate}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}