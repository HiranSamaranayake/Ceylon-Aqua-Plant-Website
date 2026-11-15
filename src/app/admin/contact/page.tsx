"use client";

import React, { useState, useEffect } from "react";
import { WebsiteSettings, ContactInquiry } from "@/types";
import { 
  PhoneCall, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Mail, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Globe,
  Inbox,
  Check
} from "lucide-react";

export default function AdminContactManagementPage() {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [settingsRes, inqRes] = await Promise.all([
        fetch("/api/admin/settings"),
        fetch("/api/admin/inquiries"),
      ]);
      const sData = await settingsRes.json();
      const iData = await inqRes.json();
      setSettings(sData);
      if (Array.isArray(iData)) setInquiries(iData);
    } catch {
      setStatusMessage({ type: "error", text: "Failed to load contact data." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      setSaving(true);
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Save failed");

      setStatusMessage({ type: "success", text: "Contact coordinates successfully updated." });
    } catch {
      setStatusMessage({ type: "error", text: "Failed to update contact info." });
    } finally {
      setSaving(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, is_read: true } : inq))
      );
    } catch {
      // ignore
    }
  };

  if (loading || !settings) {
    return (
      <div className="p-12 text-center text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-brand-emerald mb-2" />
        <p className="text-xs">Loading contact information & inquiries...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-emerald uppercase tracking-wider mb-1">
            <PhoneCall className="w-4 h-4 text-brand-gold" />
            <span>Communications Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-surface font-display">
            Contact Details & Customer Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Update telephone, WhatsApp, physical address coordinates, and review submitted customer queries.
          </p>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between text-xs font-semibold ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
            <span>{statusMessage.text}</span>
          </div>
        </div>
      )}

      {/* Two-Column: Settings Form on Left, Inquiries on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Coordinates Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div className="border-b pb-3">
            <h3 className="font-bold text-base text-brand-surface font-display">
              Public Business Coordinates
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              These details render across the header bar, contact page, and footer links.
            </p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Telephone</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">WhatsApp Number</label>
                <div className="relative">
                  <MessageCircle className="w-4 h-4 text-[#25D366] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={settings.whatsapp}
                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Physical Address</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border text-xs"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Google Maps Embed URL</label>
              <input
                type="text"
                value={settings.map_embed_url || ""}
                onChange={(e) => setSettings({ ...settings, map_embed_url: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border text-xs font-mono"
              />
            </div>

            {/* Social Media Links */}
            <div className="pt-2 border-t space-y-3">
              <h4 className="text-xs font-bold text-brand-surface uppercase">Social Profiles</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="url"
                  placeholder="Facebook URL"
                  value={settings.facebook_url || ""}
                  onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                  className="px-3 py-2 rounded-xl border text-xs"
                />
                <input
                  type="url"
                  placeholder="Instagram URL"
                  value={settings.instagram_url || ""}
                  onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                  className="px-3 py-2 rounded-xl border text-xs"
                />
                <input
                  type="url"
                  placeholder="YouTube URL"
                  value={settings.youtube_url || ""}
                  onChange={(e) => setSettings({ ...settings, youtube_url: e.target.value })}
                  className="px-3 py-2 rounded-xl border text-xs"
                />
                <input
                  type="url"
                  placeholder="LinkedIn URL"
                  value={settings.linkedin_url || ""}
                  onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
                  className="px-3 py-2 rounded-xl border text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-brand-emerald text-white text-xs font-semibold hover:bg-brand-emerald/90 flex items-center gap-2"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Save Coordinates</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Inquiries Inbox */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-bold text-base text-brand-surface font-display flex items-center gap-2">
                <Inbox className="w-5 h-5 text-brand-emerald" />
                Customer Inquiries Inbox
              </h3>
              <p className="text-xs text-gray-500">Real-time incoming submissions</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand-cream text-brand-dark">
              {inquiries.length} total
            </span>
          </div>

          {inquiries.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <p className="text-xs">No inquiries currently in database.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    inq.is_read
                      ? "bg-gray-50/70 border-gray-200"
                      : "bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h4 className="font-bold text-xs text-brand-surface">{inq.full_name}</h4>
                      <p className="text-[11px] text-gray-500">{inq.email} &bull; {inq.phone || "No phone"}</p>
                    </div>
                    {!inq.is_read && (
                      <button
                        onClick={() => markAsRead(inq.id)}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-1 shrink-0"
                        title="Mark as Read"
                      >
                        <Check className="w-3 h-3" /> Mark read
                      </button>
                    )}
                  </div>

                  {inq.plant_reference && (
                    <span className="inline-block mt-1 text-[10px] font-semibold bg-brand-dark text-brand-gold px-2 py-0.5 rounded">
                      Ref: {inq.plant_reference}
                    </span>
                  )}

                  <p className="text-xs font-semibold text-brand-emerald mt-2">{inq.subject}</p>
                  <p className="text-xs text-gray-700 mt-1 whitespace-pre-wrap leading-relaxed">{inq.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
