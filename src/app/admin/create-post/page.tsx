"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createPost, getPosts } from "../actions";
import ImageUpload from "@/components/admin/ImageUpload";
import MultiImageUpload from "@/components/admin/MultiImageUpload";
import { Iconify } from "@/components/ui/Iconify";
import { clsx } from "clsx";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function CreatePost() {
  const [activeTab, setActiveTab] = useState<"en" | "ar" | "ku">("en");
  
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [titleKu, setTitleKu] = useState("");

  const [contentEn, setContentEn] = useState("");
  const [contentAr, setContentAr] = useState("");
  const [contentKu, setContentKu] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previousPosts, setPreviousPosts] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Autosave / Draft recovery states
  const [hasDraft, setHasDraft] = useState(false);

  // Fetch some previous posts for the sidebar
  useEffect(() => {
    async function fetchPrevious() {
      const posts = await getPosts(5);
      setPreviousPosts(posts);
    }
    fetchPrevious();
  }, []);

  // Check for local draft on load
  useEffect(() => {
    const draft = localStorage.getItem("chyagroup_draft_post_create");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        if (
          parsed.titleEn || parsed.titleAr || parsed.titleKu ||
          parsed.contentEn || parsed.contentAr || parsed.contentKu ||
          parsed.imageUrl
        ) {
          setHasDraft(true);
        }
      } catch (e) {
        console.error("Failed to parse local storage draft", e);
      }
    }
  }, []);

  // Save draft to localStorage on change (debounced via state triggers)
  useEffect(() => {
    const hasData = titleEn || titleAr || titleKu || contentEn || contentAr || contentKu || imageUrl;
    if (!hasData) return;

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
    localStorage.setItem("chyagroup_draft_post_create", JSON.stringify(draftData));
  }, [titleEn, titleAr, titleKu, contentEn, contentAr, contentKu, imageUrl]);

  const restoreDraft = () => {
    const draft = localStorage.getItem("chyagroup_draft_post_create");
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
    localStorage.removeItem("chyagroup_draft_post_create");
    setHasDraft(false);
  };

  async function clientAction(formData: FormData) {
    setIsSubmitting(true);
    setError(null);
    
    // Add translation contents to form data
    formData.append("content_en", contentEn);
    formData.append("content_ar", contentAr);
    formData.append("content_ku", contentKu);
    
    // Explicitly set title values in formData
    formData.set("title_en", titleEn);
    formData.set("title_ar", titleAr);
    formData.set("title_ku", titleKu);
    
    const result = await createPost(formData);
    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    } else {
      // Clear draft on successful creation
      localStorage.removeItem("chyagroup_draft_post_create");
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white">Create Post</h2>
          <p className="text-zinc-400 mt-2">Draft and publish new content in English, Arabic, and Kurdish.</p>
        </div>
      </div>

      {hasDraft && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in zoom-in-95">
          <div className="flex items-center gap-3 text-sm text-amber-500">
            <Iconify icon="solar:info-circle-linear" className="text-xl shrink-0" />
            <span>You have an unsaved local draft for this post from a previous session.</span>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button
              type="button"
              onClick={restoreDraft}
              className="h-9 px-4 bg-amber-500 text-black hover:bg-amber-400 transition-colors font-bold text-xs"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <form action={clientAction}>
            <Card className="border-white/5 bg-zinc-900/20 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Post Details</CardTitle>
                    <CardDescription>Fill in post details across supported languages.</CardDescription>
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
                
                {/* 1. TRANSLATED TITLE INPUTS */}
                <div className={clsx(activeTab !== "en" && "hidden")}>
                  <div className="space-y-2">
                    <label htmlFor="title_en" className="text-sm font-medium leading-none text-zinc-200">
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
                      className="flex h-11 w-full rounded-xl border border-white/5 bg-zinc-950 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className={clsx(activeTab !== "ar" && "hidden")}>
                  <div className="space-y-2">
                    <label htmlFor="title_ar" className="text-sm font-medium leading-none text-zinc-200">
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
                      className="flex h-11 w-full rounded-xl border border-white/5 bg-zinc-950 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className={clsx(activeTab !== "ku" && "hidden")}>
                  <div className="space-y-2">
                    <label htmlFor="title_ku" className="text-sm font-medium leading-none text-zinc-200">
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
                      className="flex h-11 w-full rounded-xl border border-white/5 bg-zinc-950 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* 2. TRANSLATED CONTENT EDITORS */}
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none text-zinc-200">
                    Content ({activeTab === "en" ? "English" : activeTab === "ar" ? "Arabic" : "Kurdish"})
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
                    <ImageUpload 
                      label="Featured Banner Image (R2)" 
                      onUploadComplete={(url) => setImageUrl(url)} 
                    />
                    <input type="hidden" name="imageUrl" value={imageUrl} />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="customDate" className="text-sm font-medium text-zinc-200">
                        Publish Date & Time Override (Optional)
                      </label>
                      <input 
                        id="customDate"
                        name="customDate"
                        type="datetime-local" 
                        className="flex h-11 w-full rounded-xl border border-white/5 bg-zinc-950 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
                      />
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">
                        Specify this field to add legacy posts (e.g. from 2019 or 2020) so they sort correctly on the news archive.
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="border-white/5" />

                {/* 4. MULTI IMAGES */}
                <MultiImageUpload label="Additional Gallery Images (R2)" />

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
                <Iconify icon="solar:history-linear" className="text-xl text-zinc-400" />
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
                      <Iconify icon="solar:clock-circle-linear" />
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
