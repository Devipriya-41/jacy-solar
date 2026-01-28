// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.",
        },
        { status: 400 },
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size exceeds 5MB limit" },
        { status: 400 },
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const timestamp = Date.now();
    const ext = path.extname(file.name);
    const nameWithoutExt = path.basename(file.name, ext).replace(/\s+/g, "-");
    const filename = `${nameWithoutExt}-${timestamp}.webp`; // Convert to WebP for optimization

    // Define upload directory
    const uploadDir = path.join(process.cwd(), "public", "img", "hero");

    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Optimize and save image using Sharp
    const filepath = path.join(uploadDir, filename);

    await sharp(buffer)
      .resize(1920, 1080, {
        // Resize to max dimensions, maintaining aspect ratio
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 85 }) // Convert to WebP with 85% quality
      .toFile(filepath);

    // Return the URL path
    const url = `/img/hero/${filename}`;

    return NextResponse.json({
      success: true,
      url,
      filename,
      message: "File uploaded and optimized successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 },
    );
  }
}
