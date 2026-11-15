import React from "react";
import { getWebsiteSettings } from "@/lib/data-service";
import ContactForm from "@/components/ContactForm";
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
    <div className="bg-brand-cream min-h-screen">
      {/* Header Banner */}
      <section className="bg-brand-dark text-white py-16 sm:py-20 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-surface border border-brand-border text-brand-gold text-xs font-semibold uppercase tracking-wider mb-4">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Customer & Wholesale Communications</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Contact Ceylon Aquatic Plants
          </h1>
          <p className="mt-4 text-base text-brand-muted leading-relaxed">
            Have questions regarding botanical availability, packing specifications, or export quarantine? Our nursery specialists are ready to assist.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Information Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Direct Contact Details & Working Hours */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-brand-surface font-display border-b border-gray-100 pb-4">
                Official Business Channels
              </h2>

              <ul className="space-y-5 text-sm">
                {/* Telephone */}
                <li className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-brand-cream text-brand-emerald shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Telephone Support
                    </span>
                    <a
                      href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                      className="text-base font-semibold text-brand-surface hover:text-brand-emerald transition-colors"
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
                    <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Instant WhatsApp
                    </span>
                    <a
                      href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-brand-surface hover:text-[#25D366] transition-colors"
                    >
                      {settings.whatsapp}
                    </a>
                  </div>
                </li>

                {/* Email */}
                <li className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-brand-cream text-brand-gold shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Official Email
                    </span>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-base font-semibold text-brand-surface hover:text-brand-emerald transition-colors break-all"
                    >
                      {settings.email}
                    </a>
                  </div>
                </li>

                {/* Address */}
                <li className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-brand-cream text-brand-surface shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Nursery & Headquarters
                    </span>
                    <p className="text-sm font-medium text-gray-700 leading-snug">
                      {settings.address}
                    </p>
                  </div>
                </li>

                {/* Working Hours */}
                <li className="flex items-start gap-3.5 pt-2 border-t border-gray-100">
                  <div className="p-2.5 rounded-xl bg-gray-50 text-gray-500 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Nursery Operations Hours
                    </span>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Monday &ndash; Friday: 8:00 AM &ndash; 5:30 PM (IST)<br />
                      Saturday: 8:00 AM &ndash; 1:00 PM (IST)
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div className="bg-brand-surface text-white rounded-2xl p-6 border border-brand-border space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gold">
                Connect Across Networks
              </h3>
              <p className="text-xs text-brand-muted">
                Follow our official accounts for recent nursery harvest updates and new aquatic varieties.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={settings.facebook_url || "https://facebook.com/ceylonaquaticplants"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-brand-dark border border-brand-border flex items-center justify-center text-brand-muted hover:text-white hover:border-brand-gold transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={settings.instagram_url || "https://instagram.com/ceylonaquaticplants"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-brand-dark border border-brand-border flex items-center justify-center text-brand-muted hover:text-white hover:border-brand-gold transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={settings.youtube_url || "https://youtube.com/@ceylonaquaticplants"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-brand-dark border border-brand-border flex items-center justify-center text-brand-muted hover:text-white hover:border-brand-gold transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href={settings.linkedin_url || "https://linkedin.com/company/ceylonaquaticplants"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-brand-dark border border-brand-border flex items-center justify-center text-brand-muted hover:text-white hover:border-brand-gold transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Verification Notice */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>We do not process credit card transactions or store payment information online.</span>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <ContactForm initialPlantReference={plantReference} />
          </div>

        </div>

        {/* Embedded Map Section */}
        {settings.map_embed_url && (
          <div className="mt-16 bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-brand-surface font-display">
                  Nursery Facility Location
                </h3>
                <p className="text-xs text-gray-500">
                  Western Province, Sri Lanka
                </p>
              </div>
              <span className="text-xs font-semibold text-brand-emerald">
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
