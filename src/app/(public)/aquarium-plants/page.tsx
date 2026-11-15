import React from "react";
import Link from "next/link";
import { getCategories, getPlants } from "@/lib/data-service";
import PlantCard from "@/components/PlantCard";
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
    <div className="bg-brand-cream min-h-screen">
      {/* Header Banner */}
      <section className="bg-brand-dark text-white py-16 sm:py-20 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-brand-gold text-xs font-semibold uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5" />
              <span>Cultivated Plant Showcase</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
              Aquarium Plants Catalogue
            </h1>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              Explore our diverse collection of live aquatic plants, carefully categorized across bunched stems, established potted specimens, pond botanicals, terrarium varieties, and sterile tissue cultures.
            </p>
          </div>

          {/* Quick Category Tabs Bar */}
          <div className="mt-8 pt-6 border-t border-brand-border/60 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Link
              href="/aquarium-plants"
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                !selectedCat
                  ? "bg-brand-gold text-brand-surface shadow-sm"
                  : "bg-brand-surface text-brand-muted hover:text-white border border-brand-border"
              }`}
            >
              All Plants ({allPlants.length})
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/aquarium-plants/${cat.slug}`}
                className="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-brand-surface text-brand-muted hover:text-white border border-brand-border hover:border-brand-gold/60 transition-all"
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
          <p className="text-sm text-gray-600 font-medium">
            Showing <span className="font-bold text-brand-surface">{filteredPlants.length}</span> botanical specimens
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Filter className="w-4 h-4 text-brand-emerald" />
            <span>Select a category above or view dedicated category pages for in-depth botanical notes.</span>
          </div>
        </div>

        {filteredPlants.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 p-8">
            <Leaf className="w-12 h-12 text-brand-emerald/40 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-brand-surface">No plants found</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
              No aquatic plants match your search criteria. Try browsing all categories.
            </p>
            <Link
              href="/aquarium-plants"
              className="mt-4 inline-block px-5 py-2 rounded-xl text-xs font-semibold bg-brand-emerald text-white"
            >
              View All Plants
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
