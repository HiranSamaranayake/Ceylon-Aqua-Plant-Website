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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E3EAE4] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#176B45] uppercase tracking-wider mb-1">
            <Film className="w-4 h-4 text-[#F2C94C]" />
            <span>Media Showcase</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#104D35] font-display">
            Video Showcase Management ({videos.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#66736A] mt-1">
            Embed YouTube videos, add descriptive titles, configure thumbnail artwork, and choose featured video.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-[#F2C94C] hover:bg-[#E5B735] text-[#173B2B] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 border border-transparent"
        >
          <Plus className="w-4 h-4 text-[#173B2B]" />
          <span>Add New Video</span>
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

      {/* Videos Table */}
      <div className="bg-white rounded-3xl border border-[#E3EAE4] shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#66736A]">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#176B45] mb-2" />
            <p className="text-xs">Loading videos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="p-12 text-center text-[#66736A]">
            <p className="text-sm">No videos configured.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#202820]">
              <thead className="bg-[#F7FAF7] border-b border-[#E3EAE4] text-[#66736A] uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="py-4 px-6">Video Details</th>
                  <th className="py-4 px-6">Source URL</th>
                  <th className="py-4 px-6">Featured</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3EAE4]">
                {videos.map((vid) => (
                  <tr key={vid.id} className="hover:bg-[#F7FAF7]/80 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-10 rounded-lg bg-[#F7FAF7] border border-[#E3EAE4] overflow-hidden relative shrink-0">
                          {vid.thumbnail_url ? (
                            <img src={vid.thumbnail_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-[#E8F3EC] flex items-center justify-center">
                              <Play className="w-4 h-4 text-[#176B45]" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-[#104D35] text-sm">{vid.title}</p>
                          <p className="text-xs text-[#66736A] line-clamp-1 max-w-sm">{vid.description}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-mono text-[11px] text-[#66736A] max-w-xs truncate">
                      {vid.video_url}
                    </td>

                    <td className="py-4 px-6">
                      {vid.is_featured ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFF9E6] text-[#B8860B] border border-[#F2C94C]/40 uppercase">
                          Featured
                        </span>
                      ) : (
                        <span className="text-[#CBD5CE]">&mdash;</span>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${vid.is_published ? "bg-[#E8F3EC] text-[#176B45]" : "bg-[#F7FAF7] text-[#66736A] border border-[#E3EAE4]"}`}>
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
                          className="p-1.5 text-[#176B45] hover:text-[#104D35] hover:bg-[#E8F3EC] rounded-lg transition-colors"
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
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 border border-[#E3EAE4]">
            <div className="flex items-center justify-between border-b border-[#E3EAE4] pb-3">
              <h3 className="font-bold text-lg text-[#104D35] font-display">
                {editingVideo.id ? "Edit Video" : "Add New Video"}
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
                  value={editingVideo.title || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E3EAE4] focus:border-[#176B45] text-xs text-[#202820]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202820] uppercase mb-1">YouTube URL</label>
                <input
                  type="url"
                  required
                  value={editingVideo.video_url || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, video_url: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 rounded-xl border border-[#E3EAE4] focus:border-[#176B45] text-xs font-mono text-[#202820]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202820] uppercase mb-1">Thumbnail Image URL</label>
                <input
                  type="url"
                  value={editingVideo.thumbnail_url || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, thumbnail_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-[#E3EAE4] focus:border-[#176B45] text-xs text-[#202820]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202820] uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingVideo.description || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E3EAE4] focus:border-[#176B45] text-xs text-[#202820]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingVideo.is_published ?? true}
                    onChange={(e) => setEditingVideo({ ...editingVideo, is_published: e.target.checked })}
                    className="w-4 h-4 text-[#176B45] focus:ring-[#176B45]"
                  />
                  <span className="text-xs font-semibold text-[#202820]">Published Live</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingVideo.is_featured ?? false}
                    onChange={(e) => setEditingVideo({ ...editingVideo, is_featured: e.target.checked })}
                    className="w-4 h-4 text-[#F2C94C] focus:ring-[#F2C94C]"
                  />
                  <span className="text-xs font-semibold text-[#202820]">Feature on Homepage</span>
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
