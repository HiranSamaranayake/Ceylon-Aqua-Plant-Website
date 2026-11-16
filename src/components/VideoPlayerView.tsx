"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Video } from "@/types";
import { extractYouTubeId } from "@/lib/utils";
import { StaggerContainer, StaggerItem } from "./animations/Stagger";
import { Play, Film } from "lucide-react";

interface VideoPlayerViewProps {
  videos: Video[];
}

export default function VideoPlayerView({ videos }: VideoPlayerViewProps) {
  const [activeVideo, setActiveVideo] = useState<Video | null>(videos[0] || null);

  if (videos.length === 0) {
    return (
      <div className="text-center py-16 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] p-8 max-w-md mx-auto">
        <Film className="w-8 h-8 text-[#0B7A0B] mx-auto mb-2 opacity-60" />
        <h3 className="text-base font-bold text-[#0A2D5B]">No videos available</h3>
        <p className="text-xs text-[#6B7280] mt-1">
          Nursery documentaries and care tutorials are currently being uploaded.
        </p>
      </div>
    );
  }

  const activeYouTubeId = activeVideo ? extractYouTubeId(activeVideo.video_url) : null;

  return (
    <div className="space-y-12">
      {/* Active Featured Player */}
      {activeVideo && (
        <div className="bg-white rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-sm p-4 sm:p-6 lg:p-8">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner">
            {activeYouTubeId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeYouTubeId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <p className="text-sm">Video link: <a href={activeVideo.video_url} target="_blank" rel="noopener noreferrer" className="underline text-[#F7C600]">{activeVideo.video_url}</a></p>
              </div>
            )}
          </div>

          <div className="mt-6 space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#F0FDF4] text-[#0B7A0B]">
              Now Playing
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A2D5B] font-display">
              {activeVideo.title}
            </h2>
            {activeVideo.description && (
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-4xl">
                {activeVideo.description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Video Playlist Grid */}
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#0A2D5B] mb-6 font-display">
          All Nursery & Aquascaping Videos ({videos.length})
        </h3>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((vid) => {
            const isSelected = activeVideo?.id === vid.id;
            return (
              <StaggerItem key={vid.id}>
                <div
                  onClick={() => {
                    setActiveVideo(vid);
                    window.scrollTo({ top: 300, behavior: "smooth" });
                  }}
                  className={`group rounded-2xl overflow-hidden bg-white border cursor-pointer transition-all duration-300 flex flex-col hover:-translate-y-1 ${
                    isSelected
                      ? "border-[#0B7A0B] ring-2 ring-[#0B7A0B]/20 shadow-md"
                      : "border-[#E5E7EB] hover:border-[#0B7A0B]/40 shadow-xs hover:shadow-md"
                  }`}
                >
                  <div className="relative aspect-video w-full bg-[#F8FAFC]">
                    {vid.thumbnail_url ? (
                      <Image
                        src={vid.thumbnail_url}
                        alt={vid.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#0A2D5B] leading-snug group-hover:text-[#0B7A0B] transition-colors font-display">
                        {vid.title}
                      </h4>
                      {vid.description && (
                        <p className="text-xs text-[#6B7280] mt-2 line-clamp-2">
                          {vid.description}
                        </p>
                      )}
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-bold text-[#0B7A0B]">
                      <span>{isSelected ? "Currently Playing" : "Watch Video"}</span>
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </div>
  );
}
