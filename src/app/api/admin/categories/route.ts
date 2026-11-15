import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getCategories, saveCategory, deleteCategory } from "@/lib/data-service";

export async function GET() {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const categories = await getCategories({ activeOnly: false });
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const body = await req.json();
  if (!body.name || !body.slug) {
    return NextResponse.json({ error: "Category name and slug are required" }, { status: 400 });
  }

  const saved = await saveCategory(body);
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
    return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
  }

  const result = await deleteCategory(id);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
