import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { collection, query, orderBy, getDocs, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import ContentCard from '../../components/dashboard/ContentCard';

interface GeneratedContent {
  id: string;
  type: 'blog' | 'twitter' | 'linkedin';
  title: string;
  content: string;
  createdAt: Date;
  status: 'generated' | 'reviewed' | 'published';
}

export default function ContentHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [contents, setContents] = useState<GeneratedContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const contentsRef = collection(db, 'generatedContent');
        const q = query(contentsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const fetchedContents: GeneratedContent[] = [];
        
        // Update documents without IDs and fetch all contents
        const updatePromises = querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          if (!data.id) {
            // Update document with its ID if it doesn't have one
            await updateDoc(doc.ref, { id: doc.id });
          }
          
          // Handle different date formats
          let createdAt: Date;
          if (data.createdAt?.seconds) {
            // Handle Firestore Timestamp
            createdAt = new Date(data.createdAt.seconds * 1000);
          } else if (typeof data.createdAt === 'string') {
            // Handle ISO string
            createdAt = new Date(data.createdAt);
          } else {
            // Default to current date if no valid date found
            createdAt = new Date();
          }
          
          fetchedContents.push({
            id: doc.id,
            type: determineContentType(data),
            title: data.topic || 'Untitled',
            content: data.blog || data.tweet || data.linkedIn || '',
            createdAt,
            status: data.status || 'generated'
          });
        });
        
        await Promise.all(updatePromises);
        setContents(fetchedContents);
      } catch (error) {
        console.error('Error fetching contents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  const determineContentType = (data: any): 'blog' | 'twitter' | 'linkedin' => {
    if (data.tweet) return 'twitter';
    if (data.linkedIn) return 'linkedin';
    return 'blog';
  };

  const filteredContents = contents.filter(content =>
    content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    content.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-black mb-8 transform -rotate-1">Content History</h1>
            
            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-700 
                    rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Content List */}
          <div className="grid gap-6">
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : filteredContents.length > 0 ? (
              filteredContents.map((content) => (
                <ContentCard
                  key={content.id}
                  id={content.id}
                  type={content.type}
                  title={content.title}
                  date={content.createdAt.toLocaleDateString()}
                  status={content.status}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No content found
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}