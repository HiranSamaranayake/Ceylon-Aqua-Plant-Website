"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Sprout, 
  FolderTree, 
  Image as ImageIcon, 
  Film, 
  FileText, 
  Home, 
  Info, 
  PhoneCall, 
  Search, 
  ShieldAlert, 
  LogOut, 
  ChevronRight,
  Menu,
  X,
  ExternalLink
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Plant Management", href: "/admin/plants", icon: Sprout },
  { name: "Category Management", href: "/admin/categories", icon: FolderTree },
  { name: "Gallery Management", href: "/admin/gallery", icon: ImageIcon },
  { name: "Video Management", href: "/admin/videos", icon: Film },
  { name: "Document Management", href: "/admin/documents", icon: FileText },
  { name: "Homepage Content", href: "/admin/homepage", icon: Home },
  { name: "About Page Content", href: "/admin/about", icon: Info },
  { name: "Contact & Inquiries", href: "/admin/contact", icon: PhoneCall },
  { name: "SEO Management", href: "/admin/seo", icon: Search },
  { name: "Security & Account", href: "/admin/settings", icon: ShieldAlert },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-brand-surface text-white px-4 py-3 flex items-center justify-between border-b border-brand-border sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-brand-gold/40 bg-brand-dark flex items-center justify-center overflow-hidden">
            <Image src="/logo.png" alt="Logo" width={32} height={32} className="object-contain" />
          </div>
          <span className="text-sm font-bold text-white font-display">CAP Admin Portal</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg text-brand-muted hover:text-white hover:bg-brand-secondary/40"
          aria-label="Toggle admin sidebar"
        >
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-brand-surface border-r border-brand-border flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-brand-border/60">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full border border-brand-gold/50 bg-brand-dark flex items-center justify-center overflow-hidden shadow-sm">
                <Image
                  src="/logo.png"
                  alt="Ceylon Aquatic Plants"
                  width={44}
                  height={44}
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <span className="text-base font-bold text-white font-display block leading-tight">
                  Admin Console
                </span>
                <span className="text-[10px] text-brand-gold uppercase tracking-wider font-semibold">
                  Ceylon Aquatic Plants
                </span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)] scrollbar-none">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? "bg-brand-emerald text-white shadow-md shadow-brand-emerald/20"
                      : "text-brand-muted hover:text-white hover:bg-brand-secondary/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-brand-gold" : "text-brand-muted group-hover:text-white"}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-brand-gold" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions & View Site */}
        <div className="p-4 border-t border-brand-border/60 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-brand-muted hover:text-white hover:bg-brand-secondary/40 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
              <span>View Public Website</span>
            </span>
            <span className="text-[10px] bg-brand-dark px-2 py-0.5 rounded text-brand-gold">Live</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Secure Admin Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
        />
      )}
    </>
  );
}
