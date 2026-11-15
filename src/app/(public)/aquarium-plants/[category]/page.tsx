import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getPlants, getCategories } from "@/lib/data-service";
import PlantCard from "@/components/PlantCard";
import { ChevronRight, Leaf, Home, Sparkles } from "lucide-react";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: { category: string };
}

export const revalidate = 60;

// Dynamic SEO Metadata
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.category);
  if (!category) return {};

  return {
    title: category.seo_title || `${category.name} | Ceylon Aquatic Plants (Pvt) Ltd`,
    description: category.seo_description || category.short_description,
    alternates: {
      canonical: `/aquarium-plants/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} | Ceylon Aquatic Plants`,
      description: category.short_description,
      images: [
        {
          url: category.image_url,
          width: 1200,
          height: 800,
          alt: category.name,
        },
      ],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const [category, plants, allCategories] = await Promise.all([
    getCategoryBySlug(params.category),
    getPlants({ category_slug: params.category, publishedOnly: true }),
    getCategories({ activeOnly: true }),
  ]);

  if (!category) {
    notFound();
  }

  // Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Aquarium Plants",
        item: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/aquarium-plants`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/aquarium-plants/${category.slug}`,
      },
    ],
  };

  return (
    <div className="bg-brand-cream min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Category Banner with dynamic photo */}
      <section className="relative bg-brand-dark text-white py-16 sm:py-24 border-b border-brand-border overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={category.image_url}
            alt={category.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-brand-muted mb-6">
            <Link href="/" className="hover:text-white flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-muted/60" />
            <Link href="/aquarium-plants" className="hover:text-white">
              Aquarium Plants
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-muted/60" />
            <span className="text-brand-gold font-medium">{category.name}</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-brand-gold text-xs font-semibold uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5" />
              <span>Plant Category Showcase</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              {category.full_description || category.short_description}
            </p>
          </div>

          {/* Sibling Category Quick Links */}
          <div className="mt-8 pt-6 border-t border-brand-border/60 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {allCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/aquarium-plants/${cat.slug}`}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  cat.slug === category.slug
                    ? "bg-brand-gold text-brand-surface font-semibold shadow-sm"
                    : "bg-brand-surface text-brand-muted hover:text-white border border-brand-border"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Plants Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-brand-surface font-display">
              Available Specimens in {category.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Currently exhibiting {plants.length} botanical variety selections cultivated under Ceylon quality standards.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-emerald hover:underline"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Need custom packing or species availability? Inquire here</span>
          </Link>
        </div>

        {plants.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 p-8">
            <Leaf className="w-12 h-12 text-brand-emerald/40 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-brand-surface">Catalog Updating</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
              New specimens in {category.name} are currently being photographed in our nursery. Please check back shortly or contact our team.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block px-5 py-2.5 rounded-xl text-xs font-semibold bg-brand-emerald text-white"
            >
              Contact Nursery Team
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {plants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
