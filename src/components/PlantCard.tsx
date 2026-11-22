import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plant } from "@/types";
import { ArrowRight, Sun, Layers, Activity } from "lucide-react";

interface PlantCardProps {
  plant: Plant;
}

export default function PlantCard({ plant }: PlantCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs hover:shadow-md hover:border-[#0B7A0B]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Plant Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F8FAFC] flex items-center justify-center">
        <Image
          src={plant.main_image_url}
          alt={`${plant.name} - Ceylon Aquatic Plants`}
          fill
          sizes="(max-width: 480px) 50vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className={`${
            plant.main_image_url?.includes("tissue-culture") || plant.category?.slug === "tissue-culture"
              ? "object-contain p-2.5"
              : plant.main_image_url?.includes("garden-pond-plants") || plant.category?.slug === "garden-pond-plants"
              ? "object-contain p-2"
              : "object-cover"
          } group-hover:scale-105 transition-transform duration-500`}
        />

        {/* Category Badge */}
        {plant.category && (
          <div className="absolute top-3 left-3">
            <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F0FDF4] text-[#0B7A0B] border border-[#E5E7EB] shadow-xs">
              {plant.category.name}
            </span>
          </div>
        )}

        {/* Featured Tag */}
        {plant.is_featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F7C600] text-[#0A2D5B] shadow-xs">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5 xs:p-4 sm:p-5 md:p-6 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Scientific Name */}
          {plant.scientific_name && (
            <p className="text-[11px] xs:text-xs font-serif italic text-[#0B7A0B] mb-1 truncate">
              {plant.scientific_name}
            </p>
          )}

          {/* Plant Name */}
          <h3 className="text-sm xs:text-base sm:text-lg font-bold text-[#0A2D5B] group-hover:text-[#0B7A0B] transition-colors leading-snug font-display line-clamp-2">
            <Link href={`/plants/${plant.slug}`}>
              {plant.name}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1.5 line-clamp-2 leading-relaxed">
            {plant.short_description}
          </p>

          {/* Key Plant Specifications */}
          <div className="mt-3 pt-2.5 border-t border-[#E5E7EB] flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] xs:text-[11px] text-[#6B7280]">
            {plant.placement && (
              <div className="flex items-center gap-1 shrink-0" title={`Placement: ${plant.placement}`}>
                <Layers className="w-3 h-3 text-[#0B7A0B] shrink-0" />
                <span className="truncate max-w-[100px]">{plant.placement}</span>
              </div>
            )}
            {plant.light_demand && (
              <div className="flex items-center gap-1 shrink-0" title={`Light: ${plant.light_demand}`}>
                <Sun className="w-3 h-3 text-[#F7C600] shrink-0" />
                <span className="truncate max-w-[100px]">{plant.light_demand}</span>
              </div>
            )}
            {plant.growth_rate && (
              <div className="flex items-center gap-1 shrink-0" title={`Growth: ${plant.growth_rate}`}>
                <Activity className="w-3 h-3 text-[#0A2D5B] shrink-0" />
                <span className="truncate max-w-[100px]">{plant.growth_rate}</span>
              </div>
            )}
          </div>
        </div>

        {/* View Details Action - Touch Friendly Yellow Action Button */}
        <div className="mt-4 pt-2.5 border-t border-[#E5E7EB]">
          <Link
            href={`/plants/${plant.slug}`}
            className="w-full inline-flex items-center justify-between px-3.5 py-2 xs:py-2.5 rounded-xl text-xs font-bold bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] border border-transparent shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 min-h-[40px] xs:min-h-[44px]"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0A2D5B] group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}
