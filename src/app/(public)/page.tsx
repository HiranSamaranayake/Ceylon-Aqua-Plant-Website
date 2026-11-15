import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  getCategories, 
  getPlants, 
  getGalleryImages, 
  getVideos, 
  getWebsiteSettings 
} from "@/lib/data-service";
import CategoryCard from "@/components/CategoryCard";
import PlantCard from "@/components/PlantCard";
import { 
  ArrowRight, 
  Sparkles, 
  Leaf, 
  Sun, 
  Droplets, 
  Microscope, 
  ShieldCheck, 
  Play, 
  Eye
} from "lucide-react";

export const revalidate = 60; // ISR cache revalidation every 60 seconds

export default async function HomePage() {
  const [categories, featuredPlants, galleryImages, videos, settings] = await Promise.all([
    getCategories({ activeOnly: true }),
    getPlants({ featuredOnly: true, publishedOnly: true }),
    getGalleryImages({ publishedOnly: true }),
    getVideos({ publishedOnly: true }),
    getWebsiteSettings(),
  ]);

  const featuredVideo = videos[0] || null;
  const previewImages = galleryImages.slice(0, 6);

  return (
    <div className="space-y-0">
      
      {/* =========================================================================
          SECTION 1: HERO SECTION
          ========================================================================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-brand-dark overflow-hidden">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=2000&q=90"
            alt="Lush underwater aquascape with vibrant live aquarium plants"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35 scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 via-brand-dark/70 to-brand-dark" />
        </div>

        {/* Hero Visual Foreground */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center flex flex-col items-center">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-surface/80 border border-brand-gold/40 text-brand-gold text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-md shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>Official Showcase &bull; Ceylon Aquatic Plants (Pvt) Ltd</span>
          </div>

          {/* Main H1 Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl font-display">
            {settings.hero_title}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-brand-muted max-w-2xl leading-relaxed">
            {settings.hero_subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/aquarium-plants"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold bg-brand-gold text-brand-surface hover:bg-brand-gold/90 transition-all duration-200 shadow-lg hover:shadow-gold-glow active:scale-95"
            >
              <span>Explore Our Plants</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold bg-brand-secondary/80 text-white hover:bg-brand-secondary border border-brand-border transition-all duration-200 backdrop-blur-sm"
            >
              <span>Contact Us</span>
              <Sparkles className="w-4 h-4 text-brand-gold" />
            </Link>
          </div>

          {/* Trust badges strip */}
          <div className="mt-16 pt-8 border-t border-brand-border/40 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-brand-muted max-w-3xl">
            <div className="flex items-center justify-center gap-2">
              <Sun className="w-4 h-4 text-brand-gold" />
              <span>Year-Round Tropical Sun</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Microscope className="w-4 h-4 text-brand-emerald" />
              <span>Sterile Tissue Culture</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Droplets className="w-4 h-4 text-brand-gold" />
              <span>Bio-Filtered Water</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-emerald" />
              <span>Snail & Algae Inspected</span>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 2: COMPANY INTRODUCTION
          ========================================================================= */}
      <section className="py-20 bg-brand-cream border-b border-[#E5E9E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1544943910-4c1dc44a03ab?auto=format&fit=crop&w=1200&q=85"
                  alt="Ceylon Aquatic Plants greenhouse cultivation and aquascaping"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-brand-surface p-5 sm:p-6 rounded-2xl border border-brand-border shadow-xl max-w-xs hidden sm:block">
                <p className="text-brand-gold text-xs font-semibold tracking-wider uppercase">Sri Lankan Cultivation</p>
                <p className="text-white text-xs mt-1 leading-snug">
                  Naturally acclimatized aquatic species grown with biological balance and purity.
                </p>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-emerald/15 text-brand-emerald text-xs font-semibold uppercase tracking-wider">
                <Leaf className="w-3.5 h-3.5" />
                <span>About Our Nursery</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-surface font-display leading-tight">
                Cultivating Vibrant Underwater Flora in Natural Tropical Habitats
              </h2>

              <p className="text-base text-gray-700 leading-relaxed">
                {settings.about_summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-white border border-gray-200">
                  <h4 className="text-sm font-bold text-brand-surface flex items-center gap-2">
                    <Sun className="w-4 h-4 text-brand-gold" />
                    Optimal Sunlight
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Continuous 12-hour tropical photoperiod triggers intense natural chlorophyll and carotenoid coloration.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-gray-200">
                  <h4 className="text-sm font-bold text-brand-surface flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                    Biosecure Selection
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Rigorous quarantine, root inspection, and in-vitro laboratory hygiene ensure pest-free plants.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-emerald hover:text-brand-dark transition-colors"
                >
                  <span>Learn more about our philosophy and facility</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 3: FEATURED CATEGORIES
          ========================================================================= */}
      <section className="py-24 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-brand-gold text-xs font-semibold uppercase tracking-wider mb-2">
                <Leaf className="w-3.5 h-3.5" />
                <span>Complete Plant Spectrum</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                Botanical Collections
              </h2>
              <p className="text-sm text-brand-muted mt-2 max-w-xl">
                Explore our six core aquatic and moisture-loving plant categories, prepared for aquascaping hobbyists and commercial showcases.
              </p>
            </div>

            <Link
              href="/aquarium-plants"
              className="inline-flex items-center gap-2 text-xs font-semibold text-brand-gold hover:underline"
            >
              <span>View all categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 6 Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 4: FEATURED PLANTS
          ========================================================================= */}
      <section className="py-24 bg-brand-cream border-b border-[#E5E9E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/15 text-brand-emerald text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Handpicked Varieties</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-surface font-display">
                Featured Plant Specimens
              </h2>
              <p className="text-sm text-gray-600 mt-2 max-w-xl">
                Specially selected varieties currently thriving in our propagation basins with robust foliage and root health.
              </p>
            </div>

            <Link
              href="/aquarium-plants"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-brand-dark text-white hover:bg-brand-secondary transition-colors"
            >
              <span>Browse Full Catalogue</span>
              <ArrowRight className="w-4 h-4 text-brand-gold" />
            </Link>
          </div>

          {/* Plant Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 5: WHY CHOOSE US
          ========================================================================= */}
      <section className="py-24 bg-brand-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold text-brand-gold uppercase tracking-widest">
              Horticultural Integrity
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 font-display">
              Why Partner with Ceylon Aquatic Plants
            </h2>
            <p className="text-sm sm:text-base text-brand-muted mt-3">
              We focus on biological authenticity, sustainable nursery stewardship, and consistent botanical vitality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {settings.core_values.map((val, idx) => (
              <div 
                key={idx}
                className="bg-brand-dark/70 rounded-2xl p-6 border border-brand-border/80 flex flex-col justify-between hover:border-brand-gold/60 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-secondary border border-brand-border flex items-center justify-center text-brand-gold mb-4">
                    <span className="font-bold text-sm">0{idx + 1}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 font-display">
                    {val.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 6: GALLERY PREVIEW
          ========================================================================= */}
      <section className="py-24 bg-brand-surface text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold text-brand-gold uppercase tracking-widest">
                Visual Showcase
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 font-display">
                Aquascaping & Nursery Gallery
              </h2>
              <p className="text-sm text-brand-muted mt-2 max-w-xl">
                Photographic glimpses into our propagation greenhouses, laboratory chambers, and mature aquascape layouts.
              </p>
            </div>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-brand-gold text-brand-surface hover:bg-brand-gold/90 transition-all shadow-md"
            >
              <Eye className="w-4 h-4" />
              <span>View Full Photo Gallery</span>
            </Link>
          </div>

          {/* Photo Mosaic */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {previewImages.map((img) => (
              <Link
                key={img.id}
                href="/gallery"
                className="group relative aspect-square rounded-xl overflow-hidden bg-brand-dark border border-brand-border"
              >
                <Image
                  src={img.image_url}
                  alt={img.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                  <span className="text-[11px] font-semibold text-white drop-shadow-md line-clamp-2">
                    {img.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 7: VIDEO SHOWCASE
          ========================================================================= */}
      {featuredVideo && (
        <section className="py-20 bg-brand-dark border-t border-brand-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-brand-gold text-xs font-semibold uppercase tracking-wider">
                  <Play className="w-3.5 h-3.5" />
                  <span>Featured Video</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {featuredVideo.title}
                </h2>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {featuredVideo.description}
                </p>
                <div className="pt-2">
                  <Link
                    href="/video"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-brand-gold hover:underline"
                  >
                    <span>Visit Video Library</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-brand-surface border border-brand-border shadow-2xl">
                  {featuredVideo.thumbnail_url ? (
                    <Image
                      src={featuredVideo.thumbnail_url}
                      alt={featuredVideo.title}
                      fill
                      className="object-cover"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Link
                      href="/video"
                      className="w-16 h-16 rounded-full bg-brand-gold text-brand-surface flex items-center justify-center shadow-gold-glow hover:scale-110 transition-transform"
                      aria-label="Play video"
                    >
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}


      {/* =========================================================================
          SECTION 8: CONTACT CTA BANNER
          ========================================================================= */}
      <section className="py-20 bg-brand-surface text-white border-t border-brand-border">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-brand-dark border border-brand-gold/40 flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-8 h-8 text-brand-gold" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Inquire About Our Aquatic Plant Collection
          </h2>
          <p className="text-sm sm:text-base text-brand-muted max-w-2xl mx-auto leading-relaxed">
            Interested in specific botanical varieties, export availability, or nursery documentation? Get in touch directly with our Sri Lanka headquarters.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm bg-brand-gold text-brand-surface hover:bg-brand-gold/90 transition-all shadow-md hover:shadow-gold-glow"
            >
              <span>Contact Us Today</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm bg-[#25D366] text-white hover:bg-[#20ba59] transition-all shadow-md"
            >
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
