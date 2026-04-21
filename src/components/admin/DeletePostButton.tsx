"use client";

import { deletePost } from "@/app/admin/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeletePostButtonProps {
  postId: string;
}

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this post? This action cannot be undone.");
    
    if (confirmed) {
      setIsDeleting(true);
      try {
        await deletePost(postId);
        router.refresh();
      } catch (error) {
        console.error("Failed to delete post:", error);
        alert("Error: Could not delete the post.");
        setIsDeleting(false);
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-zinc-500 hover:text-rose-500 transition-colors flex items-center gap-1.5 text-xs font-medium disabled:opacity-50 disabled:cursor-wait"
    >
      <iconify-icon icon="solar:trash-bin-trash-linear" class="text-base"></iconify-icon>
      <span>{isDeleting ? "Deleting..." : "Delete"}</span>
    </button>
  );
}
