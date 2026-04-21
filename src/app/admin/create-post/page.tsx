"use client";

import { useRef, useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createPost, getPosts } from "../actions";
import ImageUpload from "@/components/admin/ImageUpload";

export default function CreatePost() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previousPosts, setPreviousPosts] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Fetch some previous posts for the sidebar
  useEffect(() => {
    async function fetchPrevious() {
      const posts = await getPosts(5);
      setPreviousPosts(posts);
    }
    fetchPrevious();
  }, []);

  const handleFormat = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value || "");
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const ToolbarButton = ({ icon, onClick, title }: { icon: string, onClick: () => void, title: string }) => (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}
      title={title}
      className="p-2 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800 rounded-md transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-zinc-600"
    >
      <iconify-icon icon={icon} class="text-lg"></iconify-icon>
    </button>
  );

  async function clientAction(formData: FormData) {
    setIsSubmitting(true);
    setError(null);
    
    // Manually add the rich text content to the form data
    const content = editorRef.current?.innerHTML || "";
    formData.append("content", content);
    
    const result = await createPost(formData);
    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    }
    // Redirect is handled by the server action
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white">Create Post</h2>
          <p className="text-zinc-400 mt-2">Draft and publish new content to your platform.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <form action={clientAction}>
            <Card className="border-white/5 bg-zinc-900/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
                <CardDescription>Fill in the required information to create a new post.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium leading-none text-zinc-200">
                    Title
                  </label>
                  <input 
                    id="title"
                    name="title"
                    type="text" 
                    required
                    dir="auto"
                    placeholder="Enter post title / أدخل عنوان المنشور..." 
                    className="flex h-11 w-full rounded-xl border border-white/5 bg-zinc-950 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <ImageUpload 
                    label="Featured Image" 
                    onUploadComplete={(url) => setImageUrl(url)} 
                  />
                  <input type="hidden" name="imageUrl" value={imageUrl} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none text-zinc-200">
                    Content
                  </label>
                  <div className="rounded-xl border border-white/5 bg-zinc-950 overflow-hidden focus-within:ring-2 focus-within:ring-zinc-700 transition-all">
                    <div className="flex flex-wrap items-center gap-1 border-b border-white/5 bg-zinc-900/50 p-1.5">
                      <ToolbarButton icon="solar:text-bold-linear" title="Bold" onClick={() => handleFormat('bold')} />
                      <ToolbarButton icon="solar:text-italic-linear" title="Italic" onClick={() => handleFormat('italic')} />
                      <ToolbarButton icon="solar:text-underline-linear" title="Underline" onClick={() => handleFormat('underline')} />
                      <div className="w-px h-6 bg-white/5 mx-1"></div>
                      <ToolbarButton icon="solar:heading-linear" title="Heading 2" onClick={() => handleFormat('formatBlock', 'H2')} />
                      <ToolbarButton icon="solar:text-square-linear" title="Paragraph" onClick={() => handleFormat('formatBlock', 'P')} />
                      <div className="w-px h-6 bg-white/5 mx-1"></div>
                      <ToolbarButton icon="solar:list-check-linear" title="Bullet List" onClick={() => handleFormat('insertUnorderedList')} />
                      <ToolbarButton icon="solar:list-numbers-linear" title="Numbered List" onClick={() => handleFormat('insertOrderedList')} />
                      <div className="w-px h-6 bg-white/5 mx-1"></div>
                      <ToolbarButton icon="solar:text-align-left-linear" title="Align Left" onClick={() => handleFormat('justifyLeft')} />
                      <ToolbarButton icon="solar:text-align-center-linear" title="Align Center" onClick={() => handleFormat('justifyCenter')} />
                      <ToolbarButton icon="solar:text-align-right-linear" title="Align Right" onClick={() => handleFormat('justifyRight')} />
                    </div>

                    <div 
                      ref={editorRef}
                      className="min-h-[400px] w-full p-6 text-sm text-zinc-100 focus:outline-none prose prose-invert max-w-none font-light"
                      contentEditable
                      suppressContentEditableWarning
                      dir="auto"
                      placeholder="Write your post content here / اكتب محتوى المنشور هنا..."
                    />
                  </div>
                </div>

                {error && (
                   <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium">
                     {error}
                   </div>
                )}

                <div className="flex justify-end gap-4 pt-4 border-t border-white/5">
                  <input type="hidden" name="status" value="Published" />
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="h-11 px-8 bg-white text-black hover:bg-zinc-200 transition-colors font-medium border-0"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                        <span>Publishing...</span>
                      </div>
                    ) : (
                      "Publish News"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-white/5 bg-zinc-900/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <iconify-icon icon="solar:history-linear" class="text-xl text-zinc-400"></iconify-icon>
                Recent Posts
              </CardTitle>
              <CardDescription>Latest published items.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {previousPosts.length > 0 ? previousPosts.map((post) => (
                  <div 
                    key={post.id} 
                    className="group flex flex-col gap-1 p-4 rounded-xl border border-white/5 bg-zinc-950/50 hover:bg-zinc-800/50 hover:border-white/10 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium text-zinc-200 group-hover:text-zinc-50 line-clamp-2 leading-relaxed" dir="auto">
                        {post.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded-md text-[10px] uppercase tracking-widest font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        {post.status}
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-500 flex items-center gap-1 uppercase tracking-wider mt-1">
                      <iconify-icon icon="solar:clock-circle-linear"></iconify-icon>
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                )) : (
                  <div className="text-center py-6 text-zinc-500 text-xs italic">
                    No posts published yet.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
