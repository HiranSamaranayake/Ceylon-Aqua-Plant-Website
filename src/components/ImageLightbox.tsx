"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { GalleryImage } from "@/types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const current = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      }
      if (e.key === "ArrowRight") {
        onNavigate((currentIndex + 1) % images.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, images.length, onClose, onNavigate]);

  if (!current) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-200 p-2 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Bar with counter & close button */}
      <div className="absolute top-0 left-0 right-0 p-3 sm:p-6 flex items-center justify-between text-white z-30 bg-gradient-to-b from-black/80 to-transparent">
        <div>
          <span className="text-[11px] sm:text-xs font-bold text-[#F7C600] tracking-widest uppercase">
            {current.album?.title || "Aquarium Plants Showcase"}
          </span>
          <p className="text-[11px] sm:text-xs text-white/70">
            Image {currentIndex + 1} of {images.length}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 sm:p-2.5 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#F7C600] min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors z-30 focus:outline-none focus:ring-2 focus:ring-[#F7C600] min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors z-30 focus:outline-none focus:ring-2 focus:ring-[#F7C600] min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/10"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* Main Image Container */}
      <div className="relative w-full max-w-5xl h-[65vh] xs:h-[70vh] sm:h-[75vh] md:h-[80vh] px-2 sm:px-4 flex flex-col items-center justify-center mt-8 sm:mt-0">
        <div className="relative w-full h-full">
          <Image
            src={current.image_url}
            alt={current.title}
            fill
            sizes="(max-width: 768px) 95vw, 85vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Caption at bottom */}
        <div className="mt-3 text-center max-w-2xl px-2">
          <h4 className="text-sm sm:text-lg font-bold text-white font-display">
            {current.title}
          </h4>
          {current.description && (
            <p className="text-xs sm:text-sm text-[#F0FDF4] mt-0.5 sm:mt-1 line-clamp-2">
              {current.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
