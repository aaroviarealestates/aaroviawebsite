"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateLeadStatus(formData: FormData) {
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as any;
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
}

export async function deleteLead(formData: FormData) {
  const id = String(formData.get("id"));
  await prisma.lead.delete({ where: { id } });
  revalidatePath("/admin/leads");
}
