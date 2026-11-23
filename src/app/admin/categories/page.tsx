"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PlantCategory } from "@/types";
import { 
  FolderTree, 
  Plus, 
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

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<PlantCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Partial<PlantCategory> | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (Array.isArray(data)) setCategories(data);
    } catch {
      setStatusMessage({ type: "error", text: "Failed to load categories." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openNewModal = () => {
    setEditingCategory({
      name: "",
      slug: "",
      short_description: "",
      full_description: "",
      image_url: "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=1000&q=80",
      display_order: categories.length + 1,
      is_active: true,
      seo_title: "",
      seo_description: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (cat: PlantCategory) => {
    setEditingCategory({ ...cat });
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

      if (editingCategory) {
        setEditingCategory({ ...editingCategory, image_url: data.file_url });
      }
      setStatusMessage({ type: "success", text: "Category banner uploaded." });
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
    if (!editingCategory) return;

    try {
      setSubmitting(true);
      const payload = {
        ...editingCategory,
        slug: editingCategory.slug || slugify(editingCategory.name || "category"),
      };

      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save category");
      }

      setModalOpen(false);
      setEditingCategory(null);
      setStatusMessage({ type: "success", text: "Category saved successfully." });
      fetchCategories();
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
      const res = await fetch(`/api/admin/categories?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Delete failed");
      }
      setStatusMessage({ type: "success", text: "Category removed." });
      setDeleteConfirmId(null);
      fetchCategories();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatusMessage({ type: "error", text: err.message });
      }
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0B7A0B] uppercase tracking-wider mb-1">
            <FolderTree className="w-4 h-4 text-[#F7C600]" />
            <span>Classification System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A2D5B] font-display">
            Plant Categories ({categories.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
            Manage the core botanical categories, hero banners, ordering, and associated descriptions.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 border border-transparent"
        >
          <Plus className="w-4 h-4 text-[#0A2D5B]" />
          <span>Add Category</span>
        </button>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between text-xs font-semibold ${
            statusMessage.type === "success"
              ? "bg-[#F0FDF4] text-[#0A2D5B] border border-[#C5DEC8]"
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

      {/* Category Table */}
      <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#6B7280]">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#0B7A0B] mb-2" />
            <p className="text-xs">Loading database records...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="p-12 text-center text-[#6B7280]">
            <FolderTree className="w-10 h-10 text-[#E5E7EB] mx-auto mb-2" />
            <p className="text-sm font-semibold text-[#0A2D5B]">No categories found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#0A2D5B]">
              <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#6B7280] uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="py-4 px-6">Order</th>
                  <th className="py-4 px-6">Category Details</th>
                  <th className="py-4 px-6">Public URL</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#6B7280]">
                      #{cat.display_order}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] overflow-hidden relative shrink-0 border border-[#E5E7EB]">
                          <img
                            src={cat.image_url}
                            alt={cat.name}
                            className={`w-full h-full ${
                              cat.image_url?.includes("tissue-culture") ||
                              cat.image_url?.includes("garden-pond-plants") ||
                              cat.image_url?.includes("plants-bunch")
                                ? "object-contain p-1"
                                : "object-cover"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-bold text-[#0A2D5B] text-sm">{cat.name}</p>
                          <p className="text-xs text-[#6B7280] line-clamp-1 max-w-sm">
                            {cat.short_description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-mono text-[11px] text-[#0B7A0B]">
                      /aquarium-plants/{cat.slug}
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          cat.is_active
                            ? "bg-[#F0FDF4] text-[#0B7A0B]"
                            : "bg-[#F8FAFC] text-[#6B7280] border border-[#E5E7EB]"
                        }`}
                      >
                        {cat.is_active ? (
                          <>
                            <Check className="w-3 h-3" /> Active
                          </>
                        ) : (
                          "Inactive"
                        )}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/aquarium-plants/${cat.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg text-[#6B7280] hover:text-[#0A2D5B] hover:bg-[#F0FDF4] transition-colors"
                          title="View public page"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => openEditModal(cat)}
                          className="p-2 rounded-lg text-[#0B7A0B] hover:text-[#0A2D5B] hover:bg-[#F0FDF4] transition-colors"
                          title="Edit category"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(cat.id)}
                          className="p-2 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                          title="Delete category"
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

      {/* Confirmation Dialog for Category Deletion */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-4 border border-[#E5E7EB]">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-[#0A2D5B] font-display">Delete Category?</h3>
              <p className="text-xs text-[#6B7280] mt-1">
                Categories containing plants cannot be deleted until all assigned plants are reassigned or removed.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#E5E7EB] text-xs font-semibold text-[#6B7280] hover:bg-[#F8FAFC]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 shadow-sm"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {modalOpen && editingCategory && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 shadow-2xl space-y-6 border border-[#E5E7EB]">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
              <div>
                <h3 className="text-xl font-bold text-[#0A2D5B] font-display">
                  {editingCategory.id ? "Edit Category" : "Add Plant Category"}
                </h3>
                <p className="text-xs text-[#6B7280]">Configure public category attributes and banner.</p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl text-[#6B7280] hover:text-[#0A2D5B] hover:bg-[#F8FAFC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0A2D5B] uppercase tracking-wider mb-1">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCategory.name || ""}
                    onChange={(e) => {
                      const name = e.target.value;
                      setEditingCategory({
                        ...editingCategory,
                        name,
                        slug: editingCategory.id ? editingCategory.slug : slugify(name),
                      });
                    }}
                    placeholder="e.g. Tissue Culture"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] focus:border-[#0B7A0B] focus:ring-1 focus:ring-[#0B7A0B] text-xs text-[#0A2D5B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A2D5B] uppercase tracking-wider mb-1">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCategory.slug || ""}
                    onChange={(e) => setEditingCategory({ ...editingCategory, slug: slugify(e.target.value) })}
                    placeholder="e.g. tissue-culture"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] focus:border-[#0B7A0B] focus:ring-1 focus:ring-[#0B7A0B] text-xs text-[#0A2D5B] font-mono"
                  />
                </div>
              </div>

              {/* Banner Image */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-3">
                <label className="block text-xs font-bold text-[#0A2D5B] uppercase tracking-wider">
                  Category Banner Image
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-[#E5E7EB] relative shrink-0">
                    <img
                      src={editingCategory.image_url || "/logo.png"}
                      alt="Category Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="url"
                      value={editingCategory.image_url || ""}
                      onChange={(e) => setEditingCategory({ ...editingCategory, image_url: e.target.value })}
                      placeholder="https://... (or upload from computer below)"
                      className="w-full px-3 py-1.5 rounded-xl border border-[#E5E7EB] text-xs"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0B7A0B] text-white cursor-pointer hover:bg-[#0B7A0B] transition-colors">
                      <UploadCloud className="w-3.5 h-3.5 text-[#F7C600]" />
                      <span>{uploadingImage ? "Uploading..." : "Upload Banner"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A2D5B] uppercase tracking-wider mb-1">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory.short_description || ""}
                  onChange={(e) => setEditingCategory({ ...editingCategory, short_description: e.target.value })}
                  placeholder="Appears on homepage and category cards"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] focus:border-[#0B7A0B] text-xs text-[#0A2D5B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A2D5B] uppercase tracking-wider mb-1">
                  Full Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={editingCategory.full_description || ""}
                  onChange={(e) => setEditingCategory({ ...editingCategory, full_description: e.target.value })}
                  placeholder="Appears on top of the dedicated category page"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] focus:border-[#0B7A0B] text-xs text-[#0A2D5B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0A2D5B] uppercase tracking-wider mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingCategory.display_order || 1}
                    onChange={(e) => setEditingCategory({ ...editingCategory, display_order: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-2 rounded-xl border border-[#E5E7EB] focus:border-[#0B7A0B] text-xs text-[#0A2D5B]"
                  />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingCategory.is_active ?? true}
                      onChange={(e) => setEditingCategory({ ...editingCategory, is_active: e.target.checked })}
                      className="w-4 h-4 rounded text-[#0B7A0B] focus:ring-[#0B7A0B]"
                    />
                    <span className="text-xs font-semibold text-[#0A2D5B]">Active on Navigation & Catalogue</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E5E7EB] text-xs font-semibold text-[#6B7280] hover:bg-[#F8FAFC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] text-xs font-bold shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-60 flex items-center gap-2 border border-transparent"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0A2D5B]" />}
                  <span>{editingCategory.id ? "Update Category" : "Save Category"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
