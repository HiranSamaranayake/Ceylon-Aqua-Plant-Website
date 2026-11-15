import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getDashboardStats, getContactInquiries, getPlants } from "@/lib/data-service";
import { 
  Sprout, 
  FolderTree, 
  Image as ImageIcon, 
  Film, 
  PhoneCall, 
  FileText, 
  Eye, 
  Plus, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock
} from "lucide-react";

export const revalidate = 0; // Always fresh for admin

export default async function AdminDashboardOverview() {
  const admin = await getAdminSession();
  if (!admin) {
    redirect("/admin/login");
  }

  const [stats, inquiries, recentPlants] = await Promise.all([
    getDashboardStats(),
    getContactInquiries(),
    getPlants({ publishedOnly: false }),
  ]);

  const recentList = recentPlants.slice(0, 5);
  const unreadInquiries = inquiries.filter((i) => !i.is_read).slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-emerald uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            <span>Authenticated as {admin.email}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-surface font-display">
            Operational Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Live database counts, plant inventory status, and pending customer inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/plants"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-brand-dark text-white hover:bg-brand-secondary transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-brand-gold" />
            <span>Add New Plant</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-brand-cream text-brand-dark hover:bg-gray-200 border border-gray-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Showcase</span>
          </Link>
        </div>
      </div>

      {/* Modern Statistics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Card 1: Total Plants */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-brand-emerald mb-2">
            <Sprout className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">Inventory</span>
          </div>
          <p className="text-2xl font-bold text-brand-surface font-display">{stats.totalPlants}</p>
          <p className="text-xs text-gray-500 mt-0.5">Total Plants</p>
        </div>

        {/* Card 2: Published Plants */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">Live</span>
          </div>
          <p className="text-2xl font-bold text-brand-surface font-display">{stats.publishedPlants}</p>
          <p className="text-xs text-gray-500 mt-0.5">Published Live</p>
        </div>

        {/* Card 3: Draft Plants */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-amber-500 mb-2">
            <Clock className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 px-2 py-0.5 rounded">Draft</span>
          </div>
          <p className="text-2xl font-bold text-brand-surface font-display">{stats.draftPlants}</p>
          <p className="text-xs text-gray-500 mt-0.5">Draft / Hidden</p>
        </div>

        {/* Card 4: Categories */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-brand-emerald mb-2">
            <FolderTree className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded">Catalog</span>
          </div>
          <p className="text-2xl font-bold text-brand-surface font-display">{stats.totalCategories}</p>
          <p className="text-xs text-gray-500 mt-0.5">Plant Categories</p>
        </div>

        {/* Card 5: Gallery Images */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-purple-600 mb-2">
            <ImageIcon className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 px-2 py-0.5 rounded">Photos</span>
          </div>
          <p className="text-2xl font-bold text-brand-surface font-display">{stats.totalGallery}</p>
          <p className="text-xs text-gray-500 mt-0.5">Gallery Photos</p>
        </div>

        {/* Card 6: Videos */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-red-500 mb-2">
            <Film className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-700 px-2 py-0.5 rounded">Media</span>
          </div>
          <p className="text-2xl font-bold text-brand-surface font-display">{stats.totalVideos}</p>
          <p className="text-xs text-gray-500 mt-0.5">Showcase Videos</p>
        </div>
      </div>

      {/* Two-Column Activity & Inquiries Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Plants Column */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-brand-surface font-display">
                Botanical Specimens Catalog
              </h2>
              <p className="text-xs text-gray-500">Most recently modified plant varieties</p>
            </div>
            <Link
              href="/admin/plants"
              className="text-xs font-semibold text-brand-emerald hover:underline flex items-center gap-1"
            >
              <span>Manage all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {recentList.map((plant) => (
              <div key={plant.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden relative shrink-0">
                    <img
                      src={plant.main_image_url}
                      alt={plant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-brand-surface">
                      {plant.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {plant.category?.name || "Uncategorized"} &bull; {plant.origin || "Tropical"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                    plant.is_published 
                      ? "bg-emerald-50 text-emerald-700" 
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {plant.is_published ? "Live" : "Draft"}
                  </span>
                  <Link
                    href={`/plants/${plant.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-lg text-gray-400 hover:text-brand-dark hover:bg-gray-50"
                    title="View public page"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inquiries Column */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-brand-surface font-display">
                Recent Inquiries ({inquiries.length})
              </h2>
              <p className="text-xs text-gray-500">Direct customer & partner communications</p>
            </div>
            <Link
              href="/admin/contact"
              className="text-xs font-semibold text-brand-emerald hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {inquiries.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <PhoneCall className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs">No customer inquiries submitted yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {unreadInquiries.map((inq) => (
                <div key={inq.id} className="p-3.5 rounded-xl bg-brand-cream/50 border border-gray-200">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-brand-surface">{inq.full_name}</span>
                    <span className="text-[10px] text-gray-400">
                      {inq.created_at ? new Date(inq.created_at).toLocaleDateString() : "Recent"}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-brand-emerald">{inq.subject}</p>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-1">{inq.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
