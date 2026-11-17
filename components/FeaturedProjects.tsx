import { getNamedProjects } from "@/lib/featured-projects-data";
import FeaturedProjectGrid from "@/components/FeaturedProjectGrid";

export default async function FeaturedProjects() {
  const projects = await getNamedProjects();
  return <FeaturedProjectGrid projects={projects} />;
}
