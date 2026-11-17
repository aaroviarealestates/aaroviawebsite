"use server";

import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getFallbackBlogPost } from "@/lib/blog-fallback";
import { uploadMediaFile } from "@/lib/media-upload";

function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function readForm(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const requestedSlug = String(formData.get("slug") || "").trim();
  const publishedAtValue = String(formData.get("publishedAt") || "");
  return {
    title,
    slug: slugify(requestedSlug || title),
    excerpt: String(formData.get("excerpt") || ""),
    content: String(formData.get("content") || ""),
    coverImage: String(formData.get("coverImage") || ""),
    author: String(formData.get("author") || "Aarovia Group"),
    category: String(formData.get("category") || "Real Estate"),
    tags: String(formData.get("tags") || "").split(",").map((tag) => tag.trim()).filter(Boolean),
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
    allowComments: formData.get("allowComments") === "on",
    publishedAt: publishedAtValue ? new Date(`${publishedAtValue}T00:00:00`) : new Date(),
    seoTitle: String(formData.get("seoTitle") || ""),
    seoDescription: String(formData.get("seoDescription") || ""),
  };
}

export async function createPost(formData: FormData) {
  await requireAdminSession();
  const data = readForm(formData);
  data.coverImage = await uploadMediaFile(formData.get("coverImageFile")) || data.coverImage;
  if (!data.coverImage) throw new Error("A cover image URL or uploaded cover image is required.");
  const slug = data.slug + "-" + Math.random().toString(36).slice(2, 7);
  await prisma.blogPost.create({ data: { ...data, slug } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect("/admin/blog");
}

export async function updatePost(id: string, formData: FormData) {
  await requireAdminSession();
  const data = readForm(formData);
  data.coverImage = await uploadMediaFile(formData.get("coverImageFile")) || data.coverImage;
  if (!data.coverImage) throw new Error("A cover image URL or uploaded cover image is required.");
  const existing = await prisma.blogPost.findUnique({ where: { id }, select: { slug: true } });
  await prisma.blogPost.update({ where: { id }, data });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  if (existing) revalidatePath(`/blog/${existing.slug}`);
  revalidatePath(`/blog/${data.slug}`);
  redirect("/admin/blog");
}

export async function deletePost(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id"));
  const existing = await prisma.blogPost.findUnique({ where: { id }, select: { slug: true } });
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  if (existing) revalidatePath(`/blog/${existing.slug}`);
}

export async function importFallbackPost(formData: FormData) {
  await requireAdminSession();
  const slug = String(formData.get("slug") || "");
  const post = getFallbackBlogPost(slug);
  if (!post) redirect("/admin/blog?error=missing");
  if (!process.env.DATABASE_URL || !process.env.DIRECT_URL) redirect("/admin/blog?error=config");

  try {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        published: post.published,
        publishedAt: post.publishedAt,
      },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        published: post.published,
        publishedAt: post.publishedAt,
      },
    });
  } catch {
    redirect("/admin/blog?error=database");
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog?imported=1");
}
