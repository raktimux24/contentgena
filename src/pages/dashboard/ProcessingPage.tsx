import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';

interface FormData {
  topic: string;
  sources: string[];
}

interface ApiResponse {
  blog: string;
  tweet: string;
  linkedIn: string;
  blogTranslate: string;
}

interface LocationState {
  formData: FormData;
  result: ApiResponse;
}

export default function ProcessingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  useEffect(() => {
    if (!state?.formData || !state?.result) {
      console.log('Missing required data, redirecting to generate page');
      navigate('/dashboard/generate');
      return;
    }

    console.log('Processing data:', {
      formData: state.formData,
      result: state.result
    });

    // Short delay to show processing animation
    const timer = setTimeout(() => {
      console.log('Navigating to results with data:', state.result);
      navigate('/dashboard/generate/results', { 
        state: { 
          results: state.result,
          topic: state.formData.topic
        } 
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [state, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-black dark:text-white" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Processing your content...
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            This will only take a moment
          </p>
        </div>
      </main>
    </div>
  );
}