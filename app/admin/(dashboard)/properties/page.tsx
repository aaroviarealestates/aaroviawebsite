import { prisma } from "@/lib/prisma";
import { fallbackProjects } from "@/lib/project-fallback";
import { deleteProperty, importFallbackProject } from "./actions";

export default async function PropertiesListPage({ searchParams }: { searchParams?: { imported?: string; error?: string } }) {
  const properties = await prisma.property.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []);
  const propertyTitles = new Set(properties.map((property) => property.title));
  const fallbackOnlyProjects = fallbackProjects.filter((project) => !propertyTitles.has(project.title));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Properties</h1>
        <a href="/admin/properties/new" style={{ background: "#0f172a", color: "#fff", padding: "10px 18px", borderRadius: "6px", textDecoration: "none" }}>
          + Add Property
        </a>
      </div>
      {searchParams?.imported && <p style={{ color: "#15803d", marginBottom: "16px" }}>Project imported. You can now edit it.</p>}
      {searchParams?.error === "config" && <p style={{ color: "#b91c1c", marginBottom: "16px" }}>Project import needs database configuration. Add DATABASE_URL and DIRECT_URL to the local .env file.</p>}
      {searchParams?.error && searchParams.error !== "config" && <p style={{ color: "#b91c1c", marginBottom: "16px" }}>Project import failed. Check the database connection and try again.</p>}

      <div style={{ background: "#fff", borderRadius: "10px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", textAlign: "left" }}>
              <th style={{ padding: "12px 16px" }}>Title</th>
              <th style={{ padding: "12px 16px" }}>Category</th>
              <th style={{ padding: "12px 16px" }}>Location</th>
              <th style={{ padding: "12px 16px" }}>Status</th>
              <th style={{ padding: "12px 16px" }}>Source</th>
              <th style={{ padding: "12px 16px" }}></th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p.id} style={{ borderTop: "1px solid #eee" }}>
                <td style={{ padding: "12px 16px" }}>{p.title}{p.featured ? " ⭐" : ""}</td>
                <td style={{ padding: "12px 16px" }}>{p.category.replace(/_/g, " ")}</td>
                <td style={{ padding: "12px 16px" }}>{p.location}</td>
                <td style={{ padding: "12px 16px" }}>{p.published ? "Published" : "Draft"}</td>
                <td style={{ padding: "12px 16px" }}>Database</td>
                <td style={{ padding: "12px 16px", display: "flex", gap: "10px" }}>
                  <a href={`/admin/properties/${p.id}/edit`}>Edit</a>
                  <form action={deleteProperty}>
                    <input type="hidden" name="id" value={p.id} />
                    <button type="submit" style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", padding: 0 }}>
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {fallbackOnlyProjects.map((project) => (
              <tr key={project.title} style={{ borderTop: "1px solid #eee" }}>
                <td style={{ padding: "12px 16px" }}>{project.title}</td>
                <td style={{ padding: "12px 16px" }}>{project.category.replace(/_/g, " ")}</td>
                <td style={{ padding: "12px 16px" }}>{project.location}</td>
                <td style={{ padding: "12px 16px" }}>Published</td>
                <td style={{ padding: "12px 16px" }}>Built-in site content</td>
                <td style={{ padding: "12px 16px" }}>
                  <form action={importFallbackProject}>
                    <input type="hidden" name="title" value={project.title} />
                    <button type="submit" style={{ background: "#0f172a", color: "#fff", border: 0, borderRadius: "6px", padding: "7px 10px", cursor: "pointer" }}>
                      Import to edit
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {properties.length === 0 && fallbackOnlyProjects.length === 0 && (
              <tr><td colSpan={6} style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>No properties yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
