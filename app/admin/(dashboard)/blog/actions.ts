"use server";

import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getFallbackBlogPost } from "@/lib/blog-fallback";
import { uploadMediaFile } from "@/lib/media-upload";
import { getBlogSeoAnalysis, isBlogPostType } from "@/lib/blog-seo";

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
    coverImageAlt: String(formData.get("coverImageAlt") || ""),
    author: String(formData.get("author") || "Aarovia Group"),
    category: String(formData.get("category") || "Real Estate"),
    postType: String(formData.get("postType") || ""),
    tags: String(formData.get("tags") || "").split(",").map((tag) => tag.trim()).filter(Boolean),
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
    allowComments: formData.get("allowComments") === "on",
    publishedAt: publishedAtValue ? new Date(`${publishedAtValue}T00:00:00`) : new Date(),
    seoTitle: String(formData.get("seoTitle") || ""),
    seoDescription: String(formData.get("seoDescription") || ""),
    focusKeyword: String(formData.get("focusKeyword") || ""),
  };
}

function validatePost(data: ReturnType<typeof readForm>, formData: FormData, path: string) {
  const uploadedFile = formData.get("coverImageFile");
  const hasUploadedImage = uploadedFile instanceof File && uploadedFile.size > 0;

  if (!data.title || !data.excerpt.trim() || !data.content.trim()) redirect(`${path}?error=required`);
  if (!data.slug) redirect(`${path}?error=slug`);
  if (!isBlogPostType(data.postType)) redirect(`${path}?error=post-type`);
  if (!data.coverImage.trim() && !hasUploadedImage) redirect(`${path}?error=cover`);

  if (data.published) {
    const analysis = getBlogSeoAnalysis({
      ...data,
      coverImage: data.coverImage || (hasUploadedImage ? "uploaded" : ""),
    });
    if (analysis.score < 100) redirect(`${path}?error=seo&score=${analysis.score}`);
  }
}

export async function createPost(formData: FormData) {
  await requireAdminSession();
  const data = readForm(formData);
  validatePost(data, formData, "/admin/blog/new");
  const existing = await prisma.blogPost.findUnique({ where: { slug: data.slug }, select: { id: true } });
  if (existing) redirect("/admin/blog/new?error=duplicate-slug");
  data.coverImage = await uploadMediaFile(formData.get("coverImageFile")) || data.coverImage;
  await prisma.blogPost.create({ data });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  redirect("/admin/blog");
}

export async function updatePost(id: string, formData: FormData) {
  await requireAdminSession();
  const data = readForm(formData);
  const existing = await prisma.blogPost.findUnique({ where: { id }, select: { slug: true, deletedAt: true } });
  if (!existing || existing.deletedAt) redirect("/admin/blog?error=missing");
  validatePost(data, formData, `/admin/blog/${id}/edit`);
  const duplicate = await prisma.blogPost.findFirst({
    where: { slug: data.slug, id: { not: id } },
    select: { id: true },
  });
  if (duplicate) redirect(`/admin/blog/${id}/edit?error=duplicate-slug`);
  data.coverImage = await uploadMediaFile(formData.get("coverImageFile")) || data.coverImage;
  await prisma.blogPost.update({ where: { id }, data });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);
  revalidatePath(`/blog/${data.slug}`);
  redirect("/admin/blog");
}

export async function deletePost(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) redirect("/admin/blog?error=missing");
  const existing = await prisma.blogPost.findUnique({ where: { id }, select: { slug: true, deletedAt: true } });
  if (!existing || existing.deletedAt) redirect("/admin/blog?error=missing");
  await prisma.blogPost.update({ where: { id }, data: { published: false, deletedAt: new Date() } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);
}

export async function importFallbackPost(formData: FormData) {
  await requireAdminSession();
  const slug = String(formData.get("slug") || "");
  const post = getFallbackBlogPost(slug);
  if (!post) redirect("/admin/blog?error=missing");
  if (!process.env.DATABASE_URL || !process.env.DIRECT_URL) redirect("/admin/blog?error=config");

  const existing = await prisma.blogPost.findUnique({
    where: { slug: post.slug },
    select: { id: true, deletedAt: true },
  });
  if (existing?.deletedAt) redirect("/admin/blog?error=deleted");
  if (existing) redirect(`/admin/blog/${existing.id}/edit`);

  await prisma.blogPost.create({
    data: {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      coverImageAlt: `${post.title} real estate guide in Bangalore`,
      postType: "ARTICLE",
      published: false,
      publishedAt: post.publishedAt,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog?imported=1");
}
