import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { getFallbackBlogPost } from "@/lib/blog-fallback";
import { cache } from "react";

export const revalidate = 60;

const getBlogPost = cache(async (slug: string) =>
  await prisma.blogPost.findUnique({ where: { slug } }).catch(() => null) ?? getFallbackBlogPost(slug)
);

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return { title: "Post not found | Aarovia Group" };
  const seoTitle = "seoTitle" in post && typeof post.seoTitle === "string" ? post.seoTitle : "";
  const seoDescription = "seoDescription" in post && typeof post.seoDescription === "string" ? post.seoDescription : "";
  const imageAlt = "coverImageAlt" in post && typeof post.coverImageAlt === "string" && post.coverImageAlt
    ? post.coverImageAlt
    : post.title;
  const title = seoTitle || `${post.title} | Aarovia Group Blog`;
  const description = seoDescription || post.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: new Date(post.publishedAt).toISOString(),
      images: [{ url: post.coverImage, alt: imageAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [post.coverImage] },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post || !post.published || ("deletedAt" in post && post.deletedAt)) return notFound();

  const siteUrl = "https://www.aaroviagroup.com";
  const articleUrl = new URL(`/blog/${post.slug}`, siteUrl).toString();
  const updatedAt = "updatedAt" in post ? post.updatedAt : null;
  const imageAlt = "coverImageAlt" in post && typeof post.coverImageAlt === "string" && post.coverImageAlt
    ? post.coverImageAlt
    : post.title;
  const postType = "postType" in post && typeof post.postType === "string" ? post.postType : "ARTICLE";
  const dateModified =
    updatedAt instanceof Date || typeof updatedAt === "string" || typeof updatedAt === "number"
      ? new Date(updatedAt).toISOString()
      : new Date(post.publishedAt).toISOString();
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": postType === "NEWS" ? "NewsArticle" : "Article",
    headline: post.title,
    description: post.excerpt,
    image: [new URL(post.coverImage, siteUrl).toString()],
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified,
    author: { "@type": "Organization", name: "Aarovia Group" },
    publisher: { "@id": `${siteUrl}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData).replace(/</g, "\\u003c") }}
      />
      <Header />

      <div className="hero hero-video">
        <div className="hero-bg-video">
          <video autoPlay id="myVideo" loop muted playsInline poster="/images/page-header-bg.webp">
            <source src="/videos/inspaire-video-5.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-10">
              <div className="hero-content">
                <div className="section-title">
                  <h3 className="wow fadeInUp">Aarovia Group insights</h3>
                  <h1 className="text-anime-style-2" data-cursor="-opaque">{post.title}</h1>
                  <p className="wow fadeInUp" data-wow-delay="0.2s">{post.excerpt}</p>
                </div>
                <div className="hero-btn wow fadeInUp" data-wow-delay="0.4s">
                  <a className="btn-default" href="/blog">explore blogs</a>
                  <a className="btn-default btn-highlighted" href="/contact">talk to experts</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-project-single">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="project-single-sidebar">
                <div className="project-detail-list wow fadeInUp">
                  <div className="project-detail-item"><div className="icon-box"><i className="fa-regular fa-calendar"></i></div><div className="project-detail-content"><h3>published:</h3><p>{new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p></div></div>
                  <div className="project-detail-item"><div className="icon-box"><i className="fa-regular fa-circle-check"></i></div><div className="project-detail-content"><h3>category:</h3><p>{"category" in post && typeof post.category === "string" ? post.category : "Real Estate"}</p></div></div>
                  <div className="project-detail-item"><div className="icon-box"><i className="fa-regular fa-user"></i></div><div className="project-detail-content"><h3>by:</h3><p>{"author" in post && typeof post.author === "string" ? post.author : "Aarovia Group"}</p></div></div>
                  <div className="project-detail-item"><div className="icon-box"><i className="fa-solid fa-location-dot"></i></div><div className="project-detail-content"><h3>market:</h3><p>bangalore property market</p></div></div>
                </div>

                <div className="sidebar-cta-box wow fadeInUp" data-wow-delay="0.2s">
                  <div className="sidebar-cta-image"><div className="image-anime"><img alt="" src="/images/sidebar-cta-img.webp"  loading="lazy" decoding="async"/></div></div>
                  <div className="sidebar-cta-Body">
                    <div className="sidebar-cta-content"><h3>talk to property experts</h3><p>Connect with AAROVIA for property guidance, site visits, and investment consultation.</p></div>
                    <div className="sidebar-cta-contact">
                      <div className="sidebar-cta-contact-item"><div className="icon-box"><img alt="" src="/images/icon-phone-dark.svg"  loading="lazy" decoding="async"/></div><div className="cta-contact-item-content"><p>+91 8062179342</p></div></div>
                      <div className="sidebar-cta-contact-item"><div className="icon-box"><img alt="" src="/images/icon-mail.svg"  loading="lazy" decoding="async"/></div><div className="cta-contact-item-content"><p>connect@aaroviagroup.com</p></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="project-single-content">
                <div className="project-single-image"><figure className="image-anime reveal"><img alt={imageAlt} src={post.coverImage}  loading="lazy" decoding="async"/></figure></div>
                <div className="project-entry">
                  <div className="project-info">
                    <h2 className="text-anime-style-2">{post.title}</h2>
                    {"tags" in post && Array.isArray(post.tags) && post.tags.length > 0 && <p style={{ color: "#7C877F", marginBottom: "20px" }}>{post.tags.join(" | ")}</p>}
                    <div className="wow fadeInUp" style={{ lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
