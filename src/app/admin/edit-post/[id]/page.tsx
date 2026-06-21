"use client";

import { useState, useEffect, use, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { updatePost, getPostById } from "../../actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import ImageUpload from "@/components/admin/ImageUpload";
import MultiImageUpload from "@/components/admin/MultiImageUpload";
import { Iconify } from "@/components/ui/Iconify";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function EditPostDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const [activeTab, setActiveTab] = useState<"en" | "ar" | "ku">("en");
  
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [titleKu, setTitleKu] = useState("");

  const [contentEn, setContentEn] = useState("");
  const [contentAr, setContentAr] = useState("");
  const [contentKu, setContentKu] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string>("Published");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();

  const [hasDraft, setHasDraft] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      const data = await getPostById(id);
      if (data) {
        setPost(data);
        setStatus(data.status);
        setImageUrl(data.image_url || "");
        setImages(data.images || []);
        
        setTitleEn(data.title_en || data.title || "");
        setTitleAr(data.title_ar || "");
        setTitleKu(data.title_ku || "");
        
        setContentEn(data.content_en || data.content || "");
        setContentAr(data.content_ar || "");
        setContentKu(data.content_ku || "");
      }
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  // Check for local draft on load
  useEffect(() => {
    if (!post) return;
    const draftKey = `chyagroup_draft_post_edit_${id}`;
    const draft = localStorage.getItem(draftKey);
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        const postTime = new Date(post.updated_at || post.created_at).getTime();
        if (parsed.timestamp && parsed.timestamp > postTime) {
          setHasDraft(true);
        }
      } catch (e) {
        console.error("Failed to parse local draft", e);
      }
    }
  }, [post, id]);

  // Save draft on edit
  useEffect(() => {
    if (!post) return;
    const draftKey = `chyagroup_draft_post_edit_${id}`;

    // Prevent saving if it's identical to the post from database (initial load)
    const isUnchanged = 
      titleEn === (post.title_en || post.title || "") &&
      titleAr === (post.title_ar || "") &&
      titleKu === (post.title_ku || "") &&
      contentEn === (post.content_en || post.content || "") &&
      contentAr === (post.content_ar || "") &&
      contentKu === (post.content_ku || "") &&
      imageUrl === (post.image_url || "");
      
    if (isUnchanged) return;

    const draftData = {
      titleEn,
      titleAr,
      titleKu,
      contentEn,
      contentAr,
      contentKu,
      imageUrl,
      timestamp: Date.now()
    };
    localStorage.setItem(draftKey, JSON.stringify(draftData));
  }, [titleEn, titleAr, titleKu, contentEn, contentAr, contentKu, imageUrl, post, id]);

  const restoreDraft = () => {
    const draftKey = `chyagroup_draft_post_edit_${id}`;
    const draft = localStorage.getItem(draftKey);
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setTitleEn(parsed.titleEn || "");
        setTitleAr(parsed.titleAr || "");
        setTitleKu(parsed.titleKu || "");
        setContentEn(parsed.contentEn || "");
        setContentAr(parsed.contentAr || "");
        setContentKu(parsed.contentKu || "");
        setImageUrl(parsed.imageUrl || "");
        setHasDraft(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const discardDraft = () => {
    const draftKey = `chyagroup_draft_post_edit_${id}`;
    localStorage.removeItem(draftKey);
    setHasDraft(false);
  };

  async function clientAction(formData: FormData) {
    setIsSubmitting(true);
    
    // Add translation contents to form data
    formData.append("content_en", contentEn);
    formData.append("content_ar", contentAr);
    formData.append("content_ku", contentKu);
    formData.append("status", status);
    formData.append("images", JSON.stringify(images));
    
    // Explicitly update title values in formData
    formData.set("title_en", titleEn);
    formData.set("title_ar", titleAr);
    formData.set("title_ku", titleKu);
    
    const result = await updatePost(id, formData);
    
    if (result.success) {
      const draftKey = `chyagroup_draft_post_edit_${id}`;
      localStorage.removeItem(draftKey);
      router.push("/admin/edit-post");
      router.refresh();
    } else {
      setIsSubmitting(false);
      alert("Error updating post: " + result.error);
    }
  }

  // Format date helper for datetime-local
  const formatDatetimeLocal = (isoString: string) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    const offsetMs = d.getTimezoneOffset() * 60 * 1000;
    const localTime = new Date(d.getTime() - offsetMs);
    return localTime.toISOString().slice(0, 16);
  };

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
           <Iconify icon="solar:arrow-left-linear" />
           Back to Manager
        </Link>
        <h2 className="text-3xl font-semibold tracking-tight text-white">Edit Post</h2>
        <p className="text-zinc-400">Modify your content, translations, imagery and publishing details.</p>
      </div>

      {hasDraft && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in zoom-in-95">
          <div className="flex items-center gap-3 text-sm text-amber-500">
            <Iconify icon="solar:info-circle-linear" className="text-xl shrink-0" />
            <span>You have an unsaved local draft for this post that is newer than the published copy.</span>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button
              type="button"
              onClick={restoreDraft}
              className="h-9 px-4 bg-amber-500 text-black hover:bg-amber-400 transition-colors font-bold text-xs animate-pulse"
            >
              Restore Draft
            </Button>
            <Button
              type="button"
              onClick={discardDraft}
              className="h-9 px-4 bg-transparent border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors font-bold text-xs"
            >
              Discard
            </Button>
          </div>
        </div>
      )}

      <form action={clientAction}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-white/5 bg-zinc-900/20 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Post Content</CardTitle>
                    <CardDescription>Update the translated details of this post.</CardDescription>
                  </div>
                  
                  {/* Language Tab Switcher */}
                  <div className="flex bg-zinc-950 p-1 rounded-xl border border-white/5 self-start">
                    {(["en", "ar", "ku"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={clsx(
                          "px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
                          activeTab === tab 
                            ? "bg-zinc-800 text-white shadow-md border border-white/5" 
                            : "text-zinc-500 hover:text-zinc-300"
                        )}
                      >
                        {tab === "en" ? "EN" : tab === "ar" ? "AR" : "KU"}
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                
                {/* 1. TRANSLATED TITLES */}
                <div className={clsx(activeTab !== "en" && "hidden")}>
                  <div className="space-y-2">
                    <label htmlFor="title_en" className="text-sm font-medium text-zinc-200">
                      English Title
                    </label>
                    <input 
                      id="title_en"
                      name="title_en"
                      type="text" 
                      required={activeTab === "en"}
                      value={titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                      placeholder="Enter English title..." 
                      className="flex h-11 w-full rounded-xl border border-white/5 bg-zinc-950 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className={clsx(activeTab !== "ar" && "hidden")}>
                  <div className="space-y-2">
                    <label htmlFor="title_ar" className="text-sm font-medium text-zinc-200">
                      Arabic Title
                    </label>
                    <input 
                      id="title_ar"
                      name="title_ar"
                      type="text" 
                      required={activeTab === "ar"}
                      value={titleAr}
                      onChange={(e) => setTitleAr(e.target.value)}
                      dir="rtl"
                      placeholder="أدخل العنوان باللغة العربية..." 
                      className="flex h-11 w-full rounded-xl border border-white/5 bg-zinc-950 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className={clsx(activeTab !== "ku" && "hidden")}>
                  <div className="space-y-2">
                    <label htmlFor="title_ku" className="text-sm font-medium text-zinc-200">
                      Kurdish Title
                    </label>
                    <input 
                      id="title_ku"
                      name="title_ku"
                      type="text" 
                      required={activeTab === "ku"}
                      value={titleKu}
                      onChange={(e) => setTitleKu(e.target.value)}
                      dir="rtl"
                      placeholder="ناونیشان بە زمانی کوردی بنووسە..." 
                      className="flex h-11 w-full rounded-xl border border-white/5 bg-zinc-950 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* 2. TRANSLATED CONTENT EDITORS */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-200">
                    Body Content ({activeTab === "en" ? "English" : activeTab === "ar" ? "Arabic" : "Kurdish"})
                  </label>
                  
                  <div className={clsx(activeTab !== "en" && "hidden")}>
                    <RichTextEditor
                      value={contentEn}
                      onChange={setContentEn}
                      placeholder="Write English description here..."
                      dir="ltr"
                    />
                  </div>
                  <div className={clsx(activeTab !== "ar" && "hidden")}>
                    <RichTextEditor
                      value={contentAr}
                      onChange={setContentAr}
                      placeholder="أدخل المحتوى باللغة العربية هنا..."
                      dir="rtl"
                    />
                  </div>
                  <div className={clsx(activeTab !== "ku" && "hidden")}>
                    <RichTextEditor
                      value={contentKu}
                      onChange={setContentKu}
                      placeholder="ناوەڕۆکی بابەتەکە لێرە بنووسە..."
                      dir="rtl"
                    />
                  </div>
                </div>

                <hr className="border-white/5" />

                {/* 3. IMAGES & DATE (SHARED) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    {post && (
                      <ImageUpload 
                        label="Featured Banner Image (R2)" 
                        defaultImage={imageUrl}
                        onUploadComplete={(url) => setImageUrl(url)} 
                      />
                    )}
                    <input type="hidden" name="imageUrl" value={imageUrl} />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="customDate" className="text-sm font-medium text-zinc-200">
                        Publish Date & Time Override
                      </label>
                      <input 
                        id="customDate"
                        name="customDate"
                        type="datetime-local" 
                        defaultValue={formatDatetimeLocal(post.created_at)}
                        className="flex h-11 w-full rounded-xl border border-white/5 bg-zinc-950 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
                      />
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">
                        Change the publication date/time here. This allows backdating or updating the date of this post.
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="border-white/5" />

                {/* 4. MULTI IMAGES */}
                {post && (
                  <MultiImageUpload 
                    label="Additional Gallery Images (R2)" 
                    defaultImages={images}
                    onImagesChange={(urls) => setImages(urls)}
                  />
                )}

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
                          {status === s && <Iconify icon="solar:check-circle-bold" className="text-emerald-500 text-lg" />}
                        </button>
                     ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 mt-4">
                   <div className="flex gap-3">
                     <Iconify icon="solar:info-circle-linear" className="text-amber-500 mt-1" />
                     <p className="text-[11px] text-amber-500/80 leading-relaxed font-medium">
                       Updates to the status are applied immediately when you save the post. Published posts are visible to all users.
                     </p>
                   </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-white text-black hover:bg-zinc-200 transition-colors font-semibold"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
