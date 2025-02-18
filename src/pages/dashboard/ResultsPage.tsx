import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Copy, CheckCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface ApiResponse {
  blog: string;
  tweet: string;
  linkedIn: string;
  blogTranslate: string;
}

interface LocationState {
  results: ApiResponse;
  topic: string;
}

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

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [hasBeenSaved, setHasBeenSaved] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  console.log('ResultsPage - Location State:', state);

  if (!state?.results) {
    console.log('No results found, redirecting to generate page');
    navigate('/dashboard/generate');
    return null;
  }

  const { results, topic } = state;

  // Function to format tweet thread
  const formatTweetThread = (tweet: string) => {
    if (!tweet) return [];
    try {
      // Split by newlines and filter out empty tweets
      return tweet.split('\n').filter(t => t.trim().length > 0);
    } catch (error) {
      console.error('Error formatting tweet thread:', error);
      return [];
    }
  };

  const tweetThread = formatTweetThread(results.tweet);

  const copyToClipboard = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSaveSuccess(false);
      
      const docId = `${topic}-${Date.now()}`;
      await setDoc(doc(db, 'generatedContent', docId), {
        topic,
        blog: results.blog,
        tweet: results.tweet,
        linkedIn: results.linkedIn,
        blogTranslate: results.blogTranslate,
        createdAt: serverTimestamp(),
      });

      setSaveSuccess(true);
      setHasBeenSaved(true);
      setTimeout(() => setSaveSuccess(false), 3000); // Reset success message after 3 seconds
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save content. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => navigate(-1)}
              className="group font-bold flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving || hasBeenSaved}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                ${isSaving || saveSuccess 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                  : hasBeenSaved
                    ? 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                    : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : hasBeenSaved ? 'Already Saved' : 'Save Content'}
            </button>
          </div>

          <div className="space-y-8">
            <h1 className="text-3xl font-black transform -rotate-1">
              Generated Content for: {topic}
            </h1>

            {/* Blog Post */}
            {results.blog && (
              <section className="bg-white dark:bg-gray-800 p-8 rounded-lg border-4 border-black dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Blog Post</h2>
                  <button
                    onClick={() => copyToClipboard(results.blog, 'blog')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {copiedSection === 'blog' ? (
                      <CheckCheck className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {copiedSection === 'blog' ? 'Copied!' : 'Copy'}
                    </span>
                  </button>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <ReactMarkdown components={MarkdownComponents}>
                    {results.blog}
                  </ReactMarkdown>
                </div>
              </section>
            )}

            {/* Tweet Thread */}
            {tweetThread.length > 0 && (
              <section className="bg-white dark:bg-gray-800 p-8 rounded-lg border-4 border-black dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Tweet Thread</h2>
                  <button
                    onClick={() => copyToClipboard(results.tweet, 'tweet')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {copiedSection === 'tweet' ? (
                      <CheckCheck className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {copiedSection === 'tweet' ? 'Copied!' : 'Copy'}
                    </span>
                  </button>
                </div>
                <div className="space-y-4">
                  {tweetThread.map((tweet, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                    >
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        Tweet {index + 1}
                      </p>
                      <p className="text-gray-900 dark:text-gray-100">{tweet}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* LinkedIn Post */}
            {results.linkedIn && (
              <section className="bg-white dark:bg-gray-800 p-8 rounded-lg border-4 border-black dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">LinkedIn Post</h2>
                  <button
                    onClick={() => copyToClipboard(results.linkedIn, 'linkedin')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {copiedSection === 'linkedin' ? (
                      <CheckCheck className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {copiedSection === 'linkedin' ? 'Copied!' : 'Copy'}
                    </span>
                  </button>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <ReactMarkdown components={MarkdownComponents}>
                    {results.linkedIn}
                  </ReactMarkdown>
                </div>
              </section>
            )}

            {/* Translated Blog Post */}
            {results.blogTranslate && (
              <section className="bg-white dark:bg-gray-800 p-8 rounded-lg border-4 border-black dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Translated Blog Post</h2>
                  <button
                    onClick={() => copyToClipboard(results.blogTranslate, 'translated')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {copiedSection === 'translated' ? (
                      <CheckCheck className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {copiedSection === 'translated' ? 'Copied!' : 'Copy'}
                    </span>
                  </button>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <article className="space-y-6">
                    <header className="mb-8">
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {topic} - Translated Version
                      </h1>
                    </header>
                    <ReactMarkdown 
                      components={{
                        ...MarkdownComponents,
                        h2: ({ ...props }) => (
                          <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-100 border-b pb-2 border-gray-200 dark:border-gray-700" {...props} />
                        ),
                        section: ({ ...props }) => (
                          <section className="mb-8 space-y-4" {...props} />
                        )
                      }}
                    >
                      {results.blogTranslate}
                    </ReactMarkdown>
                  </article>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}