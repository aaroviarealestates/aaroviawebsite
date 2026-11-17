import { prisma } from "@/lib/prisma";
import { updateLeadStatus, deleteLead } from "./actions";
import LeadStatusSelect from "@/components/admin/LeadStatusSelect";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []);

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Leads</h1>

      <div style={{ background: "#fff", borderRadius: "10px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", textAlign: "left" }}>
              <th style={{ padding: "12px 16px" }}>Name</th>
              <th style={{ padding: "12px 16px" }}>Contact</th>
              <th style={{ padding: "12px 16px" }}>Message</th>
              <th style={{ padding: "12px 16px" }}>Source</th>
              <th style={{ padding: "12px 16px" }}>Received</th>
              <th style={{ padding: "12px 16px" }}>Status</th>
              <th style={{ padding: "12px 16px" }}></th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} style={{ borderTop: "1px solid #eee", verticalAlign: "top" }}>
                <td style={{ padding: "12px 16px" }}>{lead.name}</td>
                <td style={{ padding: "12px 16px" }}>
                  <div>{lead.email}</div>
                  <div style={{ color: "#64748b", fontSize: "13px" }}>{lead.phone}</div>
                </td>
                <td style={{ padding: "12px 16px", maxWidth: "260px" }}>{lead.message}</td>
                <td style={{ padding: "12px 16px" }}>{lead.source}</td>
                <td style={{ padding: "12px 16px" }}>{lead.createdAt.toDateString()}</td>
                <td style={{ padding: "12px 16px" }}>
                  <LeadStatusSelect id={lead.id} status={lead.status} action={updateLeadStatus} />
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <form action={deleteLead}>
                    <input type="hidden" name="id" value={lead.id} />
                    <button type="submit" style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", padding: 0 }}>
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr><td colSpan={7} style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>No leads yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
