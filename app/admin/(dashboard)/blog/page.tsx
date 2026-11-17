import { prisma } from "@/lib/prisma";
import { fallbackBlogPosts } from "@/lib/blog-fallback";
import { deletePost } from "./actions";
import LocalBlogPosts from "@/components/admin/LocalBlogPosts";

export const dynamic = "force-dynamic";

export default async function BlogAdminPage({ searchParams }: { searchParams?: { imported?: string; error?: string } }) {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []);
  const databaseSlugs = new Set(posts.map((post) => post.slug));
  const fallbackOnlyPosts = fallbackBlogPosts.filter((post) => !databaseSlugs.has(post.slug));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Blog Posts</h1>
        <a href="/admin/blog/new" style={{ background: "#0f172a", color: "#fff", padding: "10px 18px", borderRadius: "6px", textDecoration: "none" }}>
          + New Post
        </a>
      </div>
      {searchParams?.imported && <p style={{ color: "#15803d", marginBottom: "16px" }}>Blog imported. You can now edit it.</p>}
      {searchParams?.error === "config" && <p style={{ color: "#b91c1c", marginBottom: "16px" }}>Blog import needs database configuration. Add DATABASE_URL and DIRECT_URL to the local .env file.</p>}
      {searchParams?.error && searchParams.error !== "config" && <p style={{ color: "#b91c1c", marginBottom: "16px" }}>Blog import failed. Check the database connection and try again.</p>}

      <div style={{ background: "#fff", borderRadius: "10px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", textAlign: "left" }}>
              <th style={{ padding: "12px 16px" }}>Title</th>
              <th style={{ padding: "12px 16px" }}>Status</th>
              <th style={{ padding: "12px 16px" }}>Published</th>
              <th style={{ padding: "12px 16px" }}>Source</th>
              <th style={{ padding: "12px 16px" }}></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} style={{ borderTop: "1px solid #eee" }}>
                <td style={{ padding: "12px 16px" }}>{p.title}</td>
                <td style={{ padding: "12px 16px" }}>{p.published ? "Published" : "Draft"}</td>
                <td style={{ padding: "12px 16px" }}>{p.publishedAt.toDateString()}</td>
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
            <LocalBlogPosts posts={fallbackOnlyPosts} />
            {posts.length === 0 && fallbackOnlyPosts.length === 0 && (
              <tr><td colSpan={5} style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>No blog posts yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
