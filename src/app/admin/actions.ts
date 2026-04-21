"use server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/auth";

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
  
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const status = formData.get("status") as string || "Published";
  const imageUrl = formData.get("imageUrl") as string || null;

  const { error } = await supabase
    .from("posts")
    .insert([{ title, content, status, image_url: imageUrl }]);

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
  
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const status = formData.get("status") as string;
  const imageUrl = formData.get("imageUrl") as string || null;

  const { error } = await supabase
    .from("posts")
    .update({ title, content, status, image_url: imageUrl })
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

  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) return { error: 'ImgBB API key not configured' };

  const imgBbFormData = new FormData();
  imgBbFormData.append('image', image);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: imgBbFormData,
    });

    const result = await response.json();
    if (result && result.success) {
      return { url: result.data.url };
    } else {
      return { error: result?.error?.message || 'Upload failed' };
    }
  } catch (error) {
    console.error('ImgBB Upload Error:', error);
    return { error: 'Failed to upload image' };
  }
}
