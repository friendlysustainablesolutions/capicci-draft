import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const rawFolder = searchParams.get("folder");

  if (!rawFolder) {
    return NextResponse.json({ images: [] });
  }

  // Decodes spaces and special characters from the query string
  const folder = decodeURIComponent(rawFolder);
  const dirPath = path.join(process.cwd(), "public", "images", folder);

  try {
    if (!fs.existsSync(dirPath)) {
      return NextResponse.json({ images: [] });
    }

    const files = fs.readdirSync(dirPath);

    const images = files
      .filter((file) => /\.(jpg|jpeg|png|webp|svg)$/i.test(file))
      .map((file) => ({
        src: `/images/${folder}/${file}`,
        displayName: file
          .replace(/\.[^/.]+$/, "")
          .replace(/^\d+[-_]/, "")
          .replace(/[-_]/g, " "),
      }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error(`Failed to read folder: ${folder}`, error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}