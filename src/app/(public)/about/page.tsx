import React from "react";
import Image from "next/image";
import { getWebsiteSettings, getDocuments } from "@/lib/data-service";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { 
  Building2, 
  Target, 
  Compass, 
  FileText, 
  Download, 
  Sun, 
  Droplets 
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Tropical Aquatic Plant Exporter Sri Lanka",
  description: "Learn about Ceylon Aquatic Plants (Pvt) Ltd. Our greenhouse cultivation, sustainable water systems, biosecure propagation, and mission to deliver pristine live aquatic flora.",
  alternates: {
    canonical: "/about",
  },
};

export const revalidate = 60;

export default async function AboutPage() {
  const [settings, documents] = await Promise.all([
    getWebsiteSettings(),
    getDocuments({ publishedOnly: true }),
  ]);

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner - Clean Light Theme */}
      <section className="bg-[#F8FAFC] py-10 sm:py-16 md:py-20 border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E7EB] text-[#0B7A0B] text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Company Profile</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2D5B] font-display">
            About Ceylon Aquatic Plants
          </h1>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-[#6B7280] leading-relaxed">
            Cultivating biological harmony and vibrant aquatic greenery under Sri Lanka&apos;s equatorial sunshine.
          </p>
        </div>
      </section>

      {/* Section 1: Detailed Story & Nursery Background */}
      <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <span className="text-xs font-bold text-[#0B7A0B] uppercase tracking-widest">
              Natural Nursery Heritage
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-[#0A2D5B] font-display leading-tight">
              Sustainably Nurturing Aquatic Life in Ceylon
            </h2>
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base text-[#6B7280] leading-relaxed">
              <p>
                {settings.about_summary}
              </p>
              <p>
                Our cultivation facilities integrate traditional horticultural expertise with modern biological filtration. By utilizing naturally filtered spring and rain catchment waters combined with controlled organic nutrition, we produce hardy aquatic plants with exceptional pigmentation, thick rhizomes, and vibrant submersed leaves.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-3 sm:pt-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB]">
                <Sun className="w-5 h-5 text-[#F7C600] mb-2" />
                <h4 className="text-xs sm:text-sm font-bold text-[#0A2D5B]">Natural Photoperiod</h4>
                <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">Year-round equatorial sunlight powering robust photosynthesis.</p>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB]">
                <Droplets className="w-5 h-5 text-[#0B7A0B] mb-2" />
                <h4 className="text-xs sm:text-sm font-bold text-[#0A2D5B]">Spring Water Flow</h4>
                <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">Pure low-TDS water supporting sensitive botanical varieties.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-card border-2 border-white mt-4 sm:mt-8">
              <Image
                src="/images/garden-pond-plants/water-mimosa-neptunia-oleracea.jpg"
                alt="Aquatic plant propagation basin"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-card border-2 border-white -mt-2 sm:-mt-4">
              <Image
                src="/images/tissue-culture/tissue-culture-category.jpg"
                alt="Sterile tissue culture laboratory container"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Section 2: Vision & Mission - Clean Light Green Background */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#F8FAFC] border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            
            {/* Vision Card */}
            <div className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-3 sm:space-y-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#F0FDF4] text-[#0B7A0B] flex items-center justify-center">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-[#0A2D5B] font-display">
                Our Vision
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-[#6B7280] leading-relaxed">
                {settings.vision}
              </p>
            </div>

            {/* Mission Card */}
            <div className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-3 sm:space-y-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#F0FDF4] text-[#0B7A0B] flex items-center justify-center">
                <Target className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-[#0A2D5B] font-display">
                Our Mission
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-[#6B7280] leading-relaxed">
                {settings.mission}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Core Values - Clean White Background */}
      <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold text-[#0B7A0B] uppercase tracking-widest">
            Foundational Principles
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A2D5B] mt-2 font-display">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {settings.core_values.map((val, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white text-[#0B7A0B] border border-[#E5E7EB] flex items-center justify-center font-bold text-sm mb-3 sm:mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#0A2D5B] mb-1.5 sm:mb-2 font-display">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Approved PDF Documentation & Downloads */}
      {documents.length > 0 && (
        <section className="py-20 bg-[#F8FAFC] border-t border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold text-[#0B7A0B] uppercase tracking-widest">
                Official Literature & Guides
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2D5B] mt-1 font-display">
                Download Catalogues & Guides
              </h2>
              <p className="text-sm text-[#6B7280] mt-2">
                Access official PDF literature including our complete species catalogue, care standards, and packaging specifications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-[#F0FDF4] text-[#0B7A0B] shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#0A2D5B] font-display">
                        {doc.title}
                      </h4>
                      {doc.description && (
                        <p className="text-xs text-[#6B7280] mt-1 max-w-md">
                          {doc.description}
                        </p>
                      )}
                      <span className="inline-block mt-2 text-[11px] font-bold text-[#0B7A0B]">
                        Format: PDF {doc.file_size ? `• ${doc.file_size}` : ""}
                      </span>
                    </div>
                  </div>

                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] shrink-0 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 border border-transparent"
                  >
                    <Download className="w-3.5 h-3.5 text-[#0A2D5B]" />
                    <span>Download PDF</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
