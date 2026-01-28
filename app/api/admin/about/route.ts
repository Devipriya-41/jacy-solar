// app/api/admin/about/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { aboutSection } from "@/db/schema";
import { eq } from "drizzle-orm";
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

// GET - Fetch about section data
export async function GET() {
  try {
    const [about] = await db.select().from(aboutSection).limit(1);

    if (!about) {
      return NextResponse.json(null);
    }

    // Parse features JSON string to array
    const parsedAbout = {
      ...about,
      features: JSON.parse(about.features),
    };

    return NextResponse.json(parsedAbout);
  } catch (error) {
    console.error("Error fetching about section:", error);
    return NextResponse.json(
      { error: "Failed to fetch about section" },
      { status: 500 },
    );
  }
}

// POST - Create new about section
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if about section already exists
    const [existing] = await db.select().from(aboutSection).limit(1);

    if (existing) {
      return NextResponse.json(
        { error: "About section already exists. Use PUT to update." },
        { status: 400 },
      );
    }

    const [newAbout] = await db
      .insert(aboutSection)
      .values({
        heading: body.heading || "About Us",
        title: body.title,
        description: body.description,
        image: body.image,
        buttonText: body.buttonText || "Explore More",
        buttonLink: body.buttonLink || "/about",
        features: JSON.stringify(body.features || []),
        isActive: body.isActive ?? true,
      })
      .returning();

    // Parse features back to array for response
    const response = {
      ...newAbout,
      features: JSON.parse(newAbout.features),
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error creating about section:", error);
    return NextResponse.json(
      { error: "Failed to create about section" },
      { status: 500 },
    );
  }
}

// PUT - Update about section
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "About section ID is required" },
        { status: 400 },
      );
    }

    // Get current about section to check if image is being changed
    const [currentAbout] = await db
      .select()
      .from(aboutSection)
      .where(eq(aboutSection.id, body.id));

    if (!currentAbout) {
      return NextResponse.json(
        { error: "About section not found" },
        { status: 404 },
      );
    }

    // If image is being updated and it's different from current, delete old image
    if (body.image && currentAbout.image !== body.image) {
      deleteImageFile(currentAbout.image);
    }

    const [updatedAbout] = await db
      .update(aboutSection)
      .set({
        heading: body.heading,
        title: body.title,
        description: body.description,
        image: body.image,
        buttonText: body.buttonText,
        buttonLink: body.buttonLink,
        features: JSON.stringify(body.features || []),
        isActive: body.isActive,
        updatedAt: new Date(),
      })
      .where(eq(aboutSection.id, body.id))
      .returning();

    // Parse features back to array for response
    const response = {
      ...updatedAbout,
      features: JSON.parse(updatedAbout.features),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error updating about section:", error);
    return NextResponse.json(
      { error: "Failed to update about section" },
      { status: 500 },
    );
  }
}

// DELETE - Delete about section
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "About section ID is required" },
        { status: 400 },
      );
    }

    // Get the about section first to access the image URL
    const [about] = await db
      .select()
      .from(aboutSection)
      .where(eq(aboutSection.id, parseInt(id)));

    if (!about) {
      return NextResponse.json(
        { error: "About section not found" },
        { status: 404 },
      );
    }

    // Delete the image file if it exists
    if (about.image) {
      deleteImageFile(about.image);
    }

    // Delete the about section from database
    await db.delete(aboutSection).where(eq(aboutSection.id, parseInt(id)));

    return NextResponse.json({
      success: true,
      message: "About section and associated image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting about section:", error);
    return NextResponse.json(
      { error: "Failed to delete about section" },
      { status: 500 },
    );
  }
}
