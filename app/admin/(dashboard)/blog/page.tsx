import { prisma } from "@/lib/prisma";
import { fallbackBlogPosts } from "@/lib/blog-fallback";
import { getBlogSeoAnalysis, BLOG_POST_TYPES } from "@/lib/blog-seo";
import { deletePost, importFallbackPost } from "./actions";

export const dynamic = "force-dynamic";

export default async function BlogAdminPage({ searchParams }: { searchParams?: { imported?: string; error?: string } }) {
  const allPosts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  const posts = allPosts.filter((post) => !post.deletedAt);
  const databaseSlugs = new Set(allPosts.map((post) => post.slug));
  const fallbackOnlyPosts = fallbackBlogPosts.filter((post) => !databaseSlugs.has(post.slug));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Blog Posts</h1>
        <a href="/admin/blog/new" style={{ background: "#0f172a", color: "#fff", padding: "10px 18px", borderRadius: "6px", textDecoration: "none" }}>
          + New Post
        </a>
      </div>
      {searchParams?.imported && <p style={{ color: "#15803d", marginBottom: "16px" }}>Blog imported as a draft. Complete the SEO checklist before publishing.</p>}
      {searchParams?.error === "config" && <p style={{ color: "#b91c1c", marginBottom: "16px" }}>Blog import needs database configuration. Contact the site administrator.</p>}
      {searchParams?.error === "missing" && <p style={{ color: "#b91c1c", marginBottom: "16px" }}>That blog post could not be found.</p>}
      {searchParams?.error === "deleted" && <p style={{ color: "#b91c1c", marginBottom: "16px" }}>That post was deleted and can no longer be imported.</p>}

      <div style={{ background: "#fff", borderRadius: "10px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", textAlign: "left" }}>
              <th style={{ padding: "12px 16px" }}>Title</th>
              <th style={{ padding: "12px 16px" }}>Type</th>
              <th style={{ padding: "12px 16px" }}>Status</th>
              <th style={{ padding: "12px 16px" }}>Published</th>
              <th style={{ padding: "12px 16px" }}>SEO score</th>
              <th style={{ padding: "12px 16px" }}>Source</th>
              <th style={{ padding: "12px 16px" }}></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} style={{ borderTop: "1px solid #eee" }}>
                <td style={{ padding: "12px 16px" }}>{p.title}</td>
                <td style={{ padding: "12px 16px" }}>{BLOG_POST_TYPES.find((type) => type.value === p.postType)?.label || p.postType}</td>
                <td style={{ padding: "12px 16px" }}>{p.published ? "Published" : "Draft"}</td>
                <td style={{ padding: "12px 16px" }}>{p.publishedAt.toDateString()}</td>
                <td style={{ padding: "12px 16px" }}>{getBlogSeoAnalysis(p).score}%</td>
                <td style={{ padding: "12px 16px" }}>Database</td>
                <td style={{ padding: "12px 16px", display: "flex", gap: "10px" }}>
                  <a href={`/admin/blog/${p.id}/edit`}>Edit</a>
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={p.id} />
                    <button type="submit" style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", padding: 0 }}>
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {fallbackOnlyPosts.map((post) => (
              <tr key={post.id} style={{ borderTop: "1px solid #eee" }}>
                <td style={{ padding: "12px 16px" }}>{post.title}</td>
                <td style={{ padding: "12px 16px" }}>Article</td>
                <td style={{ padding: "12px 16px" }}>Built-in content</td>
                <td style={{ padding: "12px 16px" }}>{post.publishedAt.toDateString()}</td>
                <td style={{ padding: "12px 16px" }}>Not scored</td>
                <td style={{ padding: "12px 16px" }}>Built-in site content</td>
                <td style={{ padding: "12px 16px" }}>
                  <form action={importFallbackPost}>
                    <input type="hidden" name="slug" value={post.slug} />
                    <button type="submit" style={{ background: "#0f172a", color: "#fff", border: 0, borderRadius: "6px", padding: "7px 10px", cursor: "pointer" }}>
                      Import as draft
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {posts.length === 0 && fallbackOnlyPosts.length === 0 && (
              <tr><td colSpan={7} style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>No blog posts yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
