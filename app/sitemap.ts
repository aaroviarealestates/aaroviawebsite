import type { MetadataRoute } from "next";
import { fallbackBlogPosts } from "@/lib/blog-fallback";
import { listManagedPages } from "@/lib/page-content";
import { prisma } from "@/lib/prisma";

const siteUrl = "https://www.aaroviagroup.com";

const staticPages = [
  "/",
  "/about",
  "/services",
  "/projects",
  "/blog",
  "/contact",
  "/faqs",
  "/help",
  "/residential",
  "/commercial",
  "/luxury-apartments",
  "/premium-villas",
  "/villa-plots",
  "/farm-lands",
  "/service-single",
  "/privacy-policy",
  "/terms-conditions",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, managedPages] = await Promise.all([
    prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }).catch((error: unknown) => {
      console.error("Unable to load published blog posts for the sitemap.", error);
      return [];
    }),
    listManagedPages(),
  ]);
  const blogEntries = posts.length
    ? posts.map((post) => ({
        url: new URL(`/blog/${post.slug}`, siteUrl).toString(),
        lastModified: post.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
    : fallbackBlogPosts.map((post) => ({
        url: new URL(`/blog/${post.slug}`, siteUrl).toString(),
        lastModified: post.publishedAt,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));

  return [
    ...staticPages.map((path) => ({
      url: new URL(path, siteUrl).toString(),
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...managedPages.filter((page) => page.published).map((page) => ({
      url: new URL(`/pages/${page.slug}`, siteUrl).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...blogEntries,
  ];
}
