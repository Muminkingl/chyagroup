"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import FeaturedGrid from '@/components/news/FeaturedGrid';
import PostCard from '@/components/news/PostCard';
import { mockPosts, categories } from '@/data/newsData';
import { clsx } from 'clsx';

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All' 
    ? mockPosts 
    : mockPosts.filter(post => post.category === activeCategory);

  const featuredPosts = filteredPosts.slice(0, 3);
  const remainingPosts = filteredPosts.slice(3);

  return (
    <div className="min-h-screen bg-[#09090b]">
      <Header />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            News & <span className="text-blue-500">Insights</span>
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl leading-relaxed">
            Stay updated with the latest developments at Chya Group, from technological innovations to regional expansion and industry leadership.
          </p>
        </div>

        {/* Latest Post */}
        {featuredPosts.length >= 3 && (
          <div className="mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-6 flex items-center gap-3">
              <span>Latest Post</span>
              <div className="h-px bg-white/5 flex-1"></div>
            </h2>
            <FeaturedGrid posts={featuredPosts} />
          </div>
        )}

        {/* Other Posts Grid */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-6 flex items-center gap-3">
            <span>All News</span>
            <div className="h-px bg-white/5 flex-1"></div>
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-neutral-500">No news found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
              
              {/* If we have fewer than 3 posts total, we display them here instead of in featured grid fully */}
              {featuredPosts.length < 3 && featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
