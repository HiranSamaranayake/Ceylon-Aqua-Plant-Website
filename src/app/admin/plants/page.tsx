"use client";

import React, { useState, useEffect } from "react";
import { Plant, PlantCategory } from "@/types";
import { 
  Sprout, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  X,
  UploadCloud,
  Check
} from "lucide-react";
import { slugify } from "@/lib/utils";

export default function AdminPlantsPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [categories, setCategories] = useState<PlantCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState<Partial<Plant> | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [plantsRes, catsRes] = await Promise.all([
        fetch("/api/admin/plants"),
        fetch("/api/admin/categories"),
      ]);
      const plantsData = await plantsRes.json();
      const catsData = await catsRes.json();
      if (Array.isArray(plantsData)) setPlants(plantsData);
      if (Array.isArray(catsData)) setCategories(catsData);
    } catch {
      setStatusMessage({ type: "error", text: "Failed to load database records." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openNewPlantModal = () => {
    setEditingPlant({
      name: "",
      slug: "",
      category_id: categories[0]?.id || "",
      scientific_name: "",
      short_description: "",
      full_description: "",
      main_image_url: "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=1000&q=80",
      origin: "Southeast Asia",
      growth_rate: "Medium",
      plant_height: "15 - 30 cm",
      light_demand: "Medium",
      co2_requirement: "Optional",
      temperature_range: "22 - 28 °C",
      placement: "Midground",
      care_instructions: "",
      is_featured: false,
      is_published: true,
      seo_title: "",
      seo_description: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (plant: Plant) => {
    setEditingPlant({ ...plant });
    setModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", "plants");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      if (editingPlant) {
        setEditingPlant({ ...editingPlant, main_image_url: data.file_url });
      }
      setStatusMessage({ type: "success", text: "Photo uploaded and attached." });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatusMessage({ type: "error", text: err.message });
      } else {
        setStatusMessage({ type: "error", text: "Upload failed." });
      }
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlant) return;

    try {
      setSubmitting(true);
      const payload = {
        ...editingPlant,
        slug: editingPlant.slug || slugify(editingPlant.name || "plant"),
      };

      const res = await fetch("/api/admin/plants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save plant");
      }

      setModalOpen(false);
      setEditingPlant(null);
      setStatusMessage({ type: "success", text: "Plant saved successfully." });
      fetchData();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatusMessage({ type: "error", text: err.message });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/plants?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setStatusMessage({ type: "success", text: "Plant deleted." });
      setDeleteConfirmId(null);
      fetchData();
    } catch {
      setStatusMessage({ type: "error", text: "Error deleting plant." });
    }
  };

  const filteredPlants = plants.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "all" || p.category_id === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0B7A0B] uppercase tracking-wider mb-1">
            <Sprout className="w-4 h-4 text-[#0B7A0B]" />
            <span>Catalogue Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A2D5B] font-display">
            Aquarium Plants ({plants.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
            Add new botanical varieties, edit scientific profiles, upload imagery, and manage public visibility.
          </p>
        </div>

        <button
          onClick={openNewPlantModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 border border-transparent"
        >
          <Plus className="w-4 h-4 text-[#0A2D5B]" />
          <span>Add New Plant</span>
        </button>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between text-xs font-bold ${
            statusMessage.type === "success"
              ? "bg-[#F0FDF4] text-[#0A2D5B] border border-[#0B7A0B]/30"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === "success" ? <CheckCircle2 className="w-4 h-4 text-[#0B7A0B]" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
            <span>{statusMessage.text}</span>
          </div>
          <button onClick={() => setStatusMessage(null)}>
            <X className="w-4 h-4 opacity-60 hover:opacity-100" />
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search plants by name or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E7EB] text-xs text-[#0A2D5B] focus:outline-none focus:ring-2 focus:ring-[#0B7A0B] focus:border-transparent bg-[#F8FAFC]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#6B7280] whitespace-nowrap font-medium">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#0A2D5B] bg-white focus:outline-none focus:ring-2 focus:ring-[#0B7A0B]"
          >
            <option value="all">All Categories ({plants.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Plants Data Table */}
      <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#6B7280]">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#0B7A0B] mb-2" />
            <p className="text-xs">Loading database records...</p>
          </div>
        ) : filteredPlants.length === 0 ? (
          <div className="p-12 text-center text-[#6B7280]">
            <Sprout className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-bold">No plants found</p>
            <p className="text-xs text-[#6B7280] mt-1">Try resetting search or adding a new plant.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#0A2D5B]">
              <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#0A2D5B] uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="py-4 px-6">Specimen</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Placement / Light</th>
                  <th className="py-4 px-6">Visibility</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {filteredPlants.map((plant) => (
                  <tr key={plant.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] overflow-hidden relative shrink-0 border border-[#E5E7EB]">
                          <img
                            src={plant.main_image_url}
                            alt={plant.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-[#0A2D5B] text-sm">{plant.name}</p>
                          {plant.scientific_name && (
                            <p className="font-serif italic text-[#0B7A0B] text-xs">{plant.scientific_name}</p>
                          )}
                          <p className="text-[11px] text-[#6B7280]">/plants/{plant.slug}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F0FDF4] text-[#0B7A0B] border border-[#E5E7EB]">
                        {plant.category?.name || "Unassigned"}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="space-y-0.5">
                        <p className="font-bold text-[#0A2D5B]">{plant.placement || "Midground"}</p>
                        <p className="text-[11px] text-[#6B7280]">{plant.light_demand || "Medium"} light</p>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          plant.is_published
                            ? "bg-[#F0FDF4] text-[#0B7A0B]"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {plant.is_published ? (
                          <>
                            <Check className="w-3 h-3" /> Live
                          </>
                        ) : (
                          "Draft"
                        )}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/plants/${plant.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg text-[#6B7280] hover:text-[#0B7A0B] hover:bg-[#F0FDF4] transition-colors"
                          title="View public page"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => openEditModal(plant)}
                          className="p-2 rounded-lg text-[#0B7A0B] hover:text-[#0A2D5B] hover:bg-[#F0FDF4] transition-colors"
                          title="Edit plant"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(plant.id)}
                          className="p-2 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                          title="Delete plant"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Dialog for Plant Deletion */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-4 border border-[#E5E7EB]">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-[#0A2D5B] font-display">Delete Specimen?</h3>
              <p className="text-xs text-[#6B7280] mt-1">
                Are you sure you want to permanently remove this plant from the database? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#E5E7EB] text-xs font-bold text-[#0A2D5B] hover:bg-[#F8FAFC]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Plant Add/Edit Modal */}
      {modalOpen && editingPlant && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full my-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto border border-[#E5E7EB]">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
              <div>
                <h3 className="text-xl font-bold text-[#0A2D5B] font-display">
                  {editingPlant.id ? "Edit Botanical Specimen" : "Add New Plant Variety"}
                </h3>
                <p className="text-xs text-[#6B7280]">
                  Update plant characteristics, taxonomy, photographs, and SEO metadata.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl text-[#6B7280] hover:text-[#0A2D5B] hover:bg-[#F8FAFC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0A2D5B] uppercase tracking-wider mb-1">
                    Plant Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPlant.name || ""}
                    onChange={(e) => {
                      const name = e.target.value;
                      setEditingPlant({
                        ...editingPlant,
                        name,
                        slug: editingPlant.id ? editingPlant.slug : slugify(name),
                      });
                    }}
                    placeholder="e.g. Amazon Sword (Echinodorus Bleheri)"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-xs text-[#0A2D5B] focus:outline-none focus:ring-2 focus:ring-[#0B7A0B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A2D5B] uppercase tracking-wider mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={editingPlant.category_id || ""}
                    onChange={(e) => setEditingPlant({ ...editingPlant, category_id: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-xs text-[#0A2D5B] focus:outline-none focus:ring-2 focus:ring-[#0B7A0B] bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0A2D5B] uppercase tracking-wider mb-1">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPlant.slug || ""}
                    onChange={(e) => setEditingPlant({ ...editingPlant, slug: slugify(e.target.value) })}
                    placeholder="e.g. amazon-sword"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-xs text-[#0A2D5B] focus:outline-none focus:ring-2 focus:ring-[#0B7A0B] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A2D5B] uppercase tracking-wider mb-1">
                    Scientific / Botanical Name
                  </label>
                  <input
                    type="text"
                    value={editingPlant.scientific_name || ""}
                    onChange={(e) => setEditingPlant({ ...editingPlant, scientific_name: e.target.value })}
                    placeholder="e.g. Echinodorus grisebachii"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-xs text-[#0A2D5B] focus:outline-none focus:ring-2 focus:ring-[#0B7A0B] font-serif italic"
                  />
                </div>
              </div>

              {/* Image Upload / URL */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-3">
                <label className="block text-xs font-bold text-[#0A2D5B] uppercase tracking-wider">
                  Main Photograph
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-[#E5E7EB] relative shrink-0">
                    <img
                      src={editingPlant.main_image_url || "/logo.png"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="url"
                      value={editingPlant.main_image_url || ""}
                      onChange={(e) => setEditingPlant({ ...editingPlant, main_image_url: e.target.value })}
                      placeholder="https://... (or upload from computer below)"
                      className="w-full px-4 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#0A2D5B] bg-white"
                    />
                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0B7A0B] text-white cursor-pointer hover:bg-[#0B7A0B]">
                        <UploadCloud className="w-3.5 h-3.5 text-[#F7C600]" />
                        <span>{uploadingImage ? "Uploading..." : "Upload New Photo"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[11px] text-[#6B7280]">Max 5MB JPG, PNG, WEBP</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-xs font-bold text-[#0A2D5B] uppercase tracking-wider mb-1">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingPlant.short_description || ""}
                  onChange={(e) => setEditingPlant({ ...editingPlant, short_description: e.target.value })}
                  placeholder="Concise overview for cards and meta snippets"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-xs text-[#0A2D5B] focus:outline-none focus:ring-2 focus:ring-[#0B7A0B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A2D5B] uppercase tracking-wider mb-1">
                  Full Botanical Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={editingPlant.full_description || ""}
                  onChange={(e) => setEditingPlant({ ...editingPlant, full_description: e.target.value })}
                  placeholder="Comprehensive botanical information, morphology, growth habit..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-xs text-[#0A2D5B] focus:outline-none focus:ring-2 focus:ring-[#0B7A0B]"
                />
              </div>

              {/* Horticultural Parameters */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B7A0B] mb-3">
                  Botanical Characteristics
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#0A2D5B] mb-1">Origin</label>
                    <input
                      type="text"
                      value={editingPlant.origin || ""}
                      onChange={(e) => setEditingPlant({ ...editingPlant, origin: e.target.value })}
                      placeholder="e.g. South America"
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0A2D5B] mb-1">Growth Rate</label>
                    <select
                      value={editingPlant.growth_rate || "Medium"}
                      onChange={(e) => setEditingPlant({ ...editingPlant, growth_rate: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-xs bg-white"
                    >
                      <option value="Slow">Slow</option>
                      <option value="Medium">Medium</option>
                      <option value="Fast">Fast</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0A2D5B] mb-1">Height</label>
                    <input
                      type="text"
                      value={editingPlant.plant_height || ""}
                      onChange={(e) => setEditingPlant({ ...editingPlant, plant_height: e.target.value })}
                      placeholder="e.g. 15 - 35 cm"
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0A2D5B] mb-1">Light Demand</label>
                    <select
                      value={editingPlant.light_demand || "Medium"}
                      onChange={(e) => setEditingPlant({ ...editingPlant, light_demand: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-xs bg-white"
                    >
                      <option value="Low">Low</option>
                      <option value="Low to Medium">Low to Medium</option>
                      <option value="Medium">Medium</option>
                      <option value="Medium to High">Medium to High</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0A2D5B] mb-1">CO2 Demand</label>
                    <select
                      value={editingPlant.co2_requirement || "Optional"}
                      onChange={(e) => setEditingPlant({ ...editingPlant, co2_requirement: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-xs bg-white"
                    >
                      <option value="Low / None">Low / None</option>
                      <option value="Optional">Optional</option>
                      <option value="Recommended">Recommended</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0A2D5B] mb-1">Placement</label>
                    <select
                      value={editingPlant.placement || "Midground"}
                      onChange={(e) => setEditingPlant({ ...editingPlant, placement: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-xs bg-white"
                    >
                      <option value="Foreground / Carpet">Foreground / Carpet</option>
                      <option value="Foreground">Foreground</option>
                      <option value="Midground">Midground</option>
                      <option value="Background">Background</option>
                      <option value="Epiphyte / Hardscape">Epiphyte / Hardscape</option>
                      <option value="Floating / Surface">Floating / Surface</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Care Instructions */}
              <div>
                <label className="block text-xs font-bold text-[#0A2D5B] uppercase tracking-wider mb-1">
                  Care & Maintenance Instructions
                </label>
                <textarea
                  rows={2}
                  value={editingPlant.care_instructions || ""}
                  onChange={(e) => setEditingPlant({ ...editingPlant, care_instructions: e.target.value })}
                  placeholder="Trimming techniques, fertilizer notes, temperature stability..."
                  className="w-full px-4 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#0A2D5B]"
                />
              </div>

              {/* SEO Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#0A2D5B] uppercase tracking-wider mb-1">
                    SEO Meta Title
                  </label>
                  <input
                    type="text"
                    value={editingPlant.seo_title || ""}
                    onChange={(e) => setEditingPlant({ ...editingPlant, seo_title: e.target.value })}
                    placeholder="Auto-generated if empty"
                    className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#0A2D5B] uppercase tracking-wider mb-1">
                    SEO Meta Description
                  </label>
                  <input
                    type="text"
                    value={editingPlant.seo_description || ""}
                    onChange={(e) => setEditingPlant({ ...editingPlant, seo_description: e.target.value })}
                    placeholder="Auto-generated if empty"
                    className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPlant.is_published ?? true}
                    onChange={(e) => setEditingPlant({ ...editingPlant, is_published: e.target.checked })}
                    className="w-4 h-4 rounded text-[#0B7A0B] focus:ring-[#0B7A0B]"
                  />
                  <span className="text-xs font-bold text-[#0A2D5B]">Publish on Public Website</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPlant.is_featured ?? false}
                    onChange={(e) => setEditingPlant({ ...editingPlant, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#F7C600] focus:ring-[#F7C600]"
                  />
                  <span className="text-xs font-bold text-[#0A2D5B]">Feature on Homepage</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E5E7EB] text-xs font-bold text-[#0A2D5B] hover:bg-[#F8FAFC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] text-xs font-bold shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-60 flex items-center gap-2 border border-transparent"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0A2D5B]" />}
                  <span>{editingPlant.id ? "Update Specimen" : "Save to Database"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
