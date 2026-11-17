import { prisma } from "@/lib/prisma";
import { initializeNamedProjects } from "@/lib/featured-projects-data";
import { deleteProperty } from "../properties/actions";

export default async function ProjectsListPage() {
  let projects: Awaited<ReturnType<typeof prisma.property.findMany>> = [];
  let databaseError = false;

  try {
    await initializeNamedProjects();
    projects = await prisma.property.findMany({
      where: { recordType: "NAMED_PROJECT" },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
  } catch (error) {
    console.error("Could not load named projects in the admin list.", error);
    databaseError = true;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Featured Projects</h1>
        <a href="/admin/projects/new" style={{ background: "#0f172a", color: "#fff", padding: "10px 18px", borderRadius: "6px", textDecoration: "none" }}>
          + Add Project
        </a>
      </div>
      <p style={{ color: "#475569", marginBottom: "20px" }}>
        Published projects marked Featured appear in both the homepage section and the Projects page.
      </p>
      {databaseError && (
        <p role="alert" style={{ color: "#b91c1c", marginBottom: "16px" }}>
          Projects could not be loaded. Check the database connection and reload this page.
        </p>
      )}

      <div style={{ background: "#fff", borderRadius: "10px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", textAlign: "left" }}>
              <th style={{ padding: "12px 16px" }}>Project</th>
              <th style={{ padding: "12px 16px" }}>Category</th>
              <th style={{ padding: "12px 16px" }}>Location</th>
              <th style={{ padding: "12px 16px" }}>Website</th>
              <th style={{ padding: "12px 16px" }}>Status</th>
              <th style={{ padding: "12px 16px" }}>Featured</th>
              <th style={{ padding: "12px 16px" }}></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} style={{ borderTop: "1px solid #eee" }}>
                <td style={{ padding: "12px 16px" }}>{project.title}</td>
                <td style={{ padding: "12px 16px" }}>{project.displayCategory || project.category.replace(/_/g, " ")}</td>
                <td style={{ padding: "12px 16px" }}>{project.location}</td>
                <td style={{ padding: "12px 16px" }}>
                  {project.websiteUrl ? <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">Visit</a> : "—"}
                </td>
                <td style={{ padding: "12px 16px" }}>{project.published ? "Published" : "Draft"}</td>
                <td style={{ padding: "12px 16px" }}>{project.featured ? "Yes" : "No"}</td>
                <td style={{ padding: "12px 16px", display: "flex", gap: "10px" }}>
                  <a href={`/admin/projects/${project.id}/edit`}>Edit</a>
                  <form action={deleteProperty}>
                    <input type="hidden" name="id" value={project.id} />
                    <button type="submit" style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", padding: 0 }}>
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {projects.length === 0 && !databaseError && (
              <tr><td colSpan={7} style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>No projects yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
