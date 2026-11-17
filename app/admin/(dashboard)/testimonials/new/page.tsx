import TestimonialForm from "@/components/admin/TestimonialForm";
import { createTestimonial } from "../actions";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Add Testimonial</h1>
      <TestimonialForm action={createTestimonial} />
    </div>
  );
}
