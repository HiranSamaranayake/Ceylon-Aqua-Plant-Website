"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface ContactFormProps {
  initialPlantReference?: string;
}

export default function ContactForm({ initialPlantReference = "" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject: initialPlantReference ? `Inquiry regarding: ${initialPlantReference}` : "",
    message: initialPlantReference 
      ? `Hello Ceylon Aquatic Plants,\n\nI am interested in learning more about your ${initialPlantReference} specimens (availability, specifications, and shipping details).` 
      : "",
    plant_reference: initialPlantReference,
    website_trap: "", // Honeypot field (hidden)
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setSuccess(data.message || "Thank you! Your message has been sent successfully.");
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        plant_reference: "",
        website_trap: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-200 shadow-xl">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-brand-surface font-display">
          Send Us an Inquiry
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          Whether you are an international importer, aquascaper, or botanical retailer, our nursery team is at your service.
        </p>
      </div>

      {success && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold">Inquiry Dispatched Successfully</p>
            <p className="text-xs text-emerald-700 mt-0.5">{success}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold">Submission Notice</p>
            <p className="text-xs text-red-700 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Anti-spam Honeypot Field (visually hidden from human visitors) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_trap">Do not fill this field</label>
          <input
            type="text"
            id="website_trap"
            name="website_trap"
            value={formData.website_trap}
            onChange={(e) => setFormData({ ...formData, website_trap: e.target.value })}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="full_name" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="full_name"
              required
              placeholder="e.g. Alex Woelfel"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="e.g. alex@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Phone / WhatsApp Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="e.g. +94 77 123 4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              required
              placeholder="e.g. Plant Catalogue & Export Order"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:border-transparent transition-all"
            />
          </div>
        </div>

        {initialPlantReference && (
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Referenced Plant Specimen
            </label>
            <input
              type="text"
              readOnly
              value={initialPlantReference}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs font-medium text-brand-emerald cursor-not-allowed"
            />
          </div>
        )}

        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
            Your Message / Inquiries <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            required
            rows={5}
            placeholder="Please detail your species interest, requirements, or business questions..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:border-transparent transition-all resize-y"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm bg-brand-dark text-white hover:bg-brand-secondary active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
              <span>Verifying & Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-brand-gold" />
              <span>Submit Official Inquiry</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
