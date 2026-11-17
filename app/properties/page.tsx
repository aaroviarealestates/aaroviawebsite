import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Properties | Aarovia Group",
  description: "Browse published properties and projects from Aarovia Group.",
  alternates: { canonical: "/properties" },
};
export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const properties = await prisma.property.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
  });

  return (
    <>
      <Header />
      <main className="container" style={{ padding: "80px 0" }}>
        <div className="section-title" style={{ marginBottom: "32px" }}>
          <h3>aarovia property listings</h3>
          <h1>Explore available <span>properties</span></h1>
        </div>
        <div className="row">
          {properties.map((property) => (
            <div className="col-md-6 col-lg-4" key={property.id} style={{ marginBottom: "24px" }}>
              <article className="project-item" style={{ height: "100%", background: "#fff" }}>
                <a href={`/properties/${property.slug}`} aria-label={`View ${property.title}`}>
                  <img src={property.coverImage} alt={property.title} style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover" }} loading="lazy" />
                </a>
                <div className="project-content" style={{ padding: "20px" }}>
                  <h3>{property.category.replace(/_/g, " ")}</h3>
                  <h2><a href={`/properties/${property.slug}`}>{property.title}</a></h2>
                  <p>{property.location}</p>
                  {property.priceLabel && <p>{property.priceLabel}</p>}
                  <p>{property.summary}</p>
                  <a className="btn-default" href={`/properties/${property.slug}`}>View details</a>
                </div>
              </article>
            </div>
          ))}
          {properties.length === 0 && <p>No properties are currently available.</p>}
        </div>
      </main>
      <Footer />
    </>
  );
}
