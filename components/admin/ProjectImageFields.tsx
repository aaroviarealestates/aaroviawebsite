"use client";

import { upload } from "@vercel/blob/client";
import { useState } from "react";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  marginBottom: "16px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "6px",
  fontSize: "14px",
  fontWeight: 600,
};

const imageTypes = "image/jpeg,image/png,image/webp,image/gif,image/avif";

async function uploadProjectImage(file: File) {
  const filename = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const blob = await upload(`projects/${filename}`, file, {
    access: "public",
    handleUploadUrl: "/api/admin/blob-upload",
  });
  return blob.url;
}

export default function ProjectImageFields({
  coverImage: initialCoverImage,
  gallery: initialGallery,
  logo: initialLogo,
}: {
  coverImage: string;
  gallery: string[];
  logo: string;
}) {
  const [coverImage, setCoverImage] = useState(initialCoverImage);
  const [gallery, setGallery] = useState(initialGallery.join(", "));
  const [logo, setLogo] = useState(initialLogo);
  const [coverUploading, setCoverUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleCoverUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    setError("");
    setCoverUploading(true);
    try {
      setCoverImage(await uploadProjectImage(file));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "The cover image could not be uploaded.");
    } finally {
      setCoverUploading(false);
      input.value = "";
    }
  }

  async function handleGalleryUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const files = Array.from(input.files || []);
    if (files.length === 0) return;

    setError("");
    setGalleryUploading(true);
    try {
      for (const file of files) {
        const url = await uploadProjectImage(file);
        setGallery((current) => current.trim() ? `${current.trim()}, ${url}` : url);
      }
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "A gallery image could not be uploaded.");
    } finally {
      setGalleryUploading(false);
      input.value = "";
    }
  }

  async function handleLogoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    setError("");
    setLogoUploading(true);
    try {
      setLogo(await uploadProjectImage(file));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "The project logo could not be uploaded.");
    } finally {
      setLogoUploading(false);
      input.value = "";
    }
  }

  const uploadsPending = coverUploading || galleryUploading || logoUploading;

  return (
    <>
      <input type="hidden" name="mediaUploadPending" value={uploadsPending ? "on" : ""} />
      <label style={labelStyle}>Cover image URL</label>
      <input
        name="coverImage"
        type="text"
        value={coverImage}
        onChange={(event) => setCoverImage(event.currentTarget.value)}
        placeholder="/images/project.webp or a hosted URL"
        style={inputStyle}
      />
      <label style={labelStyle}>Upload cover image (max 10 MB)</label>
      <input type="file" accept={imageTypes} onChange={handleCoverUpload} style={inputStyle} />
      {coverUploading && <p role="status">Uploading cover image...</p>}
      {coverImage && (
        <img
          src={coverImage}
          alt="Project cover preview"
          style={{ display: "block", width: "100%", maxHeight: "220px", objectFit: "cover", marginBottom: "16px" }}
        />
      )}

      <label style={labelStyle}>Project logo URL (for named projects)</label>
      <input
        name="logo"
        type="text"
        value={logo}
        onChange={(event) => setLogo(event.currentTarget.value)}
        placeholder="/images/projects/logo.png or a hosted URL"
        style={inputStyle}
      />
      <label style={labelStyle}>Upload project logo</label>
      <input type="file" accept={imageTypes} onChange={handleLogoUpload} style={inputStyle} />
      {logoUploading && <p role="status">Uploading project logo...</p>}
      {logo && (
        <img
          src={logo}
          alt="Project logo preview"
          style={{ display: "block", maxWidth: "180px", maxHeight: "100px", objectFit: "contain", marginBottom: "16px" }}
        />
      )}

      <label style={labelStyle}>Gallery image URLs (comma separated)</label>
      <textarea
        name="gallery"
        value={gallery}
        onChange={(event) => setGallery(event.currentTarget.value)}
        rows={3}
        style={inputStyle}
      />
      <label style={labelStyle}>Upload gallery images (max 10 MB each)</label>
      <input type="file" accept={imageTypes} multiple onChange={handleGalleryUpload} style={inputStyle} />
      {galleryUploading && <p role="status">Uploading gallery images...</p>}
      {error && <p role="alert" style={{ color: "#b91c1c", marginBottom: "16px" }}>{error}</p>}
    </>
  );
}
