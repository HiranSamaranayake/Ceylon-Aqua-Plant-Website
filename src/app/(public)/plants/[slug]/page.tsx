import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPlantBySlug, getPlants } from "@/lib/data-service";
import PlantCard from "@/components/PlantCard";
import SafeImage from "@/components/SafeImage";
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

  const isContained =
    plant.main_image_url?.includes("tissue-culture") ||
    plant.category?.slug === "tissue-culture" ||
    plant.main_image_url?.includes("garden-pond-plants") ||
    plant.category?.slug === "garden-pond-plants" ||
    plant.main_image_url?.includes("plants-bunch") ||
    plant.category?.slug === "plants-bunch" ||
    plant.main_image_url?.includes("potted-plants") ||
    plant.category?.slug === "potted-plants" ||
    plant.main_image_url?.includes("terrarium-plants") ||
    plant.category?.slug === "terrarium-plants";

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Top Breadcrumb Bar */}
      <div className="bg-[#EFF6FF] py-3.5 px-4 sm:px-6 lg:px-8 border-b border-[#0E7CDB]/20">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6B7280] overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-[#0B7A0B] flex items-center gap-1 font-medium">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#6B7280]/60" />
            <Link href="/aquarium-plants" className="hover:text-[#0B7A0B] font-medium">
              Aquarium Plants
            </Link>
            {plant.category && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-[#6B7280]/60" />
                <Link href={`/aquarium-plants/${plant.category.slug}`} className="hover:text-[#0B7A0B] font-medium">
                  {plant.category.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 text-[#6B7280]/60" />
            <span className="text-[#0B7A0B] font-bold">{plant.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Specimen Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

          {/* Left Column: Plant Photography with Smooth Hover Zoom */}
          <div className="lg:col-span-6 space-y-4">
            <div className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-[#34C759]/25 shadow-card hover:shadow-card-hover flex items-center justify-center transition-shadow duration-300">
              <SafeImage
                src={plant.main_image_url}
                alt={`${plant.name} - Ceylon Aquatic Plants Specimen`}
                fallbackText={plant.name}
                fallbackSrc="/images/potted-plants/potted-plants-category.jpg"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`${
                  isContained ? "object-contain p-4" : "object-cover"
                } group-hover:scale-105 transition-transform duration-300 ease-out`}
              />
              {plant.category && (
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-xs text-[#0B7A0B] border border-[#34C759]/25 shadow-xs">
                    {plant.category.name}
                  </span>
                </div>
              )}
            </div>

            {/* Quality Assurance Strip */}
            <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#34C759]/30 flex items-center justify-between text-xs text-[#0A2D5B]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0B7A0B]" />
                <span className="font-bold">Ceylon Certified Nursery Cultivation</span>
              </div>
              <span className="text-[11px] text-[#6B7280]">Inspected Root Health</span>
            </div>
          </div>

          {/* Right Column: Botanical Profiles & Inquiries */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {plant.scientific_name && (
                <p className="text-sm font-serif italic text-[#0B7A0B] mb-1">
                  {plant.scientific_name}
                </p>
              )}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0A2D5B] font-display leading-tight">
                {plant.name}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#6B7280] leading-relaxed">
                {plant.short_description}
              </p>
            </div>

            {/* Quick Specs Grid */}
            <div className="p-6 rounded-2xl bg-white border border-[#34C759]/25 shadow-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                {plant.placement && (
                  <div className="space-y-1">
                    <span className="text-[#6B7280] flex items-center gap-1 font-medium">
                      <Layers className="w-3.5 h-3.5 text-[#0B7A0B]" /> Placement
                    </span>
                    <p className="font-bold text-[#0A2D5B] text-sm">{plant.placement}</p>
                  </div>
                )}
                {plant.growth_rate && (
                  <div className="space-y-1">
                    <span className="text-[#6B7280] flex items-center gap-1 font-medium">
                      <Activity className="w-3.5 h-3.5 text-[#0B7A0B]" /> Growth Rate
                    </span>
                    <p className="font-bold text-[#0A2D5B] text-sm">{plant.growth_rate}</p>
                  </div>
                )}
                {plant.light_demand && (
                  <div className="space-y-1">
                    <span className="text-[#6B7280] flex items-center gap-1 font-medium">
                      <Sun className="w-3.5 h-3.5 text-[#F7C600]" /> Light Demand
                    </span>
                    <p className="font-bold text-[#0A2D5B] text-sm">{plant.light_demand}</p>
                  </div>
                )}
                {plant.co2_requirement && (
                  <div className="space-y-1">
                    <span className="text-[#6B7280] flex items-center gap-1 font-medium">
                      <Wind className="w-3.5 h-3.5 text-[#0E7CDB]" /> CO2 Requirement
                    </span>
                    <p className="font-bold text-[#0A2D5B] text-sm">{plant.co2_requirement}</p>
                  </div>
                )}
                {plant.temperature_range && (
                  <div className="space-y-1">
                    <span className="text-[#6B7280] flex items-center gap-1 font-medium">
                      <Thermometer className="w-3.5 h-3.5 text-[#F7C600]" /> Temperature
                    </span>
                    <p className="font-bold text-[#0A2D5B] text-sm">{plant.temperature_range}</p>
                  </div>
                )}
                {plant.plant_height && (
                  <div className="space-y-1">
                    <span className="text-[#6B7280] flex items-center gap-1 font-medium">
                      <Ruler className="w-3.5 h-3.5 text-[#0B7A0B]" /> Plant Height
                    </span>
                    <p className="font-bold text-[#0A2D5B] text-sm">{plant.plant_height}</p>
                  </div>
                )}
                {plant.origin && (
                  <div className="space-y-1 col-span-2">
                    <span className="text-[#6B7280] flex items-center gap-1 font-medium">
                      <Globe className="w-3.5 h-3.5 text-[#0A2D5B]" /> Botanical Origin
                    </span>
                    <p className="font-bold text-[#0A2D5B] text-sm">{plant.origin}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Inquiry CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                href={`/contact?plant=${encodeURIComponent(plant.name)}`}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 border border-transparent min-h-[48px]"
              >
                <MessageSquare className="w-4 h-4 text-[#0A2D5B]" />
                <span>Inquire About This Specimen</span>
              </Link>
              <a
                href={`https://wa.me/94777042100?text=${encodeURIComponent(`Hello Ceylon Aquatic Plants, I am inquiring regarding your ${plant.name} specimens.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#25D366] text-white hover:bg-[#20ba59] transition-all shadow-xs min-h-[48px]"
              >
                <span>WhatsApp Inquiry</span>
              </a>
            </div>

          </div>
        </div>

        {/* Detailed Botanical & Care Notes */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-[#34C759]/25 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-2xl font-bold text-[#0A2D5B] font-display">
              Comprehensive Botanical Description
            </h2>
            <div className="prose prose-emerald text-xs sm:text-sm md:text-base text-[#6B7280] leading-relaxed whitespace-pre-line bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-[#34C759]/20 shadow-xs">
              {plant.full_description}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-2xl font-bold text-[#0A2D5B] font-display">
              Aquarium Care & Maintenance
            </h2>
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-[#34C759]/20 shadow-xs space-y-4">
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                {plant.care_instructions || "Acclimatize gradually to your aquarium's temperature and lighting. Ensure adequate water circulation and maintain stable macro/micronutrient levels."}
              </p>
              <div className="pt-3 border-t border-[#E5E7EB] flex items-center gap-2 text-xs text-[#0B7A0B] font-bold">
                <Leaf className="w-4 h-4 shrink-0" />
                <span>Cultivated under Ceylon export quarantine standards</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Varieties in Category */}
        {relatedPlants.length > 0 && (
          <div className="mt-14 sm:mt-20 pt-8 sm:pt-12 border-t border-[#34C759]/25">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h3 className="text-lg sm:text-2xl font-bold text-[#0A2D5B] font-display">
                  More from {plant.category?.name || "This Category"}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
                  Complementary botanical selections with similar water and light requirements.
                </p>
              </div>
              {plant.category && (
                <Link
                  href={`/aquarium-plants/${plant.category.slug}`}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#0B7A0B] hover:underline"
                >
                  <span>View all in category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3.5 xs:gap-4 sm:gap-6 lg:gap-8">
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
