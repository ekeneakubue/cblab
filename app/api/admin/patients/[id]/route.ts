import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "@/lib/auth";

function isPrismaConnectionClosedError(error: unknown): boolean {
  const e = error as { code?: string };
  return e?.code === "P1017";
}

async function retryOnceOnConnectionClose<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (!isPrismaConnectionClosedError(error)) throw error;
    await new Promise((r) => setTimeout(r, 250));
    return await fn();
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireSuperAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const { id } = await params;
    const existing = await retryOnceOnConnectionClose(() =>
      prisma.patient.findUnique({ where: { id } })
    );
    if (!existing) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    const body = await request.json();
    const { name, email, phone, dateOfBirth, address, medicalNotes, password } = body;

    const data: {
      name?: string;
      email?: string | null;
      phone?: string | null;
      dateOfBirth?: Date | null;
      address?: string | null;
      medicalNotes?: string | null;
      password?: string | null;
    } = {};

    if (name !== undefined) {
      if (typeof name !== "string" || name.trim().length === 0) {
        return NextResponse.json({ error: "Name is required" }, { status: 400 });
      }
      data.name = name.trim();
    }
    if (email !== undefined) {
      data.email = typeof email === "string" && email.trim() ? email.trim().toLowerCase() : null;
    }
    if (phone !== undefined) {
      data.phone = typeof phone === "string" && phone.trim() ? phone.trim() : null;
    }
    if (dateOfBirth !== undefined) {
      data.dateOfBirth =
        dateOfBirth && typeof dateOfBirth === "string" && dateOfBirth.trim()
          ? new Date(dateOfBirth.trim())
          : null;
    }
    if (address !== undefined) {
      data.address = typeof address === "string" ? address.trim() || null : null;
    }
    if (medicalNotes !== undefined) {
      data.medicalNotes = typeof medicalNotes === "string" ? medicalNotes.trim() || null : null;
    }
    if (typeof password === "string" && password.trim().length > 0) {
      if (password.trim().length < 6) {
        return NextResponse.json(
          { error: "Password must be at least 6 characters" },
          { status: 400 }
        );
      }
      data.password = await bcrypt.hash(password.trim(), 10);
    }

    const patient = await retryOnceOnConnectionClose(() =>
      prisma.patient.update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          dateOfBirth: true,
          address: true,
          medicalNotes: true,
          createdAt: true,
        },
      })
    );

    return NextResponse.json({
      ...patient,
      dateOfBirth: patient.dateOfBirth?.toISOString().slice(0, 10) ?? null,
    });
  } catch (error) {
    const prismaError = error as { code?: string; meta?: { target?: string[] } };
    if (prismaError.code === "P1017") {
      return NextResponse.json(
        { error: "Database connection was interrupted. Please retry." },
        { status: 503 }
      );
    }
    if (prismaError.code === "P2002" && prismaError.meta?.target?.includes("email")) {
      return NextResponse.json(
        { error: "A patient with this email already exists" },
        { status: 409 }
      );
    }
    console.error("Update patient error:", error);
    return NextResponse.json(
      { error: "Failed to update patient" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireSuperAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const { id } = await params;
    await retryOnceOnConnectionClose(() => prisma.patient.delete({ where: { id } }));
    return NextResponse.json({ success: true });
  } catch (error) {
    const prismaError = error as { code?: string };
    if (prismaError.code === "P1017") {
      return NextResponse.json(
        { error: "Database connection was interrupted. Please retry." },
        { status: 503 }
      );
    }
    if (prismaError.code === "P2025") {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }
    console.error("Delete patient error:", error);
    return NextResponse.json(
      { error: "Failed to delete patient" },
      { status: 500 }
    );
  }
}
