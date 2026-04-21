"use client";

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';
import FeaturedGrid from '@/components/news/FeaturedGrid';
import PostCard from '@/components/news/PostCard';
import { Post } from '@/data/newsData';

interface NewsArchiveContentProps {
  initialPosts: Post[];
}

export default function NewsArchiveContent({ initialPosts }: NewsArchiveContentProps) {
  const { locale, isRTL } = useLanguage();
  const t = translations[locale].newsArchive;

  // First 3 go to featured section
  const featuredPosts = initialPosts.slice(0, 3);
  // Rest go to the "All News" archive grid
  const remainingPosts = initialPosts.slice(3);

  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-start">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          {t.title} <span className="text-blue-500">{t.insights}</span>
        </h1>
        <p className="text-neutral-400 text-lg max-w-2xl leading-relaxed font-light">
          {t.description}
        </p>
      </div>

      {/* Latest News — always 3 featured posts */}
      {featuredPosts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-6 flex items-center gap-3">
            <span>{t.latest}</span>
            <div className="h-px bg-white/5 flex-1"></div>
          </h2>
          <FeaturedGrid posts={featuredPosts} />
        </div>
      )}

      {/* All News Archive */}
      {initialPosts.length > 3 && (
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-6 flex items-center gap-3">
            <span>{t.allNews}</span>
            <div className="h-px bg-white/5 flex-1"></div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {initialPosts.length === 0 && (
        <div className="py-20 text-center border border-white/5 rounded-3xl bg-white/[0.01]">
          <p className="text-neutral-500 italic">{t.noPosts}</p>
        </div>
      )}
    </main>
  );
}
