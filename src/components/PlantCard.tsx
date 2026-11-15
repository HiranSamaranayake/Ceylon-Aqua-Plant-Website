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
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#E5E9E7] shadow-card hover:shadow-card-hover hover:border-brand-emerald/40 transition-all duration-300 flex flex-col h-full">
      {/* Plant Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-cream/60">
        <Image
          src={plant.main_image_url}
          alt={`${plant.name} - Ceylon Aquatic Plants`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        {plant.category && (
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-brand-dark/85 text-brand-gold backdrop-blur-sm border border-brand-gold/30 shadow-sm">
              {plant.category.name}
            </span>
          </div>
        )}

        {/* Featured Tag */}
        {plant.is_featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-gold text-brand-surface shadow-sm">
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
            <p className="text-xs font-serif italic text-brand-emerald mb-1">
              {plant.scientific_name}
            </p>
          )}

          {/* Plant Name */}
          <h3 className="text-lg font-bold text-brand-surface group-hover:text-brand-emerald transition-colors leading-snug font-display">
            <Link href={`/plants/${plant.slug}`}>
              {plant.name}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
            {plant.short_description}
          </p>

          {/* Key Plant Specifications */}
          <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-3 gap-2 text-[11px] text-gray-500">
            {plant.placement && (
              <div className="flex items-center gap-1" title={`Placement: ${plant.placement}`}>
                <Layers className="w-3.5 h-3.5 text-brand-emerald shrink-0" />
                <span className="truncate">{plant.placement}</span>
              </div>
            )}
            {plant.light_demand && (
              <div className="flex items-center gap-1" title={`Light: ${plant.light_demand}`}>
                <Sun className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span className="truncate">{plant.light_demand}</span>
              </div>
            )}
            {plant.growth_rate && (
              <div className="flex items-center gap-1" title={`Growth: ${plant.growth_rate}`}>
                <Activity className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                <span className="truncate">{plant.growth_rate}</span>
              </div>
            )}
          </div>
        </div>

        {/* View Details Action */}
        <div className="mt-5 pt-3 border-t border-gray-100">
          <Link
            href={`/plants/${plant.slug}`}
            className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold bg-brand-cream text-brand-dark group-hover:bg-brand-emerald group-hover:text-white transition-all duration-200"
          >
            <span>View Botanical Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
