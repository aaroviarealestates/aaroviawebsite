export const fallbackProjects = [
  { title: "Luxury Apartments", category: "LUXURY_APARTMENTS", location: "Bangalore", summary: "Premium high-rise apartments in Bangalore prime locations", description: "Explore premium apartments with modern amenities, strong connectivity, and long-term investment value.", coverImage: "/images/project-1.webp", href: "/luxury-apartments" },
  { title: "Premium Villas", category: "PREMIUM_VILLAS", location: "Bangalore", summary: "Elegant private villas with world-class lifestyle amenities", description: "Discover private villas designed for comfortable family living and a refined lifestyle.", coverImage: "/images/project-2.webp", href: "/premium-villas" },
  { title: "Farm Lands", category: "FARM_LANDS", location: "Near Bangalore", summary: "Secure agricultural and investment farm lands near Bangalore", description: "Review farm land opportunities with practical access, documentation, and future growth potential.", coverImage: "/images/project-3.webp", href: "/farm-lands" },
  { title: "Villa Plots", category: "VILLA_PLOTS", location: "Bangalore", summary: "Gated villa plots with future-ready infrastructure development", description: "Find gated plotted communities with planned infrastructure and flexible ownership value.", coverImage: "/images/project-4.webp", href: "/villa-plots" },
  { title: "Commercial Properties", category: "COMMERCIAL", location: "Bangalore", summary: "Premium office spaces and commercial investment opportunities", description: "Explore commercial properties suited to business operations and investment goals.", coverImage: "/images/project-5.webp", href: "/commercial" },
  { title: "Residential Properties", category: "RESIDENTIAL", location: "Bangalore", summary: "Modern residential communities for comfortable family living", description: "Browse residential communities selected for connectivity, amenities, and everyday comfort.", coverImage: "/images/project-6.webp", href: "/residential" },
];

export function getFallbackProject(title: string) {
  return fallbackProjects.find((project) => project.title === title) ?? null;
}