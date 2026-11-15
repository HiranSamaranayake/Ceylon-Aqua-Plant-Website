import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getWebsiteSettings, saveWebsiteSettings, getDashboardStats } from "@/lib/data-service";

export async function GET(req: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  if (searchParams.get("type") === "stats") {
    const stats = await getDashboardStats();
    return NextResponse.json(stats);
  }

  const settings = await getWebsiteSettings();
  return NextResponse.json(settings);
}

export async function POST(req: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const body = await req.json();
  const updated = await saveWebsiteSettings(body);
  return NextResponse.json(updated);
}
