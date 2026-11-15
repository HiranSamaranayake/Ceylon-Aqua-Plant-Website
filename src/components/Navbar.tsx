"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  ChevronDown, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  ArrowRight,
  Leaf,
  MessageCircle
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
      <div className="bg-[#E8F3EC] text-[#202820] text-xs py-2 px-4 border-b border-[#E3EAE4] hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-[#104D35] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#F2C94C] inline-block"></span>
            <span>Direct Exporter of Premium Tropical Aquatic Flora &bull; Sri Lanka</span>
          </div>
          <div className="flex items-center gap-6 text-[#66736A]">
            <a 
              href="tel:+94777042100" 
              className="flex items-center gap-1.5 hover:text-[#176B45] transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#176B45]" />
              <span>077 704 2100</span>
            </a>
            <a 
              href="mailto:Ceylonaquaplants@yahoo.com" 
              className="flex items-center gap-1.5 hover:text-[#176B45] transition-colors font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-[#176B45]" />
              <span>Ceylonaquaplants@yahoo.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header - Clean White Background */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md ${
          isScrolled 
            ? "shadow-sm py-2.5 border-b border-[#E3EAE4]" 
            : "py-3.5 border-b border-[#E3EAE4]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#176B45] rounded-lg p-1"
            >
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 overflow-hidden rounded-full border border-[#E3EAE4] bg-white flex items-center justify-center shadow-xs">
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
                <span className="text-base sm:text-lg font-bold tracking-tight text-[#104D35] leading-tight font-display">
                  Ceylon Aquatic Plants
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#66736A] tracking-wider uppercase font-semibold">
                  (Pvt) Ltd
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links - Green Text on White */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* 1. Home */}
              <Link
                href="/"
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  pathname === "/"
                    ? "text-[#176B45] bg-[#E8F3EC]"
                    : "text-[#202820] hover:text-[#176B45] hover:bg-[#F7FAF7]"
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
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isAquariumPlantsActive
                      ? "text-[#176B45] bg-[#E8F3EC]"
                      : "text-[#202820] hover:text-[#176B45] hover:bg-[#F7FAF7]"
                  }`}
                  aria-expanded={plantsDropdownOpen}
                >
                  <span>Aquarium Plants</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${plantsDropdownOpen ? "rotate-180 text-[#176B45]" : "text-[#66736A]"}`} />
                </Link>

                {/* Dropdown Menu - Clean White Card with Yellow Highlights */}
                {plantsDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="bg-white rounded-2xl shadow-xl border border-[#E3EAE4] p-2.5">
                      <div className="px-3 py-2 border-b border-[#E3EAE4] mb-1 flex items-center justify-between">
                        <p className="text-xs font-bold text-[#104D35] uppercase tracking-wider">
                          Plant Categories
                        </p>
                        <span className="w-2 h-2 rounded-full bg-[#F2C94C]"></span>
                      </div>
                      <div className="space-y-1">
                        {CATEGORIES.map((cat) => (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            className={`flex flex-col px-3 py-2 rounded-xl transition-all duration-200 group border-l-4 border-transparent ${
                              pathname === cat.href
                                ? "bg-[#FFF9E6] border-l-[#F2C94C] text-[#104D35]"
                                : "hover:bg-[#FFF9E6] hover:border-l-[#F2C94C] text-[#202820]"
                            }`}
                          >
                            <span className="text-sm font-bold flex items-center justify-between text-[#104D35] group-hover:text-[#173B2B]">
                              {cat.name}
                              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#176B45]" />
                            </span>
                            <span className="text-xs text-[#66736A] line-clamp-1 mt-0.5 group-hover:text-[#202820]">
                              {cat.desc}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t border-[#E3EAE4] px-2 pb-1">
                        <Link
                          href="/aquarium-plants"
                          className="flex items-center justify-center gap-1.5 text-xs text-[#176B45] hover:text-[#104D35] hover:underline font-bold py-1.5"
                        >
                          <Leaf className="w-3.5 h-3.5 text-[#176B45]" />
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
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  pathname === "/gallery"
                    ? "text-[#176B45] bg-[#E8F3EC]"
                    : "text-[#202820] hover:text-[#176B45] hover:bg-[#F7FAF7]"
                }`}
              >
                Gallery
              </Link>

              {/* 4. Video */}
              <Link
                href="/video"
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  pathname === "/video"
                    ? "text-[#176B45] bg-[#E8F3EC]"
                    : "text-[#202820] hover:text-[#176B45] hover:bg-[#F7FAF7]"
                }`}
              >
                Video
              </Link>

              {/* 5. About */}
              <Link
                href="/about"
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  pathname === "/about"
                    ? "text-[#176B45] bg-[#E8F3EC]"
                    : "text-[#202820] hover:text-[#176B45] hover:bg-[#F7FAF7]"
                }`}
              >
                About
              </Link>

              {/* 6. Contact */}
              <Link
                href="/contact"
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  pathname === "/contact"
                    ? "text-[#176B45] bg-[#E8F3EC]"
                    : "text-[#202820] hover:text-[#176B45] hover:bg-[#F7FAF7]"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Action CTA Button - Yellow Primary Action Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#F2C94C] hover:bg-[#E5B735] text-[#173B2B] border border-transparent shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 text-[#173B2B] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/contact"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#F2C94C] hover:bg-[#E5B735] text-[#173B2B] shadow-xs"
              >
                Contact Us
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#202820] hover:bg-[#F7FAF7] focus:outline-none focus:ring-2 focus:ring-[#176B45]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#176B45]" /> : <Menu className="w-6 h-6 text-[#104D35]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer - Clean White */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#E3EAE4] px-4 pt-3 pb-6 space-y-1.5 shadow-lg animate-in fade-in duration-200">
            <Link
              href="/"
              className={`block px-3.5 py-2.5 rounded-xl text-sm font-bold ${
                pathname === "/" ? "bg-[#E8F3EC] text-[#176B45]" : "text-[#202820] hover:bg-[#F7FAF7]"
              }`}
            >
              Home
            </Link>

            {/* Mobile Aquarium Plants Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobilePlantsOpen(!mobilePlantsOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold ${
                  isAquariumPlantsActive ? "text-[#176B45] bg-[#E8F3EC]" : "text-[#202820] hover:bg-[#F7FAF7]"
                }`}
              >
                <span>Aquarium Plants</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobilePlantsOpen ? "rotate-180 text-[#176B45]" : "text-[#66736A]"}`} />
              </button>

              {mobilePlantsOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-[#F7FAF7] rounded-xl mt-1 border-l-2 border-[#176B45]">
                  <Link
                    href="/aquarium-plants"
                    className="block px-3 py-2 text-xs font-bold text-[#176B45]"
                  >
                    All Aquarium Plants
                  </Link>
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className={`block px-3 py-1.5 rounded-lg text-xs font-medium ${
                        pathname === cat.href ? "text-[#176B45] font-bold bg-[#E8F3EC]" : "text-[#66736A] hover:text-[#202820]"
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
              className={`block px-3.5 py-2.5 rounded-xl text-sm font-bold ${
                pathname === "/gallery" ? "bg-[#E8F3EC] text-[#176B45]" : "text-[#202820] hover:bg-[#F7FAF7]"
              }`}
            >
              Gallery
            </Link>

            <Link
              href="/video"
              className={`block px-3.5 py-2.5 rounded-xl text-sm font-bold ${
                pathname === "/video" ? "bg-[#E8F3EC] text-[#176B45]" : "text-[#202820] hover:bg-[#F7FAF7]"
              }`}
            >
              Video
            </Link>

            <Link
              href="/about"
              className={`block px-3.5 py-2.5 rounded-xl text-sm font-bold ${
                pathname === "/about" ? "bg-[#E8F3EC] text-[#176B45]" : "text-[#202820] hover:bg-[#F7FAF7]"
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`block px-3.5 py-2.5 rounded-xl text-sm font-bold ${
                pathname === "/contact" ? "bg-[#E8F3EC] text-[#176B45]" : "text-[#202820] hover:bg-[#F7FAF7]"
              }`}
            >
              Contact
            </Link>

            <div className="pt-3 border-t border-[#E3EAE4] space-y-2.5">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href="tel:+94777042100"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#E8F3EC] text-[#176B45] font-bold hover:bg-[#d5e9dc] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#176B45]" />
                  <span>077 704 2100</span>
                </a>
                <a
                  href="https://wa.me/94777042100"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-50 text-[#25D366] font-bold hover:bg-emerald-100 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-[#F2C94C] hover:bg-[#E5B735] text-[#173B2B] shadow-xs active:translate-y-0 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Contact Us Today</span>
                <ArrowRight className="w-4 h-4 text-[#173B2B]" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
