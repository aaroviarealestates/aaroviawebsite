import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getManagedPage } from "@/lib/page-content";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = await getManagedPage(params.slug);
  if (!page || !page.published) {
    return { title: "Page not found | Aarovia Group", robots: { index: false, follow: false } };
  }
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription,
    alternates: { canonical: page.canonicalPath || `/pages/${page.slug}` },
    openGraph: { title: page.seoTitle || page.title, description: page.seoDescription, images: page.ogImage ? [page.ogImage] : undefined },
  };
}

export default async function ManagedPage({ params }: { params: { slug: string } }) {
  const page = await getManagedPage(params.slug);
  if (!page || !page.published) notFound();
  return (
    <>
      <Header />
      <main className="page-content container" style={{ padding: "80px 0" }}>
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
        {page.sections.filter((section) => section.enabled).map((section) => (
          <section key={section.id} style={{ marginTop: "40px" }}>
            {section.title && <h2>{section.title}</h2>}
            {section.body && <p style={{ whiteSpace: "pre-wrap" }}>{section.body}</p>}
            {section.type === "image" && section.mediaUrl && <img src={section.mediaUrl} alt={section.title || page.title} style={{ width: "100%", height: "auto" }}  loading="lazy" decoding="async"/>}
            {section.type === "video" && section.mediaUrl && <video src={section.mediaUrl} controls playsInline style={{ width: "100%" }} />}
            {section.type === "gallery" && section.mediaUrl.split(",").map((url) => url.trim()).filter(Boolean).map((url) => <img key={url} src={url} alt={section.title || page.title} style={{ width: "32%", margin: "0 1% 1% 0", height: "auto" }}  loading="lazy" decoding="async"/>)}
            {section.type === "cta" && section.linkUrl && <a className="btn-default" href={section.linkUrl}>{section.title || "Learn more"}</a>}
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
