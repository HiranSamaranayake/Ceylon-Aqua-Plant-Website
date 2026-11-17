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

      {/* Main Sticky Header - Light Blue Background (#EFF6FF) with Subtle Shadow */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 bg-[#EFF6FF] border-b border-[#E5E7EB] ${
          isScrolled 
            ? "shadow-sm py-2" 
            : "shadow-xs py-3 sm:py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo - Horizontal Brand Logo (Emblem + Typography) */}
            <Link 
              href="/" 
              className="flex items-center group focus:outline-none focus:ring-2 focus:ring-[#0B7A0B] rounded-xl p-1 shrink-0"
              aria-label="Ceylon Aquatic Plants (Pvt) Ltd"
            >
              <div 
                className={`relative transition-all duration-300 ${
                  isScrolled 
                    ? "h-11 w-32 sm:h-13 sm:w-36 md:h-14 md:w-40" 
                    : "h-13 w-36 sm:h-16 sm:w-44 md:h-18 md:w-48 lg:h-20 lg:w-56"
                }`}
              >
                <Image
                  src="/navbar-logo.jpg"
                  alt="Ceylon Aquatic Plants (Pvt) Ltd Official Logo"
                  fill
                  sizes="(max-width: 640px) 144px, (max-width: 768px) 180px, 224px"
                  priority
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links - Poppins Font, 18px-20px Size, Navy Blue Text with Dark Green Hover & Yellow Underline Active */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* 1. Home */}
              <Link
                href="/"
                className={`relative px-3.5 py-2 rounded-xl text-[18px] font-poppins transition-all duration-200 ${
                  pathname === "/"
                    ? "text-[#0B7A0B] font-semibold after:absolute after:bottom-[-2px] after:left-3.5 after:right-3.5 after:h-[2.5px] after:bg-[#F7C600] after:rounded-full bg-white/40"
                    : "text-[#0A2D5B] font-medium hover:text-[#0B7A0B] hover:bg-white/50"
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
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[18px] font-poppins transition-all duration-200 ${
                    isAquariumPlantsActive
                      ? "text-[#0B7A0B] font-semibold after:absolute after:bottom-[-2px] after:left-3.5 after:right-3.5 after:h-[2.5px] after:bg-[#F7C600] after:rounded-full bg-white/40"
                      : "text-[#0A2D5B] font-medium hover:text-[#0B7A0B] hover:bg-white/50"
                  }`}
                  aria-expanded={plantsDropdownOpen}
                >
                  <span>Aquarium Plants</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${plantsDropdownOpen ? "rotate-180 text-[#0B7A0B]" : isAquariumPlantsActive ? "text-[#0B7A0B]" : "text-[#6B7280]"}`} />
                </Link>

                {/* Dropdown Menu - Clean White Card with Yellow Highlights */}
                {plantsDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="bg-white rounded-2xl shadow-xl border border-[#E5E7EB] p-2.5">
                      <div className="px-3 py-2 border-b border-[#E5E7EB] mb-1 flex items-center justify-between">
                        <p className="text-xs font-bold text-[#0A2D5B] uppercase tracking-wider font-poppins">
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
                                ? "bg-[#EFF6FF] border-l-[#0B7A0B] text-[#0B7A0B] font-semibold"
                                : "hover:bg-[#EFF6FF] hover:border-l-[#0B7A0B] text-[#0A2D5B]"
                            }`}
                          >
                            <span className="text-[15px] font-poppins font-semibold flex items-center justify-between group-hover:text-[#0B7A0B]">
                              {cat.name}
                              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#0B7A0B]" />
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
                          className="flex items-center justify-center gap-1.5 text-xs text-[#0B7A0B] hover:text-[#0A2D5B] hover:underline font-bold py-1.5 font-poppins"
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
                className={`relative px-3.5 py-2 rounded-xl text-[18px] font-poppins transition-all duration-200 ${
                  pathname === "/gallery"
                    ? "text-[#0B7A0B] font-semibold after:absolute after:bottom-[-2px] after:left-3.5 after:right-3.5 after:h-[2.5px] after:bg-[#F7C600] after:rounded-full bg-white/40"
                    : "text-[#0A2D5B] font-medium hover:text-[#0B7A0B] hover:bg-white/50"
                }`}
              >
                Gallery
              </Link>

              {/* 4. Video */}
              <Link
                href="/video"
                className={`relative px-3.5 py-2 rounded-xl text-[18px] font-poppins transition-all duration-200 ${
                  pathname === "/video"
                    ? "text-[#0B7A0B] font-semibold after:absolute after:bottom-[-2px] after:left-3.5 after:right-3.5 after:h-[2.5px] after:bg-[#F7C600] after:rounded-full bg-white/40"
                    : "text-[#0A2D5B] font-medium hover:text-[#0B7A0B] hover:bg-white/50"
                }`}
              >
                Video
              </Link>

              {/* 5. About */}
              <Link
                href="/about"
                className={`relative px-3.5 py-2 rounded-xl text-[18px] font-poppins transition-all duration-200 ${
                  pathname === "/about"
                    ? "text-[#0B7A0B] font-semibold after:absolute after:bottom-[-2px] after:left-3.5 after:right-3.5 after:h-[2.5px] after:bg-[#F7C600] after:rounded-full bg-white/40"
                    : "text-[#0A2D5B] font-medium hover:text-[#0B7A0B] hover:bg-white/50"
                }`}
              >
                About
              </Link>

              {/* 6. Contact */}
              <Link
                href="/contact"
                className={`relative px-3.5 py-2 rounded-xl text-[18px] font-poppins transition-all duration-200 ${
                  pathname === "/contact"
                    ? "text-[#0B7A0B] font-semibold after:absolute after:bottom-[-2px] after:left-3.5 after:right-3.5 after:h-[2.5px] after:bg-[#F7C600] after:rounded-full bg-white/40"
                    : "text-[#0A2D5B] font-medium hover:text-[#0B7A0B] hover:bg-white/50"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Action CTA Button - Yellow Primary Action Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[16px] font-poppins font-semibold bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] border border-transparent shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 text-[#0A2D5B] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex lg:hidden items-center gap-3">
              <Link
                href="/contact"
                className="px-3.5 py-1.5 rounded-xl text-xs font-poppins font-semibold bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] shadow-xs"
              >
                Contact Us
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#0A2D5B] hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-[#0B7A0B]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#0B7A0B]" /> : <Menu className="w-6 h-6 text-[#0A2D5B]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer - Light Blue (#EFF6FF) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#EFF6FF] border-b border-[#E5E7EB] px-4 pt-3 pb-6 space-y-1.5 shadow-lg animate-in fade-in duration-200 font-poppins">
            <Link
              href="/"
              className={`block px-3.5 py-2.5 rounded-xl text-[18px] transition-all ${
                pathname === "/" ? "bg-white/80 text-[#0B7A0B] font-semibold border-l-4 border-[#F7C600]" : "text-[#0A2D5B] font-medium hover:bg-white/50 hover:text-[#0B7A0B]"
              }`}
            >
              Home
            </Link>

            {/* Mobile Aquarium Plants Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobilePlantsOpen(!mobilePlantsOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[18px] transition-all ${
                  isAquariumPlantsActive ? "text-[#0B7A0B] font-semibold bg-white/80 border-l-4 border-[#F7C600]" : "text-[#0A2D5B] font-medium hover:bg-white/50 hover:text-[#0B7A0B]"
                }`}
              >
                <span>Aquarium Plants</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobilePlantsOpen ? "rotate-180 text-[#0B7A0B]" : "text-[#6B7280]"}`} />
              </button>

              {mobilePlantsOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-white/50 rounded-xl mt-1 border-l-2 border-[#0B7A0B]">
                  <Link
                    href="/aquarium-plants"
                    className="block px-3 py-2 text-[15px] font-semibold text-[#0B7A0B]"
                  >
                    All Aquarium Plants
                  </Link>
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className={`block px-3 py-1.5 rounded-lg text-[15px] font-medium transition-all ${
                        pathname === cat.href ? "text-[#0B7A0B] font-semibold bg-white" : "text-[#6B7280] hover:text-[#0A2D5B]"
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
              className={`block px-3.5 py-2.5 rounded-xl text-[18px] transition-all ${
                pathname === "/gallery" ? "bg-white/80 text-[#0B7A0B] font-semibold border-l-4 border-[#F7C600]" : "text-[#0A2D5B] font-medium hover:bg-white/50 hover:text-[#0B7A0B]"
              }`}
            >
              Gallery
            </Link>

            <Link
              href="/video"
              className={`block px-3.5 py-2.5 rounded-xl text-[18px] transition-all ${
                pathname === "/video" ? "bg-white/80 text-[#0B7A0B] font-semibold border-l-4 border-[#F7C600]" : "text-[#0A2D5B] font-medium hover:bg-white/50 hover:text-[#0B7A0B]"
              }`}
            >
              Video
            </Link>

            <Link
              href="/about"
              className={`block px-3.5 py-2.5 rounded-xl text-[18px] transition-all ${
                pathname === "/about" ? "bg-white/80 text-[#0B7A0B] font-semibold border-l-4 border-[#F7C600]" : "text-[#0A2D5B] font-medium hover:bg-white/50 hover:text-[#0B7A0B]"
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`block px-3.5 py-2.5 rounded-xl text-[18px] transition-all ${
                pathname === "/contact" ? "bg-white/80 text-[#0B7A0B] font-semibold border-l-4 border-[#F7C600]" : "text-[#0A2D5B] font-medium hover:bg-white/50 hover:text-[#0B7A0B]"
              }`}
            >
              Contact
            </Link>

            <div className="pt-3 border-t border-[#E5E7EB]">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-[16px] bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] shadow-xs active:translate-y-0 hover:-translate-y-0.5 transition-all duration-300"
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
