"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight,
  Leaf,
  MapPin
} from "lucide-react";

const CATEGORIES = [
  { name: "Plants Bunch", href: "/aquarium-plants/plants-bunch", desc: "Fresh stem and rooted bunches" },
  { name: "Potted Plants", href: "/aquarium-plants/potted-plants", desc: "Established in nutrient rockwool" },
  { name: "Garden-Pond Plants", href: "/aquarium-plants/garden-pond-plants", desc: "Lilies, marginals & floating flora" },
  { name: "Terrarium Plants", href: "/aquarium-plants/terrarium-plants", desc: "Epiphytes & high-humidity plants" },
  { name: "Tissue Culture", href: "/aquarium-plants/tissue-culture", desc: "Sterile 1-2-Grow in-vitro cups" },
  { name: "Other Products", href: "/aquarium-plants/other-products", desc: "Driftwood, moss pads & accents" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [plantsDropdownOpen, setPlantsDropdownOpen] = useState(false);
  const [mobilePlantsOpen, setMobilePlantsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setPlantsDropdownOpen(false);
    setMobilePlantsOpen(false);
  }, [pathname]);

  const isAquariumPlantsActive = pathname.startsWith("/aquarium-plants") || pathname.startsWith("/plants");

  return (
    <>
      {/* Top Announcement Bar - Clean Light Green */}
      <div className="bg-[#F0FDF4] text-[#0A2D5B] text-xs py-2 px-4 border-b border-[#E5E7EB] hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-[#0A2D5B] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#F7C600] inline-block"></span>
            <span>Direct Exporter of Premium Tropical Aquatic Flora &bull; Sri Lanka</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#6B7280] font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#0B7A0B]" />
            <span>Godagama, Homagama, Colombo</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header - Beautiful Blue Gradient Background */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 bg-gradient-to-r from-[#0E7CDB] to-[#4FC3F7] ${
          isScrolled 
            ? "shadow-lg py-2.5 border-b border-[#0E7CDB]/30" 
            : "shadow-md py-3.5 border-b border-[#0E7CDB]/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-white/80 rounded-lg p-1"
            >
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 overflow-hidden rounded-full border border-white/50 bg-white flex items-center justify-center shadow-xs">
                <Image
                  src="/logo.png"
                  alt="Ceylon Aquatic Plants (Pvt) Ltd Official Logo"
                  width={48}
                  height={48}
                  priority
                  className="object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight font-display drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]">
                  Ceylon Aquatic Plants
                </span>
                <span className="text-[10px] sm:text-[11px] text-white/90 tracking-wider uppercase font-semibold">
                  (Pvt) Ltd
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links - White Text with Yellow Underline & Highlights */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* 1. Home */}
              <Link
                href="/"
                className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  pathname === "/"
                    ? "text-white font-bold bg-white/15 after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:bg-[#F7C600] after:rounded-full"
                    : "text-white/95 hover:text-[#F7C600] hover:bg-white/10"
                }`}
              >
                Home
              </Link>

              {/* 2. Aquarium Plants Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setPlantsDropdownOpen(true)}
                onMouseLeave={() => setPlantsDropdownOpen(false)}
              >
                <Link
                  href="/aquarium-plants"
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isAquariumPlantsActive
                      ? "text-white font-bold bg-white/15 after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:bg-[#F7C600] after:rounded-full"
                      : "text-white/95 hover:text-[#F7C600] hover:bg-white/10"
                  }`}
                  aria-expanded={plantsDropdownOpen}
                >
                  <span>Aquarium Plants</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${plantsDropdownOpen ? "rotate-180 text-[#F7C600]" : "text-white/80"}`} />
                </Link>

                {/* Dropdown Menu - Clean White Card with Yellow Highlights */}
                {plantsDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="bg-white rounded-2xl shadow-xl border border-[#E5E7EB] p-2.5">
                      <div className="px-3 py-2 border-b border-[#E5E7EB] mb-1 flex items-center justify-between">
                        <p className="text-xs font-bold text-[#0A2D5B] uppercase tracking-wider">
                          Plant Categories
                        </p>
                        <span className="w-2 h-2 rounded-full bg-[#F7C600]"></span>
                      </div>
                      <div className="space-y-1">
                        {CATEGORIES.map((cat) => (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            className={`flex flex-col px-3 py-2 rounded-xl transition-all duration-200 group border-l-4 border-transparent ${
                              pathname === cat.href
                                ? "bg-[#EFF6FF] border-l-[#0E7CDB] text-[#0A2D5B]"
                                : "hover:bg-[#EFF6FF] hover:border-l-[#0E7CDB] text-[#0A2D5B]"
                            }`}
                          >
                            <span className="text-sm font-bold flex items-center justify-between text-[#0A2D5B] group-hover:text-[#0E7CDB]">
                              {cat.name}
                              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#0E7CDB]" />
                            </span>
                            <span className="text-xs text-[#6B7280] line-clamp-1 mt-0.5">
                              {cat.desc}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t border-[#E5E7EB] px-2 pb-1">
                        <Link
                          href="/aquarium-plants"
                          className="flex items-center justify-center gap-1.5 text-xs text-[#0B7A0B] hover:text-[#0A2D5B] hover:underline font-bold py-1.5"
                        >
                          <Leaf className="w-3.5 h-3.5 text-[#0B7A0B]" />
                          <span>View Complete Plant Catalogue</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Gallery */}
              <Link
                href="/gallery"
                className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  pathname === "/gallery"
                    ? "text-white font-bold bg-white/15 after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:bg-[#F7C600] after:rounded-full"
                    : "text-white/95 hover:text-[#F7C600] hover:bg-white/10"
                }`}
              >
                Gallery
              </Link>

              {/* 4. Video */}
              <Link
                href="/video"
                className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  pathname === "/video"
                    ? "text-white font-bold bg-white/15 after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:bg-[#F7C600] after:rounded-full"
                    : "text-white/95 hover:text-[#F7C600] hover:bg-white/10"
                }`}
              >
                Video
              </Link>

              {/* 5. About */}
              <Link
                href="/about"
                className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  pathname === "/about"
                    ? "text-white font-bold bg-white/15 after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:bg-[#F7C600] after:rounded-full"
                    : "text-white/95 hover:text-[#F7C600] hover:bg-white/10"
                }`}
              >
                About
              </Link>

              {/* 6. Contact */}
              <Link
                href="/contact"
                className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  pathname === "/contact"
                    ? "text-white font-bold bg-white/15 after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:bg-[#F7C600] after:rounded-full"
                    : "text-white/95 hover:text-[#F7C600] hover:bg-white/10"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Action CTA Button - Yellow Primary Action Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] border border-transparent shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 text-[#0A2D5B] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/contact"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] shadow-xs"
              >
                Contact Us
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#F7C600]" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer - Beautiful Blue Gradient */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-gradient-to-b from-[#0E7CDB] to-[#0A2D5B] border-b border-white/20 px-4 pt-3 pb-6 space-y-1.5 shadow-xl animate-in fade-in duration-200">
            <Link
              href="/"
              className={`block px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                pathname === "/" ? "bg-white/20 text-[#F7C600] border-l-4 border-[#F7C600]" : "text-white hover:bg-white/10 hover:text-[#F7C600]"
              }`}
            >
              Home
            </Link>

            {/* Mobile Aquarium Plants Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobilePlantsOpen(!mobilePlantsOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isAquariumPlantsActive ? "text-[#F7C600] bg-white/20 border-l-4 border-[#F7C600]" : "text-white hover:bg-white/10 hover:text-[#F7C600]"
                }`}
              >
                <span>Aquarium Plants</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobilePlantsOpen ? "rotate-180 text-[#F7C600]" : "text-white/80"}`} />
              </button>

              {mobilePlantsOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-black/15 rounded-xl mt-1 border-l-2 border-[#F7C600]">
                  <Link
                    href="/aquarium-plants"
                    className="block px-3 py-2 text-xs font-bold text-[#F7C600]"
                  >
                    All Aquarium Plants
                  </Link>
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className={`block px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        pathname === cat.href ? "text-[#F7C600] font-bold bg-white/15" : "text-white/80 hover:text-white"
                      }`}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/gallery"
              className={`block px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                pathname === "/gallery" ? "bg-white/20 text-[#F7C600] border-l-4 border-[#F7C600]" : "text-white hover:bg-white/10 hover:text-[#F7C600]"
              }`}
            >
              Gallery
            </Link>

            <Link
              href="/video"
              className={`block px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                pathname === "/video" ? "bg-white/20 text-[#F7C600] border-l-4 border-[#F7C600]" : "text-white hover:bg-white/10 hover:text-[#F7C600]"
              }`}
            >
              Video
            </Link>

            <Link
              href="/about"
              className={`block px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                pathname === "/about" ? "bg-white/20 text-[#F7C600] border-l-4 border-[#F7C600]" : "text-white hover:bg-white/10 hover:text-[#F7C600]"
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`block px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                pathname === "/contact" ? "bg-white/20 text-[#F7C600] border-l-4 border-[#F7C600]" : "text-white hover:bg-white/10 hover:text-[#F7C600]"
              }`}
            >
              Contact
            </Link>

            <div className="pt-3 border-t border-white/20">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] shadow-xs active:translate-y-0 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Contact Us Today</span>
                <ArrowRight className="w-4 h-4 text-[#0A2D5B]" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
