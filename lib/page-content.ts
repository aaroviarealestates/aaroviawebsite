import { prisma } from "@/lib/prisma";

const PAGE_PREFIX = "page.";

export type ManagedPage = {
  slug: string;
  title: string;
  content: string;
  sections: PageSection[];
  seoTitle: string;
  seoDescription: string;
  canonicalPath: string;
  ogImage: string;
  published: boolean;
};

export type PageSection = {
  id: string;
  type: "text" | "image" | "video" | "gallery" | "cta";
  title: string;
  body: string;
  mediaUrl: string;
  linkUrl: string;
  enabled: boolean;
};

function pageKey(slug: string) {
  return `${PAGE_PREFIX}${slug}`;
}

export async function listManagedPages(): Promise<ManagedPage[]> {
  try {
    const records = await prisma.siteContent.findMany({ where: { key: { startsWith: PAGE_PREFIX } }, orderBy: { updatedAt: "desc" } });
    return records.flatMap((record) => {
      try {
        const page = JSON.parse(record.value) as Partial<ManagedPage>;
        return [{ ...page, sections: Array.isArray(page.sections) ? page.sections : [] } as ManagedPage];
      } catch { return []; }
    });
  } catch {
    return [];
  }
}

export async function getManagedPage(slug: string): Promise<ManagedPage | null> {
  try {
    const record = await prisma.siteContent.findUnique({ where: { key: pageKey(slug) } });
    if (!record) return null;
    const page = JSON.parse(record.value) as Partial<ManagedPage>;
    return { ...page, sections: Array.isArray(page.sections) ? page.sections : [] } as ManagedPage;
  } catch {
    return null;
  }
}

export async function saveManagedPage(page: ManagedPage) {
  await prisma.siteContent.upsert({
    where: { key: pageKey(page.slug) },
    update: { value: JSON.stringify(page) },
    create: { key: pageKey(page.slug), value: JSON.stringify(page) },
  });
}
