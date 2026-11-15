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
  Sparkles,
  ArrowRight,
  Leaf
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
      setIsScrolled(window.scrollY > 20);
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
      {/* Top micro announcement bar */}
      <div className="bg-brand-surface text-brand-muted text-xs py-2 px-4 border-b border-brand-border/40 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/90">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Direct Exporter of Premium Tropical Aquatic Flora from Sri Lanka</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a 
              href="tel:+94112345678" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>+94 11 234 5678</span>
            </a>
            <a 
              href="mailto:info@ceylonaquaticplants.com" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-brand-gold" />
              <span>info@ceylonaquaticplants.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-brand-dark/95 backdrop-blur-md shadow-xl py-3 border-b border-brand-border" 
            : "bg-brand-dark py-4 border-b border-brand-border/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-gold rounded-lg p-1"
            >
              <div className="relative w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-full border border-brand-gold/40 bg-brand-surface flex items-center justify-center shadow-md">
                <Image
                  src="/logo.png"
                  alt="Ceylon Aquatic Plants (Pvt) Ltd Official Logo"
                  width={56}
                  height={56}
                  priority
                  className="object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold tracking-tight text-white leading-tight font-display">
                  Ceylon Aquatic Plants
                </span>
                <span className="text-[11px] md:text-xs text-brand-gold tracking-widest uppercase font-semibold">
                  (Pvt) Ltd
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* 1. Home */}
              <Link
                href="/"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === "/"
                    ? "text-brand-gold bg-brand-secondary/50 font-semibold"
                    : "text-white/90 hover:text-white hover:bg-brand-secondary/30"
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
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isAquariumPlantsActive
                      ? "text-brand-gold bg-brand-secondary/50 font-semibold"
                      : "text-white/90 hover:text-white hover:bg-brand-secondary/30"
                  }`}
                  aria-expanded={plantsDropdownOpen}
                >
                  <span>Aquarium Plants</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${plantsDropdownOpen ? "rotate-180 text-brand-gold" : ""}`} />
                </Link>

                {/* Dropdown Menu */}
                {plantsDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-brand-surface rounded-xl shadow-2xl border border-brand-border p-2 backdrop-blur-md">
                      <div className="px-3 py-2 border-b border-brand-border/60 mb-1">
                        <p className="text-xs font-semibold text-brand-gold uppercase tracking-wider">
                          Plant Categories
                        </p>
                      </div>
                      <div className="space-y-1">
                        {CATEGORIES.map((cat) => (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            className={`flex flex-col px-3 py-2 rounded-lg transition-colors group ${
                              pathname === cat.href
                                ? "bg-brand-secondary text-brand-gold"
                                : "hover:bg-brand-secondary/40 text-white"
                            }`}
                          >
                            <span className="text-sm font-medium flex items-center justify-between">
                              {cat.name}
                              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-brand-gold" />
                            </span>
                            <span className="text-xs text-brand-muted line-clamp-1">
                              {cat.desc}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t border-brand-border/60 px-2 pb-1">
                        <Link
                          href="/aquarium-plants"
                          className="flex items-center justify-center gap-1.5 text-xs text-brand-gold hover:underline font-medium py-1"
                        >
                          <Leaf className="w-3.5 h-3.5" />
                          View Complete Botanical Catalogue
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Gallery */}
              <Link
                href="/gallery"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === "/gallery"
                    ? "text-brand-gold bg-brand-secondary/50 font-semibold"
                    : "text-white/90 hover:text-white hover:bg-brand-secondary/30"
                }`}
              >
                Gallery
              </Link>

              {/* 4. Video */}
              <Link
                href="/video"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === "/video"
                    ? "text-brand-gold bg-brand-secondary/50 font-semibold"
                    : "text-white/90 hover:text-white hover:bg-brand-secondary/30"
                }`}
              >
                Video
              </Link>

              {/* 5. About */}
              <Link
                href="/about"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === "/about"
                    ? "text-brand-gold bg-brand-secondary/50 font-semibold"
                    : "text-white/90 hover:text-white hover:bg-brand-secondary/30"
                }`}
              >
                About
              </Link>

              {/* 6. Contact */}
              <Link
                href="/contact"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === "/contact"
                    ? "text-brand-gold bg-brand-secondary/50 font-semibold"
                    : "text-white/90 hover:text-white hover:bg-brand-secondary/30"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Action CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-brand-gold text-brand-surface hover:bg-brand-gold/90 transition-all duration-200 shadow-md hover:shadow-gold-glow active:scale-95"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/contact"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-gold text-brand-surface"
              >
                Contact
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-white hover:bg-brand-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-brand-surface border-b border-brand-border px-4 pt-3 pb-6 space-y-2 animate-in fade-in duration-200">
            <Link
              href="/"
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                pathname === "/" ? "bg-brand-secondary text-brand-gold font-semibold" : "text-white hover:bg-brand-secondary/30"
              }`}
            >
              Home
            </Link>

            {/* Mobile Aquarium Plants Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobilePlantsOpen(!mobilePlantsOpen)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium ${
                  isAquariumPlantsActive ? "text-brand-gold bg-brand-secondary/40 font-semibold" : "text-white hover:bg-brand-secondary/30"
                }`}
              >
                <span>Aquarium Plants</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobilePlantsOpen ? "rotate-180 text-brand-gold" : ""}`} />
              </button>

              {mobilePlantsOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-brand-dark/40 rounded-lg mt-1 border-l-2 border-brand-gold/60">
                  <Link
                    href="/aquarium-plants"
                    className="block px-3 py-2 text-sm text-brand-gold font-medium"
                  >
                    All Aquarium Plants
                  </Link>
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className={`block px-3 py-1.5 rounded-md text-sm ${
                        pathname === cat.href ? "text-brand-gold font-semibold" : "text-brand-muted hover:text-white"
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
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                pathname === "/gallery" ? "bg-brand-secondary text-brand-gold font-semibold" : "text-white hover:bg-brand-secondary/30"
              }`}
            >
              Gallery
            </Link>

            <Link
              href="/video"
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                pathname === "/video" ? "bg-brand-secondary text-brand-gold font-semibold" : "text-white hover:bg-brand-secondary/30"
              }`}
            >
              Video
            </Link>

            <Link
              href="/about"
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                pathname === "/about" ? "bg-brand-secondary text-brand-gold font-semibold" : "text-white hover:bg-brand-secondary/30"
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                pathname === "/contact" ? "bg-brand-secondary text-brand-gold font-semibold" : "text-white hover:bg-brand-secondary/30"
              }`}
            >
              Contact
            </Link>

            <div className="pt-4 border-t border-brand-border/60">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold bg-brand-gold text-brand-surface shadow-md"
              >
                <span>Contact Business Inquiries</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
