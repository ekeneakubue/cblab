import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "@/lib/auth";

export async function GET() {
  const session = await requireSuperAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        category: true,
        readTime: true,
        imageUrl: true,
        publishedAt: true,
        createdAt: true,
      },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Fetch blogs error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await requireSuperAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const body = await request.json();
    const { title, slug, category, readTime, imageUrl, content, date } = body;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }
    if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }
    if (!category || typeof category !== "string" || category.trim().length === 0) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }
    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const slugNormalized = slug.trim().toLowerCase().replace(/\s+/g, "-");
    const publishedAt = date && typeof date === "string" && date.trim() ? new Date(date.trim()) : null;

    const blog = await prisma.blog.create({
      data: {
        title: title.trim(),
        slug: slugNormalized,
        category: category.trim(),
        readTime: typeof readTime === "string" && readTime.trim() ? readTime.trim() : null,
        imageUrl: typeof imageUrl === "string" && imageUrl.trim() ? imageUrl.trim() : null,
        content: content.trim(),
        publishedAt,
      },
    });

    return NextResponse.json({
      id: blog.id,
      slug: blog.slug,
      title: blog.title,
      category: blog.category,
      readTime: blog.readTime,
      imageUrl: blog.imageUrl,
      publishedAt: blog.publishedAt?.toISOString() ?? null,
      createdAt: blog.createdAt,
    });
  } catch (error) {
    const prismaError = error as { code?: string; meta?: { target?: string[] } };
    if (prismaError.code === "P2002" && prismaError.meta?.target?.includes("slug")) {
      return NextResponse.json(
        { error: "A blog with this slug already exists." },
        { status: 409 }
      );
    }
    console.error("Create blog error:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
