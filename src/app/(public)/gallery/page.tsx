import React from "react";
import { getGalleryImages, getGalleryAlbums } from "@/lib/data-service";
import GalleryView from "@/components/GalleryView";
import FadeIn from "@/components/animations/FadeIn";
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
    <div className="bg-white min-h-screen">
      {/* Header Banner - Clean Light Theme */}
      <section className="bg-[#F8FAFC] py-10 sm:py-16 md:py-20 border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E7EB] text-[#0B7A0B] text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>High-Resolution Photography</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2D5B] font-display">
              Aquascaping & Nursery Gallery
            </h1>
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-[#6B7280] leading-relaxed">
              Immerse yourself in our botanical photography collection featuring competition aquascapes, pristine tissue culture laboratories, and submersed plant foliage.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Gallery Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <GalleryView initialImages={images} albums={albums} />
      </section>
    </div>
  );
}
