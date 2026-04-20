"use client";

import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { clsx } from 'clsx';
import { Post } from '@/data/newsData';

/**
 * Standard card for remaining posts
 */
export default function PostCard({ post, className }: { post: Post, className?: string }) {
  return (
    <Link 
      href={`/news/${post.id}`}
      className={clsx(
        "group flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3 text-xs text-neutral-400">
          <span className="font-medium text-neutral-300">{post.category}</span>
          <span className="w-1 h-1 rounded-full bg-neutral-600"></span>
          <span>{post.date}</span>
        </div>
        
        <h3 className="text-lg font-semibold tracking-tight text-white mb-2 line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-sm text-neutral-400 mb-6 line-clamp-2 flex-1">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full grayscale group-hover:grayscale-0 transition-all" />
            <span className="text-xs text-neutral-300">{post.author.name}</span>
          </div>
          <span className="text-xs text-neutral-500 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
