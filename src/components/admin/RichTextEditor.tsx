"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { useState, useRef, useCallback } from "react";
import { Iconify } from "@/components/ui/Iconify";
import { getPresignedUrlAction } from "@/app/admin/actions";
import { clsx } from "clsx";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  dir?: "ltr" | "rtl";
}

export default function RichTextEditor({ value, onChange, placeholder, dir = "ltr" }: RichTextEditorProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Directly upload image files to Cloudflare R2
  const uploadAndInsertImage = useCallback(async (file: File) => {
    setIsUploading(true);
    try {
      // 1. Get presigned upload URL
      const result = await getPresignedUrlAction(file.name, file.type);
      if (result.error || !result.uploadUrl || !result.publicUrl) {
        throw new Error(result.error || "Could not generate upload URL");
      }

      // 2. Perform direct upload to R2
      const uploadResponse = await fetch(result.uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed with status: ${uploadResponse.status}`);
      }

      // 3. Insert S3/R2 image URL into TipTap editor
      editor?.chain().focus().setImage({ src: result.publicUrl }).run();
    } catch (err: any) {
      console.error("Editor image upload error:", err);
      alert(err.message || "Failed to upload image to R2");
    } finally {
      setIsUploading(false);
    }
  }, [getPresignedUrlAction]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#3b82f6] underline hover:text-[#2563eb] transition-colors cursor-pointer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-2xl max-w-full my-6 border border-white/5 shadow-md object-contain",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: placeholder || "Start writing your article...",
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: clsx(
          "prose prose-invert max-w-none focus:outline-none min-h-[380px] p-6 text-sm text-zinc-200 font-light leading-relaxed",
          dir === "rtl" ? "text-right font-medium" : "text-left"
        ),
        dir: dir,
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          const file = event.dataTransfer.files[0];
          const isImg = file.type.startsWith("image/") || /\.(heic|heif)$/i.test(file.name);
          if (isImg) {
            event.preventDefault();
            uploadAndInsertImage(file);
            return true;
          }
        }
        return false;
      },
      handlePaste: (view, event) => {
        if (event.clipboardData && event.clipboardData.files && event.clipboardData.files[0]) {
          const file = event.clipboardData.files[0];
          const isImg = file.type.startsWith("image/") || /\.(heic|heif)$/i.test(file.name);
          if (isImg) {
            event.preventDefault();
            uploadAndInsertImage(file);
            return true;
          }
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Re-sync values if the parent updates content dynamically (e.g. from draft restores)
  const isLoaded = useRef(false);
  if (editor && value !== editor.getHTML() && !isLoaded.current) {
    editor.commands.setContent(value);
    isLoaded.current = true;
  }

  const addLink = () => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("Enter Hyperlink URL:", previousUrl || "https://");
    
    if (url === null) return;
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    
    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadAndInsertImage(file);
    }
  };

  if (!editor) {
    return (
      <div className="min-h-[400px] bg-zinc-950 border border-white/5 rounded-xl flex items-center justify-center text-zinc-500 italic text-xs animate-pulse">
        Loading rich text editor...
      </div>
    );
  }

  const ToolbarButton = ({ 
    icon, 
    onClick, 
    title, 
    active = false 
  }: { 
    icon: string; 
    onClick: () => void; 
    title: string;
    active?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}
      title={title}
      className={clsx(
        "p-2 rounded-lg transition-all flex items-center justify-center focus:outline-none cursor-pointer",
        active 
          ? "bg-zinc-800 text-white shadow-inner border border-white/10" 
          : "text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800"
      )}
    >
      <Iconify icon={icon} className="text-lg" />
    </button>
  );

  return (
    <div className="rounded-xl border border-white/5 bg-zinc-950 overflow-hidden focus-within:ring-2 focus-within:ring-zinc-700 transition-all">
      {/* Sticky Formatting Toolbar */}
      <div className="sticky top-0 z-30 flex flex-wrap items-center gap-1.5 border-b border-white/5 bg-zinc-900/90 backdrop-blur-md p-2">
        <ToolbarButton 
          icon="solar:text-bold-linear" 
          title="Bold" 
          onClick={() => editor.chain().focus().toggleBold().run()} 
          active={editor.isActive("bold")}
        />
        <ToolbarButton 
          icon="solar:text-italic-linear" 
          title="Italic" 
          onClick={() => editor.chain().focus().toggleItalic().run()} 
          active={editor.isActive("italic")}
        />
        <ToolbarButton 
          icon="solar:text-underline-linear" 
          title="Underline" 
          onClick={() => editor.chain().focus().toggleUnderline().run()} 
          active={editor.isActive("underline")}
        />
        <ToolbarButton 
          icon="solar:text-strike-linear" 
          title="Strikethrough" 
          onClick={() => editor.chain().focus().toggleStrike().run()} 
          active={editor.isActive("strike")}
        />

        <div className="w-px h-6 bg-white/5 mx-1" />

        {/* Headings */}
        <ToolbarButton 
          icon="solar:heading-linear" 
          title="Heading 1" 
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
          active={editor.isActive("heading", { level: 1 })}
        />
        <ToolbarButton 
          icon="solar:heading-linear" 
          title="Heading 2" 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
          active={editor.isActive("heading", { level: 2 })}
        />
        <ToolbarButton 
          icon="solar:heading-linear" 
          title="Heading 3" 
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} 
          active={editor.isActive("heading", { level: 3 })}
        />
        <ToolbarButton 
          icon="solar:text-square-linear" 
          title="Paragraph" 
          onClick={() => editor.chain().focus().setParagraph().run()} 
          active={editor.isActive("paragraph")}
        />

        <div className="w-px h-6 bg-white/5 mx-1" />

        {/* Lists & Quotes */}
        <ToolbarButton 
          icon="solar:list-check-linear" 
          title="Bullet List" 
          onClick={() => editor.chain().focus().toggleBulletList().run()} 
          active={editor.isActive("bulletList")}
        />
        <ToolbarButton 
          icon="solar:list-numbers-linear" 
          title="Numbered List" 
          onClick={() => editor.chain().focus().toggleOrderedList().run()} 
          active={editor.isActive("orderedList")}
        />
        <ToolbarButton 
          icon="solar:document-text-linear" 
          title="Quote Block" 
          onClick={() => editor.chain().focus().toggleBlockquote().run()} 
          active={editor.isActive("blockquote")}
        />
        <ToolbarButton 
          icon="solar:minus-square-linear" 
          title="Horizontal Rule" 
          onClick={() => editor.chain().focus().setHorizontalRule().run()} 
        />

        <div className="w-px h-6 bg-white/5 mx-1" />

        {/* Alignments */}
        <ToolbarButton 
          icon="solar:text-align-left-linear" 
          title="Align Left" 
          onClick={() => editor.chain().focus().setTextAlign("left").run()} 
          active={editor.isActive({ textAlign: "left" })}
        />
        <ToolbarButton 
          icon="solar:text-align-center-linear" 
          title="Align Center" 
          onClick={() => editor.chain().focus().setTextAlign("center").run()} 
          active={editor.isActive({ textAlign: "center" })}
        />
        <ToolbarButton 
          icon="solar:text-align-right-linear" 
          title="Align Right" 
          onClick={() => editor.chain().focus().setTextAlign("right").run()} 
          active={editor.isActive({ textAlign: "right" })}
        />
        <ToolbarButton 
          icon="solar:text-align-justify-linear" 
          title="Justify" 
          onClick={() => editor.chain().focus().setTextAlign("justify").run()} 
          active={editor.isActive({ textAlign: "justify" })}
        />

        <div className="w-px h-6 bg-white/5 mx-1" />

        {/* Links */}
        <ToolbarButton 
          icon="solar:link-linear" 
          title="Insert Link" 
          onClick={addLink} 
          active={editor.isActive("link")}
        />
        {editor.isActive("link") && (
          <ToolbarButton 
            icon="solar:link-broken-linear" 
            title="Remove Link" 
            onClick={() => editor.chain().focus().unsetLink().run()} 
          />
        )}

        {/* Inline R2 Images */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageSelect} 
          className="hidden" 
          accept="image/*" 
        />
        <ToolbarButton 
          icon="solar:gallery-linear" 
          title="Insert Image (Upload to R2)" 
          onClick={() => fileInputRef.current?.click()} 
        />

        <div className="w-px h-6 bg-white/5 mx-1" />

        {/* Undo/Redo */}
        <ToolbarButton 
          icon="solar:undo-left-linear" 
          title="Undo" 
          onClick={() => editor.chain().focus().undo().run()} 
        />
        <ToolbarButton 
          icon="solar:undo-right-linear" 
          title="Redo" 
          onClick={() => editor.chain().focus().redo().run()} 
        />

        {/* Image Upload Spinner Status */}
        {isUploading && (
          <div className="flex items-center gap-1.5 ml-auto text-[10px] uppercase font-bold text-amber-500 tracking-widest animate-pulse px-2">
            <div className="w-3.5 h-3.5 border border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
            <span>Uploading to R2...</span>
          </div>
        )}
      </div>

      {/* Editor Content Area */}
      <div className="relative">
        <EditorContent editor={editor} className="bg-zinc-950 min-h-[400px]" />
      </div>
    </div>
  );
}
