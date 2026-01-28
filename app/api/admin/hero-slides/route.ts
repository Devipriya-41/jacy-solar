// app/api/admin/hero-slides/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { heroSlides } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import fs from "fs";
import path from "path";

// Utility function to delete image file
function deleteImageFile(imageUrl: string): boolean {
  try {
    // Check if it's a local image (starts with /img/)
    if (!imageUrl.startsWith("/img/")) {
      return false; // Not a local file, skip deletion
    }

    // Convert URL to file path
    const filePath = path.join(process.cwd(), "public", imageUrl);

    // Check if file exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted image: ${filePath}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
}

// GET - Fetch all slides
export async function GET() {
  try {
    const slides = await db
      .select()
      .from(heroSlides)
      .orderBy(asc(heroSlides.order));

    return NextResponse.json(slides);
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    return NextResponse.json(
      { error: "Failed to fetch slides" },
      { status: 500 },
    );
  }
}

// POST - Create new slide
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const [newSlide] = await db
      .insert(heroSlides)
      .values({
        title: body.title,
        description: body.description,
        image: body.image,
        buttonText: body.buttonText || "Read More",
        buttonLink: body.buttonLink || "#",
        order: body.order || 0,
        isActive: body.isActive ?? true,
      })
      .returning();

    return NextResponse.json(newSlide, { status: 201 });
  } catch (error) {
    console.error("Error creating hero slide:", error);
    return NextResponse.json(
      { error: "Failed to create slide" },
      { status: 500 },
    );
  }
}

// PUT - Update slide
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "Slide ID is required" },
        { status: 400 },
      );
    }

    // Get current slide to check if image is being changed
    const [currentSlide] = await db
      .select()
      .from(heroSlides)
      .where(eq(heroSlides.id, body.id));

    if (!currentSlide) {
      return NextResponse.json({ error: "Slide not found" }, { status: 404 });
    }

    // If image is being updated and it's different from current, delete old image
    if (body.image && currentSlide.image !== body.image) {
      deleteImageFile(currentSlide.image);
    }

    const [updatedSlide] = await db
      .update(heroSlides)
      .set({
        title: body.title,
        description: body.description,
        image: body.image,
        buttonText: body.buttonText,
        buttonLink: body.buttonLink,
        order: body.order,
        isActive: body.isActive,
        updatedAt: new Date(),
      })
      .where(eq(heroSlides.id, body.id))
      .returning();

    return NextResponse.json(updatedSlide);
  } catch (error) {
    console.error("Error updating hero slide:", error);
    return NextResponse.json(
      { error: "Failed to update slide" },
      { status: 500 },
    );
  }
}

// DELETE - Delete slide
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Slide ID is required" },
        { status: 400 },
      );
    }

    // Get the slide first to access the image URL
    const [slide] = await db
      .select()
      .from(heroSlides)
      .where(eq(heroSlides.id, parseInt(id)));

    if (!slide) {
      return NextResponse.json({ error: "Slide not found" }, { status: 404 });
    }

    // Delete the image file if it exists
    if (slide.image) {
      deleteImageFile(slide.image);
    }

    // Delete the slide from database
    await db.delete(heroSlides).where(eq(heroSlides.id, parseInt(id)));

    return NextResponse.json({
      success: true,
      message: "Slide and associated image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting hero slide:", error);
    return NextResponse.json(
      { error: "Failed to delete slide" },
      { status: 500 },
    );
  }
}
