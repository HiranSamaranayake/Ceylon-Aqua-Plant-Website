"use client";

import React, { useState, useEffect } from "react";
import { GalleryImage, GalleryAlbum } from "@/types";
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  X, 
  Check,
  Edit2
} from "lucide-react";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<Partial<GalleryImage> | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      if (data.images) setImages(data.images);
      if (data.albums) setAlbums(data.albums);
    } catch {
      setStatusMessage({ type: "error", text: "Failed to load gallery items." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const openNewModal = () => {
    setEditingImage({
      title: "",
      description: "",
      album_id: albums[0]?.id || "",
      image_url: "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=1200&q=85",
      display_order: images.length + 1,
      is_published: true,
    });
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", "gallery");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      if (editingImage) {
        setEditingImage({ ...editingImage, image_url: data.file_url });
      }
      setStatusMessage({ type: "success", text: "Photo uploaded successfully." });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatusMessage({ type: "error", text: err.message });
      }
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    try {
      setSubmitting(true);
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingImage),
      });

      if (!res.ok) throw new Error("Failed to save image");

      setModalOpen(false);
      setEditingImage(null);
      setStatusMessage({ type: "success", text: "Gallery image saved." });
      fetchGallery();
    } catch {
      setStatusMessage({ type: "error", text: "Save failed." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this photograph from the gallery?")) return;
    try {
      await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
      setStatusMessage({ type: "success", text: "Image deleted." });
      fetchGallery();
    } catch {
      setStatusMessage({ type: "error", text: "Delete failed." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E3EAE4] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#176B45] uppercase tracking-wider mb-1">
            <ImageIcon className="w-4 h-4 text-[#F2C94C]" />
            <span>Media Library</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#104D35] font-display">
            Photo Gallery Management ({images.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#66736A] mt-1">
            Upload botanical photography, categorize into albums, and organize public lightbox view.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-[#F2C94C] hover:bg-[#E5B735] text-[#173B2B] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 border border-transparent"
        >
          <Plus className="w-4 h-4 text-[#173B2B]" />
          <span>Upload Image</span>
        </button>
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
          <button onClick={() => setStatusMessage(null)}>
            <X className="w-4 h-4 opacity-60" />
          </button>
        </div>
      )}

      {/* Grid of gallery cards */}
      <div className="bg-white p-6 rounded-3xl border border-[#E3EAE4] shadow-xs">
        {loading ? (
          <div className="p-12 text-center text-[#66736A]">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#176B45] mb-2" />
            <p className="text-xs">Loading photographs...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="p-12 text-center text-[#66736A]">
            <p className="text-sm">No photographs uploaded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img) => (
              <div key={img.id} className="rounded-2xl border border-[#E3EAE4] overflow-hidden bg-[#F7FAF7] flex flex-col justify-between">
                <div className="relative aspect-[4/3] w-full bg-black/5">
                  <img src={img.image_url} alt={img.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#104D35]/90 text-white backdrop-blur-sm border border-[#176B45]/30">
                    {img.album?.title || "Album"}
                  </span>
                </div>
                <div className="p-4 space-y-2 bg-white">
                  <h4 className="font-bold text-sm text-[#104D35]">{img.title}</h4>
                  {img.description && <p className="text-xs text-[#66736A] line-clamp-2">{img.description}</p>}
                  <div className="pt-2 border-t border-[#E3EAE4] flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase ${img.is_published ? "text-[#176B45]" : "text-[#66736A]"}`}>
                      {img.is_published ? "Published" : "Draft"}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingImage({ ...img });
                          setModalOpen(true);
                        }}
                        className="p-1.5 text-[#176B45] hover:text-[#104D35] hover:bg-[#E8F3EC] rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(img.id)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && editingImage && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 border border-[#E3EAE4]">
            <div className="flex items-center justify-between border-b border-[#E3EAE4] pb-3">
              <h3 className="font-bold text-lg text-[#104D35] font-display">
                {editingImage.id ? "Edit Photograph" : "Upload New Photograph"}
              </h3>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-[#66736A]" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#202820] uppercase mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingImage.title || ""}
                  onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E3EAE4] focus:border-[#176B45] text-xs text-[#202820]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202820] uppercase mb-1">Album</label>
                <select
                  value={editingImage.album_id || ""}
                  onChange={(e) => setEditingImage({ ...editingImage, album_id: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E3EAE4] focus:border-[#176B45] text-xs bg-white text-[#202820]"
                >
                  {albums.map((a) => (
                    <option key={a.id} value={a.id}>{a.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202820] uppercase mb-1">Photo URL / Upload</label>
                <input
                  type="url"
                  value={editingImage.image_url || ""}
                  onChange={(e) => setEditingImage({ ...editingImage, image_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E3EAE4] focus:border-[#176B45] text-xs mb-2"
                />
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#176B45] text-white cursor-pointer hover:bg-[#104D35] transition-colors">
                  <UploadCloud className="w-3.5 h-3.5 text-[#F2C94C]" />
                  <span>{uploading ? "Uploading..." : "Upload from Computer"}</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202820] uppercase mb-1">Caption / Description</label>
                <textarea
                  rows={2}
                  value={editingImage.description || ""}
                  onChange={(e) => setEditingImage({ ...editingImage, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E3EAE4] focus:border-[#176B45] text-xs text-[#202820]"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingImage.is_published ?? true}
                    onChange={(e) => setEditingImage({ ...editingImage, is_published: e.target.checked })}
                    className="w-4 h-4 text-[#176B45] focus:ring-[#176B45]"
                  />
                  <span className="text-xs font-semibold text-[#202820]">Publish in Public Gallery</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E3EAE4]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E3EAE4] text-xs text-[#66736A] hover:bg-[#F7FAF7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-[#F2C94C] hover:bg-[#E5B735] text-[#173B2B] text-xs font-bold shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-60 border border-transparent"
                >
                  {submitting ? "Saving..." : "Save Image"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
