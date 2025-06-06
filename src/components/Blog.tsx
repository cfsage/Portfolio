import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from './animations/ScrollReveal';

const blogPosts = [
  {
    title: 'The Impact of Social Media Marketing on Business Growth',
    excerpt: 'Exploring effective strategies for leveraging social media platforms to drive business success.',
    category: 'Marketing',
    date: 'Apr 15, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    title: 'Essential Video Editing Techniques for Content Creators',
    excerpt: 'A guide to professional video editing using Adobe Premiere Pro and DaVinci Resolve.',
    category: 'Video',
    date: 'Apr 10, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    title: 'Modern Web Development with React and Tailwind CSS',
    excerpt: 'Creating responsive and beautiful websites using modern frontend technologies.',
    category: 'Development',
    date: 'Apr 5, 2024',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
];

const categories = ['All', 'Development', 'Marketing', 'Video', 'Design'];

export const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <section className="py-20 bg-gradient-to-b from-black to-zinc-900" id="blog">
      <div className="max-w-6xl mx-auto px-8">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-16">
            Latest <span className="text-blue-500">Articles</span>
          </h2>
        </ScrollReveal>

        <div className="flex justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-zinc-800/50 text-white hover:bg-zinc-700/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <ScrollReveal key={index} delay={index * 200}>
              <motion.article
                className="group relative bg-zinc-900 rounded-xl overflow-hidden"
                onHoverStart={() => setHoveredPost(index)}
                onHoverEnd={() => setHoveredPost(null)}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredPost === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-blue-500 text-sm">{post.category}</span>
                    <div className="flex items-center text-zinc-400 text-sm">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-zinc-400 mb-4">{post.excerpt}</p>

                  <motion.a
                    href="#"
                    className="inline-flex items-center text-blue-500 hover:text-blue-400"
                    whileHover={{ x: 5 }}
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.a>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}; 