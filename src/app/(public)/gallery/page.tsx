import React from "react";
import { getGalleryImages, getGalleryAlbums } from "@/lib/data-service";
import GalleryView from "@/components/GalleryView";
import { Camera } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aquarium & Nursery Photo Gallery",
  description: "View high-resolution photographs of aquatic plant varieties, aquascape layouts, and our tropical nursery basins at Ceylon Aquatic Plants (Pvt) Ltd.",
  alternates: {
    canonical: "/gallery",
  },
};

export const revalidate = 60;

export default async function GalleryPage() {
  const [images, albums] = await Promise.all([
    getGalleryImages({ publishedOnly: true }),
    getGalleryAlbums(),
  ]);

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header Banner */}
      <section className="bg-brand-dark text-white py-16 sm:py-20 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-brand-gold text-xs font-semibold uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>High-Resolution Photography</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Aquascaping & Nursery Gallery
          </h1>
          <p className="mt-4 text-sm sm:text-base text-brand-muted leading-relaxed">
            Immerse yourself in our botanical photography collection featuring competition aquascapes, pristine tissue culture laboratories, and submersed plant foliage.
          </p>
        </div>
      </section>

      {/* Gallery Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <GalleryView initialImages={images} albums={albums} />
      </section>
    </div>
  );
}
