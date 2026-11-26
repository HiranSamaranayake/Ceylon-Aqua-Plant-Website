import React from "react";
import Link from "next/link";
import {
  getCategories,
  getVideos,
  getWebsiteSettings
} from "@/lib/data-service";
import CategoryCard from "@/components/CategoryCard";
import FloatingImagesBanner from "@/components/FloatingImagesBanner";
import FadeIn from "@/components/animations/FadeIn";
import AnimatedHeroTitle from "@/components/animations/AnimatedHeroTitle";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import SafeImage from "@/components/SafeImage";
import {
  ArrowRight,
  Leaf,
  Sun,
  Droplets,
  Microscope,
  ShieldCheck,
  Play,
  Sparkles
} from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  const [categories, videos, settings] = await Promise.all([
    getCategories({ activeOnly: true }),
    getVideos({ publishedOnly: true }),
    getWebsiteSettings(),
  ]);

  const featuredVideo = videos[0] || null;

  return (
    <div className="space-y-0 bg-[#F8FAFC]">

      {/* =========================================================================
          SECTION 1: HERO SECTION - Fresh Light Blue & Green Ambient Theme
          ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#EFF6FF] via-[#F0FDF4]/70 to-[#EFF6FF] border-b border-[#34C759]/25 overflow-hidden py-10 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">

              {/* Main Headline - Responsive Tagline + Word Reveal Animation */}
              <AnimatedHeroTitle
                title={settings.hero_title}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] font-extrabold text-[#0A2D5B] tracking-tight leading-[1.2] font-poppins"
              />

              {/* Supporting Description */}
              <FadeIn direction="up" delay={0.35} duration={0.7}>
                <p className="text-sm sm:text-base md:text-lg text-[#6B7280] max-w-2xl leading-relaxed">
                  {settings.hero_subtitle}
                </p>
              </FadeIn>

              {/* CTA Buttons */}
              <FadeIn direction="up" delay={0.5} duration={0.7}>
                <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <Link
                    href="/aquarium-plants"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl text-sm font-bold bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] border border-transparent shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group min-h-[48px]"
                  >
                    <span>Explore Our Plants</span>
                    <ArrowRight className="w-4 h-4 text-[#0A2D5B] group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl text-sm font-semibold bg-[#0B7A0B] hover:bg-[#085808] text-white border border-transparent shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group min-h-[48px]"
                  >
                    <span>Contact Us</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </FadeIn>

              {/* Key Features Strip */}
              <FadeIn direction="up" delay={0.65}>
                <div className="pt-6 sm:pt-8 border-t border-[#34C759]/25 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs font-semibold text-[#0A2D5B]">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-[#F7C600] shrink-0" />
                    <span>Tropical Sunlight</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Microscope className="w-4 h-4 text-[#0B7A0B] shrink-0" />
                    <span>Sterile In-Vitro Lab</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-[#0E7CDB] shrink-0" />
                    <span>Bio-Filtered Water</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#34C759] shrink-0" />
                    <span>Export Biosecurity</span>
                  </div>
                </div>
              </FadeIn>

            </div>

            {/* Right Visual Image Composition with Smooth Hover Zoom */}
            <div className="lg:col-span-5 relative">
              <FadeIn direction="left" delay={0.3} duration={0.8}>
                <div className="group relative aspect-[4/3] sm:aspect-[5/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover border-2 sm:border-4 border-white bg-white transition-shadow duration-300">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=1400&q=85"
                    alt="Lush underwater aquascape with vibrant live aquatic plants"
                    fallbackSrc="/images/plants-bunch/plants-bunch-category.jpg"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  />
                </div>

                {/* Floating Top Badge */}
                <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#34C759]/25 shadow-card flex items-center gap-2 text-xs font-bold text-[#0A2D5B] animate-float-1 hidden sm:flex">
                  <Sparkles className="w-4 h-4 text-[#F7C600]" />
                  <span>Certified Biological Purity</span>
                </div>

                {/* Floating Quality Badge */}
                <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white p-4 sm:p-5 rounded-2xl border border-[#34C759]/25 shadow-card max-w-xs hidden sm:block animate-float-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B7A0B] uppercase">
                    <span className="w-2 h-2 rounded-full bg-[#F7C600]"></span>
                    <span>Sri Lankan Nursery</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1 leading-snug">
                    Naturally acclimatized tropical aquatic flora cultivated under biological care.
                  </p>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          CONTINUOUS FLOATING IMAGES BANNER (LEFT-TO-RIGHT PANORAMA)
          ========================================================================= */}
      <FloatingImagesBanner />

      {/* =========================================================================
          SECTION 2: COMPANY INTRODUCTION - Light Blue Theme (#EFF6FF)
          ========================================================================= */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#EFF6FF] border-b border-[#0E7CDB]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Visual Column */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <FadeIn direction="right" duration={0.7}>
                <div className="group relative aspect-[4/3] sm:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover border-2 sm:border-4 border-white bg-white transition-shadow duration-300">
                  <SafeImage
                    src="/images/underwater-flora-natural.jpg"
                    alt="Cultivating vibrant underwater flora in natural tropical habitats - Ceylon Aquatic Plants"
                    fallbackSrc="/images/underwater-aquascape-lush.jpg"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  />
                </div>
              </FadeIn>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 order-1 lg:order-2">
              <FadeIn direction="up">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0FDF4] text-[#0B7A0B] border border-[#34C759]/30 text-xs font-bold uppercase tracking-wider">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>About Our Nursery</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A2D5B] font-display leading-tight mt-3">
                  Cultivating Vibrant Underwater Flora in Natural Tropical Habitats
                </h2>

                <p className="text-xs sm:text-sm md:text-base text-[#6B7280] leading-relaxed mt-3 sm:mt-4">
                  {settings.about_summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-3 sm:pt-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#0E7CDB]/20 shadow-xs">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0A2D5B] flex items-center gap-2">
                      <Sun className="w-4 h-4 text-[#F7C600] shrink-0" />
                      <span>Natural Photoperiod</span>
                    </h4>
                    <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
                      Equatorial sunshine stimulates rapid root development and rich chlorophyll pigmentation.
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#0E7CDB]/20 shadow-xs">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0A2D5B] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#0B7A0B] shrink-0" />
                      <span>Controlled Quarantine</span>
                    </h4>
                    <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
                      Systematic biological inspection ensures specimens meet international phytosanitary standards.
                    </p>
                  </div>
                </div>

                <div className="pt-4 sm:pt-6">
                  <Link
                    href="/about"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-[#0B7A0B] hover:bg-[#085808] text-white shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 min-h-[48px]"
                  >
                    <span>Learn More About Our Facility</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </Link>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: FEATURED CATEGORIES - Light Green Background (#F0FDF4)
          ========================================================================= */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#F0FDF4] border-b border-[#34C759]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <FadeIn direction="up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#34C759]/30 text-[#0B7A0B] text-xs font-bold uppercase tracking-wider mb-2">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>Complete Plant Spectrum</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A2D5B] font-display">
                  Botanical Collections
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] mt-1.5 sm:mt-2 max-w-xl leading-relaxed">
                  Explore our six core aquatic and moisture-loving plant categories, prepared for aquascaping hobbyists and commercial showcases.
                </p>
              </div>

              <Link
                href="/aquarium-plants"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 min-h-[44px]"
              >
                <span>View All Categories</span>
                <ArrowRight className="w-4 h-4 text-[#0A2D5B]" />
              </Link>
            </div>
          </FadeIn>

          {/* 6 Category Cards Grid - Staggered Scroll Entrance */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {categories.map((category) => (
              <StaggerItem key={category.id}>
                <CategoryCard category={category} />
              </StaggerItem>
            ))}
          </StaggerContainer>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: WHY CHOOSE US - Selected Dark Green Premium Section
          ========================================================================= */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#0B7A0B] text-white border-b border-[#34C759]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <FadeIn direction="up">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
              <span className="text-xs font-bold text-[#F7C600] uppercase tracking-widest">
                Horticultural Integrity
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2 font-display">
                Why Partner with Ceylon Aquatic Plants
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-[#E5E7EB] mt-2.5 sm:mt-3 leading-relaxed">
                We focus on biological authenticity, sustainable nursery stewardship, and consistent botanical vitality.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {settings.core_values.map((val, idx) => (
              <StaggerItem key={idx}>
                <div
                  className="bg-[#085808] rounded-2xl p-5 sm:p-6 border border-[#34C759]/40 flex flex-col justify-between hover:border-[#F7C600]/80 hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  <div>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0B7A0B] text-[#F7C600] border border-[#34C759]/40 flex items-center justify-center font-bold text-sm mb-3 sm:mb-4">
                      0{idx + 1}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 sm:mb-2 font-display">
                      {val.title}
                    </h3>
                    <p className="text-xs text-[#E5E7EB] leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: VIDEO SHOWCASE - Light Blue Theme (#EFF6FF)
          ========================================================================= */}
      {featuredVideo && (
        <section className="py-12 sm:py-16 md:py-20 bg-[#EFF6FF] border-b border-[#0E7CDB]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn direction="up">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                <div className="lg:col-span-5 space-y-3 sm:space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#0E7CDB]/30 text-[#0E7CDB] text-xs font-bold uppercase tracking-wider">
                    <Play className="w-3.5 h-3.5 text-[#0E7CDB]" />
                    <span>Featured Video</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2D5B] font-display">
                    {featuredVideo.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                    {featuredVideo.description}
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/video"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0E7CDB] hover:bg-[#0c6ec3] text-white shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 min-h-[44px]"
                    >
                      <span>Visit Video Library</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="group relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-white border-2 border-[#0E7CDB]/25 shadow-card hover:shadow-card-hover transition-shadow duration-300">
                    <SafeImage
                      src={featuredVideo.thumbnail_url || "/images/plants-bunch/plants-bunch-category.jpg"}
                      alt={featuredVideo.title}
                      fallbackText={featuredVideo.title}
                      fallbackSrc="/images/plants-bunch/plants-bunch-category.jpg"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                      <Link
                        href="/video"
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F7C600] text-[#0A2D5B] flex items-center justify-center shadow-lg hover:scale-105 hover:bg-[#E5B700] transition-all min-h-[44px] min-w-[44px]"
                        aria-label="Play video"
                      >
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 6: CONTACT CTA BANNER - Crisp White Card on Light Green (#F0FDF4)
          ========================================================================= */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#F0FDF4] border-t border-[#34C759]/20">
        <div className="max-w-5xl mx-auto px-4">
          <FadeIn direction="up">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 border border-[#34C759]/30 text-center shadow-card space-y-4 sm:space-y-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#EFF6FF] text-[#0B7A0B] border border-[#34C759]/25 flex items-center justify-center mx-auto shadow-xs">
                <Leaf className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-[#0A2D5B] font-display">
                Inquire About Our Aquatic Plant Collection
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
                Interested in specific botanical varieties, export availability, or nursery documentation? Get in touch directly with our Sri Lanka headquarters.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl font-bold text-sm bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] hover:-translate-y-0.5 active:translate-y-0 shadow-xs hover:shadow-md transition-all duration-300 group min-h-[48px]"
                >
                  <span>Contact Us Today</span>
                  <ArrowRight className="w-4 h-4 text-[#0A2D5B] group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="https://wa.me/94777042100"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl font-bold text-sm bg-[#0B7A0B] hover:bg-[#085808] text-white hover:-translate-y-0.5 active:translate-y-0 shadow-xs hover:shadow-md transition-all duration-300 min-h-[48px]"
                >
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
