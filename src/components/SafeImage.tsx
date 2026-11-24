"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Leaf } from "lucide-react";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
  fallbackText?: string;
}

export default function SafeImage({
  src,
  alt,
  fallbackSrc,
  fallbackText,
  className = "",
  ...rest
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // If source changes, reset error
  React.useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  if (!currentSrc || hasError) {
    return (
      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[#F8FAFC] text-[#6B7280] p-4 text-center select-none">
        <div className="w-10 h-10 rounded-full bg-[#F0FDF4] border border-[#E5E7EB] flex items-center justify-center mb-1.5 shadow-xs">
          <Leaf className="w-5 h-5 text-[#0B7A0B]/70" />
        </div>
        <span className="text-[11px] font-medium text-[#0A2D5B] line-clamp-1">
          {fallbackText || alt || "Ceylon Aquatic Plants"}
        </span>
        <span className="text-[10px] text-[#6B7280]/80">Nursery Specimen</span>
      </div>
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...rest}
    />
  );
}
