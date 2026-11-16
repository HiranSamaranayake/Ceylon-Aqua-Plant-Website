import React from "react";
import { getWebsiteSettings } from "@/lib/data-service";
import ContactForm from "@/components/ContactForm";
import FadeIn from "@/components/animations/FadeIn";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Clock, 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin,
  ShieldCheck 
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Business Inquiries",
  description: "Get in touch with Ceylon Aquatic Plants (Pvt) Ltd. Inquire about live aquarium plant varieties, wholesale export schedules, and greenhouse nursery visits in Sri Lanka.",
  alternates: {
    canonical: "/contact",
  },
};

export const revalidate = 60;

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: { plant?: string };
}) {
  const settings = await getWebsiteSettings();
  const plantReference = searchParams?.plant || "";

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner - Clean Light Theme */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E5E7EB] text-[#0B7A0B] text-xs font-bold uppercase tracking-wider mb-3">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Customer & Wholesale Communications</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0A2D5B] font-display">
              Contact Ceylon Aquatic Plants
            </h1>
            <p className="mt-3 text-base text-[#6B7280] leading-relaxed">
              Have questions regarding botanical availability, packing specifications, or export quarantine? Our nursery specialists are ready to assist.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Form & Contact Information Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Direct Contact Details & Working Hours */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-[#0A2D5B] font-display border-b border-[#E5E7EB] pb-4">
                Official Business Channels
              </h2>

              <ul className="space-y-5 text-sm">
                {/* Telephone */}
                <li className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#F0FDF4] text-[#0B7A0B] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                      Telephone Support
                    </span>
                    <a
                      href={`tel:${settings.phone.startsWith("+") ? settings.phone.replace(/\s+/g, "") : `+94${settings.phone.replace(/^0/, "").replace(/\s+/g, "")}`}`}
                      className="text-base font-bold text-[#0A2D5B] hover:text-[#0B7A0B] transition-colors"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </li>

                {/* WhatsApp */}
                <li className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-[#25D366] shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                      Direct WhatsApp
                    </span>
                    <a
                      href={`https://wa.me/${settings.whatsapp.trim().startsWith("+") ? settings.whatsapp.replace(/[^0-9]/g, "") : settings.whatsapp.trim().startsWith("0") ? `94${settings.whatsapp.trim().slice(1).replace(/[^0-9]/g, "")}` : settings.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-[#0A2D5B] hover:text-[#25D366] transition-colors"
                    >
                      {settings.whatsapp}
                    </a>
                  </div>
                </li>

                {/* Email */}
                <li className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#F0FDF4] text-[#0B7A0B] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                      Official Email
                    </span>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-base font-bold text-[#0A2D5B] hover:text-[#0B7A0B] transition-colors break-all"
                    >
                      {settings.email}
                    </a>
                  </div>
                </li>

                {/* Address */}
                <li className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#F8FAFC] text-[#0A2D5B] shrink-0 mt-0.5 border border-[#E5E7EB]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                      Nursery & Headquarters
                    </span>
                    <p className="text-sm font-medium text-[#0A2D5B] leading-snug">
                      {settings.address}
                    </p>
                  </div>
                </li>

                {/* Working Hours */}
                <li className="flex items-start gap-3.5 pt-3 border-t border-[#E5E7EB]">
                  <div className="p-2.5 rounded-xl bg-[#F8FAFC] text-[#6B7280] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                      Nursery Operating Hours
                    </span>
                    <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">
                      Monday &ndash; Friday: 8:00 AM &ndash; 5:30 PM (IST)<br />
                      Saturday: 8:00 AM &ndash; 1:00 PM (IST)
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Social Media Links Card */}
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#E5E7EB] space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A2D5B]">
                Connect Across Networks
              </h3>
              <p className="text-xs text-[#6B7280]">
                Follow our official accounts for recent nursery harvest updates and new aquatic varieties.
              </p>
              <div className="flex items-center gap-2.5 pt-2">
                <a
                  href={settings.facebook_url || "https://facebook.com/ceylonaquaticplants"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#0B7A0B] hover:bg-[#0B7A0B] hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={settings.instagram_url || "https://instagram.com/ceylonaquaticplants"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#0B7A0B] hover:bg-[#0B7A0B] hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={settings.youtube_url || "https://youtube.com/@ceylonaquaticplants"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#0B7A0B] hover:bg-[#0B7A0B] hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href={settings.linkedin_url || "https://linkedin.com/company/ceylonaquaticplants"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#0B7A0B] hover:bg-[#0B7A0B] hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Verification Notice */}
            <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#0B7A0B]/20 text-[#0A2D5B] text-xs flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#0B7A0B] shrink-0" />
              <span>We do not process credit card transactions or store financial details online.</span>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <ContactForm initialPlantReference={plantReference} />
          </div>

        </div>

        {/* Embedded Map Section */}
        {settings.map_embed_url && (
          <div className="mt-16 bg-white rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-xs">
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0A2D5B] font-display">
                  Nursery Facility Location
                </h3>
                <p className="text-xs text-[#6B7280]">
                  Godagama, Homagama, Colombo, Sri Lanka
                </p>
              </div>
              <span className="text-xs font-bold text-[#0B7A0B]">
                Direct Visits by Prior Appointment
              </span>
            </div>
            <div className="relative aspect-[21/9] sm:aspect-[21/7] w-full bg-gray-100">
              <iframe
                src={settings.map_embed_url}
                title="Ceylon Aquatic Plants Google Map Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        )}

      </section>
    </div>
  );
}
