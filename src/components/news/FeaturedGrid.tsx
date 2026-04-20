"use client";

import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import { Post } from '@/data/newsData';

/**
 * FeaturedGrid renders the latest 3 posts in a distinct bento-box style layout.
 * Post 0: Large Hero (Left)
 * Post 1 & 2: Stacked Secondary (Right)
 */
export default function FeaturedGrid({ posts }: { posts: Post[] }) {
  if (!posts || posts.length < 3) return null;

  const [heroPost, topSidePost, bottomSidePost] = posts;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* HERO POST - Spans 8 columns on large screens */}
      <Link 
        href={`/news/${heroPost.id}`}
        className="group relative lg:col-span-8 rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 aspect-square lg:aspect-auto min-h-[400px] lg:min-h-[500px]"
      >
        <div className="absolute inset-0">
          <img 
            src={heroPost.imageUrl} 
            alt={heroPost.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
        </div>
        
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20">
              {heroPost.category}
            </span>
            <span className="text-sm text-neutral-300 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {heroPost.date}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-3 group-hover:text-blue-400 transition-colors">
            {heroPost.title}
          </h2>
          <p className="text-neutral-300 text-base md:text-lg max-w-2xl mb-6 line-clamp-2">
            {heroPost.excerpt}
          </p>
          
          <div className="flex items-center gap-3">
            <img src={heroPost.author.avatar} alt={heroPost.author.name} className="w-10 h-10 rounded-full border border-white/20" />
            <div>
              <p className="text-sm font-medium text-white">{heroPost.author.name}</p>
              <p className="text-xs text-neutral-400">{heroPost.readTime}</p>
            </div>
          </div>
        </div>
      </Link>

      {/* SIDE POSTS - Span 4 columns, stacked */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        {[topSidePost, bottomSidePost].map((post, idx) => (
          <Link 
            key={post.id}
            href={`/news/${post.id}`}
            className="group relative flex-1 rounded-3xl overflow-hidden border border-white/10 bg-neutral-900/50 backdrop-blur-sm p-6 hover:bg-white/5 transition-colors flex flex-col justify-between min-h-[250px]"
          >
             {/* Subtle gradient glow inside the card */}
             <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-[50px] group-hover:bg-white/10 transition-colors pointer-events-none" />
             
             <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
                    {post.category}
                  </span>
                  <div className="text-neutral-500 group-hover:text-white transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-white mb-2 group-hover:text-neutral-200 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-neutral-400 line-clamp-2">
                  {post.excerpt}
                </p>
             </div>

             <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full" />
                  <span className="text-xs text-neutral-300">{post.author.name}</span>
                </div>
                <span className="text-xs text-neutral-500">{post.readTime}</span>
             </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
