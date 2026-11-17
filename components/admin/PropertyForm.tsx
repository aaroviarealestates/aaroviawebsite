import type { Property, PropertyRecordType } from "@prisma/client";
import ProjectImageFields from "./ProjectImageFields";

const CATEGORIES = [
  ["LUXURY_APARTMENTS", "Luxury Apartments"],
  ["VILLA_PLOTS", "Villa Plots"],
  ["FARM_LANDS", "Farm Lands"],
  ["PREMIUM_VILLAS", "Premium Villas"],
  ["RESIDENTIAL", "Residential"],
  ["COMMERCIAL", "Commercial"],
];

const PROJECT_FILTERS = [
  ["luxury-apartments", "Luxury Apartments"],
  ["villa-plots", "Villa Plots"],
  ["farm-lands", "Farm Lands"],
  ["luxury-villas", "Premium Villas"],
  ["residential", "Residential"],
  ["commercial", "Commercial"],
  ["villaments", "Villaments"],
];

const inputStyle: React.CSSProperties = { width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", marginBottom: "16px" };
const labelStyle: React.CSSProperties = { display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: 600 };

export default function PropertyForm({
  property,
  action,
  defaultSortOrder,
  recordTypeOnly,
}: {
  property?: Property;
  action: (formData: FormData) => void;
  defaultSortOrder?: number;
  recordTypeOnly?: PropertyRecordType;
}) {
  return (
    <form action={action} style={{ background: "#fff", padding: "24px", borderRadius: "10px", maxWidth: "640px" }}>
      <p style={{ marginTop: 0, color: "#475569" }}>
        {recordTypeOnly === "NAMED_PROJECT"
          ? "Published projects marked Featured appear in both the homepage section and the Projects page."
          : "Category properties appear on their respective category pages."}
      </p>

      {recordTypeOnly ? (
        <input type="hidden" name="recordType" value={recordTypeOnly} />
      ) : (
        <>
          <label style={labelStyle}>Entry type</label>
          <select
            name="recordType"
            defaultValue={property?.recordType || "NAMED_PROJECT"}
            style={inputStyle}
          >
            <option value="NAMED_PROJECT">Named project</option>
            <option value="CATEGORY_PAGE">Category page / property</option>
          </select>
        </>
      )}

      <label style={labelStyle}>Project or category name</label>
      <input name="title" defaultValue={property?.title} required style={inputStyle} />

      <label style={labelStyle}>Property category</label>
      <select name="category" defaultValue={property?.category || "RESIDENTIAL"} style={inputStyle}>
        {CATEGORIES.map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      <label style={labelStyle}>Project display category (for named projects)</label>
      <input
        name="displayCategory"
        defaultValue={property?.displayCategory || ""}
        placeholder="e.g. 3 & 4 BHK residences"
        style={inputStyle}
      />

      <label style={labelStyle}>Projects page filter (for named projects)</label>
      <select name="projectFilter" defaultValue={property?.projectFilter || ""} style={inputStyle}>
        <option value="">Select a filter</option>
        {PROJECT_FILTERS.map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      <label style={labelStyle}>Location</label>
      <input name="location" defaultValue={property?.location} required style={inputStyle} />

      <label style={labelStyle}>Project website URL (required for published featured projects)</label>
      <input
        type="url"
        name="websiteUrl"
        defaultValue={property?.websiteUrl || ""}
        placeholder="https://example.com"
        style={inputStyle}
      />

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

      <ProjectImageFields
        coverImage={property?.coverImage || ""}
        gallery={property?.gallery || []}
        logo={property?.logo || ""}
      />

      <label style={labelStyle}>Display order</label>
      <input type="number" name="sortOrder" min="0" defaultValue={property?.sortOrder ?? defaultSortOrder ?? 0} style={inputStyle} />

      <label style={labelStyle}>Summary (required for category pages)</label>
      <textarea name="summary" defaultValue={property?.summary} rows={2} style={inputStyle} />

      <label style={labelStyle}>Full description (required for category pages)</label>
      <textarea name="description" defaultValue={property?.description} rows={6} style={inputStyle} />

      <label style={labelStyle}>Amenities (comma separated)</label>
      <input name="amenities" defaultValue={property?.amenities.join(", ")} style={inputStyle} />

      <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <input type="checkbox" name="featured" defaultChecked={property?.featured ?? true} /> Show in Featured Projects (named projects)
      </label>
      <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <input type="checkbox" name="published" defaultChecked={property?.published ?? true} /> Published
      </label>

      <button type="submit" style={{ background: "#0f172a", color: "#fff", padding: "12px 24px", border: "none", borderRadius: "6px", cursor: "pointer" }}>
        Save Project
      </button>
    </form>
  );
}
