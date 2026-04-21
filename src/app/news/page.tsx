import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getSupabaseAdmin } from '@/lib/supabase';
import NewsArchiveContent from '@/components/news/NewsArchiveContent';

export const dynamic = "force-dynamic";

// Calculate read time based on word count
function calculateReadTime(htmlContent: string): number {
  const text = htmlContent.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

async function getNewsData() {
  const supabase = getSupabaseAdmin();
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'Published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching news:", error);
    return [];
  }

  return posts.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
    category: post.category || 'Announcement',
    date: post.created_at, // Pass raw timestamp
    readTime: calculateReadTime(post.content).toString(), // Pass minutes as string for now
    author: {
      name: 'Chya Group',
      avatar: ''
    },
    imageUrl: post.image_url || '',
    featured: false,
    content: post.content
  }));
}

export default async function NewsPage() {
  const allPosts = await getNewsData();
  
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      <Header />
      <NewsArchiveContent initialPosts={allPosts as any} />
      <Footer />
    </div>
  );
}
