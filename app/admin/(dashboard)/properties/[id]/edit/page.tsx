import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PropertyForm from "@/components/admin/PropertyForm";
import { updateProperty } from "../../actions";

export default async function EditPropertyPage({ params }: { params: { id: string } }) {
  const property = await prisma.property.findUnique({ where: { id: params.id } });
  if (!property) return notFound();

  const action = updateProperty.bind(null, property.id);

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>
        Edit {property.recordType === "NAMED_PROJECT" ? "Named Project" : "Category Page / Property"}
      </h1>
      <PropertyForm property={property} action={action} />
    </div>
  );
}
