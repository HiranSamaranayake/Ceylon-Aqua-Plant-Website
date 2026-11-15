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
      <section className="bg-[#F7FAF7] py-16 sm:py-20 border-b border-[#E3EAE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E3EAE4] text-[#176B45] text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Company Profile</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#104D35] font-display">
            About Ceylon Aquatic Plants
          </h1>
          <p className="mt-3 text-base text-[#66736A] leading-relaxed">
            Cultivating biological harmony and vibrant aquatic greenery under Sri Lanka&apos;s equatorial sunshine.
          </p>
        </div>
      </section>

      {/* Section 1: Detailed Story & Nursery Background */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-[#176B45] uppercase tracking-widest">
              Natural Nursery Heritage
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#104D35] font-display leading-tight">
              Sustainably Nurturing Aquatic Life in Ceylon
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#66736A] leading-relaxed">
              <p>
                {settings.about_summary}
              </p>
              <p>
                Our cultivation facilities integrate traditional horticultural expertise with modern biological filtration. By utilizing naturally filtered spring and rain catchment waters combined with controlled organic nutrition, we produce hardy aquatic plants with exceptional pigmentation, thick rhizomes, and vibrant submersed leaves.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-[#F7FAF7] border border-[#E3EAE4]">
                <Sun className="w-5 h-5 text-[#F2C94C] mb-2" />
                <h4 className="text-sm font-bold text-[#104D35]">Natural Photoperiod</h4>
                <p className="text-xs text-[#66736A] mt-1 leading-relaxed">Year-round equatorial sunlight powering robust photosynthesis.</p>
              </div>
              <div className="p-5 rounded-2xl bg-[#F7FAF7] border border-[#E3EAE4]">
                <Droplets className="w-5 h-5 text-[#176B45] mb-2" />
                <h4 className="text-sm font-bold text-[#104D35]">Spring Water Flow</h4>
                <p className="text-xs text-[#66736A] mt-1 leading-relaxed">Pure low-TDS water supporting sensitive botanical varieties.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-card border-2 border-white mt-8">
              <Image
                src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80"
                alt="Aquatic plant propagation basin"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-card border-2 border-white -mt-4">
              <Image
                src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80"
                alt="Sterile tissue culture laboratory container"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Section 2: Vision & Mission - Clean Light Green Background */}
      <section className="py-20 bg-[#F7FAF7] border-y border-[#E3EAE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Vision Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E3EAE4] shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F3EC] text-[#176B45] flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#104D35] font-display">
                Our Vision
              </h3>
              <p className="text-sm sm:text-base text-[#66736A] leading-relaxed">
                {settings.vision}
              </p>
            </div>

            {/* Mission Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E3EAE4] shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F3EC] text-[#176B45] flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#104D35] font-display">
                Our Mission
              </h3>
              <p className="text-sm sm:text-base text-[#66736A] leading-relaxed">
                {settings.mission}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Core Values - Clean White Background */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#176B45] uppercase tracking-widest">
            Foundational Principles
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#104D35] mt-2 font-display">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {settings.core_values.map((val, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#F7FAF7] border border-[#E3EAE4] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white text-[#176B45] border border-[#E3EAE4] flex items-center justify-center font-bold text-sm mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-[#104D35] mb-2 font-display">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#66736A] leading-relaxed">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Approved PDF Documentation & Downloads */}
      {documents.length > 0 && (
        <section className="py-20 bg-[#F7FAF7] border-t border-[#E3EAE4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold text-[#176B45] uppercase tracking-widest">
                Official Literature & Guides
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#104D35] mt-1 font-display">
                Download Catalogues & Guides
              </h2>
              <p className="text-sm text-[#66736A] mt-2">
                Access official PDF literature including our complete species catalogue, care standards, and packaging specifications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-6 rounded-2xl bg-white border border-[#E3EAE4] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-[#E8F3EC] text-[#176B45] shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#104D35] font-display">
                        {doc.title}
                      </h4>
                      {doc.description && (
                        <p className="text-xs text-[#66736A] mt-1 max-w-md">
                          {doc.description}
                        </p>
                      )}
                      <span className="inline-block mt-2 text-[11px] font-bold text-[#176B45]">
                        Format: PDF {doc.file_size ? `• ${doc.file_size}` : ""}
                      </span>
                    </div>
                  </div>

                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#F2C94C] hover:bg-[#E5B735] text-[#173B2B] shrink-0 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 border border-transparent"
                  >
                    <Download className="w-3.5 h-3.5 text-[#173B2B]" />
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
