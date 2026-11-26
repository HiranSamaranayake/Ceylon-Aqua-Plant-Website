import React from "react";
import Link from "next/link";
import { getCategories, getPlants } from "@/lib/data-service";
import PlantCard from "@/components/PlantCard";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { Leaf, Filter } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aquarium Plants Collection & Botanical Catalogue",
  description: "Browse the complete live aquarium plants collection by Ceylon Aquatic Plants (Pvt) Ltd. Bunched stems, potted flora, pond plants, terrarium species, and sterile tissue-culture cups.",
  alternates: {
    canonical: "/aquarium-plants",
  },
};

export const revalidate = 60;

export default async function AquariumPlantsPage({
  searchParams,
}: {
  searchParams?: { search?: string; category?: string };
}) {
  const [categories, allPlants] = await Promise.all([
    getCategories({ activeOnly: true }),
    getPlants({ publishedOnly: true }),
  ]);

  const searchQuery = (searchParams?.search || "").toLowerCase().trim();
  const selectedCat = searchParams?.category || "";

  const filteredPlants = allPlants.filter((plant) => {
    const matchesSearch =
      !searchQuery ||
      plant.name.toLowerCase().includes(searchQuery) ||
      (plant.scientific_name && plant.scientific_name.toLowerCase().includes(searchQuery)) ||
      plant.short_description.toLowerCase().includes(searchQuery);

    const matchesCategory =
      !selectedCat || plant.category?.slug === selectedCat;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header Banner - Fresh Light Blue & Green Theme */}
      <section className="bg-gradient-to-r from-[#EFF6FF] via-[#F0FDF4]/70 to-[#EFF6FF] py-10 sm:py-16 md:py-18 border-b border-[#34C759]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="max-w-3xl space-y-2.5 sm:space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#34C759]/30 text-[#0B7A0B] text-xs font-bold uppercase tracking-wider">
                <Leaf className="w-3.5 h-3.5" />
                <span>Cultivated Plant Showcase</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2D5B] font-display">
                Aquarium Plants Catalogue
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-[#6B7280] leading-relaxed">
                Explore our diverse collection of live aquatic plants, carefully categorized across bunched stems, established potted specimens, pond botanicals, terrarium varieties, and sterile tissue cultures.
              </p>
            </div>
          </FadeIn>

          {/* Quick Category Tabs Bar */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-[#34C759]/25 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            <Link
              href="/aquarium-plants"
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 min-h-[38px] flex items-center ${
                !selectedCat
                  ? "bg-[#0B7A0B] text-white shadow-xs"
                  : "bg-white text-[#0A2D5B] hover:bg-[#F0FDF4] hover:text-[#0B7A0B] border border-[#34C759]/25 shadow-2xs"
              }`}
            >
              All Plants ({allPlants.length})
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/aquarium-plants/${cat.slug}`}
                className="px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-white text-[#0A2D5B] hover:bg-[#F0FDF4] hover:text-[#0B7A0B] border border-[#34C759]/25 shadow-2xs transition-all shrink-0 min-h-[38px] flex items-center"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="bg-[#F0FDF4]/50 border-t border-[#34C759]/15 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <p className="text-xs sm:text-sm text-[#6B7280] font-medium">
            Showing <span className="font-bold text-[#0A2D5B]">{filteredPlants.length}</span> botanical specimens
          </p>

          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
            <Filter className="w-4 h-4 text-[#0B7A0B] shrink-0" />
            <span className="line-clamp-1">Select a category above or browse varieties below.</span>
          </div>
        </div>

        {filteredPlants.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] p-6 sm:p-8">
            <Leaf className="w-10 h-10 text-[#0B7A0B]/40 mx-auto mb-3" />
            <h3 className="text-base sm:text-lg font-bold text-[#0A2D5B]">No plants found</h3>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1 max-w-sm mx-auto">
              No aquatic plants match your search criteria. Try browsing all categories.
            </p>
            <Link
              href="/aquarium-plants"
              className="mt-4 inline-block px-5 py-2.5 rounded-xl text-xs font-bold bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 min-h-[44px]"
            >
              View All Plants
            </Link>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 xs:gap-4 sm:gap-6 lg:gap-8">
            {filteredPlants.map((plant) => (
              <StaggerItem key={plant.id}>
                <PlantCard plant={plant} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
        </div>
      </section>
    </div>
  );
}
