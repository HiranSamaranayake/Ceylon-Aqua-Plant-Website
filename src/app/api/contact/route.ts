import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, sanitizeInput } from "@/lib/security";
import { createContactInquiry } from "@/lib/data-service";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

    // 1. Rate limiting check (max 5 submissions per minute)
    const { allowed } = checkRateLimit(ip, 5, 60000);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many inquiries sent. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Anti-spam Honeypot Check: bots typically fill hidden fields
    if (body.website_trap || body.address_extra) {
      return NextResponse.json(
        { error: "Spam submission detected." },
        { status: 400 }
      );
    }

    // 3. Validation & Sanitization
    const fullName = sanitizeInput(body.full_name || "");
    const email = sanitizeInput(body.email || "");
    const phone = sanitizeInput(body.phone || "");
    const subject = sanitizeInput(body.subject || "");
    const message = sanitizeInput(body.message || "");
    const plantReference = sanitizeInput(body.plant_reference || "");

    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { error: "Please provide a valid full name." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!subject || subject.length < 3) {
      return NextResponse.json(
        { error: "Please enter an inquiry subject." },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Inquiry message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    // 4. Persist inquiry
    const saved = await createContactInquiry({
      full_name: fullName,
      email,
      phone,
      subject,
      message,
      plant_reference: plantReference || undefined,
    });

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been successfully received. We will respond promptly.",
      inquiry_id: saved.id,
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while sending your inquiry. Please try again." },
      { status: 500 }
    );
  }
}
