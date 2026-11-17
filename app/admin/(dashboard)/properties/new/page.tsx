import PropertyForm from "@/components/admin/PropertyForm";
import { createProperty } from "../actions";

export default function NewPropertyPage() {
  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Add Property</h1>
      <PropertyForm action={createProperty} />
    </div>
  );
}
