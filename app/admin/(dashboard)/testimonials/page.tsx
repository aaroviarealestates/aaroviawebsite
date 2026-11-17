import { prisma } from "@/lib/prisma";
import { deleteTestimonial } from "./actions";

export default async function TestimonialsPage() {
  const items = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Testimonials</h1>
        <a href="/admin/testimonials/new" style={{ background: "#0f172a", color: "#fff", padding: "10px 18px", borderRadius: "6px", textDecoration: "none" }}>
          + Add Testimonial
        </a>
      </div>

      <div style={{ background: "#fff", borderRadius: "10px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", textAlign: "left" }}>
              <th style={{ padding: "12px 16px" }}>Name</th>
              <th style={{ padding: "12px 16px" }}>Role</th>
              <th style={{ padding: "12px 16px" }}>Quote</th>
              <th style={{ padding: "12px 16px" }}>Rating</th>
              <th style={{ padding: "12px 16px" }}>Status</th>
              <th style={{ padding: "12px 16px" }}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <tr key={t.id} style={{ borderTop: "1px solid #eee" }}>
                <td style={{ padding: "12px 16px" }}>{t.name}</td>
                <td style={{ padding: "12px 16px" }}>{t.role}</td>
                <td style={{ padding: "12px 16px", maxWidth: "260px" }}>{t.quote}</td>
                <td style={{ padding: "12px 16px" }}>{"★".repeat(t.rating)}</td>
                <td style={{ padding: "12px 16px" }}>{t.published ? "Published" : "Draft"}</td>
                <td style={{ padding: "12px 16px", display: "flex", gap: "10px" }}>
                  <a href={`/admin/testimonials/${t.id}/edit`}>Edit</a>
                  <form action={deleteTestimonial}>
                    <input type="hidden" name="id" value={t.id} />
                    <button type="submit" style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", padding: 0 }}>
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={6} style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>No testimonials yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
