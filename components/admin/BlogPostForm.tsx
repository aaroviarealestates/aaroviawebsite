"use client";

import type { BlogPost } from "@prisma/client";
import { useState, type FormEvent } from "react";
import { BLOG_POST_TYPES, getBlogSeoAnalysis } from "@/lib/blog-seo";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  marginBottom: "16px",
};
const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "6px",
  fontSize: "14px",
  fontWeight: 600,
};

type EditableBlogPost = BlogPost & {
  author?: string;
  category?: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  coverImageAlt?: string;
  postType?: string;
  featured?: boolean;
  allowComments?: boolean;
};

type FormFields = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  coverImageAlt: string;
  postType: string;
  focusKeyword: string;
  seoTitle: string;
  seoDescription: string;
};

export default function BlogPostForm({
  post,
  action,
  error,
}: {
  post?: EditableBlogPost;
  action: (formData: FormData) => void | Promise<void>;
  error?: string;
}) {
  const [fields, setFields] = useState<FormFields>({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    coverImage: post?.coverImage ?? "",
    coverImageAlt: post?.coverImageAlt ?? "",
    postType: post?.postType ?? "ARTICLE",
    focusKeyword: post?.focusKeyword ?? "",
    seoTitle: post?.seoTitle ?? "",
    seoDescription: post?.seoDescription ?? "",
  });
  const [hasUploadedCover, setHasUploadedCover] = useState(false);
  const [published, setPublished] = useState(post?.published ?? false);
  const [submitError, setSubmitError] = useState("");
  const analysis = getBlogSeoAnalysis({
    ...fields,
    coverImage: fields.coverImage || (hasUploadedCover ? "uploaded" : ""),
  });
  const publishedDate = post?.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 10) : "";

  function updateField(name: keyof FormFields, value: string) {
    setFields((current) => ({ ...current, [name]: value }));
    setSubmitError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!published || analysis.score === 100) return;
    event.preventDefault();
    const remaining = analysis.checks.filter((check) => !check.passed).slice(0, 3).map((check) => check.label);
    setSubmitError(`A 100% SEO score is required to publish. Current score: ${analysis.score}%. Fix: ${remaining.join("; ")}.`);
  }

  const serverErrorMessages: Record<string, string> = {
    seo: "This post was not published because it did not meet the 100% SEO checklist.",
    "duplicate-slug": "That URL slug is already in use. Choose a unique slug.",
    "post-type": "Choose a valid post type before saving.",
    required: "Title, excerpt, and content are required.",
    slug: "Enter a valid URL slug.",
    cover: "Add a cover image URL or upload an image.",
  };
  const serverErrorMessage = error ? serverErrorMessages[error] : "";

  return (
    <form
      action={action}
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      style={{ background: "#fff", padding: "24px", borderRadius: "10px", maxWidth: "820px" }}
    >
      {serverErrorMessage || submitError ? (
        <p role="alert" style={{ color: "#b91c1c", background: "#fef2f2", padding: "12px", borderRadius: "6px" }}>
          {submitError || serverErrorMessage}
        </p>
      ) : null}

      <label style={labelStyle}>Title</label>
      <input name="title" value={fields.title} onChange={(event) => updateField("title", event.currentTarget.value)} required style={inputStyle} />

      <label style={labelStyle}>URL slug</label>
      <input name="slug" value={fields.slug} onChange={(event) => updateField("slug", event.currentTarget.value)} placeholder="bangalore-real-estate-guide" required style={inputStyle} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div>
          <label htmlFor="postType" style={labelStyle}>Post type</label>
          <select id="postType" name="postType" value={fields.postType} onChange={(event) => updateField("postType", event.currentTarget.value)} style={inputStyle}>
            {BLOG_POST_TYPES.map((postType) => (
              <option key={postType.value} value={postType.value}>{postType.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="focusKeyword" style={labelStyle}>Focus keyword (1-4 words)</label>
          <input id="focusKeyword" name="focusKeyword" value={fields.focusKeyword} onChange={(event) => updateField("focusKeyword", event.currentTarget.value)} style={inputStyle} />
        </div>
      </div>

      <label style={labelStyle}>Cover image URL</label>
      <input name="coverImage" value={fields.coverImage} onChange={(event) => updateField("coverImage", event.currentTarget.value)} placeholder="/images/post-1.webp or a hosted URL" style={inputStyle} />
      <label style={labelStyle}>Upload cover image</label>
      <input
        type="file"
        name="coverImageFile"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        onChange={(event) => setHasUploadedCover(Boolean(event.currentTarget.files?.length))}
        style={inputStyle}
      />
      <label style={labelStyle}>Cover image alt text</label>
      <input name="coverImageAlt" value={fields.coverImageAlt} onChange={(event) => updateField("coverImageAlt", event.currentTarget.value)} maxLength={125} style={inputStyle} />

      <label style={labelStyle}>Excerpt (120-200 characters for 100% SEO score)</label>
      <textarea name="excerpt" value={fields.excerpt} onChange={(event) => updateField("excerpt", event.currentTarget.value)} rows={3} maxLength={200} required style={inputStyle} />

      <label style={labelStyle}>SEO title (30-60 characters)</label>
      <input name="seoTitle" value={fields.seoTitle} onChange={(event) => updateField("seoTitle", event.currentTarget.value)} maxLength={60} style={inputStyle} />

      <label style={labelStyle}>SEO description (120-160 characters)</label>
      <textarea name="seoDescription" value={fields.seoDescription} onChange={(event) => updateField("seoDescription", event.currentTarget.value)} rows={3} maxLength={160} style={inputStyle} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div><label style={labelStyle}>Author</label><input name="author" defaultValue={post?.author || "Aarovia Group"} style={inputStyle} /></div>
        <div><label style={labelStyle}>Category</label><input name="category" defaultValue={post?.category || "Real Estate"} style={inputStyle} /></div>
      </div>

      <label style={labelStyle}>Tags (comma separated)</label>
      <input name="tags" defaultValue={post?.tags?.join(", ")} placeholder="Bangalore, investment, property" style={inputStyle} />

      <label style={labelStyle}>Content (HTML allowed; 300+ words, H2/H3 headings, and an internal link required for 100%)</label>
      <textarea name="content" value={fields.content} onChange={(event) => updateField("content", event.currentTarget.value)} rows={12} required style={inputStyle} />

      <label style={labelStyle}>Publish date</label>
      <input type="date" name="publishedAt" defaultValue={publishedDate} style={inputStyle} />

      <section aria-labelledby="blog-seo-score" style={{ border: "1px solid #cbd5e1", borderRadius: "8px", padding: "16px", margin: "8px 0 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px" }}>
          <h2 id="blog-seo-score" style={{ fontSize: "18px", margin: 0 }}>SEO readiness</h2>
          <strong aria-live="polite" style={{ color: analysis.score === 100 ? "#15803d" : "#b45309" }}>{analysis.score}%</strong>
        </div>
        <progress value={analysis.score} max={100} aria-label={`SEO checklist score ${analysis.score}%`} style={{ width: "100%", height: "12px", margin: "12px 0" }} />
        <p style={{ color: "#475569", fontSize: "13px", margin: "0 0 12px" }}>
          This is an internal content checklist, not a guarantee of search ranking or third-party SEO scores. Drafts can be saved at any score; publishing requires 100%.
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "6px" }}>
          {analysis.checks.map((check) => (
            <li key={check.id} style={{ color: check.passed ? "#166534" : "#64748b", fontSize: "13px" }}>
              {check.passed ? "PASS" : "TODO"} - {check.label}
            </li>
          ))}
        </ul>
      </section>

      <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <input type="checkbox" name="published" checked={published} onChange={(event) => { setPublished(event.currentTarget.checked); setSubmitError(""); }} /> Published (requires 100% SEO score)
      </label>
      <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <input type="checkbox" name="featured" defaultChecked={post?.featured ?? false} /> Featured post
      </label>
      <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <input type="checkbox" name="allowComments" defaultChecked={post?.allowComments ?? true} /> Allow comments
      </label>

      <button type="submit" style={{ background: "#0f172a", color: "#fff", padding: "12px 24px", border: "none", borderRadius: "6px", cursor: "pointer" }}>
        Save Post
      </button>
    </form>
  );
}
