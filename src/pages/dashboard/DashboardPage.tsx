import React, { useState, useEffect } from 'react';
import { FileText, CheckCheck, BookOpenCheck, BookDashed, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import StatCard from '../../components/dashboard/StatCard';
import ContentCard from '../../components/dashboard/ContentCard';

interface GeneratedContent {
  id: string;
  type: 'blog' | 'twitter' | 'linkedin';
  title: string;
  createdAt: Date;
  status: 'generated' | 'reviewed' | 'published';
}

interface ContentStats {
  total: number;
  reviewed: number;
  published: number;
}

export default function DashboardPage() {
  const [recentContent, setRecentContent] = useState<GeneratedContent[]>([]);
  const [stats, setStats] = useState<ContentStats>({
    total: 0,
    reviewed: 0,
    published: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contentsRef = collection(db, 'generatedContent');
        const q = query(contentsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const fetchedContents: GeneratedContent[] = [];
        let totalCount = 0;
        let reviewedCount = 0;
        let publishedCount = 0;
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          totalCount++;
          
          if (data.status === 'reviewed') {
            reviewedCount++;
          }
          if (data.status === 'published') {
            publishedCount++;
          }

          // Only add to recent content if it's one of the first 5
          if (fetchedContents.length < 5) {
            const type = data.tweet ? 'twitter' : data.linkedIn ? 'linkedin' : 'blog';
            
            // Handle different date formats
            let createdAt: Date;
            if (data.createdAt?.seconds) {
              createdAt = new Date(data.createdAt.seconds * 1000);
            } else if (typeof data.createdAt === 'string') {
              createdAt = new Date(data.createdAt);
            } else {
              createdAt = new Date();
            }
            
            fetchedContents.push({
              id: doc.id,
              type,
              title: data.topic || 'Untitled',
              createdAt,
              status: data.status || 'generated'
            });
          }
        });
        
        setRecentContent(fetchedContents);
        setStats({
          total: totalCount,
          reviewed: reviewedCount,
          published: publishedCount
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statsCards = [
    { title: 'Total Contents', value: stats.total, icon: BookDashed, description: 'All generated content' },
    { title: 'Reviewed', value: stats.reviewed, icon: CheckCheck, description: 'Content reviewed by editors' },
    { title: 'Published', value: stats.published, icon: BookOpenCheck, description: 'Content live on platforms' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-black transform -rotate-1">Dashboard</h1>
            <Link
              to="/dashboard/generate"
              className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black 
                font-bold rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 
                transform hover:-rotate-1 hover:scale-105 transition-transform"
            >
              <Plus className="w-5 h-5" />
              New Content
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {loading ? (
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="h-32 bg-white dark:bg-gray-800 rounded-lg border-4 border-black dark:border-gray-700 animate-pulse" />
              ))
            ) : (
              statsCards.map((stat) => (
                <StatCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  description={stat.description}
                />
              ))
            )}
          </div>

          {/* Recent Content */}
          <div>
            <h2 className="text-2xl font-bold mb-6 transform rotate-1">Recent Content</h2>
            <div className="grid gap-6">
              {loading ? (
                <div className="h-24 bg-white dark:bg-gray-800 rounded-lg border-4 border-black dark:border-gray-700 animate-pulse" />
              ) : recentContent.length > 0 ? (
                recentContent.map((content) => (
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
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">No content generated yet</p>
                  <Link
                    to="/dashboard/generate"
                    className="inline-flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Create your first content
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}