"use client";

import React, { useState, useEffect } from "react";
import { WebsiteSettings } from "@/types";
import { 
  Home, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  Layers
} from "lucide-react";

export default function AdminHomepageContentPage() {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      setSaving(true);
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Update failed");

      setStatusMessage({ type: "success", text: "Homepage content updated and live across website." });
    } catch {
      setStatusMessage({ type: "error", text: "Failed to update settings." });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="p-12 text-center text-[#66736A]">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#176B45] mb-2" />
        <p className="text-xs">Loading homepage content controls...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E3EAE4] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#176B45] uppercase tracking-wider mb-1">
            <Home className="w-4 h-4 text-[#F2C94C]" />
            <span>Showcase Editorial</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#104D35] font-display">
            Homepage Content Management
          </h1>
          <p className="text-xs sm:text-sm text-[#66736A] mt-1">
            Edit hero statements, introductory summaries, and core botanical quality pillars.
          </p>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between text-xs font-semibold ${
            statusMessage.type === "success"
              ? "bg-[#E8F3EC] text-[#104D35] border border-[#C5DEC8]"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === "success" ? <CheckCircle2 className="w-4 h-4 text-[#176B45]" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
            <span>{statusMessage.text}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Hero Section Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E3EAE4] shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E3EAE4]">
            <Sparkles className="w-5 h-5 text-[#F2C94C]" />
            <h3 className="font-bold text-base text-[#104D35] font-display">
              Section 1 &mdash; Hero Headline & Subtitle
            </h3>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202820] uppercase mb-1">
              Main Hero H1 Headline
            </label>
            <input
              type="text"
              required
              value={settings.hero_title}
              onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#E3EAE4] focus:border-[#176B45] focus:ring-1 focus:ring-[#176B45] text-sm text-[#202820] font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202820] uppercase mb-1">
              Hero Supporting Subtitle
            </label>
            <textarea
              rows={3}
              required
              value={settings.hero_subtitle}
              onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#E3EAE4] focus:border-[#176B45] focus:ring-1 focus:ring-[#176B45] text-sm text-[#202820]"
            />
          </div>
        </div>

        {/* Introduction Section Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E3EAE4] shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E3EAE4]">
            <Layers className="w-5 h-5 text-[#176B45]" />
            <h3 className="font-bold text-base text-[#104D35] font-display">
              Section 2 &mdash; Company Introduction & Overview
            </h3>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202820] uppercase mb-1">
              Introductory Story / Summary
            </label>
            <textarea
              rows={4}
              required
              value={settings.about_summary}
              onChange={(e) => setSettings({ ...settings, about_summary: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#E3EAE4] focus:border-[#176B45] focus:ring-1 focus:ring-[#176B45] text-sm text-[#202820] leading-relaxed"
            />
          </div>
        </div>

        {/* Why Choose Us Pillars */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E3EAE4] shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#E3EAE4]">
            <h3 className="font-bold text-base text-[#104D35] font-display">
              Section 5 &mdash; Why Partner With Us (4 Botanical Qualities)
            </h3>
            <p className="text-xs text-[#66736A] mt-0.5">
              Edit the actual qualities, stewardship, and propagation principles shown on the homepage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {settings.core_values.map((val, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#F7FAF7] border border-[#E3EAE4] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#176B45]">
                  Pillar 0{idx + 1}
                </span>
                <input
                  type="text"
                  value={val.title}
                  onChange={(e) => {
                    const updated = [...settings.core_values];
                    updated[idx].title = e.target.value;
                    setSettings({ ...settings, core_values: updated });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#E3EAE4] focus:border-[#176B45] text-xs font-bold text-[#202820]"
                />
                <textarea
                  rows={2}
                  value={val.description}
                  onChange={(e) => {
                    const updated = [...settings.core_values];
                    updated[idx].description = e.target.value;
                    setSettings({ ...settings, core_values: updated });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#E3EAE4] focus:border-[#176B45] text-xs text-[#66736A]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs bg-[#F2C94C] hover:bg-[#E5B735] text-[#173B2B] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-60 border border-transparent"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin text-[#173B2B]" /> : <Save className="w-4 h-4 text-[#173B2B]" />}
            <span>Save Homepage Updates</span>
          </button>
        </div>
      </form>
    </div>
  );
}
