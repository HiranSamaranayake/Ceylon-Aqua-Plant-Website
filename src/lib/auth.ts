import { cookies } from "next/headers";
import { supabase, isSupabaseConfigured } from "./supabase";

const SESSION_COOKIE_NAME = "cap_admin_session";

export interface AdminUser {
  email: string;
  name: string;
  role: string;
}

export async function getAdminSession(): Promise<AdminUser | null> {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return null;
  }

  // If Supabase is configured, verify Supabase session
  if (isSupabaseConfigured && supabase) {
    const { data: { user }, error } = await supabase.auth.getUser(sessionToken);
    if (!error && user) {
      return {
        email: user.email || "",
        name: user.user_metadata?.full_name || "Administrator",
        role: "admin",
      };
    }
  }

  // Fallback local session decoding
  try {
    const decoded = Buffer.from(sessionToken, "base64").toString("utf-8");
    const parsed = JSON.parse(decoded);
    if (parsed.email && parsed.role === "admin" && parsed.exp > Date.now()) {
      return {
        email: parsed.email,
        name: parsed.name || "Administrator",
        role: "admin",
      };
    }
  } catch {
    return null;
  }

  return null;
}

export function createAdminToken(user: AdminUser): string {
  const payload = {
    ...user,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days expiration
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

export const ADMIN_COOKIE_CONFIG = {
  name: SESSION_COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 7 * 24 * 60 * 60, // 7 days
};
