"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { defaultSiteSettings, saveSiteSettings } from "@/lib/site-content";
import { uploadMediaFile } from "@/lib/media-upload";

export async function updateSiteSettings(formData: FormData) {
  const settings = Object.fromEntries(
    Object.keys(defaultSiteSettings).map((key) => [key, String(formData.get(key) || "")]),
  ) as typeof defaultSiteSettings;

  for (const key of ["logoUrl", "faviconUrl", "headerPhoneIcon", "footerLogoUrl", "defaultOgImage", "homeHeroPoster", "homeAboutImage"] as const) {
    settings[key] = await uploadMediaFile(formData.get(`${key}File`)) || settings[key];
  }

  await saveSiteSettings(settings);
  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}
