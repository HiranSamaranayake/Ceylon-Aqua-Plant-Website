"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GalleryImage, GalleryAlbum } from "@/types";
import ImageLightbox from "./ImageLightbox";
import { StaggerContainer, StaggerItem } from "./animations/Stagger";
import { Eye, Leaf } from "lucide-react";

interface GalleryViewProps {
  initialImages: GalleryImage[];
  albums: GalleryAlbum[];
}

export default function GalleryView({ initialImages, albums }: GalleryViewProps) {
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = selectedAlbumId === "all"
    ? initialImages
    : initialImages.filter((img) => img.album_id === selectedAlbumId);

  return (
    <div>
      {/* Album Filter Tabs - Clean White & Green */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-8 sm:mb-10 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        <button
          type="button"
          onClick={() => setSelectedAlbumId("all")}
          className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 min-h-[38px] ${
            selectedAlbumId === "all"
              ? "bg-[#0B7A0B] text-white shadow-xs"
              : "bg-white text-[#0A2D5B] hover:bg-[#F8FAFC] border border-[#E5E7EB]"
          }`}
        >
          All Albums ({initialImages.length})
        </button>
        {albums.map((album) => (
          <button
            key={album.id}
            type="button"
            onClick={() => setSelectedAlbumId(album.id)}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 min-h-[38px] ${
              selectedAlbumId === album.id
                ? "bg-[#0B7A0B] text-white shadow-xs"
                : "bg-white text-[#0A2D5B] hover:bg-[#F8FAFC] border border-[#E5E7EB]"
            }`}
          >
            {album.title}
          </button>
        ))}
      </div>

      {/* Grid of Images */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-16 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] p-8 max-w-md mx-auto">
          <Leaf className="w-8 h-8 text-[#0B7A0B] mx-auto mb-2 opacity-60" />
          <h3 className="text-base font-bold text-[#0A2D5B]">No photographs in this album</h3>
          <p className="text-xs text-[#6B7280] mt-1">
            New photos will appear here once published from the nursery studio.
          </p>
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
          {filteredImages.map((image, index) => (
            <StaggerItem key={image.id}>
              <div
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#E5E7EB] shadow-xs hover:shadow-md hover:-translate-y-1 cursor-pointer transition-all duration-300"
              >
                <Image
                  src={image.image_url}
                  alt={image.title}
                  fill
                  sizes="(max-width: 480px) 50vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Mobile Caption Bar (Always visible on touch screens) */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 pt-6 sm:hidden text-white">
                  <p className="text-[11px] font-bold leading-tight line-clamp-1">{image.title}</p>
                  <span className="text-[9px] text-[#F7C600] font-medium">{image.album?.title || "Aquatic Showcase"}</span>
                </div>

                {/* Desktop Hover Overlay */}
                <div className="absolute inset-0 bg-[#0B7A0B]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 sm:p-6 hidden sm:flex flex-col justify-end text-white">
                  <div className="flex items-center gap-1.5 text-[#F7C600] text-[11px] font-bold uppercase tracking-wider mb-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{image.album?.title || "Aquatic Showcase"}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold leading-snug font-display">
                    {image.title}
                  </h3>
                  {image.description && (
                    <p className="text-xs text-[#F0FDF4] mt-1 line-clamp-2">
                      {image.description}
                    </p>
                  )}
                  <span className="mt-2.5 text-[11px] text-[#F7C600] font-bold flex items-center gap-1">
                    Click to view full photo &rarr;
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <ImageLightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </div>
  );
}
