import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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

async function callEndpoint(topic: string, urlSource2: string, urlSource3: string, urlSource1: string): Promise<ApiResponse> {
  const url = 'https://drmefd.buildship.run/form-submit';
  const data = {
    topic: topic,
    urlSource2: urlSource2,
    urlSource3: urlSource3,
    urlSource1: urlSource1
  };

  console.log('Sending request with data:', data);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawResult = await response.json();
    console.log('Raw API Response:', rawResult);

    // Extract the needed fields from the API response
    const result: ApiResponse = {
      blog: rawResult.blog || '',
      tweet: rawResult.tweet || '',
      linkedIn: rawResult.linkedIn || '',
      blogTranslate: rawResult.blogTranslate || ''
    };

    console.log('Processed API Response:', result);
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export default function GenerateContentPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    sources: ['', '', '']
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.topic.trim()) {
      newErrors.topic = 'Topic is required';
    }

    // Validate URLs if provided
    formData.sources.forEach((url, index) => {
      if (url.trim() && !url.match(/^https?:\/\/.+/)) {
        newErrors[`source${index}`] = 'Please enter a valid URL';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const result = await callEndpoint(
          formData.topic,
          formData.sources[1] || '', // urlSource2
          formData.sources[2] || '', // urlSource3
          formData.sources[0] || ''  // urlSource1
        );
        
        console.log('API call successful, navigating to processing with result:', result);
        
        // Navigate to processing page with the result
        navigate('/dashboard/generate/processing', { 
          state: { 
            formData,
            result
          } 
        });
      } catch (error) {
        console.error('Error in handleSubmit:', error);
        setErrors({ api: 'Failed to submit form. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="group mb-8 font-bold flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border-4 border-black dark:border-gray-700">
            <h1 className="text-3xl font-black mb-8 transform -rotate-1">
              Generate Content
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Topic Input */}
              <div className="space-y-2">
                <label className="block font-bold">Topic</label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 
                    ${errors.topic ? 'border-red-500' : 'border-black dark:border-gray-700'} 
                    rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  placeholder="Enter your content topic"
                  disabled={isLoading}
                />
                {errors.topic && (
                  <p className="text-red-500 text-sm">{errors.topic}</p>
                )}
              </div>

              {/* URL Sources */}
              {formData.sources.map((source, index) => (
                <div key={index} className="space-y-2">
                  <label className="block font-bold">URL Source {index + 1}</label>
                  <input
                    type="url"
                    value={source}
                    onChange={(e) => {
                      const newSources = [...formData.sources];
                      newSources[index] = e.target.value;
                      setFormData({ ...formData, sources: newSources });
                    }}
                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 
                      ${errors[`source${index}`] ? 'border-red-500' : 'border-black dark:border-gray-700'} 
                      rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    placeholder="https://example.com"
                    disabled={isLoading}
                  />
                  {errors[`source${index}`] && (
                    <p className="text-red-500 text-sm">{errors[`source${index}`]}</p>
                  )}
                </div>
              ))}

              {errors.api && (
                <p className="text-red-500 text-sm">{errors.api}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full px-8 py-4 bg-black dark:bg-white text-white dark:text-black 
                  font-bold rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 
                  transform hover:-rotate-1 hover:scale-105 transition-transform
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Generating...' : 'Generate Content'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}