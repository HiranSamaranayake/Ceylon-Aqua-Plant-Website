import React from "react";
import { getVideos } from "@/lib/data-service";
import VideoPlayerView from "@/components/VideoPlayerView";
import FadeIn from "@/components/animations/FadeIn";
import { Play } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aquarium Plants Video Showcase & Nursery Tours",
  description: "Watch video features, aquascaping tips, and greenhouse tours showcasing Ceylon Aquatic Plants (Pvt) Ltd cultivation practices in Sri Lanka.",
  alternates: {
    canonical: "/video",
  },
};

export const revalidate = 60;

export default async function VideoPage() {
  const videos = await getVideos({ publishedOnly: true });

  const videoSchemas = videos.map((v) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.title,
    description: v.description || v.title,
    thumbnailUrl: [v.thumbnail_url || "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d"],
    uploadDate: v.created_at || new Date().toISOString(),
    contentUrl: v.video_url,
    embedUrl: v.video_url,
  }));

  return (
    <div className="bg-white min-h-screen">
      {videoSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Header Banner - Clean Light Theme */}
      <section className="bg-[#F7FAF7] py-14 sm:py-20 border-b border-[#E3EAE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E3EAE4] text-[#176B45] text-xs font-bold uppercase tracking-wider mb-3">
              <Play className="w-3.5 h-3.5" />
              <span>Video Documentary & Demos</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#104D35] font-display">
              Video Showcase
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#66736A] leading-relaxed">
              Experience our nursery facilities, propagation procedures, and artistic aquascapes in motion.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Player Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <VideoPlayerView videos={videos} />
      </section>
    </div>
  );
}
