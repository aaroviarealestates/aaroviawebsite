import { notFound } from "next/navigation";
import PropertyForm from "@/components/admin/PropertyForm";
import { prisma } from "@/lib/prisma";
import { updateProperty } from "../../../properties/actions";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.property.findFirst({
    where: { id: params.id, recordType: "NAMED_PROJECT" },
  });
  if (!project) notFound();

  const action = updateProperty.bind(null, project.id);

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Edit Project</h1>
      <PropertyForm property={project} action={action} recordTypeOnly="NAMED_PROJECT" />
    </div>
  );
}
