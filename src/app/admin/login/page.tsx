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
    <div className="min-h-screen bg-[#F7FAF7] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-[#E3EAE4] shadow-card space-y-6">
        
        {/* Logo & Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full border border-[#E3EAE4] bg-[#F7FAF7] mx-auto flex items-center justify-center overflow-hidden shadow-xs">
            <Image
              src="/logo.png"
              alt="Ceylon Aquatic Plants (Pvt) Ltd"
              width={56}
              height={56}
              className="object-contain p-1"
            />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#104D35] font-display">
              Administrator Portal
            </h1>
            <p className="text-xs text-[#176B45] uppercase tracking-wider font-bold mt-1">
              Ceylon Aquatic Plants (Pvt) Ltd
            </p>
            <p className="text-xs text-[#66736A] mt-1">
              Authorized management access only. Public registration is disabled.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#202820] uppercase tracking-wider mb-1.5">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#66736A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ceylonaquaticplants.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F7FAF7] border border-[#E3EAE4] text-[#202820] text-sm focus:outline-none focus:ring-2 focus:ring-[#176B45] focus:border-transparent transition-all placeholder:text-[#66736A]/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202820] uppercase tracking-wider mb-1.5">
              Secure Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#66736A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F7FAF7] border border-[#E3EAE4] text-[#202820] text-sm focus:outline-none focus:ring-2 focus:ring-[#176B45] focus:border-transparent transition-all placeholder:text-[#66736A]/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm bg-[#F2C94C] hover:bg-[#E5B735] text-[#173B2B] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-60 border border-transparent mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#173B2B]" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-[#173B2B]" />
                <span>Sign In to Dashboard</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-[#E3EAE4] text-center">
          <p className="text-[11px] text-[#66736A]">
            Protected by enterprise encryption &bull; All administrative changes sync directly to database
          </p>
        </div>

      </div>
    </div>
  );
}
