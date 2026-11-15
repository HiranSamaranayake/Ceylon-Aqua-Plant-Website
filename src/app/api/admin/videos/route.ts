import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getVideos, saveVideo, deleteVideo } from "@/lib/data-service";

export async function GET() {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const videos = await getVideos({ publishedOnly: false });
  return NextResponse.json(videos);
}

export async function POST(req: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const body = await req.json();
  if (!body.title || !body.video_url) {
    return NextResponse.json({ error: "Title and Video URL are required" }, { status: 400 });
  }

  const saved = await saveVideo(body);
  return NextResponse.json(saved);
}

export async function DELETE(req: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
  }

  await deleteVideo(id);
  return NextResponse.json({ success: true });
}
