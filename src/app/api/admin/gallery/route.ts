import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getGalleryImages, getGalleryAlbums, saveGalleryImage, deleteGalleryImage } from "@/lib/data-service";

export async function GET() {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const [images, albums] = await Promise.all([
    getGalleryImages({ publishedOnly: false }),
    getGalleryAlbums(),
  ]);

  return NextResponse.json({ images, albums });
}

export async function POST(req: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const body = await req.json();
  if (!body.title || !body.image_url) {
    return NextResponse.json({ error: "Title and Image URL are required" }, { status: 400 });
  }

  const saved = await saveGalleryImage(body);
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
    return NextResponse.json({ error: "Image ID is required" }, { status: 400 });
  }

  await deleteGalleryImage(id);
  return NextResponse.json({ success: true });
}
