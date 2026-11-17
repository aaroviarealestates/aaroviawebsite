"use server";

import type { PropertyCategory, PropertyRecordType } from "@prisma/client";
import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getFallbackProject } from "@/lib/project-fallback";
import { initializeNamedProjects } from "@/lib/featured-projects-data";

const propertyCategories: PropertyCategory[] = [
  "LUXURY_APARTMENTS",
  "VILLA_PLOTS",
  "FARM_LANDS",
  "PREMIUM_VILLAS",
  "RESIDENTIAL",
  "COMMERCIAL",
];

const recordTypes: PropertyRecordType[] = ["CATEGORY_PAGE", "NAMED_PROJECT"];
const projectFilters = [
  "luxury-apartments",
  "villa-plots",
  "farm-lands",
  "luxury-villas",
  "residential",
  "commercial",
  "villaments",
];

function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function readForm(formData: FormData) {
  if (formData.get("mediaUploadPending") === "on") {
    throw new Error("Wait for project image uploads to finish before saving.");
  }

  const recordTypeValue = String(formData.get("recordType") || "NAMED_PROJECT");
  const recordType = recordTypes.find((value) => value === recordTypeValue);
  if (!recordType) throw new Error("Choose a valid entry type.");

  const categoryValue = String(formData.get("category") || "");
  const category = propertyCategories.find((value) => value === categoryValue);
  if (!category) throw new Error("Choose a valid project category.");

  const title = String(formData.get("title") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const coverImage = String(formData.get("coverImage") || "").trim();
  const displayCategoryValue = String(formData.get("displayCategory") || "").trim();
  const projectFilterValue = String(formData.get("projectFilter") || "").trim();
  const logo = String(formData.get("logo") || "").trim();
  const websiteUrlValue = String(formData.get("websiteUrl") || "").trim();
  const sortOrderValue = String(formData.get("sortOrder") || "0").trim();
  const sortOrder = Number(sortOrderValue);
  let websiteUrl: string | null = null;

  if (websiteUrlValue) {
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(websiteUrlValue);
    } catch {
      throw new Error("Enter a valid project website URL starting with https:// or http://.");
    }
    if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
      throw new Error("The project website URL must start with https:// or http://.");
    }
    websiteUrl = parsedUrl.toString();
  }

  if (!Number.isInteger(sortOrder) || sortOrder < 0) {
    throw new Error("Display order must be a non-negative whole number.");
  }

  if (recordType === "NAMED_PROJECT" && projectFilterValue && !projectFilters.includes(projectFilterValue)) {
    throw new Error("Choose a valid Projects page filter.");
  }

  const data = {
    recordType,
    title,
    category,
    location,
    websiteUrl,
    displayCategory: displayCategoryValue || null,
    projectFilter: projectFilterValue || null,
    logo: logo || null,
    sortOrder,
    priceLabel: String(formData.get("priceLabel") || ""),
    bedrooms: formData.get("bedrooms") ? Number(formData.get("bedrooms")) : null,
    bathrooms: formData.get("bathrooms") ? Number(formData.get("bathrooms")) : null,
    areaSqft: formData.get("areaSqft") ? Number(formData.get("areaSqft")) : null,
    summary,
    description,
    coverImage,
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

  if (!data.title) throw new Error("Project name is required.");
  if (!data.location) throw new Error("Project location is required.");
  if (!data.coverImage) throw new Error("A project cover image URL or upload is required.");

  if (recordType === "CATEGORY_PAGE") {
    if (!data.summary) throw new Error("Category page summary is required.");
    if (!data.description) throw new Error("Category page description is required.");
  } else {
    if (!data.displayCategory) throw new Error("Project display category is required.");
    if (!data.projectFilter) throw new Error("Choose a Projects page filter.");
    if (data.featured && data.published && !data.websiteUrl) {
      throw new Error("Add the project website URL before publishing it as a featured project.");
    }
  }

  return data;
}

export async function createProperty(formData: FormData) {
  await requireAdminSession();
  const data = readForm(formData);
  await initializeNamedProjects();
  const prefix = data.recordType === "NAMED_PROJECT" ? "named-" : "";
  const slug = prefix + slugify(data.title) + "-" + Math.random().toString(36).slice(2, 7);
  await prisma.property.create({ data: { ...data, slug } });
  revalidatePath("/admin/projects");
  revalidatePath("/admin/properties");
  revalidatePath("/properties");
  revalidatePath("/projects");
  revalidatePath("/about");
  revalidatePath("/");
  redirect(data.recordType === "NAMED_PROJECT" ? "/admin/projects" : "/admin/properties");
}

export async function updateProperty(id: string, formData: FormData) {
  await requireAdminSession();
  const data = readForm(formData);
  await initializeNamedProjects();
  const existing = await prisma.property.findUnique({ where: { id }, select: { slug: true } });
  await prisma.property.update({ where: { id }, data });
  revalidatePath("/admin/projects");
  revalidatePath("/admin/properties");
  revalidatePath("/properties");
  revalidatePath("/projects");
  revalidatePath("/about");
  revalidatePath("/");
  if (existing) revalidatePath(`/properties/${existing.slug}`);
  redirect(data.recordType === "NAMED_PROJECT" ? "/admin/projects" : "/admin/properties");
}

export async function deleteProperty(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id"));
  await initializeNamedProjects();
  const existing = await prisma.property.findUnique({ where: { id }, select: { slug: true } });
  await prisma.property.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/admin/properties");
  revalidatePath("/properties");
  revalidatePath("/projects");
  revalidatePath("/about");
  revalidatePath("/");
  if (existing) revalidatePath(`/properties/${existing.slug}`);
}

export async function importFallbackProject(formData: FormData) {
  await requireAdminSession();
  const title = String(formData.get("title") || "");
  const project = getFallbackProject(title);
  if (!project) redirect("/admin/properties?error=missing");
  const category = propertyCategories.find((value) => value === project.category);
  if (!category) redirect("/admin/properties?error=missing");
  if (!process.env.DATABASE_URL || !process.env.DIRECT_URL) redirect("/admin/properties?error=config");

  try {
    await prisma.property.upsert({
      where: { slug: project.href.replace(/^\//, "") },
      update: {
        title: project.title,
        recordType: "CATEGORY_PAGE",
        category,
        location: project.location,
        summary: project.summary,
        description: project.description,
        coverImage: project.coverImage,
        published: true,
      },
      create: {
        title: project.title,
        slug: project.href.replace(/^\//, ""),
        recordType: "CATEGORY_PAGE",
        category,
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
  revalidatePath("/about");
  redirect("/admin/properties?imported=1");
}
