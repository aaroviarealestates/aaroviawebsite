import { BlogPost } from "@prisma/client";

const inputStyle: React.CSSProperties = { width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", marginBottom: "16px" };
const labelStyle: React.CSSProperties = { display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: 600 };

type EditableBlogPost = BlogPost & { author?: string; category?: string; tags?: string[]; seoTitle?: string; seoDescription?: string; featured?: boolean; allowComments?: boolean };

export default function BlogPostForm({ post, action }: { post?: EditableBlogPost; action: (formData: FormData) => void }) {
  const publishedDate = post?.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 10) : "";
  return (
    <form action={action} encType="multipart/form-data" style={{ background: "#fff", padding: "24px", borderRadius: "10px", maxWidth: "640px" }}>
      <label style={labelStyle}>Title</label>
      <input name="title" defaultValue={post?.title} required style={inputStyle} />

      <label style={labelStyle}>URL slug</label>
      <input name="slug" defaultValue={post?.slug} placeholder="my-property-guide" required style={inputStyle} />

      <label style={labelStyle}>Cover image URL</label>
      <input name="coverImage" defaultValue={post?.coverImage} placeholder="/images/post-1.webp or a hosted URL" style={inputStyle} />
      <label style={labelStyle}>Upload cover image</label>
      <input type="file" name="coverImageFile" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" style={inputStyle} />

      <label style={labelStyle}>Excerpt (short summary for the blog listing)</label>
      <textarea name="excerpt" defaultValue={post?.excerpt} rows={2} required style={inputStyle} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div><label style={labelStyle}>Author</label><input name="author" defaultValue={post?.author || "Aarovia Group"} style={inputStyle} /></div>
        <div><label style={labelStyle}>Category</label><input name="category" defaultValue={post?.category || "Real Estate"} style={inputStyle} /></div>
      </div>

      <label style={labelStyle}>Tags (comma separated)</label>
      <input name="tags" defaultValue={post?.tags?.join(", ")} placeholder="Bangalore, investment, property" style={inputStyle} />

      <label style={labelStyle}>Content (HTML allowed)</label>
      <textarea name="content" defaultValue={post?.content} rows={10} required style={inputStyle} />

      <label style={labelStyle}>Publish date</label>
      <input type="date" name="publishedAt" defaultValue={publishedDate} style={inputStyle} />

      <label style={labelStyle}>SEO title</label>
      <input name="seoTitle" defaultValue={post?.seoTitle || ""} placeholder="Optional search title" style={inputStyle} />

      <label style={labelStyle}>SEO description</label>
      <textarea name="seoDescription" defaultValue={post?.seoDescription || ""} rows={2} placeholder="Optional search description" style={inputStyle} />

      <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <input type="checkbox" name="published" defaultChecked={post?.published ?? true} /> Published
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
