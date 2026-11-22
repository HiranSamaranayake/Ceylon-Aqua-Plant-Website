import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getPlants, getCategories } from "@/lib/data-service";
import PlantCard from "@/components/PlantCard";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { ChevronRight, Leaf, Home } from "lucide-react";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: { category: string };
}

export const revalidate = 60;

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
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Category Banner - Clean Light Theme */}
      <section className="relative bg-[#F8FAFC] py-10 sm:py-16 md:py-20 border-b border-[#E5E7EB] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn direction="up">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 text-xs text-[#6B7280] mb-4 sm:mb-5 overflow-x-auto whitespace-nowrap pb-1">
              <Link href="/" className="hover:text-[#0B7A0B] flex items-center gap-1 font-medium shrink-0">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#6B7280]/60 shrink-0" />
              <Link href="/aquarium-plants" className="hover:text-[#0B7A0B] font-medium shrink-0">
                Aquarium Plants
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#6B7280]/60 shrink-0" />
              <span className="text-[#0B7A0B] font-bold shrink-0">{category.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="lg:col-span-8 space-y-2.5 sm:space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E7EB] text-[#0B7A0B] text-xs font-bold uppercase tracking-wider">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>Plant Category Showcase</span>
                </div>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2D5B] font-display">
                  {category.name}
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-[#6B7280] leading-relaxed max-w-2xl">
                  {category.full_description || category.short_description}
                </p>
              </div>

              <div className="lg:col-span-4 hidden lg:block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white shadow-card bg-[#F8FAFC] flex items-center justify-center">
                  <Image
                    src={category.image_url}
                    alt={category.name}
                    fill
                    className={
                      category.slug === "tissue-culture" || category.image_url?.includes("tissue-culture")
                        ? "object-contain p-3"
                        : "object-cover"
                    }
                  />
                </div>
              </div>
            </div>

            {/* Sibling Category Quick Links */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-[#E5E7EB] flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
              {allCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/aquarium-plants/${cat.slug}`}
                  className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all shrink-0 min-h-[38px] flex items-center ${
                    cat.slug === category.slug
                      ? "bg-[#0B7A0B] text-white font-bold shadow-xs"
                      : "bg-white text-[#0A2D5B] hover:bg-[#F0FDF4] hover:text-[#0B7A0B] border border-[#E5E7EB]"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Category Plants Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        <FadeIn direction="up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-[#0A2D5B] font-display">
                Available Specimens in {category.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
                Currently exhibiting {plants.length} botanical selections cultivated under Ceylon quality standards.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0B7A0B] hover:underline"
            >
              <span>Need species availability or quotation? Inquire here &rarr;</span>
            </Link>
          </div>
        </FadeIn>

        {plants.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] p-6 sm:p-8">
            <Leaf className="w-10 h-10 text-[#0B7A0B]/40 mx-auto mb-3" />
            <h3 className="text-base sm:text-lg font-bold text-[#0A2D5B]">Catalog Updating</h3>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1 max-w-sm mx-auto">
              New specimens in {category.name} are currently being photographed in our nursery. Please check back shortly or contact our team.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block px-5 py-2.5 rounded-xl text-xs font-bold bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 min-h-[44px]"
            >
              Contact Nursery Team
            </Link>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 xs:gap-4 sm:gap-6 lg:gap-8">
            {plants.map((plant) => (
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
