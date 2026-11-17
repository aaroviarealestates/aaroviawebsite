import { notFound } from "next/navigation";
import PageForm from "@/components/admin/PageForm";
import { getManagedPage } from "@/lib/page-content";
import { savePage } from "../../actions";

export default async function EditManagedPage({ params }: { params: { slug: string } }) {
  const page = await getManagedPage(params.slug);
  if (!page) return notFound();
  const action = savePage.bind(null, page.slug);
  return <div><h1 style={{ marginBottom: "20px" }}>Edit Page</h1><PageForm page={page} action={action} /></div>;
}