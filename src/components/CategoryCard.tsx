import React from "react";
import Link from "next/link";
import { PlantCategory } from "@/types";
import { ArrowRight, Leaf } from "lucide-react";
import SafeImage from "@/components/SafeImage";

interface CategoryCardProps {
  category: PlantCategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const isContained =
    category.slug === "tissue-culture" ||
    category.image_url?.includes("tissue-culture") ||
    category.slug === "garden-pond-plants" ||
    category.image_url?.includes("garden-pond-plants") ||
    category.slug === "plants-bunch" ||
    category.image_url?.includes("plants-bunch") ||
    category.slug === "potted-plants" ||
    category.image_url?.includes("potted-plants") ||
    category.slug === "terrarium-plants" ||
    category.image_url?.includes("terrarium-plants");

  return (
    <Link
      href={`/aquarium-plants/${category.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-[#34C759]/25 flex flex-col justify-between shadow-xs hover:shadow-card-hover hover:border-[#0B7A0B] hover:-translate-y-1.5 transition-all duration-300 ease-out motion-reduce:transform-none"
    >
      {/* Category Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EFF6FF]/40 flex items-center justify-center">
        <SafeImage
          src={category.image_url}
          alt={`${category.name} - Ceylon Aquatic Plants`}
          fallbackText={category.name}
          fallbackSrc="/images/potted-plants/potted-plants-category.jpg"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`${
            isContained ? "object-contain p-2.5" : "object-cover"
          } group-hover:scale-105 transition-transform duration-300 ease-out motion-reduce:transform-none`}
        />

        {/* Top badge */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-xs text-[#0B7A0B] border border-[#34C759]/30 shadow-xs">
            <Leaf className="w-3 h-3 text-[#0B7A0B]" />
            <span>Category</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-6 space-y-2 flex-grow flex flex-col justify-between bg-white">
        <div>
          <h3 className="text-base sm:text-xl font-bold text-[#0A2D5B] group-hover:text-[#0B7A0B] transition-colors font-display tracking-tight">
            {category.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7280] line-clamp-2 mt-1 leading-relaxed">
            {category.short_description}
          </p>
        </div>

        <div className="pt-3 border-t border-[#E5E7EB]">
          <span className="w-full inline-flex items-center justify-between px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold bg-[#F7C600] group-hover:bg-[#E5B700] text-[#0A2D5B] shadow-xs group-hover:shadow-md transition-all duration-300 min-h-[40px] xs:min-h-[44px]">
            <span>Explore Category</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0A2D5B] group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
