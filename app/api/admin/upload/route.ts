import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { requireSuperAdmin } from "@/lib/auth";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_FOLDERS = ["users", "blogs"];

function getUploadDir(folder: string): { dir: string; urlPath: string } {
  const safe = ALLOWED_FOLDERS.includes(folder) ? folder : "users";
  return {
    dir: path.join(process.cwd(), "public", "uploads", safe),
    urlPath: `/uploads/${safe}`,
  };
}

export async function POST(request: Request) {
  const session = await requireSuperAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string)?.trim() || "users";

    if (!file || file.size === 0) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File must be under 5MB" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPEG, PNG, WebP and GIF are allowed" },
        { status: 400 }
      );
    }

    const { dir: UPLOAD_DIR, urlPath } = getUploadDir(folder);
    const ext = path.extname(file.name) || (file.type === "image/jpeg" ? ".jpg" : file.type === "image/png" ? ".png" : ".webp");
    const filename = `${randomUUID()}${ext}`;

    await mkdir(UPLOAD_DIR, { recursive: true });
    const filepath = path.join(UPLOAD_DIR, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filepath, buffer);

    const url = `${urlPath}/${filename}`;
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
