"use client";

import { useState } from "react";
import type { ManagedPage, PageSection } from "@/lib/page-content";

type PageFormProps = {
  page?: ManagedPage;
  action: (formData: FormData) => Promise<void>;
};

const inputStyle = { width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", marginTop: "6px", marginBottom: "14px", boxSizing: "border-box" as const };
const emptySection = (): PageSection => ({ id: crypto.randomUUID(), type: "text", title: "", body: "", mediaUrl: "", linkUrl: "", enabled: true });

export default function PageForm({ page, action }: PageFormProps) {
  const [sections, setSections] = useState<PageSection[]>(page?.sections || []);

  function updateSection(id: string, field: keyof PageSection, value: string | boolean) {
    setSections((current) => current.map((section) => section.id === id ? { ...section, [field]: value } : section));
  }

  function removeSection(id: string) {
    setSections((current) => current.filter((section) => section.id !== id));
  }

  function moveSection(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= sections.length) return;
    const next = [...sections];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    setSections(next);
  }

  return (
    <form action={action} encType="multipart/form-data" style={{ background: "#fff", padding: "24px", borderRadius: "10px", maxWidth: "900px" }}>
      <label>Title<input name="title" required defaultValue={page?.title} style={inputStyle} /></label>
      <label>Slug<input name="slug" required defaultValue={page?.slug} placeholder="about-investing" style={inputStyle} /></label>
      <label>Legacy HTML content<textarea name="content" defaultValue={page?.content} rows={10} style={inputStyle} /></label>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "24px 0 12px" }}>
        <h2 style={{ margin: 0, fontSize: "20px" }}>Page Sections</h2>
        <button type="button" onClick={() => setSections((current) => [...current, emptySection()])} style={{ background: "#0f172a", color: "#fff", border: 0, borderRadius: "6px", padding: "9px 14px" }}>+ Add Section</button>
      </div>
      <p style={{ color: "#64748b", marginTop: 0 }}>Sections are shown in order below the page title. Uploads are stored in the site media folder.</p>

      {sections.map((section, index) => (
        <fieldset key={section.id} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px", marginBottom: "14px" }}>
          <legend>Section {index + 1}</legend>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <label>Type<select value={section.type} onChange={(event) => updateSection(section.id, "type", event.target.value)} style={inputStyle}><option value="text">Text</option><option value="image">Image</option><option value="video">Video</option><option value="gallery">Gallery</option><option value="cta">Call to action</option></select></label>
            <label>Title<input value={section.title} onChange={(event) => updateSection(section.id, "title", event.target.value)} style={inputStyle} /></label>
          </div>
          <label>Body / description<textarea value={section.body} onChange={(event) => updateSection(section.id, "body", event.target.value)} rows={4} style={inputStyle} /></label>
          <label>Media URL<input value={section.mediaUrl} onChange={(event) => updateSection(section.id, "mediaUrl", event.target.value)} placeholder="/uploads/example.webp" style={inputStyle} /></label>
              <label>Upload image or video<input type="file" name={`section-media-${section.id}`} accept={section.type === "video" ? "video/mp4,video/webm" : "image/jpeg,image/png,image/webp,image/gif,image/avif"} multiple={section.type === "gallery"} style={inputStyle} /></label>
          <label>Link URL<input value={section.linkUrl} onChange={(event) => updateSection(section.id, "linkUrl", event.target.value)} style={inputStyle} /></label>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <label style={{ flex: 1 }}><input type="checkbox" checked={section.enabled} onChange={(event) => updateSection(section.id, "enabled", event.target.checked)} /> Enabled</label>
            <button type="button" onClick={() => moveSection(index, -1)}>Up</button><button type="button" onClick={() => moveSection(index, 1)}>Down</button><button type="button" onClick={() => removeSection(section.id)} style={{ color: "#b91c1c" }}>Delete</button>
          </div>
        </fieldset>
      ))}

      <input type="hidden" name="sections" value={JSON.stringify(sections)} />
      <label>SEO title<input name="seoTitle" defaultValue={page?.seoTitle} style={inputStyle} /></label>
      <label>SEO description<textarea name="seoDescription" defaultValue={page?.seoDescription} rows={3} style={inputStyle} /></label>
      <label>Canonical path<input name="canonicalPath" defaultValue={page?.canonicalPath} style={inputStyle} /></label>
      <label>Social image URL<input name="ogImage" defaultValue={page?.ogImage || "/images/project-1.webp"} style={inputStyle} /></label>
      <label>Upload social image<input type="file" name="ogImageFile" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" style={inputStyle} /></label>
      <label style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "20px" }}><input type="checkbox" name="published" defaultChecked={page?.published ?? true} /> Published</label>
      <button type="submit" style={{ background: "#0f172a", color: "#fff", padding: "12px 24px", border: "none", borderRadius: "6px" }}>{page ? "Save Page" : "Create Page"}</button>
    </form>
  );
}
