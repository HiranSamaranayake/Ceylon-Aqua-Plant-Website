"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GalleryImage, GalleryAlbum } from "@/types";
import ImageLightbox from "./ImageLightbox";
import { Eye, Sparkles } from "lucide-react";

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
      {/* Album Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedAlbumId("all")}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            selectedAlbumId === "all"
              ? "bg-brand-gold text-brand-surface shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          All Albums ({initialImages.length})
        </button>
        {albums.map((album) => (
          <button
            key={album.id}
            type="button"
            onClick={() => setSelectedAlbumId(album.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedAlbumId === album.id
                ? "bg-brand-gold text-brand-surface shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {album.title}
          </button>
        ))}
      </div>

      {/* Grid of Images */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 p-8 max-w-md mx-auto">
          <Sparkles className="w-10 h-10 text-brand-gold mx-auto mb-2" />
          <h3 className="text-base font-bold text-brand-surface">No photographs in this album yet</h3>
          <p className="text-xs text-gray-500 mt-1">
            New photos will appear here once published from the nursery studio.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-card hover:shadow-card-hover cursor-pointer transition-all duration-300"
            >
              <Image
                src={image.image_url}
                alt={image.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-brand-surface/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                <div className="flex items-center gap-1.5 text-brand-gold text-[11px] font-semibold uppercase tracking-wider mb-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{image.album?.title || "Aquatic Showcase"}</span>
                </div>
                <h3 className="text-base font-bold leading-snug font-display">
                  {image.title}
                </h3>
                {image.description && (
                  <p className="text-xs text-brand-muted mt-1 line-clamp-2">
                    {image.description}
                  </p>
                )}
                <span className="mt-3 text-[11px] text-brand-gold font-semibold flex items-center gap-1">
                  Click to enlarge full view &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
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
