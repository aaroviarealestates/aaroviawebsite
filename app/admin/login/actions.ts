"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession } from "@/lib/auth";

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "").toLowerCase().trim();
  const password = String(formData.get("password") || "");

  if (!process.env.DATABASE_URL && process.env.NODE_ENV !== "production") {
    const fallbackEmail = process.env.SEED_ADMIN_EMAIL?.toLowerCase().trim();
    const fallbackPassword = process.env.SEED_ADMIN_PASSWORD;
    if (!fallbackEmail || !fallbackPassword) redirect("/admin/login?error=config");
    if (email !== fallbackEmail || password !== fallbackPassword) redirect("/admin/login?error=1");
    await createSession({ id: "local-admin", email: fallbackEmail, name: "Aarovia Admin", role: "ADMIN" });
    redirect("/admin");
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) redirect("/admin/login?error=1");

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) redirect("/admin/login?error=1");

  await createSession({ id: user.id, email: user.email, name: user.name, role: user.role });
  redirect("/admin");
}
