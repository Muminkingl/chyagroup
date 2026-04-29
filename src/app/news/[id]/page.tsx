import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getPostById, incrementViewCount } from '@/app/admin/actions';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Iconify } from '@/components/ui/Iconify';

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
    <div className="min-h-screen bg-[#faf9f6]">
      <Header />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Back Button */}
          <Link 
            href="/news" 
            className="group inline-flex items-center gap-2 text-[#3a4f6a] hover:text-[#0c1a2e] transition-colors mb-12 text-sm font-medium"
          >
            <div className="w-8 h-8 rounded-full border border-[#0c1a2e]/10 flex items-center justify-center group-hover:bg-[#0c1a2e]/5 transition-all bg-white">
              <Iconify icon="solar:alt-arrow-left-linear" width={16} />
            </div>
            <span>Back to News</span>
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] text-[10px] font-bold uppercase tracking-widest border border-[#3b82f6]/20">
                {post.category || 'General'}
              </span>
              <div className="h-px w-8 bg-[#0c1a2e]/10"></div>
              <span className="text-[#3a4f6a] text-[10px] uppercase tracking-widest font-bold">Article</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-[#0c1a2e] mb-8 tracking-tight leading-[1.1]" dir="auto">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-y-4 gap-x-8 text-sm text-[#3a4f6a] font-medium">
              <div className="flex items-center gap-2">
                <Iconify icon="solar:calendar-linear" width={14} className="text-[#3b82f6]" />
                <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Iconify icon="solar:clock-circle-linear" width={14} className="text-[#3b82f6]" />
                <span>5 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Iconify icon="solar:eye-linear" width={14} className="text-[#3b82f6]" />
                <span>{post.views_count + 1} views</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.image_url && (
            <div className="relative aspect-[21/9] mb-16 rounded-3xl overflow-hidden border border-[#0c1a2e]/5 shadow-sm">
              <img 
                src={post.image_url} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f6] via-transparent to-transparent opacity-20"></div>
            </div>
          )}

          {/* Article Body */}
          <article 
            className="prose prose-zinc max-w-none text-[#3a4f6a] prose-p:text-[#3a4f6a] prose-p:leading-relaxed prose-p:font-medium prose-headings:text-[#0c1a2e] prose-headings:font-bold prose-headings:tracking-tight prose-strong:text-[#0c1a2e] prose-blockquote:border-[#3b82f6] prose-blockquote:bg-[#0c1a2e]/[0.03] prose-blockquote:p-6 prose-blockquote:rounded-2xl prose-img:rounded-3xl"
            dir="auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share / Footer */}
          <div className="mt-20 pt-12 border-t border-[#0c1a2e]/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white border border-[#0c1a2e]/10 flex items-center justify-center shadow-sm">
                  <span className="text-[#3a4f6a] text-xs font-bold">CG</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0c1a2e] mb-0.5">Chya Group Insights</h4>
                  <p className="text-xs text-[#3a4f6a] font-medium">Official corporate publications department.</p>
                </div>
              </div>
              
              <Link 
                href="/news" 
                className="px-6 py-3 rounded-full bg-white border border-[#0c1a2e]/10 text-xs font-bold text-[#0c1a2e] hover:bg-[#f4f7f9] hover:border-[#0c1a2e]/20 transition-all text-center shadow-sm"
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
