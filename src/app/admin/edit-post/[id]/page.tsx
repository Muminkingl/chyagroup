"use client";

import { useRef, useState, useEffect, use } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { updatePost, getPostById } from "../../actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import ImageUpload from "@/components/admin/ImageUpload";

export default function EditPostDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const editorRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string>("Published");
  const [imageUrl, setImageUrl] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    async function fetchPost() {
      const data = await getPostById(id);
      if (data) {
        setPost(data);
        setStatus(data.status);
        setImageUrl(data.image_url || "");
        if (editorRef.current) {
           editorRef.current.innerHTML = data.content;
        }
      }
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  // Handle case where editor might not be ready on first effect
  useEffect(() => {
    if (post && editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = post.content;
    }
  }, [post]);

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
    
    // Manually add the rich text content to the form data
    const content = editorRef.current?.innerHTML || "";
    formData.append("content", content);
    formData.append("status", status);
    
    const result = await updatePost(id, formData);
    
    if (result.success) {
      router.push("/admin/edit-post");
      router.refresh();
    } else {
      setIsSubmitting(false);
      alert("Error updating post: " + result.error);
    }
  }

  if (loading) {
     return <div className="flex items-center justify-center h-64 text-zinc-500 italic">Loading post data...</div>;
  }

  if (!post) {
     return <div className="text-center py-24 text-rose-500">Post not found.</div>;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <Link href="/admin/edit-post" className="flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors mb-2">
           <iconify-icon icon="solar:arrow-left-linear"></iconify-icon>
           Back to Manager
        </Link>
        <h2 className="text-3xl font-semibold tracking-tight text-white">Edit Post</h2>
        <p className="text-zinc-400">Modify your content and republish to the world.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <form action={clientAction}>
            <Card className="border-white/5 bg-zinc-900/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
                <CardDescription>Update the title, imagery, and body of your post.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium text-zinc-200">
                    Title
                  </label>
                  <input 
                    id="title"
                    name="title"
                    type="text" 
                    required
                    defaultValue={post.title}
                    dir="auto"
                    className="flex h-11 w-full rounded-xl border border-white/5 bg-zinc-950 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  {post && (
                    <ImageUpload 
                      label="Featured Image" 
                      defaultImage={post.image_url}
                      onUploadComplete={(url) => setImageUrl(url)} 
                    />
                  )}
                  <input type="hidden" name="imageUrl" value={imageUrl} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-200">
                    Body Content
                  </label>
                  <div className="rounded-xl border border-white/5 bg-zinc-950 overflow-hidden focus-within:ring-2 focus-within:ring-zinc-700 transition-all">
                    <div className="flex flex-wrap items-center gap-1 border-b border-white/5 bg-zinc-900/50 p-1.5 font-light">
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
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-white/5">
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="h-11 px-8 bg-white text-black hover:bg-zinc-200 transition-colors font-semibold"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="border-white/5 bg-zinc-900/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Publishing Settings</CardTitle>
              <CardDescription>Manage post visibility.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Status</label>
                <div className="flex flex-col gap-2">
                   {["Published", "Draft"].map((s) => (
                     <button
                       key={s}
                       type="button"
                       onClick={() => setStatus(s)}
                       className={clsx(
                         "flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-sm font-medium",
                         status === s 
                          ? "bg-zinc-800 border-white/10 text-white shadow-lg" 
                          : "bg-transparent border-white/5 text-zinc-500 hover:border-white/10"
                       )}
                     >
                       <span>{s}</span>
                       {status === s && <iconify-icon icon="solar:check-circle-bold" class="text-emerald-500 text-lg"></iconify-icon>}
                     </button>
                   ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 mt-4">
                 <div className="flex gap-3">
                   <iconify-icon icon="solar:info-circle-linear" class="text-amber-500 mt-1"></iconify-icon>
                   <p className="text-[11px] text-amber-500/80 leading-relaxed font-medium">
                     Updates to the status are applied immediately when you save the post. Published posts are visible to all users.
                   </p>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
