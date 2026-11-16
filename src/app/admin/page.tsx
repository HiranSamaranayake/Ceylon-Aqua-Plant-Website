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
  Eye, 
  Plus, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock
} from "lucide-react";

export const revalidate = 0;

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0B7A0B] uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-[#F7C600]" />
            <span>Authenticated as {admin.email}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A2D5B] font-display">
            Operational Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
            Live database counts, plant inventory status, and pending customer inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/plants"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 border border-transparent"
          >
            <Plus className="w-3.5 h-3.5 text-[#0A2D5B]" />
            <span>Add New Plant</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#F8FAFC] text-[#0B7A0B] hover:bg-[#F0FDF4] border border-[#E5E7EB] transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </Link>
        </div>
      </div>

      {/* Modern Statistics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Card 1: Total Plants */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between text-[#0B7A0B] mb-2">
            <Sprout className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F0FDF4] text-[#0B7A0B] px-2 py-0.5 rounded">Inventory</span>
          </div>
          <p className="text-2xl font-bold text-[#0A2D5B] font-display">{stats.totalPlants}</p>
          <p className="text-xs text-[#6B7280] mt-0.5">Total Plants</p>
        </div>

        {/* Card 2: Published Plants */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between text-[#0B7A0B] mb-2">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F0FDF4] text-[#0B7A0B] px-2 py-0.5 rounded">Live</span>
          </div>
          <p className="text-2xl font-bold text-[#0A2D5B] font-display">{stats.publishedPlants}</p>
          <p className="text-xs text-[#6B7280] mt-0.5">Published Live</p>
        </div>

        {/* Card 3: Draft Plants */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between text-amber-600 mb-2">
            <Clock className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 px-2 py-0.5 rounded">Draft</span>
          </div>
          <p className="text-2xl font-bold text-[#0A2D5B] font-display">{stats.draftPlants}</p>
          <p className="text-xs text-[#6B7280] mt-0.5">Draft / Hidden</p>
        </div>

        {/* Card 4: Categories */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between text-[#0B7A0B] mb-2">
            <FolderTree className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F0FDF4] text-[#0B7A0B] px-2 py-0.5 rounded">Catalog</span>
          </div>
          <p className="text-2xl font-bold text-[#0A2D5B] font-display">{stats.totalCategories}</p>
          <p className="text-xs text-[#6B7280] mt-0.5">Plant Categories</p>
        </div>

        {/* Card 5: Gallery Images */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between text-[#0B7A0B] mb-2">
            <ImageIcon className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F0FDF4] text-[#0B7A0B] px-2 py-0.5 rounded">Photos</span>
          </div>
          <p className="text-2xl font-bold text-[#0A2D5B] font-display">{stats.totalGallery}</p>
          <p className="text-xs text-[#6B7280] mt-0.5">Gallery Photos</p>
        </div>

        {/* Card 6: Videos */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between text-red-600 mb-2">
            <Film className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-700 px-2 py-0.5 rounded">Media</span>
          </div>
          <p className="text-2xl font-bold text-[#0A2D5B] font-display">{stats.totalVideos}</p>
          <p className="text-xs text-[#6B7280] mt-0.5">Showcase Videos</p>
        </div>
      </div>

      {/* Two-Column Activity & Inquiries Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Plants Column */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5E7EB]">
            <div>
              <h2 className="text-lg font-bold text-[#0A2D5B] font-display">
                Botanical Specimens Catalog
              </h2>
              <p className="text-xs text-[#6B7280]">Most recently modified plant varieties</p>
            </div>
            <Link
              href="/admin/plants"
              className="text-xs font-bold text-[#0B7A0B] hover:underline flex items-center gap-1"
            >
              <span>Manage all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#E5E7EB]">
            {recentList.map((plant) => (
              <div key={plant.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] overflow-hidden relative shrink-0 border border-[#E5E7EB]">
                    <img
                      src={plant.main_image_url}
                      alt={plant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0A2D5B]">
                      {plant.name}
                    </h4>
                    <p className="text-xs text-[#6B7280]">
                      {plant.category?.name || "Uncategorized"} &bull; {plant.origin || "Tropical"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    plant.is_published 
                      ? "bg-[#F0FDF4] text-[#0B7A0B]" 
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {plant.is_published ? "Live" : "Draft"}
                  </span>
                  <Link
                    href={`/plants/${plant.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-lg text-gray-400 hover:text-[#0B7A0B] hover:bg-[#F8FAFC]"
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
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5E7EB]">
            <div>
              <h2 className="text-lg font-bold text-[#0A2D5B] font-display">
                Recent Inquiries ({inquiries.length})
              </h2>
              <p className="text-xs text-[#6B7280]">Direct customer & partner communications</p>
            </div>
            <Link
              href="/admin/contact"
              className="text-xs font-bold text-[#0B7A0B] hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {inquiries.length === 0 ? (
            <div className="text-center py-12 text-[#6B7280]">
              <PhoneCall className="w-8 h-8 mx-auto mb-2 opacity-40 text-[#0B7A0B]" />
              <p className="text-xs">No customer inquiries submitted yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {unreadInquiries.map((inq) => (
                <div key={inq.id} className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-[#0A2D5B]">{inq.full_name}</span>
                    <span className="text-[10px] text-[#6B7280]">
                      {inq.created_at ? new Date(inq.created_at).toLocaleDateString() : "Recent"}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[#0B7A0B]">{inq.subject}</p>
                  <p className="text-xs text-[#6B7280] line-clamp-2 mt-1">{inq.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
