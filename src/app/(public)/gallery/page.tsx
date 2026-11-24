import React from "react";
import { getGalleryImages } from "@/lib/data-service";
import GalleryView from "@/components/GalleryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery | Ceylon Aquatic Plants (Pvt) Ltd",
  description: "High-resolution photo gallery of aquatic plant varieties, aquascape layouts, and tropical nursery basins at Ceylon Aquatic Plants (Pvt) Ltd.",
  alternates: {
    canonical: "/gallery",
  },
};

export const revalidate = 60;

export default async function GalleryPage() {
  const images = await getGalleryImages({ publishedOnly: true });

  return (
    <div className="bg-white min-h-screen py-6 sm:py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GalleryView initialImages={images} />
      </div>
    </div>
  );
}
