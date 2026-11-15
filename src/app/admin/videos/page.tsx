"use client";

import React, { useState, useEffect } from "react";
import { Video } from "@/types";
import { 
  Film, 
  Plus, 
  Trash2, 
  Edit2, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  X, 
  Check 
} from "lucide-react";

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Partial<Video> | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/videos");
      const data = await res.json();
      if (Array.isArray(data)) setVideos(data);
    } catch {
      setStatusMessage({ type: "error", text: "Failed to load videos." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const openNewModal = () => {
    setEditingVideo({
      title: "",
      description: "",
      video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnail_url: "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=800&q=80",
      is_featured: false,
      is_published: true,
      display_order: videos.length + 1,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;

    try {
      setSubmitting(true);
      const res = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingVideo),
      });

      if (!res.ok) throw new Error("Failed to save video");

      setModalOpen(false);
      setEditingVideo(null);
      setStatusMessage({ type: "success", text: "Video saved successfully." });
      fetchVideos();
    } catch {
      setStatusMessage({ type: "error", text: "Save failed." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this video?")) return;
    try {
      await fetch(`/api/admin/videos?id=${id}`, { method: "DELETE" });
      setStatusMessage({ type: "success", text: "Video deleted." });
      fetchVideos();
    } catch {
      setStatusMessage({ type: "error", text: "Delete failed." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-emerald uppercase tracking-wider mb-1">
            <Film className="w-4 h-4 text-brand-gold" />
            <span>Media Showcase</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-surface font-display">
            Video Showcase Management ({videos.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Embed YouTube videos, add descriptive titles, configure thumbnail artwork, and choose featured video.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold bg-brand-gold text-brand-surface hover:bg-brand-gold/90 transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Video</span>
        </button>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between text-xs font-semibold ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
            <span>{statusMessage.text}</span>
          </div>
          <button onClick={() => setStatusMessage(null)}>
            <X className="w-4 h-4 opacity-60" />
          </button>
        </div>
      )}

      {/* Videos Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-brand-emerald mb-2" />
            <p className="text-xs">Loading videos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <p className="text-sm">No videos configured.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="py-4 px-6">Video Details</th>
                  <th className="py-4 px-6">Source URL</th>
                  <th className="py-4 px-6">Featured</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {videos.map((vid) => (
                  <tr key={vid.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-10 rounded-lg bg-gray-100 overflow-hidden relative shrink-0">
                          {vid.thumbnail_url ? (
                            <img src={vid.thumbnail_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-black/10 flex items-center justify-center">
                              <Play className="w-4 h-4 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-brand-surface text-sm">{vid.title}</p>
                          <p className="text-xs text-gray-500 line-clamp-1 max-w-sm">{vid.description}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-mono text-[11px] text-gray-500 max-w-xs truncate">
                      {vid.video_url}
                    </td>

                    <td className="py-4 px-6">
                      {vid.is_featured ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 uppercase">
                          Featured
                        </span>
                      ) : (
                        <span className="text-gray-400">&mdash;</span>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${vid.is_published ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                        {vid.is_published ? "Live" : "Draft"}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingVideo({ ...vid });
                            setModalOpen(true);
                          }}
                          className="p-1.5 text-brand-emerald hover:text-brand-dark"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(vid.id)}
                          className="p-1.5 text-red-400 hover:text-red-600"
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

      {/* Modal */}
      {modalOpen && editingVideo && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-lg text-brand-surface font-display">
                {editingVideo.id ? "Edit Video" : "Add New Video"}
              </h3>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingVideo.title || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">YouTube URL</label>
                <input
                  type="url"
                  required
                  value={editingVideo.video_url || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, video_url: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 rounded-xl border text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Thumbnail Image URL</label>
                <input
                  type="url"
                  value={editingVideo.thumbnail_url || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, thumbnail_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingVideo.description || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border text-xs"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingVideo.is_published ?? true}
                    onChange={(e) => setEditingVideo({ ...editingVideo, is_published: e.target.checked })}
                    className="w-4 h-4 text-brand-emerald"
                  />
                  <span className="text-xs font-semibold text-gray-700">Published Live</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingVideo.is_featured ?? false}
                    onChange={(e) => setEditingVideo({ ...editingVideo, is_featured: e.target.checked })}
                    className="w-4 h-4 text-brand-gold"
                  />
                  <span className="text-xs font-semibold text-gray-700">Feature on Homepage</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-brand-emerald text-white text-xs font-semibold"
                >
                  {submitting ? "Saving..." : "Save Video"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
