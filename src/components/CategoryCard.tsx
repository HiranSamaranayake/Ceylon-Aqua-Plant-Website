import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PlantCategory } from "@/types";
import { ArrowRight, Leaf } from "lucide-react";

interface CategoryCardProps {
  category: PlantCategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/aquarium-plants/${category.slug}`}
      className="group relative rounded-2xl overflow-hidden bg-brand-surface border border-brand-border flex flex-col justify-end p-6 h-80 sm:h-96 shadow-card hover:shadow-card-hover hover:border-brand-gold/60 transition-all duration-500"
    >
      {/* Background Image */}
      <Image
        src={category.image_url}
        alt={`${category.name} - Ceylon Aquatic Plants`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
      />

      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-brand-surface/70 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300" />

      {/* Decorative top badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-dark/80 text-brand-gold backdrop-blur-md border border-brand-gold/30">
          <Leaf className="w-3 h-3" />
          <span>Category</span>
        </span>
      </div>

      {/* Card Body */}
      <div className="relative z-10 space-y-2.5">
        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-brand-gold transition-colors font-display tracking-tight">
          {category.name}
        </h3>
        <p className="text-xs sm:text-sm text-brand-muted line-clamp-2 leading-relaxed">
          {category.short_description}
        </p>

        <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-brand-gold group-hover:translate-x-1 transition-transform">
          <span>Explore Variety Range</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
