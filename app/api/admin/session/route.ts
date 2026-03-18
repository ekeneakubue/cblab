import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  return NextResponse.json({
    userId: session.userId,
    email: session.email,
    role: session.role,
  });
}

