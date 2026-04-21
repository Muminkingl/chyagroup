import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import FeaturedGrid from '@/components/news/FeaturedGrid';
import PostCard from '@/components/news/PostCard';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = "force-dynamic";

// Calculate read time based on word count
function calculateReadTime(htmlContent: string): string {
  const text = htmlContent.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
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
    date: new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    readTime: calculateReadTime(post.content),
    author: {
      name: 'Chya Group',
      avatar: ''
    },
    imageUrl: post.image_url || '',
    featured: false
  }));
}

export default async function NewsPage() {
  const allPosts = await getNewsData();
  
  // First 3 go to featured section
  const featuredPosts = allPosts.slice(0, 3);
  // Rest go to the "All News" archive grid
  const remainingPosts = allPosts.slice(3);

  return (
    <div className="min-h-screen bg-[#09090b]">
      <Header />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            News & <span className="text-blue-500">Insights</span>
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl leading-relaxed font-light">
            Official news, announcements, and updates from Chya Group — covering our expansions, partnerships, and corporate milestones.
          </p>
        </div>

        {/* Latest News — always 3 featured posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-6 flex items-center gap-3">
              <span>Latest News</span>
              <div className="h-px bg-white/5 flex-1"></div>
            </h2>
            <FeaturedGrid posts={featuredPosts} />
          </div>
        )}

        {/* All News Archive */}
        {allPosts.length > 3 && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-6 flex items-center gap-3">
              <span>All News</span>
              <div className="h-px bg-white/5 flex-1"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingPosts.map((post) => (
                <PostCard key={post.id} post={post as any} />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {allPosts.length === 0 && (
          <div className="py-20 text-center border border-white/5 rounded-3xl bg-white/[0.01]">
            <p className="text-neutral-500 italic">No news posts published yet. Please check back later.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
