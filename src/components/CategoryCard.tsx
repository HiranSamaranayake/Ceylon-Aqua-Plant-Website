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
      className="group bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#0B7A0B]/40 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Category Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F8FAFC]">
        <Image
          src={category.image_url}
          alt={`${category.name} - Ceylon Aquatic Plants`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-white text-[#0B7A0B] border border-[#E5E7EB] shadow-xs">
            <Leaf className="w-3 h-3 text-[#0B7A0B]" />
            <span>Category</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 space-y-2 flex-grow flex flex-col justify-between bg-white">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-[#0A2D5B] group-hover:text-[#0B7A0B] transition-colors font-display tracking-tight">
            {category.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7280] line-clamp-2 mt-1 leading-relaxed">
            {category.short_description}
          </p>
        </div>

        <div className="pt-3 border-t border-[#E5E7EB]">
          <span className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold bg-[#F7C600] group-hover:bg-[#E5B700] text-[#0A2D5B] shadow-xs group-hover:shadow-md transition-all duration-300">
            <span>Explore Category</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0A2D5B] group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
