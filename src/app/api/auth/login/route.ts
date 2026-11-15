import { NextRequest, NextResponse } from "next/server";
import { createAdminToken, ADMIN_COOKIE_CONFIG } from "@/lib/auth";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // 1. If Supabase Auth is configured, use Supabase
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.session) {
        return NextResponse.json(
          { error: error?.message || "Invalid administrative credentials." },
          { status: 401 }
        );
      }

      const res = NextResponse.json({
        success: true,
        user: {
          email: data.user.email,
          name: data.user.user_metadata?.full_name || "Administrator",
          role: "admin",
        },
      });

      res.cookies.set(
        ADMIN_COOKIE_CONFIG.name,
        data.session.access_token,
        ADMIN_COOKIE_CONFIG
      );

      return res;
    }

    // 2. Local Standalone Secure Admin Authentication
    // Default admin credential for setup before connecting remote Supabase
    const defaultEmail = process.env.ADMIN_DEFAULT_EMAIL || "admin@ceylonaquaticplants.com";
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || "CeylonAqua2026!";

    const isAuthorizedEmail = 
      email.toLowerCase() === defaultEmail.toLowerCase() || 
      email.toLowerCase() === "ceylonaquaplants@yahoo.com";

    if (isAuthorizedEmail && password === defaultPassword) {
      const token = createAdminToken({
        email,
        name: "Director of Operations",
        role: "admin",
      });

      const res = NextResponse.json({
        success: true,
        user: {
          email,
          name: "Director of Operations",
          role: "admin",
        },
      });

      res.cookies.set(ADMIN_COOKIE_CONFIG.name, token, ADMIN_COOKIE_CONFIG);
      return res;
    }

    return NextResponse.json(
      { error: "Invalid email or password. Please verify your administrator credentials." },
      { status: 401 }
    );
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json(
      { error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}
