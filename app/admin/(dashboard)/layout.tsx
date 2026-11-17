import { clearSession, requireAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";

async function logout() {
  "use server";
  clearSession();
  redirect("/admin/login");
}

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Featured Projects" },
  { href: "/admin/properties", label: "Properties" },
  { href: "/admin/blog", label: "Blog Posts" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/pages", label: "Web Pages" },
  { href: "/admin/settings", label: "Site Settings" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdminSession();

  return (
    <div className="admin-shell" style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <aside className="admin-sidebar" style={{ width: "220px", background: "#0f172a", color: "#fff", padding: "24px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 24px", marginBottom: "30px", fontWeight: 700, fontSize: "18px" }}>
          AAROVIA Admin
        </div>
        <nav>
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{ display: "block", padding: "10px 24px", color: "#cbd5e1", textDecoration: "none" }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div style={{ marginTop: "40px", padding: "0 24px" }}>
          <div style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "10px" }}>
            {session?.name} ({session?.role})
          </div>
          <form action={logout}>
            <button type="submit" style={{ background: "none", border: "1px solid #475569", color: "#fff", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>
              Log out
            </button>
          </form>
        </div>
      </aside>
      <main className="admin-main" style={{ flex: 1, background: "#f1f5f9", padding: "32px" }}>{children}</main>
    </div>
  );
}
