import { prisma } from "@/lib/prisma";
import PropertyForm from "@/components/admin/PropertyForm";
import { initializeNamedProjects } from "@/lib/featured-projects-data";
import { createProperty } from "../actions";

export default async function NewPropertyPage() {
  await initializeNamedProjects();
  const propertyOrder = await prisma.property.aggregate({
    where: { recordType: "CATEGORY_PAGE" },
    _max: { sortOrder: true },
  });

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Add Property</h1>
      <PropertyForm
        action={createProperty}
        defaultSortOrder={(propertyOrder._max.sortOrder ?? -1) + 1}
        recordTypeOnly="CATEGORY_PAGE"
      />
    </div>
  );
}
