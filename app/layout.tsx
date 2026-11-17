import type { Metadata } from "next";
import Script from "next/script";
import ScriptsLoader from "@/components/ScriptsLoader";
import MobileBottomNav from "@/components/MobileBottomNav";
import { getSiteSettings } from "@/lib/site-content";

const GOOGLE_TAG_ID = "G-47GK3TNHB9";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const description = settings.defaultSeoDescription;
  const metadata: Metadata = {
    metadataBase: new URL("https://www.aaroviagroup.com"),
    title: { default: settings.defaultSeoTitle, template: "%s" },
    description,
    openGraph: {
      type: "website",
      siteName: "Aarovia Group",
      images: [{ url: settings.defaultOgImage, alt: settings.logoAlt }],
    },
    twitter: { card: "summary_large_image", images: [settings.defaultOgImage] },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };

  if (settings.faviconUrl) {
    metadata.icons = { icon: settings.faviconUrl };
  }

  return metadata;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  const siteUrl = "https://www.aaroviagroup.com";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": `${siteUrl}/#organization`,
        name: "Aarovia Group",
        url: siteUrl,
        logo: new URL(settings.logoUrl, siteUrl).toString(),
        email: settings.contactEmail,
        telephone: settings.contactPhone,
        address: {
          "@type": "PostalAddress",
          streetAddress: settings.contactAddress,
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          postalCode: "560016",
          addressCountry: "IN",
        },
        areaServed: { "@type": "City", name: "Bengaluru" },
        sameAs: [
          settings.facebookUrl,
          settings.linkedinUrl,
          settings.instagramUrl,
          settings.xUrl,
          settings.youtubeUrl,
        ].filter(Boolean),
        contactPoint: {
          "@type": "ContactPoint",
          telephone: settings.contactPhone,
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Aarovia Group",
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_TAG_ID}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/all.min.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/css/mousecursor.css" />
        <link rel="stylesheet" href="/css/slicknav.min.css" />
        <link rel="stylesheet" href="/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/css/custom.css" />
        <link rel="stylesheet" href="/css/whatsapp-fab.css" />
      </head>
      <body>
        {/* Preloader - matches original .preloader fade-out on window load */}
        <div className="preloader" style={{ display: "none" }}></div>

        {/* Magic cursor markup expected by magiccursor.js */}
        <div className="mouse-cursor cursor-outer"></div>
        <div className="mouse-cursor cursor-inner"></div>

        {children}

        <MobileBottomNav />

        <ScriptsLoader />
      </body>
    </html>
  );
}
