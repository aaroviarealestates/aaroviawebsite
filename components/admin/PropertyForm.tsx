import { Property } from "@prisma/client";

const CATEGORIES = [
  ["LUXURY_APARTMENTS", "Luxury Apartments"],
  ["VILLA_PLOTS", "Villa Plots"],
  ["FARM_LANDS", "Farm Lands"],
  ["PREMIUM_VILLAS", "Premium Villas"],
  ["RESIDENTIAL", "Residential"],
  ["COMMERCIAL", "Commercial"],
];

const inputStyle: React.CSSProperties = { width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", marginBottom: "16px" };
const labelStyle: React.CSSProperties = { display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: 600 };

export default function PropertyForm({ property, action }: { property?: Property; action: (formData: FormData) => void }) {
  return (
    <form action={action} encType="multipart/form-data" style={{ background: "#fff", padding: "24px", borderRadius: "10px", maxWidth: "640px" }}>
      <label style={labelStyle}>Title</label>
      <input name="title" defaultValue={property?.title} required style={inputStyle} />

      <label style={labelStyle}>Category</label>
      <select name="category" defaultValue={property?.category || "RESIDENTIAL"} style={inputStyle}>
        {CATEGORIES.map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      <label style={labelStyle}>Location</label>
      <input name="location" defaultValue={property?.location} required style={inputStyle} />

      <label style={labelStyle}>Price label (e.g. "₹95 Lakh onwards")</label>
      <input name="priceLabel" defaultValue={property?.priceLabel || ""} style={inputStyle} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
        <div>
          <label style={labelStyle}>Bedrooms</label>
          <input type="number" name="bedrooms" defaultValue={property?.bedrooms ?? ""} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Bathrooms</label>
          <input type="number" name="bathrooms" defaultValue={property?.bathrooms ?? ""} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Area (sqft)</label>
          <input type="number" name="areaSqft" defaultValue={property?.areaSqft ?? ""} style={inputStyle} />
        </div>
      </div>

      <label style={labelStyle}>Cover image URL</label>
      <input name="coverImage" defaultValue={property?.coverImage} placeholder="/images/project-1.webp or a hosted URL" style={inputStyle} />
      <label style={labelStyle}>Upload cover image</label>
      <input type="file" name="coverImageFile" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" style={inputStyle} />

      <label style={labelStyle}>Gallery image URLs (comma separated)</label>
      <textarea name="gallery" defaultValue={property?.gallery.join(", ")} rows={2} style={inputStyle} />
      <label style={labelStyle}>Upload gallery images</label>
      <input type="file" name="galleryFiles" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" multiple style={inputStyle} />

      <label style={labelStyle}>Summary (short, for listing cards)</label>
      <textarea name="summary" defaultValue={property?.summary} rows={2} style={inputStyle} />

      <label style={labelStyle}>Full description</label>
      <textarea name="description" defaultValue={property?.description} rows={6} style={inputStyle} />

      <label style={labelStyle}>Amenities (comma separated)</label>
      <input name="amenities" defaultValue={property?.amenities.join(", ")} style={inputStyle} />

      <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <input type="checkbox" name="featured" defaultChecked={property?.featured} /> Featured on homepage
      </label>
      <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <input type="checkbox" name="published" defaultChecked={property?.published ?? true} /> Published
      </label>

      <button type="submit" style={{ background: "#0f172a", color: "#fff", padding: "12px 24px", border: "none", borderRadius: "6px", cursor: "pointer" }}>
        Save Property
      </button>
    </form>
  );
}
