"use client";

import React, { useState, useEffect } from "react";
import { DocumentItem } from "@/types";
import { 
  FileText, 
  Plus, 
  Trash2, 
  Edit2, 
  Download, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  X, 
  Check 
} from "lucide-react";

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Partial<DocumentItem> | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchDocs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/documents");
      const data = await res.json();
      if (Array.isArray(data)) setDocuments(data);
    } catch {
      setStatusMessage({ type: "error", text: "Failed to load documents." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const openNewModal = () => {
    setEditingDoc({
      title: "",
      description: "",
      file_url: "/documents/sample.pdf",
      file_size: "1.2 MB",
      file_type: "pdf",
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
      formData.append("bucket", "documents");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      if (editingDoc) {
        setEditingDoc({
          ...editingDoc,
          file_url: data.file_url,
          file_size: data.file_size,
        });
      }
      setStatusMessage({ type: "success", text: "Document uploaded successfully." });
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
    if (!editingDoc) return;

    try {
      setSubmitting(true);
      const res = await fetch("/api/admin/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingDoc),
      });

      if (!res.ok) throw new Error("Failed to save document");

      setModalOpen(false);
      setEditingDoc(null);
      setStatusMessage({ type: "success", text: "Document updated." });
      fetchDocs();
    } catch {
      setStatusMessage({ type: "error", text: "Save failed." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this document?")) return;
    try {
      await fetch(`/api/admin/documents?id=${id}`, { method: "DELETE" });
      setStatusMessage({ type: "success", text: "Document removed." });
      fetchDocs();
    } catch {
      setStatusMessage({ type: "error", text: "Delete failed." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E3EAE4] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#176B45] uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4 text-[#F2C94C]" />
            <span>Document Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#104D35] font-display">
            Official Documents & PDF Literature ({documents.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#66736A] mt-1">
            Publish downloadable product catalogues, acclimatization guides, and nursery specifications.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-[#F2C94C] hover:bg-[#E5B735] text-[#173B2B] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 border border-transparent"
        >
          <Plus className="w-4 h-4 text-[#173B2B]" />
          <span>Upload Document</span>
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

      {/* Table */}
      <div className="bg-white rounded-3xl border border-[#E3EAE4] shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#66736A]">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#176B45] mb-2" />
            <p className="text-xs">Loading documents...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="p-12 text-center text-[#66736A]">
            <p className="text-sm">No documents uploaded.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#202820]">
              <thead className="bg-[#F7FAF7] border-b border-[#E3EAE4] text-[#66736A] uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="py-4 px-6">Document Title</th>
                  <th className="py-4 px-6">File Size</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3EAE4]">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[#F7FAF7]/80 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-[#E8F3EC] text-[#176B45] shrink-0 border border-[#C5DEC8]">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-[#104D35] text-sm">{doc.title}</p>
                          <p className="text-xs text-[#66736A] line-clamp-1 max-w-sm">{doc.description}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-semibold text-[#66736A]">
                      {doc.file_size || "PDF"}
                    </td>

                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${doc.is_published ? "bg-[#E8F3EC] text-[#176B45]" : "bg-[#F7FAF7] text-[#66736A] border border-[#E3EAE4]"}`}>
                        {doc.is_published ? "Live" : "Draft"}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={doc.file_url}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-[#176B45] hover:text-[#104D35] hover:bg-[#E8F3EC] rounded-lg transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => {
                            setEditingDoc({ ...doc });
                            setModalOpen(true);
                          }}
                          className="p-1.5 text-[#176B45] hover:text-[#104D35] hover:bg-[#E8F3EC] rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
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
      {modalOpen && editingDoc && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 border border-[#E3EAE4]">
            <div className="flex items-center justify-between border-b border-[#E3EAE4] pb-3">
              <h3 className="font-bold text-lg text-[#104D35] font-display">
                {editingDoc.id ? "Edit Document" : "Upload Document"}
              </h3>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-[#66736A]" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#202820] uppercase mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  value={editingDoc.title || ""}
                  onChange={(e) => setEditingDoc({ ...editingDoc, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E3EAE4] focus:border-[#176B45] text-xs text-[#202820]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202820] uppercase mb-1">File URL / Upload PDF</label>
                <input
                  type="text"
                  required
                  value={editingDoc.file_url || ""}
                  onChange={(e) => setEditingDoc({ ...editingDoc, file_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E3EAE4] focus:border-[#176B45] text-xs mb-2 font-mono text-[#202820]"
                />
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#176B45] text-white cursor-pointer hover:bg-[#104D35] transition-colors">
                  <UploadCloud className="w-3.5 h-3.5 text-[#F2C94C]" />
                  <span>{uploading ? "Uploading..." : "Upload PDF (Max 15MB)"}</span>
                  <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202820] uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingDoc.description || ""}
                  onChange={(e) => setEditingDoc({ ...editingDoc, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E3EAE4] focus:border-[#176B45] text-xs text-[#202820]"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingDoc.is_published ?? true}
                    onChange={(e) => setEditingDoc({ ...editingDoc, is_published: e.target.checked })}
                    className="w-4 h-4 text-[#176B45] focus:ring-[#176B45]"
                  />
                  <span className="text-xs font-semibold text-[#202820]">Publish on Public About Page</span>
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
                  {submitting ? "Saving..." : "Save Document"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
