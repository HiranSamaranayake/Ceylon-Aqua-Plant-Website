import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Ceylon Aquatic Plants (Pvt) Ltd",
  description: "Official Privacy Policy for Ceylon Aquatic Plants (Pvt) Ltd website visitors and inquiry communications.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-brand-cream min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm space-y-8">
          
          <div className="border-b border-gray-100 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/10 text-brand-emerald text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Legal Notice</span>
            </div>
            <h1 className="text-3xl font-bold text-brand-surface font-display">
              Privacy Policy
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Effective Date: November 2026 &bull; Ceylon Aquatic Plants (Pvt) Ltd
            </p>
          </div>

          <div className="prose prose-emerald text-sm text-gray-700 space-y-6 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-brand-surface mb-2">1. Overview</h2>
              <p>
                Ceylon Aquatic Plants (Pvt) Ltd (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates this informational showcase website. We are committed to protecting the privacy of our visitors and business partners. This policy outlines how information submitted through our contact forms is handled.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-surface mb-2">2. Information We Collect</h2>
              <p>
                Because this is an informational showroom and not an online e-commerce platform, we do not require account creation, password registration, or payment card information from general website visitors.
              </p>
              <p className="mt-2">
                We only collect information voluntarily submitted by you through our contact enquiry forms or direct communication channels (email, phone, WhatsApp):
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Full Name</li>
                <li>Contact Email Address</li>
                <li>Telephone or WhatsApp Number</li>
                <li>Inquiry Details and Species of Interest</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-surface mb-2">3. How Information is Used</h2>
              <p>
                Information provided is utilized strictly for responding to your inquiries, preparing botanical export quotations, and providing nursery documentation. We do not sell, rent, or distribute contact details to third-party advertisers.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-surface mb-2">4. Data Security</h2>
              <p>
                We implement practical technical and operational controls to protect submitted inquiries against unauthorized access, disclosure, or misuse.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-surface mb-2">5. Contact & Data Requests</h2>
              <p>
                If you have questions about your information or wish to request data updates, please reach out to us directly at:
              </p>
              <p className="mt-2 font-semibold text-brand-surface">
                Ceylon Aquatic Plants (Pvt) Ltd<br />
                Email: <a href="mailto:info@ceylonaquaticplants.com" className="text-brand-emerald underline">info@ceylonaquaticplants.com</a><br />
                Address: No. 45, Greenhouse Valley Road, Western Province, Sri Lanka
              </p>
            </section>
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <Link href="/" className="text-brand-emerald font-semibold hover:underline">
              &larr; Return to Homepage
            </Link>
            <Link href="/terms-and-conditions" className="hover:underline">
              View Terms & Conditions &rarr;
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
