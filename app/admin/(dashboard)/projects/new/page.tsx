import { prisma } from "@/lib/prisma";
import PropertyForm from "@/components/admin/PropertyForm";
import { createProperty } from "../../properties/actions";
import { initializeNamedProjects } from "@/lib/featured-projects-data";

export default async function NewProjectPage() {
  await initializeNamedProjects();
  const projectOrder = await prisma.property.aggregate({
    where: { recordType: "NAMED_PROJECT" },
    _max: { sortOrder: true },
  });

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Add Project</h1>
      <PropertyForm
        action={createProperty}
        defaultSortOrder={(projectOrder._max.sortOrder ?? -1) + 1}
        recordTypeOnly="NAMED_PROJECT"
      />
    </div>
  );
}
