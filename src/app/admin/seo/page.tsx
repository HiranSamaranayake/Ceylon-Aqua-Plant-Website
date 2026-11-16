import React from "react";
import Link from "next/link";
import { 
  Search, 
  Globe, 
  FileCode, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Layers 
} from "lucide-react";

export default function AdminSEOManagementPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0B7A0B] uppercase tracking-wider mb-1">
            <Search className="w-4 h-4 text-[#F7C600]" />
            <span>Search Visibility Foundation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A2D5B] font-display">
            Technical & On-Page SEO Management
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
            Monitor search engine crawlability, structured data schemas, canonical links, and XML sitemaps.
          </p>
        </div>
      </div>

      {/* Crawl Directives & Sitemap Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#E5E7EB] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-[#0B7A0B]">
            <FileCode className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F0FDF4] text-[#0B7A0B] px-2.5 py-0.5 rounded-full">
              Automated
            </span>
          </div>
          <h3 className="font-bold text-base text-[#0A2D5B] font-display">
            Dynamic XML Sitemap
          </h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Auto-indexes all public pages, the 6 core categories, and all active plant specimen URLs with change frequencies.
          </p>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B7A0B] hover:underline pt-2"
          >
            <span>Inspect Live /sitemap.xml</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E5E7EB] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-[#0B7A0B]">
            <Globe className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FEF9C3] text-[#B8860B] border border-[#F7C600]/40 px-2.5 py-0.5 rounded-full">
              Protected
            </span>
          </div>
          <h3 className="font-bold text-base text-[#0A2D5B] font-display">
            Robots.txt Directives
          </h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Permits Googlebot and search crawlers on showcase routes while strictly preventing indexing of private /admin portals.
          </p>
          <a
            href="/robots.txt"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B7A0B] hover:underline pt-2"
          >
            <span>Inspect Live /robots.txt</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E5E7EB] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-[#0B7A0B]">
            <Layers className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F0FDF4] text-[#0B7A0B] px-2.5 py-0.5 rounded-full">
              Schema.org
            </span>
          </div>
          <h3 className="font-bold text-base text-[#0A2D5B] font-display">
            JSON-LD Rich Snippets
          </h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Organization, WebSite (SearchAction), BreadcrumbList, Product (Botanical specs), and VideoObject markup active.
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B7A0B]">
              <CheckCircle2 className="w-3.5 h-3.5" /> Factual Data Verified
            </span>
          </div>
        </div>
      </div>

      {/* Target Keywords & Audit Matrix */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] shadow-xs space-y-6">
        <div>
          <h3 className="font-bold text-lg text-[#0A2D5B] font-display">
            Mapped Aquarium Plant Keyword Groups
          </h3>
          <p className="text-xs text-[#6B7280] mt-1">
            Target high-intent keywords mapped to public website routes per SEO specification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-2">
            <span className="font-bold text-[#0A2D5B]">Sri Lanka Export & General Aquarium Plants:</span>
            <ul className="list-disc pl-5 text-[#6B7280] space-y-1">
              <li>Aquarium plants Sri Lanka (Target: Homepage, About)</li>
              <li>Aquatic plants Sri Lanka (Target: Homepage, Plants Catalogue)</li>
              <li>Live aquarium plants exporter (Target: Homepage, Contact)</li>
              <li>Aquascaping plants wholesale (Target: Plants Catalogue)</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-2">
            <span className="font-bold text-[#0A2D5B]">Category Botanical Varieties:</span>
            <ul className="list-disc pl-5 text-[#6B7280] space-y-1">
              <li>Tissue culture aquarium plants (Target: /aquarium-plants/tissue-culture)</li>
              <li>Potted aquarium plants (Target: /aquarium-plants/potted-plants)</li>
              <li>Bunched live aquatic stems (Target: /aquarium-plants/plants-bunch)</li>
              <li>Garden and pond aquatic plants (Target: /aquarium-plants/garden-pond-plants)</li>
              <li>Terrarium & paludarium flora (Target: /aquarium-plants/terrarium-plants)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
