import { listManagedPages } from "@/lib/page-content";
import { deletePage } from "./actions";

export default async function ManagedPagesAdmin({ searchParams }: { searchParams: { saved?: string } }) {
  const pages = await listManagedPages();
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Pages</h1>
        <a href="/admin/pages/new" style={{ background: "#0f172a", color: "#fff", padding: "10px 18px", borderRadius: "6px", textDecoration: "none" }}>+ New Page</a>
      </div>
      {searchParams?.saved && <p style={{ color: "#15803d", marginBottom: "16px" }}>Page saved.</p>}
      <div style={{ background: "#fff", borderRadius: "10px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#f8fafc", textAlign: "left" }}><th style={{ padding: "12px 16px" }}>Title</th><th style={{ padding: "12px 16px" }}>URL</th><th style={{ padding: "12px 16px" }}>Status</th><th style={{ padding: "12px 16px" }}>Actions</th></tr></thead>
          <tbody>
            {pages.map((page) => <tr key={page.slug} style={{ borderTop: "1px solid #eee" }}><td style={{ padding: "12px 16px" }}>{page.title}</td><td style={{ padding: "12px 16px" }}><a href={`/pages/${page.slug}`} target="_blank">/pages/{page.slug}</a></td><td style={{ padding: "12px 16px" }}>{page.published ? "Published" : "Draft"}</td><td style={{ padding: "12px 16px", display: "flex", gap: "8px" }}><a href={`/admin/pages/${page.slug}/edit`}>Edit</a><form action={deletePage}><input type="hidden" name="slug" value={page.slug} /><button type="submit" style={{ color: "#b91c1c", border: 0, background: "none", cursor: "pointer" }}>Delete</button></form></td></tr>)}
            {pages.length === 0 && <tr><td colSpan={4} style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>No custom pages yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
