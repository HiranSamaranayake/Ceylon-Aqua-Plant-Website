import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getContactInquiries, markInquiryRead } from "@/lib/data-service";

export async function GET() {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const inquiries = await getContactInquiries();
  return NextResponse.json(inquiries);
}

export async function POST(req: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "Inquiry ID is required" }, { status: 400 });
  }

  await markInquiryRead(id);
  return NextResponse.json({ success: true });
}
