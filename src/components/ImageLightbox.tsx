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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Top Bar with counter & close button */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between text-white z-20">
        <div>
          <span className="text-xs font-bold text-[#F2C94C] tracking-widest uppercase">
            {current.album?.title || "Aquarium Plants Showcase"}
          </span>
          <p className="text-xs text-white/70">
            Image {currentIndex + 1} of {images.length}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#F2C94C]"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-[#F2C94C]"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-[#F2C94C]"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Main Image Container */}
      <div className="relative w-full max-w-5xl h-[70vh] sm:h-[80vh] px-4 flex flex-col items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={current.image_url}
            alt={current.title}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Caption at bottom */}
        <div className="mt-4 text-center max-w-2xl px-4">
          <h4 className="text-base sm:text-lg font-bold text-white font-display">
            {current.title}
          </h4>
          {current.description && (
            <p className="text-xs sm:text-sm text-[#E8F3EC] mt-1">
              {current.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
