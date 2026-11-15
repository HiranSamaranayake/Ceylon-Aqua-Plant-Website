import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#102D24",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    template: "%s | Ceylon Aquatic Plants (Pvt) Ltd",
    default: "Ceylon Aquatic Plants (Pvt) Ltd | Premium Tropical Aquatic Flora Exporter",
  },
  description: "Official online showroom for Ceylon Aquatic Plants (Pvt) Ltd. Discover bunched, potted, terrarium, garden pond, and sterile tissue-culture aquatic flora sustainably cultivated in Sri Lanka.",
  keywords: [
    "Aquarium plants Sri Lanka",
    "Aquatic plants Sri Lanka",
    "Live aquarium plants exporter",
    "Aquascaping flora",
    "Tissue culture aquarium plants",
    "Potted aquarium plants",
    "Bunched aquatic plants",
    "Garden pond plants",
    "Terrarium flora",
  ],
  authors: [{ name: "Ceylon Aquatic Plants (Pvt) Ltd" }],
  creator: "Ceylon Aquatic Plants (Pvt) Ltd",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Ceylon Aquatic Plants (Pvt) Ltd",
    title: "Ceylon Aquatic Plants (Pvt) Ltd | Pure Tropical Aquatic Flora",
    description: "Premium aquarium and terrarium plants sustainably cultivated under natural tropical sunshine in Sri Lanka.",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Ceylon Aquatic Plants (Pvt) Ltd Official Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ceylon Aquatic Plants (Pvt) Ltd",
    description: "Exporting premium live aquarium plants from Sri Lanka worldwide.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-brand-cream text-brand-surface">
        {children}
      </body>
    </html>
  );
}
