import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { validateFileUpload } from "@/lib/security";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const bucket = (formData.get("bucket") as string) || "plants";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const isDocument = bucket === "documents" || file.type === "application/pdf";
    const validation = validateFileUpload(
      { type: file.type, size: file.size },
      isDocument
    );

    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Generate safe unique filename
    const ext = path.extname(file.name).toLowerCase();
    const cleanBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "");
    const safeFileName = `${cleanBase}-${Date.now()}${ext}`;

    // Convert to ArrayBuffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. If Supabase Storage is configured, upload to Supabase
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(safeFileName, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(safeFileName);

        return NextResponse.json({
          success: true,
          file_url: publicUrlData.publicUrl,
          file_name: safeFileName,
          file_size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        });
      }
    }

    // 2. Standalone / Local Upload fallback: Save into public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    const targetPath = path.join(uploadDir, safeFileName);
    await fs.writeFile(targetPath, buffer);

    const publicUrl = `/uploads/${safeFileName}`;

    return NextResponse.json({
      success: true,
      file_url: publicUrl,
      file_name: safeFileName,
      file_size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "File upload failed. Please try again." },
      { status: 500 }
    );
  }
}
