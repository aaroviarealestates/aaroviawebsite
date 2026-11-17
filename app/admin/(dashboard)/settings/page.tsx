import { getSiteSettings } from "@/lib/site-content";
import { updateSiteSettings } from "./actions";

const fields = [
  ["logoUrl", "Header logo URL"],
  ["logoAlt", "Logo alt text"],
  ["faviconUrl", "Favicon URL"],
  ["headerPhoneLabel", "Header phone label"],
  ["headerPhone", "Header phone number"],
  ["headerPhoneIcon", "Header phone icon URL"],
  ["footerLogoUrl", "Footer logo URL"],
  ["contactPhone", "Contact phone"],
  ["contactEmail", "Contact email"],
  ["contactAddress", "Contact address"],
  ["whatsappUrl", "WhatsApp URL"],
  ["facebookUrl", "Facebook URL"],
  ["linkedinUrl", "LinkedIn URL"],
  ["instagramUrl", "Instagram URL"],
  ["xUrl", "X URL"],
  ["youtubeUrl", "YouTube URL"],
  ["copyrightText", "Copyright text"],
  ["defaultSeoTitle", "Default SEO title"],
  ["defaultSeoDescription", "Default SEO description"],
  ["defaultOgImage", "Default social image URL"],
  ["homeHeroEyebrow", "Homepage hero eyebrow"],
  ["homeHeroTitle", "Homepage hero heading"],
  ["homeHeroHighlight", "Homepage hero highlighted text"],
  ["homeHeroDescription", "Homepage hero description"],
  ["homeHeroPrimaryLabel", "Homepage primary button label"],
  ["homeHeroPrimaryUrl", "Homepage primary button URL"],
  ["homeHeroSecondaryLabel", "Homepage secondary button label"],
  ["homeHeroSecondaryUrl", "Homepage secondary button URL"],
  ["homeHeroPoster", "Homepage hero video poster URL"],
  ["homeAboutHeading", "Homepage about heading"],
  ["homeAboutHighlight", "Homepage about highlighted text"],
  ["homeAboutDescription", "Homepage about description"],
  ["homeAboutImage", "Homepage about image URL"],
] as const;

const imageFields = new Set(["logoUrl", "faviconUrl", "headerPhoneIcon", "footerLogoUrl", "defaultOgImage", "homeHeroPoster", "homeAboutImage"]);

export default async function SettingsPage({ searchParams }: { searchParams: { saved?: string } }) {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 style={{ marginBottom: "8px" }}>Site Settings</h1>
      <p style={{ color: "#64748b", marginBottom: "24px" }}>Manage shared branding, contact details, homepage copy and images, social profiles, copyright, and default SEO.</p>
      {searchParams?.saved && <p style={{ color: "#15803d", marginBottom: "16px" }}>Settings saved.</p>}
      <form action={updateSiteSettings} encType="multipart/form-data" style={{ background: "#fff", padding: "24px", borderRadius: "10px", maxWidth: "760px" }}>
        {fields.map(([name, label]) => {
          if (imageFields.has(name)) {
            return (
              <div key={name} style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>{label}</label>
                <input name={name} defaultValue={settings[name]} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", display: "block", marginBottom: "10px", fontWeight: 400 }} />
                <input type="file" name={`${name}File`} accept="image/jpeg,image/png,image/webp,image/gif,image/avif" style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }} />
                <small style={{ display: "block", marginTop: "6px", color: "#64748b" }}>Upload an image or paste a direct image URL.</small>
              </div>
            );
          }

          return (
            <label key={name} style={{ display: "block", marginBottom: "16px", fontWeight: 600 }}>
              {label}
              {name === "contactAddress" || name === "defaultSeoDescription" || name === "copyrightText" || name === "homeHeroDescription" || name === "homeAboutDescription" ? (
                <textarea name={name} defaultValue={settings[name]} rows={name === "defaultSeoDescription" || name === "homeHeroDescription" || name === "homeAboutDescription" ? 3 : 2} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", display: "block", marginTop: "6px", fontWeight: 400 }} />
              ) : (
                <input name={name} defaultValue={settings[name]} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", display: "block", marginTop: "6px", fontWeight: 400 }} />
              )}
            </label>
          );
        })}
        <button type="submit" style={{ background: "#0f172a", color: "#fff", padding: "12px 24px", border: "none", borderRadius: "6px", cursor: "pointer" }}>Save Settings</button>
      </form>
    </div>
  );
}
