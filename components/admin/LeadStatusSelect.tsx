"use client";

const STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "CLOSED", "SPAM"];

export default function LeadStatusSelect({ id, status, action }: { id: string; status: string; action: (formData: FormData) => void }) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        style={{ padding: "6px", borderRadius: "6px", border: "1px solid #ccc" }}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </form>
  );
}
