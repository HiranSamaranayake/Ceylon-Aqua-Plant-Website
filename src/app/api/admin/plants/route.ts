import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getPlants, savePlant, deletePlant } from "@/lib/data-service";

export async function GET() {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const plants = await getPlants({ publishedOnly: false });
  return NextResponse.json(plants);
}

export async function POST(req: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const body = await req.json();
  if (!body.name || !body.category_id) {
    return NextResponse.json({ error: "Plant name and category are required" }, { status: 400 });
  }

  const saved = await savePlant(body);
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
    return NextResponse.json({ error: "Plant ID is required" }, { status: 400 });
  }

  await deletePlant(id);
  return NextResponse.json({ success: true });
}
