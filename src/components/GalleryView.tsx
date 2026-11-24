"use client";

import React, { useState } from "react";
import { GalleryImage } from "@/types";
import ImageLightbox from "./ImageLightbox";
import SafeImage from "./SafeImage";

interface GalleryViewProps {
  initialImages: GalleryImage[];
}

export default function GalleryView({ initialImages }: GalleryViewProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (initialImages.length === 0) {
    return null;
  }

  return (
    <div>
      {/* Photos-Only Responsive Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {initialImages.map((image, index) => (
          <div
            key={image.id}
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F8FAFC] border border-[#E5E7EB] shadow-xs hover:shadow-lg hover:border-[#0B7A0B]/40 cursor-pointer transition-all duration-300"
            role="button"
            tabIndex={0}
            aria-label={`View photo ${index + 1}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setLightboxIndex(index);
              }
            }}
          >
            <SafeImage
              src={image.image_url}
              alt={image.title || "Ceylon Aquatic Plants Photography"}
              fallbackText="Ceylon Aquatic Plants"
              fallbackSrc="/images/plants-bunch/plants-bunch-category.jpg"
              fill
              sizes="(max-width: 480px) 50vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal (Clean, Photos-Only) */}
      {lightboxIndex !== null && (
        <ImageLightbox
          images={initialImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </div>
  );
}
