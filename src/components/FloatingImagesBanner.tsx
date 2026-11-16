"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Leaf } from "lucide-react";

interface FloatingPlantItem {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  highlight: string;
  imageUrl: string;
  href: string;
  floatClass: string;
}

const FLOATING_PLANTS: FloatingPlantItem[] = [
  {
    id: "fp-1",
    name: "Anubias Nana Petite",
    scientificName: "Anubias barteri var. nana",
    category: "Potted Plants",
    highlight: "Hardy & Snail-Free",
    imageUrl: "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=800&q=80",
    href: "/aquarium-plants/potted-plants",
    floatClass: "animate-float-1",
  },
  {
    id: "fp-2",
    name: "Rotala 'H'Ra'",
    scientificName: "Rotala rotundifolia",
    category: "Bunched Plants",
    highlight: "Vibrant Orange/Red",
    imageUrl: "https://images.unsplash.com/photo-1544943910-4c1dc44a03ab?auto=format&fit=crop&w=800&q=80",
    href: "/aquarium-plants/plants-bunch",
    floatClass: "animate-float-2",
  },
  {
    id: "fp-3",
    name: "Monte Carlo Carpet",
    scientificName: "Micranthemum tweediei",
    category: "Tissue Culture",
    highlight: "100% Sterile In-Vitro",
    imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    href: "/aquarium-plants/tissue-culture",
    floatClass: "animate-float-3",
  },
  {
    id: "fp-4",
    name: "Ludwigia Rubin",
    scientificName: "Ludwigia repens 'Rubin'",
    category: "Bunched Plants",
    highlight: "Deep Crimson Foliage",
    imageUrl: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80",
    href: "/aquarium-plants/plants-bunch",
    floatClass: "animate-float-1",
  },
  {
    id: "fp-5",
    name: "Bucephalandra Kedagang",
    scientificName: "Bucephalandra sp.",
    category: "Tissue Culture",
    highlight: "Rare Metallic Gloss",
    imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80",
    href: "/aquarium-plants/tissue-culture",
    floatClass: "animate-float-2",
  },
  {
    id: "fp-6",
    name: "Java Fern Mother Plant",
    scientificName: "Microsorum pteropus",
    category: "Potted Plants",
    highlight: "Low Light Tolerant",
    imageUrl: "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&w=800&q=80",
    href: "/aquarium-plants/potted-plants",
    floatClass: "animate-float-3",
  },
  {
    id: "fp-7",
    name: "Cryptocoryne Wendtii",
    scientificName: "Cryptocoryne wendtii 'Green'",
    category: "Potted Plants",
    highlight: "Bio-Filtered Water",
    imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    href: "/aquarium-plants/potted-plants",
    floatClass: "animate-float-1",
  },
  {
    id: "fp-8",
    name: "Amazon Sword",
    scientificName: "Echinodorus bleheri",
    category: "Garden-Pond Plants",
    highlight: "Robust Solitary Specimen",
    imageUrl: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=800&q=80",
    href: "/aquarium-plants/garden-pond-plants",
    floatClass: "animate-float-2",
  },
  {
    id: "fp-9",
    name: "Java Moss Aquascape",
    scientificName: "Taxiphyllum barbieri",
    category: "Terrarium Plants",
    highlight: "Lush Foreground Mat",
    imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
    href: "/aquarium-plants/terrarium-plants",
    floatClass: "animate-float-3",
  },
  {
    id: "fp-10",
    name: "Hydrocotyle Tripartita",
    scientificName: "Hydrocotyle tripartita",
    category: "Tissue Culture",
    highlight: "Fast Carpet Grower",
    imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80",
    href: "/aquarium-plants/tissue-culture",
    floatClass: "animate-float-1",
  },
];

export default function FloatingImagesBanner() {
  // Duplicate list to achieve continuous, infinite left-to-right looping
  const duplicatedPlants = [...FLOATING_PLANTS, ...FLOATING_PLANTS];

  return (
    <section className="relative py-12 sm:py-16 bg-[#F8FAFC] border-b border-[#E5E7EB] overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2D5B] font-display tracking-tight">
              Floating Aquatic Flora Showcase
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1 max-w-xl">
              Curated live aquarium specimens cultivated in our Sri Lanka greenhouse basins, naturally acclimatized under year-round tropical sunshine.
            </p>
          </div>

          <div className="hidden sm:block">
            <Link
              href="/aquarium-plants"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] hover:-translate-y-0.5 active:translate-y-0 shadow-xs transition-all duration-300"
            >
              <span>View All 30+ Varieties</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#0A2D5B]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Edge Gradient Masks for Seamless Edge Fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent z-10" />

      {/* Continuous Floating Marquee Moving Left-to-Right */}
      <div className="relative w-full overflow-hidden py-3">
        <div className="animate-marquee-ltr flex items-center gap-4 sm:gap-6 px-4">
          {duplicatedPlants.map((plant, index) => (
            <Link
              key={`${plant.id}-${index}`}
              href={plant.href}
              className={`group shrink-0 block w-52 sm:w-64 bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-card hover:shadow-card-hover hover:border-[#0B7A0B]/50 transition-all duration-300 ${plant.floatClass}`}
            >
              {/* Plant Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F8FAFC]">
                <Image
                  src={plant.imageUrl}
                  alt={`${plant.name} - Ceylon Aquatic Plants`}
                  fill
                  sizes="(max-width: 640px) 208px, 256px"
                  className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />

                {/* Category Pill Tag */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 backdrop-blur-xs text-[#0B7A0B] border border-[#E5E7EB] shadow-xs">
                    <Leaf className="w-2.5 h-2.5 text-[#0B7A0B]" />
                    <span>{plant.category}</span>
                  </span>
                </div>

                {/* Highlight Pill */}
                <div className="absolute bottom-2.5 right-2.5 z-10">
                  <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#0B7A0B]/90 backdrop-blur-xs text-[#F7C600] shadow-xs">
                    {plant.highlight}
                  </span>
                </div>
              </div>

              {/* Plant Card Body */}
              <div className="p-3.5 sm:p-4 bg-white space-y-1">
                <p className="text-[11px] font-serif italic text-[#0B7A0B] truncate">
                  {plant.scientificName}
                </p>
                <h3 className="text-xs sm:text-sm font-bold text-[#0A2D5B] group-hover:text-[#0B7A0B] transition-colors truncate font-display">
                  {plant.name}
                </h3>

                <div className="pt-2 mt-2 border-t border-[#E5E7EB] flex items-center justify-between text-[11px]">
                  <span className="text-[#6B7280] font-medium">Export Grade</span>
                  <span className="inline-flex items-center gap-0.5 font-bold text-[#0B7A0B] group-hover:text-[#0A2D5B] group-hover:translate-x-0.5 transition-transform">
                    <span>Explore</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile-Only CTA at bottom of section */}
      <div className="mt-6 px-4 text-center sm:hidden">
        <Link
          href="/aquarium-plants"
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#F7C600] active:bg-[#E5B700] text-[#0A2D5B] shadow-xs transition-colors"
        >
          <span>Explore All 30+ Plant Varieties</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#0A2D5B]" />
        </Link>
      </div>

    </section>
  );
}
