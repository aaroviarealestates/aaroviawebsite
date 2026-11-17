import { cache } from "react";
import { prisma } from "@/lib/prisma";

export type SiteSettings = {
  logoUrl: string;
  logoAlt: string;
  faviconUrl: string;
  headerPhoneLabel: string;
  headerPhone: string;
  headerPhoneIcon: string;
  footerLogoUrl: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  whatsappUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  xUrl: string;
  youtubeUrl: string;
  copyrightText: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  defaultOgImage: string;
  homeHeroEyebrow: string;
  homeHeroTitle: string;
  homeHeroHighlight: string;
  homeHeroDescription: string;
  homeHeroPrimaryLabel: string;
  homeHeroPrimaryUrl: string;
  homeHeroSecondaryLabel: string;
  homeHeroSecondaryUrl: string;
  homeHeroPoster: string;
  homeAboutHeading: string;
  homeAboutHighlight: string;
  homeAboutDescription: string;
  homeAboutImage: string;
};

export const defaultSiteSettings: SiteSettings = {
  logoUrl: "/images/logo.svg",
  logoAlt: "Aarovia Group Logo",
  faviconUrl: "",
  headerPhoneLabel: "call us any time",
  headerPhone: "+91 8062179342",
  headerPhoneIcon: "/images/icon-phone.svg",
  footerLogoUrl: "/images/logo.svg",
  contactPhone: "+91 8062179342",
  contactEmail: "connect@aaroviagroup.com",
  contactAddress: "4th Floor, Samhita Aspire, 1st Main, Old Madras Rd, Pai Layout, Bengaluru, Karnataka 560016",
  whatsappUrl: "https://wa.me/918062179342",
  facebookUrl: "https://www.facebook.com/aaroviagroup",
  linkedinUrl: "https://www.linkedin.com/company/aaroviagroup",
  instagramUrl: "https://www.instagram.com/aaroviagroup",
  xUrl: "",
  youtubeUrl: "",
  copyrightText: "Copyright © 2026 Aarovia Group. All Rights Reserved.",
  defaultSeoTitle: "Premium Real Estate & Property Advisory in Bangalore | Aarovia Group",
  defaultSeoDescription: "Explore apartments, villas, plots, farmland and commercial real estate in Bangalore with Aarovia Group's practical guidance from shortlist to site visit.",
  defaultOgImage: "/images/project-1.webp",
  homeHeroEyebrow: "real estate advisory in bangalore",
  homeHeroTitle: "Make your next Bangalore property decision with",
  homeHeroHighlight: "confidence",
  homeHeroDescription: "Compare apartments, villas, residential plots, commercial spaces, and farmland across Bangalore. Aarovia helps buyers and investors shortlist suitable properties, understand location options, arrange site visits, and navigate the purchase process with clear guidance.",
  homeHeroPrimaryLabel: "view property listings",
  homeHeroPrimaryUrl: "/projects",
  homeHeroSecondaryLabel: "speak to our team",
  homeHeroSecondaryUrl: "/contact",
  homeHeroPoster: "/images/intro-video-bg.webp",
  homeAboutHeading: "Your trusted partner for",
  homeAboutHighlight: "premium real estate in Bangalore",
  homeAboutDescription: "At AAROVIA, we help you discover the best apartments, villas, plots, farm lands and investment properties in Bangalore. Our expert team ensures transparent deals, prime locations, and high-return opportunities tailored to your needs.",
  homeAboutImage: "/images/about-img-1.webp",
};

export const getSiteSettings = cache(async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const record = await prisma.siteContent.findUnique({ where: { key: "site.settings" } });
    if (!record) return defaultSiteSettings;
    return { ...defaultSiteSettings, ...(JSON.parse(record.value) as Partial<SiteSettings>) };
  } catch {
    return defaultSiteSettings;
  }
});

export async function saveSiteSettings(settings: SiteSettings) {
  await prisma.siteContent.upsert({
    where: { key: "site.settings" },
    update: { value: JSON.stringify(settings) },
    create: { key: "site.settings", value: JSON.stringify(settings) },
  });
}
