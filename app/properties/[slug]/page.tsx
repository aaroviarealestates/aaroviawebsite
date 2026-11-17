import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { propertiesEnabled } from "@/lib/features";

export const dynamic = "force-dynamic";

async function findPublishedProperty(slug: string) {
  return prisma.property.findFirst({ where: { slug, recordType: "CATEGORY_PAGE", published: true } });
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  if (!propertiesEnabled) notFound();

  const property = await findPublishedProperty(params.slug);
  if (!property) {
    return { title: "Property not found | Aarovia Group", robots: { index: false, follow: false } };
  }
  return {
    title: `${property.title} | Aarovia Group`,
    description: property.summary || property.description,
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: { title: property.title, description: property.summary, images: [property.coverImage] },
    twitter: {
      card: "summary_large_image",
      title: `${property.title} | Aarovia Group`,
      description: property.summary || property.description,
      images: [property.coverImage],
    },
  };
}

export default async function PropertyDetailsPage({ params }: { params: { slug: string } }) {
  if (!propertiesEnabled) notFound();

  const property = await findPublishedProperty(params.slug);
  if (!property) notFound();

  return (
    <>
      <Header />
      <main className="container" style={{ padding: "80px 0" }}>
        <div className="section-title" style={{ marginBottom: "32px" }}>
          <h3>{property.category.replace(/_/g, " ")} · {property.location}</h3>
          <h1>{property.title}</h1>
          {property.priceLabel && <p>{property.priceLabel}</p>}
          {property.summary && <p>{property.summary}</p>}
        </div>
        <img src={property.coverImage} alt={property.title} style={{ width: "100%", maxHeight: "640px", objectFit: "cover" }} />
        <div style={{ padding: "32px 0" }}>
          <div style={{ whiteSpace: "pre-wrap" }}>{property.description}</div>
          {(property.bedrooms || property.bathrooms || property.areaSqft) && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", margin: "24px 0" }}>
              {property.bedrooms && <span>{property.bedrooms} bedrooms</span>}
              {property.bathrooms && <span>{property.bathrooms} bathrooms</span>}
              {property.areaSqft && <span>{property.areaSqft} sq. ft.</span>}
            </div>
          )}
          {property.amenities.length > 0 && (
            <div>
              <h2>Amenities</h2>
              <ul>{property.amenities.map((amenity) => <li key={amenity}>{amenity}</li>)}</ul>
            </div>
          )}
          {property.gallery.length > 0 && (
            <div style={{ marginTop: "32px" }}>
              <h2>Gallery</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                {property.gallery.map((image, index) => (
                  <img key={`${image}-${index}`} src={image} alt={`${property.title} gallery ${index + 1}`} style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover" }} loading="lazy" />
                ))}
              </div>
            </div>
          )}
          <p style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <a className="btn-default" href="/contact">Enquire about this property</a>
            {property.websiteUrl && (
              <a className="btn-default" href={property.websiteUrl} target="_blank" rel="noopener noreferrer">
                Visit project website
              </a>
            )}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
