import React from 'react';

const testimonials = [
  {
    quote: "This app has revolutionized my content creation process. What used to take hours now takes minutes!",
    author: "Sarah Johnson",
    role: "Content Creator",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150"
  },
  {
    quote: "The AI-generated content is surprisingly good and saves me tons of time on social media management.",
    author: "Michael Chen",
    role: "Digital Marketer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150"
  },
  {
    quote: "A game-changer for my content strategy. The multi-platform approach is exactly what I needed.",
    author: "Emma Rodriguez",
    role: "Startup Founder",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-black text-center mb-16 transform -rotate-1">
          What Users Are Saying
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 bg-gray-50 dark:bg-gray-800 rounded-lg border-4 border-black dark:border-gray-700 transform hover:rotate-1 transition-transform"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full border-2 border-black dark:border-gray-700"
                />
                <div className="ml-4">
                  <h3 className="font-bold">{testimonial.author}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}