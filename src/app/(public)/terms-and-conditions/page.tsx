import React from "react";
import Link from "next/link";
import { FileCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Ceylon Aquatic Plants (Pvt) Ltd",
  description: "Terms and Conditions for accessing the Ceylon Aquatic Plants (Pvt) Ltd website and viewing our botanical showcase.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-brand-cream min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm space-y-8">
          
          <div className="border-b border-gray-100 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/10 text-brand-emerald text-xs font-semibold uppercase tracking-wider mb-2">
              <FileCheck className="w-4 h-4" />
              <span>Terms of Use</span>
            </div>
            <h1 className="text-3xl font-bold text-brand-surface font-display">
              Terms & Conditions
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Effective Date: November 2026 &bull; Ceylon Aquatic Plants (Pvt) Ltd
            </p>
          </div>

          <div className="prose prose-emerald text-sm text-gray-700 space-y-6 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-brand-surface mb-2">1. Informational Showcase Scope</h2>
              <p>
                This website is an informational digital showroom developed to present the aquatic plant collection, nursery facilities, and business contact information of Ceylon Aquatic Plants (Pvt) Ltd.
              </p>
              <p className="mt-2">
                This website is <strong>not an online retail shopping cart or consumer e-commerce portal</strong>. No contractual sale or financial transaction takes place directly through this website. All commercial wholesale agreements, phytosanitary requirements, and air freight arrangements are executed through verified direct business communication.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-surface mb-2">2. Intellectual Property</h2>
              <p>
                All photographs, botanical descriptions, branding graphics, and text published on this website are the proprietary property of Ceylon Aquatic Plants (Pvt) Ltd or used under authorized license. Unauthorized reproduction or commercial redistribution without prior written consent is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-surface mb-2">3. Botanical Information Disclaimer</h2>
              <p>
                Plant growth rates, coloration, and leaf dimensions may naturally vary based on water chemistry, lighting spectrum, CO2 concentration, and individual aquarist setups. The guidance provided on our detail pages represents authentic nursery experience and general best practice.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-surface mb-2">4. Governing Law</h2>
              <p>
                These terms are governed in accordance with the laws of the Democratic Socialist Republic of Sri Lanka.
              </p>
            </section>
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <Link href="/" className="text-brand-emerald font-semibold hover:underline">
              &larr; Return to Homepage
            </Link>
            <Link href="/privacy-policy" className="hover:underline">
              View Privacy Policy &rarr;
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
