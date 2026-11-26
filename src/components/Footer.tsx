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
  ShieldCheck
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
    <footer className="bg-[#0B7A0B] text-[#F0FDF4] border-t border-[#34C759]/40">
      {/* Top Banner Accent */}
      <div className="bg-[#085808] border-b border-[#34C759]/40 py-4 sm:py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F7C600] shrink-0"></span>
            <div>
              <p className="text-white font-bold text-xs sm:text-sm">International Plant Inquiries & Export Showcase</p>
              <p className="text-[11px] sm:text-xs text-[#E5E7EB]">Direct from our nursery basins in Godagama, Homagama, Colombo, Sri Lanka to global partners.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <a
              href="https://wa.me/94777042100"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#25D366] text-white hover:bg-[#20ba59] transition-all shadow-xs min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Inquiry</span>
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] hover:-translate-y-0.5 active:translate-y-0 shadow-xs hover:shadow-md transition-all duration-300 min-h-[44px]"
            >
              <span>Submit Inquiry</span>
              <ArrowUpRight className="w-4 h-4 text-[#0A2D5B]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">

          {/* Col 1 & 2: Brand Information */}
          <div className="sm:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-block">
              <div className="w-12 h-12 rounded-full border border-white/20 bg-white flex items-center justify-center overflow-hidden shadow-xs shrink-0">
                <Image
                  src="/logo.png"
                  alt="Ceylon Aquatic Plants (Pvt) Ltd"
                  width={48}
                  height={48}
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-white tracking-tight font-display block">
                  Ceylon Aquatic Plants
                </span>
                <span className="text-xs text-[#F7C600] tracking-widest uppercase font-semibold">
                  (Pvt) Ltd
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-[#E5E7EB] leading-relaxed max-w-sm">
              Dedicated grower and showcase provider of premium tropical aquatic plants, tissue-culture varieties, and natural pond flora organically cultivated under Sri Lanka&apos;s natural year-round sunshine.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com/ceylonaquaticplants"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#085808] border border-[#34C759]/40 text-white hover:bg-[#F7C600] hover:text-[#0A2D5B] flex items-center justify-center transition-colors min-h-[40px] min-w-[40px]"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/ceylonaquaticplants"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#085808] border border-[#34C759]/40 text-white hover:bg-[#F7C600] hover:text-[#0A2D5B] flex items-center justify-center transition-colors min-h-[40px] min-w-[40px]"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@ceylonaquaticplants"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#085808] border border-[#34C759]/40 text-white hover:bg-[#F7C600] hover:text-[#0A2D5B] flex items-center justify-center transition-colors min-h-[40px] min-w-[40px]"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/ceylonaquaticplants"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#085808] border border-[#34C759]/40 text-white hover:bg-[#F7C600] hover:text-[#0A2D5B] flex items-center justify-center transition-colors min-h-[40px] min-w-[40px]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation Menu */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Explore Website
            </h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-[#E5E7EB]">
              <li>
                <Link href="/" className="hover:text-white transition-colors py-1 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/aquarium-plants" className="hover:text-white transition-colors py-1 inline-block">
                  Aquarium Plants
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors py-1 inline-block">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/video" className="hover:text-white transition-colors py-1 inline-block">
                  Video Showcase
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors py-1 inline-block">
                  About the Business
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors py-1 inline-block">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Plant Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#F7C600] mb-3">
              Plant Categories
            </h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-[#E5E7EB]">
              {PLANT_CATEGORIES.map((cat) => (
                <li key={cat.href}>
                  <Link href={cat.href} className="hover:text-white transition-colors py-1 inline-block">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact Coordinates */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Contact Details
            </h3>
            <ul className="space-y-3 text-xs text-[#E5E7EB]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F7C600] shrink-0 mt-0.5" />
                <span className="leading-relaxed">No: 36/24, Sampath Pedesa, Lionel Jayasinghe Mawatha, Godagama, Homagama, Colombo , Srilanka</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F7C600] shrink-0" />
                <a href="tel:+94777042100" className="hover:text-white transition-colors py-1">
                  +94 77 704 2100
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/94777042100"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors py-1"
                >
                  +94 77 704 2100
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F7C600] shrink-0" />
                <a href="mailto:Ceylonaquaplants@yahoo.com" className="hover:text-white transition-colors break-all py-1">
                  Ceylonaquaplants@yahoo.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-[#34C759]/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#E5E7EB] text-center md:text-left">
          <p>
            &copy; {currentYear} Ceylon Aquatic Plants (Pvt) Ltd. All rights reserved. Registered in Sri Lanka.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link
              href="/admin/login"
              className="text-[#E5E7EB]/70 hover:text-[#F7C600] transition-colors flex items-center gap-1"
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
