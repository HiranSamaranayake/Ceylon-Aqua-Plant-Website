"use client";

import React, { useState, useEffect } from "react";
import { WebsiteSettings } from "@/types";
import { 
  Info, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Compass, 
  Target 
} from "lucide-react";

export default function AdminAboutContentPage() {
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

      setStatusMessage({ type: "success", text: "About page content successfully updated." });
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
        <p className="text-xs">Loading About page content controls...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E3EAE4] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#176B45] uppercase tracking-wider mb-1">
            <Info className="w-4 h-4 text-[#F2C94C]" />
            <span>Corporate Narrative</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#104D35] font-display">
            About Page Content Management
          </h1>
          <p className="text-xs sm:text-sm text-[#66736A] mt-1">
            Maintain the formal company vision, mission statement, and sustainable propagation story.
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
        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E3EAE4] shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E3EAE4] text-[#176B45]">
              <Compass className="w-5 h-5 text-[#F2C94C]" />
              <h3 className="font-bold text-base text-[#104D35] font-display">
                Corporate Vision
              </h3>
            </div>
            <textarea
              rows={4}
              required
              value={settings.vision}
              onChange={(e) => setSettings({ ...settings, vision: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAE4] focus:border-[#176B45] focus:ring-1 focus:ring-[#176B45] text-xs text-[#202820] leading-relaxed"
            />
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E3EAE4] shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E3EAE4] text-[#176B45]">
              <Target className="w-5 h-5" />
              <h3 className="font-bold text-base text-[#104D35] font-display">
                Corporate Mission
              </h3>
            </div>
            <textarea
              rows={4}
              required
              value={settings.mission}
              onChange={(e) => setSettings({ ...settings, mission: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAE4] focus:border-[#176B45] focus:ring-1 focus:ring-[#176B45] text-xs text-[#202820] leading-relaxed"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs bg-[#F2C94C] hover:bg-[#E5B735] text-[#173B2B] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-60 border border-transparent"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin text-[#173B2B]" /> : <Save className="w-4 h-4 text-[#173B2B]" />}
            <span>Save About Page Updates</span>
          </button>
        </div>
      </form>
    </div>
  );
}
