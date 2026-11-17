import { prisma } from "@/lib/prisma";
import { featuredProjects } from "@/lib/featured-projects";
import FeaturedProjectGrid from "@/components/FeaturedProjectGrid";

const categoryFilters: Record<string, string> = {
  LUXURY_APARTMENTS: "luxury-apartments",
  VILLA_PLOTS: "villa-plots",
  FARM_LANDS: "farm-lands",
  PREMIUM_VILLAS: "luxury-villas",
  RESIDENTIAL: "residential",
  COMMERCIAL: "commercial",
};

export default async function FeaturedProjects() {
  const properties = await prisma.property.findMany({
    where: { published: true, featured: true },
    orderBy: { updatedAt: "desc" },
  }).catch(() => []);

  const editableProjects = properties.map((property) => ({
    name: property.title,
    category: property.category.replace(/_/g, " ").toLowerCase(),
    location: property.location,
    href: `/properties/${property.slug}`,
    logo: "",
    image: property.coverImage,
    filter: categoryFilters[property.category] || "residential",
    external: false,
  }));

  return <FeaturedProjectGrid projects={[...editableProjects, ...featuredProjects]} />;
}
