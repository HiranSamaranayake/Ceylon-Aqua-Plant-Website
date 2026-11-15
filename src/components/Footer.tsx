import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin,
  ArrowUpRight,
  ShieldCheck,
  Sparkles
} from "lucide-react";

const PLANT_CATEGORIES = [
  { name: "Plants Bunch", href: "/aquarium-plants/plants-bunch" },
  { name: "Potted Plants", href: "/aquarium-plants/potted-plants" },
  { name: "Garden-Pond Plants", href: "/aquarium-plants/garden-pond-plants" },
  { name: "Terrarium Plants", href: "/aquarium-plants/terrarium-plants" },
  { name: "Tissue Culture", href: "/aquarium-plants/tissue-culture" },
  { name: "Other Products", href: "/aquarium-plants/other-products" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-surface text-brand-muted border-t border-brand-border">
      {/* Top Banner Accent */}
      <div className="bg-brand-secondary/40 border-b border-brand-border/60 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-brand-emerald/20 text-brand-gold border border-brand-gold/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">International Plant Inquiries & Export Showcase</p>
              <p className="text-xs text-brand-muted">Direct from our nursery basins in Western Province, Sri Lanka to global partners.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-[#25D366] text-white hover:bg-[#20ba59] transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-brand-gold text-brand-surface hover:bg-brand-gold/90 transition-all"
            >
              <span>Submit Inquiry</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 group inline-block">
              <div className="w-12 h-12 rounded-full border border-brand-gold/50 bg-brand-dark flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Ceylon Aquatic Plants (Pvt) Ltd"
                  width={48}
                  height={48}
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight font-display block">
                  Ceylon Aquatic Plants
                </span>
                <span className="text-xs text-brand-gold tracking-widest uppercase font-semibold">
                  (Pvt) Ltd
                </span>
              </div>
            </Link>
            <p className="text-sm text-brand-muted leading-relaxed max-w-sm">
              Dedicated grower and showcase provider of premium tropical aquatic plants, tissue-culture varieties, and natural pond flora organically cultivated under Sri Lanka&apos;s natural year-round sunshine.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com/ceylonaquaticplants"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-dark border border-brand-border flex items-center justify-center text-brand-muted hover:text-white hover:border-brand-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/ceylonaquaticplants"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-dark border border-brand-border flex items-center justify-center text-brand-muted hover:text-white hover:border-brand-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@ceylonaquaticplants"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-dark border border-brand-border flex items-center justify-center text-brand-muted hover:text-white hover:border-brand-gold transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/ceylonaquaticplants"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-dark border border-brand-border flex items-center justify-center text-brand-muted hover:text-white hover:border-brand-gold transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation Menu */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Explore Website
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/aquarium-plants" className="hover:text-white transition-colors">
                  Aquarium Plants
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/video" className="hover:text-white transition-colors">
                  Video Showcase
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About the Business
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Plant Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gold mb-4">
              Plant Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              {PLANT_CATEGORIES.map((cat) => (
                <li key={cat.href}>
                  <Link href={cat.href} className="hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact Coordinates */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>No. 45, Greenhouse Valley Road, Western Province, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a href="tel:+94112345678" className="hover:text-white transition-colors">
                  +94 11 234 5678
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a 
                  href="https://wa.me/94771234567" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  +94 77 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <a href="mailto:info@ceylonaquaticplants.com" className="hover:text-white transition-colors">
                  info@ceylonaquaticplants.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-14 pt-8 border-t border-brand-border/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-brand-muted">
            &copy; {currentYear} Ceylon Aquatic Plants (Pvt) Ltd. All rights reserved. Registered in Sri Lanka.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link 
              href="/admin/login" 
              className="text-brand-muted/60 hover:text-brand-gold transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
