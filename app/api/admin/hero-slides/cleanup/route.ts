// app/api/admin/hero-slides/cleanup/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { db } from "@/db";
import { heroSlides } from "@/db/schema";

export async function POST() {
  try {
    const heroImagesDir = path.join(process.cwd(), "public", "img", "hero");

    // Get all slides from database
    const slides = await db
      .select({ image: heroSlides.image })
      .from(heroSlides);

    // Extract filenames from database
    const usedImages = slides
      .map((slide) => {
        if (slide.image.startsWith("/img/hero/")) {
          return slide.image.replace("/img/hero/", "");
        }
        return null;
      })
      .filter(Boolean) as string[];

    // Get all files in the directory
    if (fs.existsSync(heroImagesDir)) {
      const files = fs.readdirSync(heroImagesDir);

      let deletedCount = 0;
      const deletedFiles: string[] = [];

      files.forEach((file) => {
        if (!usedImages.includes(file)) {
          const filePath = path.join(heroImagesDir, file);
          fs.unlinkSync(filePath);
          deletedCount++;
          deletedFiles.push(file);
          console.log(`Deleted orphaned image: ${file}`);
        }
      });

      return NextResponse.json({
        success: true,
        message: `Cleanup complete. Deleted ${deletedCount} orphaned images.`,
        deletedCount,
        deletedFiles,
      });
    }

    return NextResponse.json({
      success: true,
      message: "No images directory found",
    });
  } catch (error) {
    console.error("Cleanup error:", error);
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
  }
}
