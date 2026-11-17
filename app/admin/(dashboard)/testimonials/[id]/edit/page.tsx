import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { updateTestimonial } from "../../actions";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const testimonial = await prisma.testimonial.findUnique({ where: { id: params.id } });
  if (!testimonial) return notFound();

  const action = updateTestimonial.bind(null, testimonial.id);

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Edit Testimonial</h1>
      <TestimonialForm testimonial={testimonial} action={action} />
    </div>
  );
}
