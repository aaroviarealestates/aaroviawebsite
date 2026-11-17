import { cache } from "react";
import { randomUUID } from "node:crypto";
import type { PropertyCategory } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { featuredProjects, type FeaturedProject } from "@/lib/featured-projects";

const initializationKey = "named_featured_projects_initialized";

const categoryByFilter: Record<string, PropertyCategory> = {
  "farm-lands": "FARM_LANDS",
  "luxury-villas": "PREMIUM_VILLAS",
  "villa-plots": "VILLA_PLOTS",
  "luxury-apartments": "LUXURY_APARTMENTS",
  villaments: "RESIDENTIAL",
};

export async function initializeNamedProjects() {
  const initializationToken = randomUUID();

  await prisma.$transaction(async (transaction) => {
    await transaction.siteContent.createMany({
      data: { key: initializationKey, value: initializationToken },
      skipDuplicates: true,
    });

    const initialization = await transaction.siteContent.findUnique({
      where: { key: initializationKey },
      select: { value: true },
    });
    if (initialization?.value !== initializationToken) return;

    await transaction.property.createMany({
      data: featuredProjects.map((project, index) => ({
        title: project.name,
        slug: `named-${project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
        recordType: "NAMED_PROJECT",
        websiteUrl: project.href,
        category: categoryByFilter[project.filter] || "RESIDENTIAL",
        displayCategory: project.category,
        projectFilter: project.filter,
        logo: project.logo,
        sortOrder: index,
        location: project.location,
        summary: "",
        description: "",
        coverImage: project.image,
        gallery: [],
        amenities: [],
        featured: true,
        published: true,
      })),
      skipDuplicates: true,
    });

    await transaction.siteContent.update({
      where: { key: initializationKey },
      data: { value: "initialized" },
    });
  });
}

function toFeaturedProject(project: {
  title: string;
  displayCategory: string | null;
  category: PropertyCategory;
  location: string;
  websiteUrl: string | null;
  logo: string | null;
  coverImage: string;
  projectFilter: string | null;
}): FeaturedProject {
  return {
    name: project.title,
    category: project.displayCategory || project.category.replace(/_/g, " ").toLowerCase(),
    location: project.location,
    href: project.websiteUrl || "",
    logo: project.logo || "",
    image: project.coverImage,
    filter: project.projectFilter || "residential",
  };
}

export const getNamedProjects = cache(async function getNamedProjects(): Promise<FeaturedProject[]> {
  try {
    const [initialization, projects] = await Promise.all([
      prisma.siteContent.findUnique({
        where: { key: initializationKey },
        select: { id: true },
      }),
      prisma.property.findMany({
        where: { recordType: "NAMED_PROJECT", published: true, featured: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      }),
    ]);
    if (!initialization) return featuredProjects;

    return projects.map(toFeaturedProject);
  } catch (error) {
    console.error("Could not load admin-managed named projects.", error);
    return featuredProjects;
  }
});
