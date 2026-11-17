"use server";

import { requireAdminSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveManagedPage, type ManagedPage, type PageSection } from "@/lib/page-content";
import { uploadMediaFile } from "@/lib/media-upload";

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function uploadSectionMedia(formData: FormData, sections: PageSection[]) {
  for (const section of sections) {
    const uploads = await Promise.all(
      formData.getAll(`section-media-${section.id}`).map((file) =>
        uploadMediaFile(file, { allowVideo: section.type === "video" }),
      ),
    );
    const uploadedUrls = uploads.filter((url): url is string => Boolean(url));
    if (!uploadedUrls.length) continue;
    section.mediaUrl = section.type === "gallery"
      ? [...section.mediaUrl.split(",").map((url) => url.trim()).filter(Boolean), ...uploadedUrls].join(",")
      : uploadedUrls[0];
  }
}

function readSections(formData: FormData): PageSection[] {
  try {
    const sections = JSON.parse(String(formData.get("sections") || "[]")) as PageSection[];
    return sections.filter((section) => section && typeof section.id === "string").map((section) => ({
      id: section.id,
      type: ["text", "image", "video", "gallery", "cta"].includes(section.type) ? section.type : "text",
      title: String(section.title || ""),
      body: String(section.body || ""),
      mediaUrl: String(section.mediaUrl || ""),
      linkUrl: String(section.linkUrl || ""),
      enabled: section.enabled !== false,
    }));
  } catch {
    return [];
  }
}

export async function savePage(existingSlug: string | undefined, formData: FormData) {
  await requireAdminSession();
  const title = String(formData.get("title") || "").trim();
  const slug = slugify(String(formData.get("slug") || title));
  if (!title || !slug) redirect("/admin/pages/new?error=1");

  const sections = readSections(formData);
  await uploadSectionMedia(formData, sections);
  const ogImageUpload = await uploadMediaFile(formData.get("ogImageFile"));

  const page: ManagedPage = {
    slug,
    title,
    content: String(formData.get("content") || ""),
    sections,
    seoTitle: String(formData.get("seoTitle") || title),
    seoDescription: String(formData.get("seoDescription") || ""),
    canonicalPath: String(formData.get("canonicalPath") || `/pages/${slug}`),
    ogImage: ogImageUpload || String(formData.get("ogImage") || "/images/project-1.webp"),
    published: formData.get("published") === "on",
  };

  await saveManagedPage(page);
  if (existingSlug && existingSlug !== slug) revalidatePath(`/pages/${existingSlug}`);
  revalidatePath(`/pages/${slug}`);
  revalidatePath("/admin/pages");
  redirect("/admin/pages?saved=1");
}

export async function deletePage(formData: FormData) {
  await requireAdminSession();
  const slug = slugify(String(formData.get("slug") || ""));
  if (!slug) return;
  const { prisma } = await import("@/lib/prisma");
  await prisma.siteContent.delete({ where: { key: `page.${slug}` } }).catch(() => undefined);
  revalidatePath(`/pages/${slug}`);
  revalidatePath("/admin/pages");
}
