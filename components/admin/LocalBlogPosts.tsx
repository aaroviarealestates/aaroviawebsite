"use client";

import { useEffect, useState } from "react";

type LocalBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  allowComments: boolean;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
};

type FallbackPost = Omit<LocalBlogPost, "author" | "category" | "tags" | "featured" | "allowComments" | "seoTitle" | "seoDescription" | "publishedAt"> & { publishedAt: Date | string };

const STORAGE_KEY = "aarovia.admin.blog.posts";
const inputStyle = { width: "100%", padding: "9px", border: "1px solid #cbd5e1", borderRadius: "5px", marginBottom: "10px" };

function toLocalPost(post: FallbackPost): LocalBlogPost {
  return { ...post, publishedAt: new Date(post.publishedAt).toISOString(), author: "Aarovia Group", category: "Real Estate", tags: [], featured: false, allowComments: true, seoTitle: "", seoDescription: "" };
}

export default function LocalBlogPosts({ posts }: { posts: FallbackPost[] }) {
  const [storedPosts, setStoredPosts] = useState<LocalBlogPost[]>([]);
  const [editing, setEditing] = useState<LocalBlogPost | null>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) setStoredPosts(saved);
    } catch { setStoredPosts([]); }
  }, []);

  function savePosts(next: LocalBlogPost[]) {
    setStoredPosts(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function importPost(post: FallbackPost) {
    const imported = toLocalPost(post);
    savePosts([...storedPosts.filter((item) => item.slug !== post.slug), imported]);
    setEditing(imported);
  }

  function savePost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    const form = new FormData(event.currentTarget);
    const next = {
      ...editing,
      title: String(form.get("title") || ""),
      slug: String(form.get("slug") || ""),
      excerpt: String(form.get("excerpt") || ""),
      coverImage: String(form.get("coverImage") || ""),
      author: String(form.get("author") || "Aarovia Group"),
      category: String(form.get("category") || "Real Estate"),
      tags: String(form.get("tags") || "").split(",").map((tag) => tag.trim()).filter(Boolean),
      content: String(form.get("content") || ""),
      seoTitle: String(form.get("seoTitle") || ""),
      seoDescription: String(form.get("seoDescription") || ""),
      published: form.get("published") === "on",
      featured: form.get("featured") === "on",
      allowComments: form.get("allowComments") === "on",
    };
    savePosts([...storedPosts.filter((item) => item.id !== editing.id), next]);
    setEditing(null);
  }

  const localSlugs = new Set(storedPosts.map((post) => post.slug));
  return (
    <>
      {posts.map((fallback) => {
        const post = storedPosts.find((item) => item.slug === fallback.slug);
        return (
          <tr key={fallback.id} style={{ borderTop: "1px solid #eee" }}>
            <td style={{ padding: "12px 16px" }}>{post?.title || fallback.title}</td>
            <td style={{ padding: "12px 16px" }}>{post?.published === false ? "Draft" : "Published"}</td>
            <td style={{ padding: "12px 16px" }}>{new Date(post?.publishedAt || fallback.publishedAt).toDateString()}</td>
            <td style={{ padding: "12px 16px" }}>{localSlugs.has(fallback.slug) ? "Browser storage" : "Built-in site content"}</td>
            <td style={{ padding: "12px 16px" }}>
              {post ? <button type="button" onClick={() => setEditing(post)} style={{ background: "#0f172a", color: "#fff", border: 0, borderRadius: "6px", padding: "7px 10px", cursor: "pointer" }}>Edit locally</button> : <button type="button" onClick={() => importPost(fallback)} style={{ background: "#0f172a", color: "#fff", border: 0, borderRadius: "6px", padding: "7px 10px", cursor: "pointer" }}>Import locally</button>}
            </td>
          </tr>
        );
      })}
      {editing && <tr><td colSpan={5}>
        <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,.5)", zIndex: 1000, padding: "30px", overflow: "auto" }}>
          <form onSubmit={savePost} style={{ background: "#fff", maxWidth: "720px", margin: "auto", padding: "24px", borderRadius: "8px" }}>
          <h2 style={{ marginTop: 0 }}>Edit blog locally</h2>
          <label>Title<input name="title" defaultValue={editing.title} required style={inputStyle} /></label>
          <label>Slug<input name="slug" defaultValue={editing.slug} required style={inputStyle} /></label>
          <label>Cover image<input name="coverImage" defaultValue={editing.coverImage} required style={inputStyle} /></label>
          <label>Excerpt<textarea name="excerpt" defaultValue={editing.excerpt} rows={2} style={inputStyle} /></label>
          <label>Author<input name="author" defaultValue={editing.author} style={inputStyle} /></label>
          <label>Category<input name="category" defaultValue={editing.category} style={inputStyle} /></label>
          <label>Tags<input name="tags" defaultValue={editing.tags.join(", ")} style={inputStyle} /></label>
          <label>Content<textarea name="content" defaultValue={editing.content} rows={10} style={inputStyle} /></label>
          <label>SEO title<input name="seoTitle" defaultValue={editing.seoTitle} style={inputStyle} /></label>
          <label>SEO description<textarea name="seoDescription" defaultValue={editing.seoDescription} rows={2} style={inputStyle} /></label>
          <p><label><input type="checkbox" name="published" defaultChecked={editing.published} /> Published</label></p>
          <p><label><input type="checkbox" name="featured" defaultChecked={editing.featured} /> Featured post</label></p>
          <p><label><input type="checkbox" name="allowComments" defaultChecked={editing.allowComments} /> Allow comments</label></p>
          <button type="submit" style={{ background: "#0f172a", color: "#fff", border: 0, borderRadius: "6px", padding: "10px 16px", cursor: "pointer", marginRight: "8px" }}>Save locally</button>
          <button type="button" onClick={() => setEditing(null)} style={{ padding: "9px 16px", cursor: "pointer" }}>Cancel</button>
          </form>
        </div>
      </td></tr>}
    </>
  );
}