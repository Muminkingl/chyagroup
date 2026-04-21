import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getPostById, incrementViewCount } from '@/app/admin/actions';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Clock, Calendar, Eye } from 'lucide-react';

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);
  
  if (!post) return { title: 'Post Not Found - Chya Group' };
  
  return {
    title: `${post.title} - Chya Group News`,
    description: post.content.replace(/<[^>]*>/g, '').substring(0, 160),
    openGraph: {
      images: [post.image_url || ''],
    }
  };
}

export default async function PostDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  // Increment view count
  await incrementViewCount(id);

  return (
    <div className="min-h-screen bg-[#09090b]">
      <Header />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Back Button */}
          <Link 
            href="/news" 
            className="group inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 text-sm font-medium"
          >
            <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-white/5 transition-all">
              <ChevronLeft size={16} />
            </div>
            <span>Back to News</span>
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-widest border border-amber-500/20">
                {post.category || 'General'}
              </span>
              <div className="h-px w-8 bg-white/5"></div>
              <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-medium">Article</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-[1.1]" dir="auto">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-y-4 gap-x-8 text-sm text-zinc-400 font-light">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-zinc-600" />
                <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-zinc-600" />
                <span>5 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={14} className="text-zinc-600" />
                <span>{post.views_count + 1} views</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.image_url && (
            <div className="relative aspect-[21/9] mb-16 rounded-3xl overflow-hidden border border-white/5 glass-panel">
              <img 
                src={post.image_url} 
                alt={post.title}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-40"></div>
            </div>
          )}

          {/* Article Body */}
          <article 
            className="prose prose-invert prose-zinc max-w-none prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:font-light prose-headings:text-white prose-headings:tracking-tight prose-strong:text-zinc-200 prose-blockquote:border-amber-500 prose-blockquote:bg-zinc-900/40 prose-blockquote:p-6 prose-blockquote:rounded-2xl prose-img:rounded-3xl"
            dir="auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share / Footer */}
          <div className="mt-20 pt-12 border-t border-white/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center">
                  <span className="text-zinc-500 text-xs">CG</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-0.5">Chya Group Insights</h4>
                  <p className="text-xs text-zinc-500">Official corporate publications department.</p>
                </div>
              </div>
              
              <Link 
                href="/news" 
                className="px-6 py-3 rounded-full bg-zinc-900 border border-white/5 text-xs font-semibold hover:bg-zinc-800 transition-all text-center"
              >
                More Articles
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
