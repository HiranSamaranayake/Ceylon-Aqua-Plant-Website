import { NextResponse } from "next/server";
import { ADMIN_COOKIE_CONFIG } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ success: true, message: "Logged out successfully." });
  res.cookies.set(ADMIN_COOKIE_CONFIG.name, "", {
    ...ADMIN_COOKIE_CONFIG,
    maxAge: 0,
  });
  return res;
}
