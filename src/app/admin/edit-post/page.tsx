import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { getPosts } from "../actions";
import DeletePostButton from "@/components/admin/DeletePostButton";
import Link from "next/link";
import { clsx } from "clsx";
import { Iconify } from "@/components/ui/Iconify";

export const dynamic = "force-dynamic";

export default async function EditPost() {
  const posts = await getPosts(50); // Get up to 50 latest posts

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-white">Manage Posts</h2>
        <p className="text-zinc-400 mt-2">Update or remove existing content from your platform.</p>
      </div>

      <Card className="border-white/5 bg-zinc-900/20 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Published Content</CardTitle>
            <CardDescription>Select a post to modify its details.</CardDescription>
          </div>
          <Link href="/admin/create-post">
            <button className="h-9 px-4 rounded-lg bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors">
              + New Post
            </button>
          </Link>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden md:block rounded-xl border border-white/5 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] uppercase bg-zinc-900/50 border-b border-white/5 text-zinc-500 tracking-widest font-bold">
                <tr>
                  <th scope="col" className="px-6 py-4 font-bold">Post Title</th>
                  <th scope="col" className="px-6 py-4 font-bold">Status</th>
                  <th scope="col" className="px-6 py-4 font-bold">Date</th>
                  <th scope="col" className="px-6 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-zinc-950/20">
                {posts.length > 0 ? posts.map((post: any) => (
                  <tr key={post.id} className="group hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-zinc-200" dir="auto">
                      <div className="flex flex-col gap-1">
                        <span className="line-clamp-1">{post.title}</span>
                        {post.image_url && (
                           <span className="text-[10px] text-zinc-600 truncate max-w-[200px]">{post.image_url}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={clsx(
                        "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                        post.status === 'Published' 
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                          : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                      )}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-zinc-400 text-xs">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link 
                          href={`/admin/edit-post/${post.id}`}
                          className="text-zinc-500 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
                        >
                          <Iconify icon="solar:pen-linear" className="text-base" />
                          <span>Edit</span>
                        </Link>
                        
                        <DeletePostButton postId={post.id} />
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-zinc-500 italic text-xs">
                      No posts found in the database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Card View */}
          <div className="block md:hidden space-y-4">
            {posts.length > 0 ? posts.map((post: any) => (
              <div key={post.id} className="p-4 rounded-xl border border-white/5 bg-zinc-950/40 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="font-semibold text-zinc-200 line-clamp-2 text-sm" dir="auto">{post.title}</span>
                    {post.image_url && (
                      <span className="text-[10px] text-zinc-600 block truncate max-w-[200px]">{post.image_url}</span>
                    )}
                  </div>
                  <span className={clsx(
                    "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border shrink-0",
                    post.status === 'Published' 
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                      : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                  )}>
                    {post.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-white/5">
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  
                  <div className="flex items-center gap-4">
                    <Link 
                      href={`/admin/edit-post/${post.id}`}
                      className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-semibold py-1 px-2.5 rounded bg-white/5 border border-white/5"
                    >
                      <Iconify icon="solar:pen-linear" className="text-sm" />
                      <span>Edit</span>
                    </Link>
                    
                    <DeletePostButton postId={post.id} />
                  </div>
                </div>
              </div>
            )) : (
              <div className="p-8 text-center text-zinc-500 italic text-xs border border-white/5 rounded-xl">
                No posts found in the database.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
