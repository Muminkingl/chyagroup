import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getPostById, incrementViewCount } from '@/app/admin/actions';
import { notFound } from 'next/navigation';
import PostDetailContent from '@/components/news/PostDetailContent';

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);
  
  if (!post) return { title: 'Post Not Found - Chya Group' };
  
  const seoTitle = post.title_en || post.title;
  const seoContent = post.content_en || post.content || '';
  const seoDescription = seoContent.replace(/<[^>]*>/g, '').substring(0, 160);
  
  return {
    title: `${seoTitle} - Chya Group News`,
    description: seoDescription,
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
      <PostDetailContent post={post} />
      <Footer />
    </div>
  );
}
