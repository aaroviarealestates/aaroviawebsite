"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadMediaFile } from "@/lib/media-upload";

function readForm(formData: FormData) {
  return {
    name: String(formData.get("name") || ""),
    role: String(formData.get("role") || ""),
    quote: String(formData.get("quote") || ""),
    avatar: String(formData.get("avatar") || "") || null,
    rating: Number(formData.get("rating") || 5),
    published: formData.get("published") === "on",
  };
}

export async function createTestimonial(formData: FormData) {
  const data = readForm(formData);
  data.avatar = await uploadMediaFile(formData.get("avatarFile")) || data.avatar;
  await prisma.testimonial.create({ data });
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  const data = readForm(formData);
  data.avatar = await uploadMediaFile(formData.get("avatarFile")) || data.avatar;
  await prisma.testimonial.update({ where: { id }, data });
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  const id = String(formData.get("id"));
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
}
