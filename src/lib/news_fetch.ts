import { getSupabaseAdmin } from './supabase';

export interface NewsPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  content: string;
}

export async function getLatestPosts(limit: number = 3): Promise<NewsPost[]> {
  const supabase = getSupabaseAdmin();
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'Published')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching latest news:", error);
    return [];
  }

  return posts.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
    category: post.category || 'Announcement',
    date: new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    imageUrl: post.image_url || '',
    content: post.content
  }));
}
