"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Video } from "@/types";
import { extractYouTubeId } from "@/lib/utils";
import { StaggerContainer, StaggerItem } from "./animations/Stagger";
import { Play, Film } from "lucide-react";
import SafeImage from "./SafeImage";

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
        <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#0E7CDB]/20 shadow-xs p-3.5 xs:p-4 sm:p-6 lg:p-8">
          <div className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-inner">
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

        <StaggerContainer className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3.5 xs:gap-4 sm:gap-6">
          {videos.map((vid) => {
            const isSelected = activeVideo?.id === vid.id;
            return (
              <StaggerItem key={vid.id}>
                <div
                  onClick={() => {
                    setActiveVideo(vid);
                    window.scrollTo({ top: 300, behavior: "smooth" });
                  }}
                  className={`group rounded-2xl overflow-hidden bg-white border cursor-pointer transition-all duration-300 ease-out flex flex-col hover:-translate-y-1.5 motion-reduce:transform-none ${isSelected
                    ? "border-[#0E7CDB] ring-2 ring-[#0E7CDB]/30 shadow-md"
                    : "border-[#0E7CDB]/20 hover:border-[#0E7CDB] shadow-xs hover:shadow-card-hover"
                    }`}
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-[#F8FAFC]">
                    <SafeImage
                      src={vid.thumbnail_url || "/images/plants-bunch/plants-bunch-category.jpg"}
                      alt={vid.title}
                      fallbackText={vid.title}
                      fallbackSrc="/images/plants-bunch/plants-bunch-category.jpg"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-[#F7C600] hover:bg-[#E5B700] text-[#0A2D5B] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-[#0A2D5B] group-hover:text-[#0B7A0B] transition-colors line-clamp-2 text-sm sm:text-base font-display">
                        {vid.title}
                      </h4>
                      {vid.description && (
                        <p className="text-xs text-[#6B7280] line-clamp-2 mt-1.5 leading-relaxed">
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
