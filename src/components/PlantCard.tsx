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
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#E3EAE4] shadow-xs hover:shadow-md hover:border-[#176B45]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Plant Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7FAF7]">
        <Image
          src={plant.main_image_url}
          alt={`${plant.name} - Ceylon Aquatic Plants`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Category Badge */}
        {plant.category && (
          <div className="absolute top-3 left-3">
            <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#E8F3EC] text-[#176B45] border border-[#E3EAE4] shadow-xs">
              {plant.category.name}
            </span>
          </div>
        )}

        {/* Featured Tag */}
        {plant.is_featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F2C94C] text-[#104D35] shadow-xs">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Scientific Name */}
          {plant.scientific_name && (
            <p className="text-xs font-serif italic text-[#176B45] mb-1">
              {plant.scientific_name}
            </p>
          )}

          {/* Plant Name */}
          <h3 className="text-base sm:text-lg font-bold text-[#202820] group-hover:text-[#176B45] transition-colors leading-snug font-display">
            <Link href={`/plants/${plant.slug}`}>
              {plant.name}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#66736A] mt-2 line-clamp-2 leading-relaxed">
            {plant.short_description}
          </p>

          {/* Key Plant Specifications */}
          <div className="mt-4 pt-3 border-t border-[#E3EAE4] grid grid-cols-3 gap-2 text-[11px] text-[#66736A]">
            {plant.placement && (
              <div className="flex items-center gap-1" title={`Placement: ${plant.placement}`}>
                <Layers className="w-3.5 h-3.5 text-[#176B45] shrink-0" />
                <span className="truncate">{plant.placement}</span>
              </div>
            )}
            {plant.light_demand && (
              <div className="flex items-center gap-1" title={`Light: ${plant.light_demand}`}>
                <Sun className="w-3.5 h-3.5 text-[#F2C94C] shrink-0" />
                <span className="truncate">{plant.light_demand}</span>
              </div>
            )}
            {plant.growth_rate && (
              <div className="flex items-center gap-1" title={`Growth: ${plant.growth_rate}`}>
                <Activity className="w-3.5 h-3.5 text-[#104D35] shrink-0" />
                <span className="truncate">{plant.growth_rate}</span>
              </div>
            )}
          </div>
        </div>

        {/* View Details Action - Yellow Action Button */}
        <div className="mt-5 pt-3 border-t border-[#E3EAE4]">
          <Link
            href={`/plants/${plant.slug}`}
            className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold bg-[#F2C94C] hover:bg-[#E5B735] text-[#173B2B] border border-transparent shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#173B2B] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
