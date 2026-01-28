// lib/fileUtils.ts
import fs from "fs";
import path from "path";

export function deleteImageFile(imageUrl: string): boolean {
  try {
    if (!imageUrl.startsWith("/img/")) {
      return false;
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
