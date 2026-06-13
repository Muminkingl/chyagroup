"use server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/auth";
import { uploadToR2, getPresignedUploadUrl } from "@/lib/r2";

const ADMIN_EMAIL = 'muminrtx@gmail.com';
const ADMIN_PASS = 'Mklop123';

export async function login(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    // Create the session
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ email, expires });

    // Save the session in a cookie
    const cookieStore = await cookies();
    cookieStore.set('session', session, { expires, httpOnly: true, secure: true });
    return true;
  }

  return false;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set('session', '', { expires: new Date(0) });
  redirect("/login");
}

export async function createPost(formData: FormData) {
  const supabase = getSupabaseAdmin();
  
  const title_en = formData.get("title_en") as string;
  const title_ar = formData.get("title_ar") as string;
  const title_ku = formData.get("title_ku") as string;
  
  const content_en = formData.get("content_en") as string;
  const content_ar = formData.get("content_ar") as string;
  const content_ku = formData.get("content_ku") as string;
  
  const status = formData.get("status") as string || "Published";
  const imageUrl = formData.get("imageUrl") as string || null;
  
  const imagesJson = formData.get("images") as string || "[]";
  let images: string[] = [];
  try {
    images = JSON.parse(imagesJson);
  } catch (e) {
    console.error("Error parsing images JSON:", e);
  }
  
  const customDateStr = formData.get("customDate") as string;
  
  const insertData: any = {
    title: title_en || title_ar || title_ku,
    content: content_en || content_ar || content_ku,
    
    title_en,
    title_ar,
    title_ku,
    content_en,
    content_ar,
    content_ku,
    
    status,
    image_url: imageUrl,
    images,
  };
  
  if (customDateStr && customDateStr.trim() !== "") {
    insertData.created_at = new Date(customDateStr).toISOString();
  }

  const { error } = await supabase
    .from("posts")
    .insert([insertData]);

  if (error) {
    console.error("Error creating post:", error);
    return { error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/news");
  redirect("/admin/edit-post");
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = getSupabaseAdmin();
  
  const title_en = formData.get("title_en") as string;
  const title_ar = formData.get("title_ar") as string;
  const title_ku = formData.get("title_ku") as string;
  
  const content_en = formData.get("content_en") as string;
  const content_ar = formData.get("content_ar") as string;
  const content_ku = formData.get("content_ku") as string;
  
  const status = formData.get("status") as string;
  const imageUrl = formData.get("imageUrl") as string || null;
  
  const imagesJson = formData.get("images") as string || "[]";
  let images: string[] = [];
  try {
    images = JSON.parse(imagesJson);
  } catch (e) {
    console.error("Error parsing images JSON:", e);
  }
  
  const customDateStr = formData.get("customDate") as string;
  
  const updateData: any = {
    title: title_en || title_ar || title_ku,
    content: content_en || content_ar || content_ku,
    
    title_en,
    title_ar,
    title_ku,
    content_en,
    content_ar,
    content_ku,
    
    status,
    image_url: imageUrl,
    images,
  };
  
  if (customDateStr && customDateStr.trim() !== "") {
    updateData.created_at = new Date(customDateStr).toISOString();
  }

  const { error } = await supabase
    .from("posts")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating post:", error);
    return { error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/news");
  revalidatePath(`/admin/edit-post/${id}`);
  
  return { success: true };
}

export async function deletePost(id: string) {
  const supabase = getSupabaseAdmin();
  
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting post:", error);
    return { error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/news");
  revalidatePath("/admin/edit-post");
}

export async function getPosts(limit = 10) {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) return [];
    return data;
}

export async function getPostById(id: string) {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return null;
    return data;
}

export async function incrementViewCount(id: string) {
    const supabase = getSupabaseAdmin();
    
    // Fetch current count
    const { data: post } = await supabase
      .from('posts')
      .select('views_count')
      .eq('id', id)
      .single();

    if (post) {
      await supabase
        .from('posts')
        .update({ views_count: (post.views_count || 0) + 1 })
        .eq('id', id);
    }
}

export async function uploadImage(formData: FormData) {
  const image = formData.get('image') as File;
  if (!image) return { error: 'No image provided' };

  try {
    const url = await uploadToR2(image);
    return { url };
  } catch (error: any) {
    console.error('R2 Upload Error:', error);
    return { error: error.message || 'Failed to upload image to R2' };
  }
}

export async function getPresignedUrlAction(filename: string, contentType: string) {
  try {
    const { uploadUrl, publicUrl } = await getPresignedUploadUrl(filename, contentType);
    return { uploadUrl, publicUrl };
  } catch (error: any) {
    console.error("Presigned URL Error:", error);
    return { error: error.message || "Failed to generate upload URL" };
  }
}
