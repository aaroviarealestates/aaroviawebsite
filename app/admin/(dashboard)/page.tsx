import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [projects, properties, posts, leads, testimonials, newLeads] = await Promise.all([
    prisma.property.count({ where: { recordType: "NAMED_PROJECT" } }),
    prisma.property.count({ where: { recordType: "CATEGORY_PAGE" } }),
    prisma.blogPost.count(),
    prisma.lead.count(),
    prisma.testimonial.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
  ]).catch(() => [0, 0, 0, 0, 0, 0] as const);

  const cards = [
    { label: "Featured Projects", value: projects, href: "/admin/projects" },
    { label: "Properties", value: properties, href: "/admin/properties" },
    { label: "Blog Posts", value: posts, href: "/admin/blog" },
    { label: "Leads (total)", value: leads, href: "/admin/leads" },
    { label: "New Leads", value: newLeads, href: "/admin/leads" },
    { label: "Testimonials", value: testimonials, href: "/admin/testimonials" },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: "24px" }}>Dashboard</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
        {cards.map((c) => (
          <a
            key={c.label}
            href={c.href}
            style={{ background: "#fff", padding: "20px", borderRadius: "10px", textDecoration: "none", color: "#0f172a", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
          >
            <div style={{ fontSize: "28px", fontWeight: 700 }}>{c.value}</div>
            <div style={{ color: "#64748b", marginTop: "4px" }}>{c.label}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
