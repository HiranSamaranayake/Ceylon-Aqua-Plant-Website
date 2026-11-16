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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0B7A0B] uppercase tracking-wider mb-1">
            <Film className="w-4 h-4 text-[#F7C600]" />
            <span>Media Showcase</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A2D5B] font-display">
            Video Showcase Management ({videos.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
            Embed YouTube videos, add descriptive titles, configure thumbnail artwork, and choose featured video.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 border border-transparent"
        >
          <Plus className="w-4 h-4 text-[#0A2D5B]" />
          <span>Add New Video</span>
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
            <X className="w-4 h-4 opacity-60" />
          </button>
        </div>
      )}

      {/* Videos Table */}
      <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#6B7280]">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#0B7A0B] mb-2" />
            <p className="text-xs">Loading videos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="p-12 text-center text-[#6B7280]">
            <p className="text-sm">No videos configured.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#0A2D5B]">
              <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#6B7280] uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="py-4 px-6">Video Details</th>
                  <th className="py-4 px-6">Source URL</th>
                  <th className="py-4 px-6">Featured</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {videos.map((vid) => (
                  <tr key={vid.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-10 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] overflow-hidden relative shrink-0">
                          {vid.thumbnail_url ? (
                            <img src={vid.thumbnail_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-[#F0FDF4] flex items-center justify-center">
                              <Play className="w-4 h-4 text-[#0B7A0B]" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-[#0A2D5B] text-sm">{vid.title}</p>
                          <p className="text-xs text-[#6B7280] line-clamp-1 max-w-sm">{vid.description}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-mono text-[11px] text-[#6B7280] max-w-xs truncate">
                      {vid.video_url}
                    </td>

                    <td className="py-4 px-6">
                      {vid.is_featured ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FEF9C3] text-[#B8860B] border border-[#F7C600]/40 uppercase">
                          Featured
                        </span>
                      ) : (
                        <span className="text-[#E5E7EB]">&mdash;</span>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${vid.is_published ? "bg-[#F0FDF4] text-[#0B7A0B]" : "bg-[#F8FAFC] text-[#6B7280] border border-[#E5E7EB]"}`}>
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
                          className="p-1.5 text-[#0B7A0B] hover:text-[#0A2D5B] hover:bg-[#F0FDF4] rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(vid.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
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
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 border border-[#E5E7EB]">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <h3 className="font-bold text-lg text-[#0A2D5B] font-display">
                {editingVideo.id ? "Edit Video" : "Add New Video"}
              </h3>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0A2D5B] uppercase mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingVideo.title || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] focus:border-[#0B7A0B] text-xs text-[#0A2D5B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A2D5B] uppercase mb-1">YouTube URL</label>
                <input
                  type="url"
                  required
                  value={editingVideo.video_url || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, video_url: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] focus:border-[#0B7A0B] text-xs font-mono text-[#0A2D5B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A2D5B] uppercase mb-1">Thumbnail Image URL</label>
                <input
                  type="url"
                  value={editingVideo.thumbnail_url || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, thumbnail_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] focus:border-[#0B7A0B] text-xs text-[#0A2D5B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A2D5B] uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingVideo.description || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] focus:border-[#0B7A0B] text-xs text-[#0A2D5B]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingVideo.is_published ?? true}
                    onChange={(e) => setEditingVideo({ ...editingVideo, is_published: e.target.checked })}
                    className="w-4 h-4 text-[#0B7A0B] focus:ring-[#0B7A0B]"
                  />
                  <span className="text-xs font-semibold text-[#0A2D5B]">Published Live</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingVideo.is_featured ?? false}
                    onChange={(e) => setEditingVideo({ ...editingVideo, is_featured: e.target.checked })}
                    className="w-4 h-4 text-[#F7C600] focus:ring-[#F7C600]"
                  />
                  <span className="text-xs font-semibold text-[#0A2D5B]">Feature on Homepage</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#6B7280] hover:bg-[#F8FAFC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] text-xs font-bold shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-60 border border-transparent"
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
