"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, AlertCircle, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid credentials or server error.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-brand-dark rounded-3xl p-8 sm:p-10 border border-brand-border shadow-2xl space-y-6">
        
        {/* Logo & Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full border border-brand-gold/40 bg-brand-surface mx-auto flex items-center justify-center overflow-hidden shadow-md">
            <Image
              src="/logo.png"
              alt="Ceylon Aquatic Plants (Pvt) Ltd"
              width={56}
              height={56}
              className="object-contain p-1"
            />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-display">
              Administrator Portal
            </h1>
            <p className="text-xs text-brand-gold uppercase tracking-widest font-semibold mt-1">
              Ceylon Aquatic Plants (Pvt) Ltd
            </p>
            <p className="text-xs text-brand-muted mt-1">
              Authorized management access only. Public registration is disabled.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-900/40 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-brand-muted/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ceylonaquaticplants.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all placeholder:text-brand-muted/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5">
              Secure Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-brand-muted/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all placeholder:text-brand-muted/40"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-sm bg-brand-gold text-brand-surface hover:bg-brand-gold/90 active:scale-[0.99] transition-all disabled:opacity-60 shadow-md hover:shadow-gold-glow mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Sign In to Dashboard</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-brand-border/60 text-center">
          <p className="text-[11px] text-brand-muted/70">
            Protected by enterprise encryption &bull; All administrative changes sync directly to database
          </p>
        </div>

      </div>
    </div>
  );
}
