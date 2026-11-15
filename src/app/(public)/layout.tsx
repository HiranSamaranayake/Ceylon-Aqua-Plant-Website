import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ceylon Aquatic Plants (Pvt) Ltd",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/logo.png`,
    description: "Export grower and showcase provider of premium tropical aquatic plants, tissue-culture varieties, and pond flora in Sri Lanka.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 45, Greenhouse Valley Road",
      addressRegion: "Western Province",
      addressCountry: "LK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+94-11-234-5678",
      contactType: "Customer Support & Export Inquiries",
      availableLanguage: ["English", "Sinhala"],
    },
    sameAs: [
      "https://facebook.com/ceylonaquaticplants",
      "https://instagram.com/ceylonaquaticplants",
      "https://youtube.com/@ceylonaquaticplants",
      "https://linkedin.com/company/ceylonaquaticplants",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ceylon Aquatic Plants (Pvt) Ltd",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    potentialAction: {
      "@type": "SearchAction",
      target: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/aquarium-plants?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
