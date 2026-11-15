import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPlantBySlug, getPlants } from "@/lib/data-service";
import PlantCard from "@/components/PlantCard";
import { 
  ChevronRight, 
  Home, 
  Leaf, 
  Sun, 
  Layers, 
  Activity, 
  Thermometer, 
  Wind, 
  Globe, 
  Ruler, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import type { Metadata } from "next";

interface PlantDetailProps {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateMetadata({ params }: PlantDetailProps): Promise<Metadata> {
  const plant = await getPlantBySlug(params.slug);
  if (!plant) return {};

  return {
    title: plant.seo_title || `${plant.name} | Live Aquarium Plants | Ceylon Aquatic Plants`,
    description: plant.seo_description || plant.short_description,
    alternates: {
      canonical: `/plants/${plant.slug}`,
    },
    openGraph: {
      title: `${plant.name} | Ceylon Aquatic Plants (Pvt) Ltd`,
      description: plant.short_description,
      images: [
        {
          url: plant.main_image_url,
          width: 1200,
          height: 800,
          alt: plant.name,
        },
      ],
    },
  };
}

export default async function PlantDetailPage({ params }: PlantDetailProps) {
  const plant = await getPlantBySlug(params.slug);

  if (!plant) {
    notFound();
  }

  // Related plants in the same category
  const relatedPlants = (await getPlants({ category_slug: plant.category?.slug, publishedOnly: true }))
    .filter((p) => p.id !== plant.id)
    .slice(0, 3);

  // Schema.org Structured Data
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: plant.name,
    image: plant.main_image_url,
    description: plant.short_description,
    brand: {
      "@type": "Brand",
      name: "Ceylon Aquatic Plants (Pvt) Ltd",
    },
    category: plant.category?.name || "Aquarium Plants",
  };

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
      ...(plant.category
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: plant.category.name,
              item: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/aquarium-plants/${plant.category.slug}`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: plant.name,
              item: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/plants/${plant.slug}`,
            },
          ]
        : [
            {
              "@type": "ListItem",
              position: 3,
              name: plant.name,
              item: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/plants/${plant.slug}`,
            },
          ]),
    ],
  };

  return (
    <div className="bg-brand-cream min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Top Breadcrumb Bar */}
      <div className="bg-brand-surface py-4 px-4 sm:px-6 lg:px-8 border-b border-brand-border">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-brand-muted overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-white flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-muted/60" />
            <Link href="/aquarium-plants" className="hover:text-white">
              Aquarium Plants
            </Link>
            {plant.category && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-brand-muted/60" />
                <Link href={`/aquarium-plants/${plant.category.slug}`} className="hover:text-white">
                  {plant.category.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 text-brand-muted/60" />
            <span className="text-brand-gold font-medium">{plant.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Specimen Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Plant Photography */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-xl">
              <Image
                src={plant.main_image_url}
                alt={`${plant.name} - Ceylon Aquatic Plants Specimen`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {plant.category && (
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-dark/90 text-brand-gold backdrop-blur-md border border-brand-gold/30">
                    {plant.category.name}
                  </span>
                </div>
              )}
            </div>

            {/* Quality Assurance Strip */}
            <div className="p-4 rounded-2xl bg-white border border-gray-200 flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                <span className="font-semibold text-brand-surface">Ceylon Certified Nursery Cultivation</span>
              </div>
              <span className="text-[11px] text-gray-500">Inspected Root Health</span>
            </div>
          </div>

          {/* Right Column: Botanical Profiles & Inquiries */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {plant.scientific_name && (
                <p className="text-sm font-serif italic text-brand-emerald mb-1">
                  {plant.scientific_name}
                </p>
              )}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-surface font-display leading-tight">
                {plant.name}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed">
                {plant.short_description}
              </p>
            </div>

            {/* Quick Specs Grid */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-emerald mb-4">
                Horticultural & Botanical Profile
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                {plant.origin && (
                  <div className="space-y-1">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-brand-gold" /> Origin
                    </span>
                    <p className="font-semibold text-brand-surface">{plant.origin}</p>
                  </div>
                )}
                {plant.growth_rate && (
                  <div className="space-y-1">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-brand-emerald" /> Growth Rate
                    </span>
                    <p className="font-semibold text-brand-surface">{plant.growth_rate}</p>
                  </div>
                )}
                {plant.plant_height && (
                  <div className="space-y-1">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Ruler className="w-3.5 h-3.5 text-brand-gold" /> Height
                    </span>
                    <p className="font-semibold text-brand-surface">{plant.plant_height}</p>
                  </div>
                )}
                {plant.light_demand && (
                  <div className="space-y-1">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Sun className="w-3.5 h-3.5 text-brand-gold" /> Light Demand
                    </span>
                    <p className="font-semibold text-brand-surface">{plant.light_demand}</p>
                  </div>
                )}
                {plant.co2_requirement && (
                  <div className="space-y-1">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Wind className="w-3.5 h-3.5 text-brand-emerald" /> CO2 Demand
                    </span>
                    <p className="font-semibold text-brand-surface">{plant.co2_requirement}</p>
                  </div>
                )}
                {plant.temperature_range && (
                  <div className="space-y-1">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Thermometer className="w-3.5 h-3.5 text-brand-gold" /> Temperature
                    </span>
                    <p className="font-semibold text-brand-surface">{plant.temperature_range}</p>
                  </div>
                )}
                {plant.placement && (
                  <div className="space-y-1 col-span-2 sm:col-span-3 pt-2 border-t border-gray-100">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-brand-emerald" /> Recommended Aquascape Placement
                    </span>
                    <p className="font-semibold text-brand-surface">{plant.placement}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Inquiry CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href={`/contact?plant=${encodeURIComponent(plant.name)}`}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm bg-brand-dark text-white hover:bg-brand-secondary active:scale-[0.99] transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-brand-gold" />
                <span>Inquire About This Specimen</span>
              </Link>
              <a
                href={`https://wa.me/94771234567?text=${encodeURIComponent(`Hello Ceylon Aquatic Plants, I am inquiring regarding your ${plant.name} specimens.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm bg-[#25D366] text-white hover:bg-[#20ba59] transition-all shadow-sm"
              >
                <span>WhatsApp Inquiry</span>
              </a>
            </div>

          </div>
        </div>

        {/* Detailed Botanical & Care Notes */}
        <div className="mt-16 pt-12 border-t border-gray-200 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-brand-surface font-display">
              Comprehensive Botanical Description
            </h2>
            <div className="prose prose-emerald text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line bg-white p-6 sm:p-8 rounded-2xl border border-gray-200">
              {plant.full_description}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-brand-surface font-display">
              Aquarium Care & Maintenance
            </h2>
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                {plant.care_instructions || "Acclimatize gradually to your aquarium's temperature and lighting. Ensure adequate water circulation and maintain stable macro/micronutrient levels."}
              </p>
              <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-brand-emerald font-semibold">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span>Cultivated under Ceylon export quarantine standards</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Varieties in Category */}
        {relatedPlants.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-brand-surface font-display">
                  More from {plant.category?.name || "This Category"}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Complementary botanical selections with similar water and light requirements.
                </p>
              </div>
              {plant.category && (
                <Link
                  href={`/aquarium-plants/${plant.category.slug}`}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-brand-emerald hover:underline"
                >
                  <span>View all in category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedPlants.map((rel) => (
                <PlantCard key={rel.id} plant={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
