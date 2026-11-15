import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getDocuments, saveDocument, deleteDocument } from "@/lib/data-service";

export async function GET() {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const documents = await getDocuments({ publishedOnly: false });
  return NextResponse.json(documents);
}

export async function POST(req: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const body = await req.json();
  if (!body.title || !body.file_url) {
    return NextResponse.json({ error: "Title and File URL are required" }, { status: 400 });
  }

  const saved = await saveDocument(body);
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
    return NextResponse.json({ error: "Document ID is required" }, { status: 400 });
  }

  await deleteDocument(id);
  return NextResponse.json({ success: true });
}
