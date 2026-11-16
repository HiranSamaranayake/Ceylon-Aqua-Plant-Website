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
    <div className="bg-white min-h-screen">
      {/* Header Banner - Clean Light Green */}
      <section className="bg-[#F8FAFC] py-14 sm:py-18 border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E7EB] text-[#0B7A0B] text-xs font-bold uppercase tracking-wider">
                <Leaf className="w-3.5 h-3.5" />
                <span>Cultivated Plant Showcase</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0A2D5B] font-display">
                Aquarium Plants Catalogue
              </h1>
              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
                Explore our diverse collection of live aquatic plants, carefully categorized across bunched stems, established potted specimens, pond botanicals, terrarium varieties, and sterile tissue cultures.
              </p>
            </div>
          </FadeIn>

          {/* Quick Category Tabs Bar */}
          <div className="mt-8 pt-5 border-t border-[#E5E7EB] flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Link
              href="/aquarium-plants"
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                !selectedCat
                  ? "bg-[#0B7A0B] text-white shadow-xs"
                  : "bg-white text-[#0A2D5B] hover:bg-[#F0FDF4] border border-[#E5E7EB]"
              }`}
            >
              All Plants ({allPlants.length})
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/aquarium-plants/${cat.slug}`}
                className="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-white text-[#0A2D5B] hover:bg-[#F0FDF4] hover:text-[#0B7A0B] border border-[#E5E7EB] transition-all"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <p className="text-sm text-[#6B7280] font-medium">
            Showing <span className="font-bold text-[#0A2D5B]">{filteredPlants.length}</span> botanical specimens
          </p>

          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
            <Filter className="w-4 h-4 text-[#0B7A0B]" />
            <span>Select a category above or browse individual varieties below.</span>
          </div>
        </div>

        {filteredPlants.length === 0 ? (
          <div className="text-center py-20 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] p-8">
            <Leaf className="w-10 h-10 text-[#0B7A0B]/40 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#0A2D5B]">No plants found</h3>
            <p className="text-sm text-[#6B7280] mt-1 max-w-sm mx-auto">
              No aquatic plants match your search criteria. Try browsing all categories.
            </p>
            <Link
              href="/aquarium-plants"
              className="mt-4 inline-block px-5 py-2.5 rounded-xl text-xs font-bold bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              View All Plants
            </Link>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPlants.map((plant) => (
              <StaggerItem key={plant.id}>
                <PlantCard plant={plant} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </section>
    </div>
  );
}
