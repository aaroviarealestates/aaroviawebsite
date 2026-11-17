"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getFallbackProject } from "@/lib/project-fallback";
import { uploadMediaFile } from "@/lib/media-upload";

function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function readForm(formData: FormData) {
  return {
    title: String(formData.get("title") || ""),
    category: String(formData.get("category") || "RESIDENTIAL") as any,
    location: String(formData.get("location") || ""),
    priceLabel: String(formData.get("priceLabel") || ""),
    bedrooms: formData.get("bedrooms") ? Number(formData.get("bedrooms")) : null,
    bathrooms: formData.get("bathrooms") ? Number(formData.get("bathrooms")) : null,
    areaSqft: formData.get("areaSqft") ? Number(formData.get("areaSqft")) : null,
    summary: String(formData.get("summary") || ""),
    description: String(formData.get("description") || ""),
    coverImage: String(formData.get("coverImage") || ""),
    gallery: String(formData.get("gallery") || "")
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean),
    amenities: String(formData.get("amenities") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  };
}

export async function createProperty(formData: FormData) {
  const data = readForm(formData);
  const coverImage = await uploadMediaFile(formData.get("coverImageFile"));
  const galleryUploads = await Promise.all(formData.getAll("galleryFiles").map((file) => uploadMediaFile(file)));
  data.coverImage = coverImage || data.coverImage;
  data.gallery = [...data.gallery, ...galleryUploads.filter((url): url is string => Boolean(url))];
  if (!data.coverImage) throw new Error("A cover image URL or uploaded cover image is required.");
  const slug = slugify(data.title) + "-" + Math.random().toString(36).slice(2, 7);
  await prisma.property.create({ data: { ...data, slug } });
  revalidatePath("/admin/properties");
  revalidatePath("/properties");
  revalidatePath("/projects");
  revalidatePath("/");
  redirect("/admin/properties");
}

export async function updateProperty(id: string, formData: FormData) {
  const data = readForm(formData);
  const coverImage = await uploadMediaFile(formData.get("coverImageFile"));
  const galleryUploads = await Promise.all(formData.getAll("galleryFiles").map((file) => uploadMediaFile(file)));
  data.coverImage = coverImage || data.coverImage;
  data.gallery = [...data.gallery, ...galleryUploads.filter((url): url is string => Boolean(url))];
  if (!data.coverImage) throw new Error("A cover image URL or uploaded cover image is required.");
  const existing = await prisma.property.findUnique({ where: { id }, select: { slug: true } });
  await prisma.property.update({ where: { id }, data });
  revalidatePath("/admin/properties");
  revalidatePath("/properties");
  revalidatePath("/projects");
  revalidatePath("/");
  if (existing) revalidatePath(`/properties/${existing.slug}`);
  redirect("/admin/properties");
}

export async function deleteProperty(formData: FormData) {
  const id = String(formData.get("id"));
  const existing = await prisma.property.findUnique({ where: { id }, select: { slug: true } });
  await prisma.property.delete({ where: { id } });
  revalidatePath("/admin/properties");
  revalidatePath("/properties");
  revalidatePath("/projects");
  revalidatePath("/");
  if (existing) revalidatePath(`/properties/${existing.slug}`);
}

export async function importFallbackProject(formData: FormData) {
  const title = String(formData.get("title") || "");
  const project = getFallbackProject(title);
  if (!project) redirect("/admin/properties?error=missing");
  if (!process.env.DATABASE_URL || !process.env.DIRECT_URL) redirect("/admin/properties?error=config");

  try {
    await prisma.property.upsert({
      where: { slug: project.href.replace(/^\//, "") },
      update: {
        title: project.title,
        category: project.category as any,
        location: project.location,
        summary: project.summary,
        description: project.description,
        coverImage: project.coverImage,
        published: true,
      },
      create: {
        title: project.title,
        slug: project.href.replace(/^\//, ""),
        category: project.category as any,
        location: project.location,
        summary: project.summary,
        description: project.description,
        coverImage: project.coverImage,
        published: true,
        gallery: [],
        amenities: [],
      },
    });
  } catch {
    redirect("/admin/properties?error=database");
  }

  revalidatePath("/admin/properties");
  revalidatePath("/projects");
  redirect("/admin/properties?imported=1");
}
