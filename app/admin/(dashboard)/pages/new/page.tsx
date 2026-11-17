import PageForm from "@/components/admin/PageForm";
import { savePage } from "../actions";

export default function NewPage() {
  const action = savePage.bind(null, undefined);
  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>New Page</h1>
      <PageForm action={action} />
    </div>
  );
}
