import { Testimonial } from "@prisma/client";

const inputStyle: React.CSSProperties = { width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", marginBottom: "16px" };
const labelStyle: React.CSSProperties = { display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: 600 };

export default function TestimonialForm({ testimonial, action }: { testimonial?: Testimonial; action: (formData: FormData) => void }) {
  return (
    <form action={action} encType="multipart/form-data" style={{ background: "#fff", padding: "24px", borderRadius: "10px", maxWidth: "560px" }}>
      <label style={labelStyle}>Name</label>
      <input name="name" defaultValue={testimonial?.name} required style={inputStyle} />

      <label style={labelStyle}>Role / description (e.g. "Homeowner, Jakkur")</label>
      <input name="role" defaultValue={testimonial?.role} required style={inputStyle} />

      <label style={labelStyle}>Quote</label>
      <textarea name="quote" defaultValue={testimonial?.quote} rows={4} required style={inputStyle} />

      <label style={labelStyle}>Avatar image URL (optional)</label>
      <input name="avatar" defaultValue={testimonial?.avatar || ""} style={inputStyle} />
      <label style={labelStyle}>Upload avatar image (optional)</label>
      <input type="file" name="avatarFile" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" style={inputStyle} />

      <label style={labelStyle}>Rating (1-5)</label>
      <input type="number" min={1} max={5} name="rating" defaultValue={testimonial?.rating ?? 5} style={inputStyle} />

      <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <input type="checkbox" name="published" defaultChecked={testimonial?.published ?? true} /> Published
      </label>

      <button type="submit" style={{ background: "#0f172a", color: "#fff", padding: "12px 24px", border: "none", borderRadius: "6px", cursor: "pointer" }}>
        Save Testimonial
      </button>
    </form>
  );
}
