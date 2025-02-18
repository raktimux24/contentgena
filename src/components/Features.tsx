import React from 'react';
import { BookOpen, Twitter, Linkedin } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Blog Generation',
    description: 'Create comprehensive blog posts powered by Gemini AI, transforming your ideas into well-structured content.'
  },
  {
    icon: Twitter,
    title: 'Tweet Threads',
    description: 'Convert your content into engaging tweet threads that capture attention and drive engagement.'
  },
  {
    icon: Linkedin,
    title: 'LinkedIn Posts',
    description: 'Generate professional LinkedIn posts that establish your authority and reach your network.'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 transform -rotate-1">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transform rotate-1">
            One platform, multiple content formats. Save time and maintain consistency across all your channels.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-8 bg-white dark:bg-gray-800 rounded-lg border-4 border-black dark:border-gray-700 transform hover:-rotate-1 hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg p-2 mb-6">
                  <Icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}