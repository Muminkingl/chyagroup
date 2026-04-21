"use client";

import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { Post } from '@/data/newsData';

export default function FeaturedGrid({ posts }: { posts: Post[] }) {
  if (!posts || posts.length < 1) return null;

  const heroPost = posts[0];
  const sidePosts = posts.slice(1, 3);
  const hasHeroImage = !!(heroPost.imageUrl && heroPost.imageUrl.trim() !== '');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* HERO POST - Spans 8 columns */}
      <Link 
        href={`/news/${heroPost.id}`}
        className="group relative lg:col-span-8 rounded-3xl overflow-hidden border border-white/10 min-h-[400px] lg:min-h-[500px] flex flex-col justify-end"
        style={{ background: hasHeroImage ? undefined : 'linear-gradient(135deg, #18181b 0%, #27272a 100%)' }}
      >
        {/* Background image */}
        {hasHeroImage && (
          <div className="absolute inset-0">
            <img 
              src={heroPost.imageUrl} 
              alt={heroPost.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
          </div>
        )}

        {/* No image: decorative gradient */}
        {!hasHeroImage && (
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
          </div>
        )}

        <div className="relative p-8 flex flex-col justify-end flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-500/20 backdrop-blur-md text-amber-400 border border-amber-500/30 uppercase tracking-wider">
              {heroPost.category}
            </span>
            <span className="text-sm text-neutral-300 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {heroPost.date}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-3 group-hover:text-amber-400 transition-colors" dir="auto">
            {heroPost.title}
          </h2>
          <p className="text-neutral-300 text-base md:text-lg max-w-2xl mb-6 line-clamp-2 font-light" dir="auto">
            {heroPost.excerpt}
          </p>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/20 flex items-center justify-center">
              <span className="text-xs font-bold text-zinc-400">CG</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Chya Group</p>
              <p className="text-xs text-neutral-400 flex items-center gap-1">
                <Clock size={11} />
                {heroPost.readTime}
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* SIDE POSTS - Span 4 columns */}
      {sidePosts.length > 0 && (
        <div className="lg:col-span-4 flex flex-col gap-6">
          {sidePosts.map((post) => {
            const hasSideImage = !!(post.imageUrl && post.imageUrl.trim() !== '');
            return (
              <Link 
                key={post.id}
                href={`/news/${post.id}`}
                className="group relative flex-1 rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-sm hover:bg-white/5 transition-colors flex flex-col justify-between min-h-[235px]"
              >
                {/* Side post image (background) */}
                {hasSideImage && (
                  <div className="absolute inset-0">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-zinc-900/40" />
                  </div>
                )}

                {/* Decorative glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-[50px] group-hover:bg-white/10 transition-colors pointer-events-none" />
                
                <div className="relative p-6 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                        {post.category}
                      </span>
                      <div className="text-neutral-500 group-hover:text-white transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-white mb-2 group-hover:text-neutral-200 line-clamp-3" dir="auto">
                      {post.title}
                    </h3>
                    <p className="text-sm text-neutral-400 line-clamp-2 font-light" dir="auto">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-zinc-500">CG</span>
                      </div>
                      <span className="text-xs text-neutral-300">Chya Group</span>
                    </div>
                    <span className="text-xs text-neutral-500 flex items-center gap-1">
                      <Clock size={11} />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
