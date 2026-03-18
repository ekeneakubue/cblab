import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email")?.trim().toLowerCase();
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }
    const patient = await prisma.patient.findFirst({
      where: { email },
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
    });
    if (!patient) {
      return NextResponse.json(
        { error: "No account found with this email." },
        { status: 404 }
      );
    }
    return NextResponse.json({
      ...patient,
      dateOfBirth: patient.dateOfBirth?.toISOString().slice(0, 10) ?? null,
    });
  } catch (error) {
    console.error("Fetch patient profile error:", error);
    return NextResponse.json(
      { error: "Failed to load profile" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { patientId, name, email, phone, password, address, dateOfBirth, medicalNotes } = body;

    if (!patientId || typeof patientId !== "string") {
      return NextResponse.json(
        { error: "Patient ID is required" },
        { status: 400 }
      );
    }

    const existing = await prisma.patient.findUnique({ where: { id: patientId } });
    if (!existing) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    const data: {
      name?: string;
      email?: string | null;
      phone?: string | null;
      password?: string;
      address?: string | null;
      dateOfBirth?: Date | null;
      medicalNotes?: string | null;
    } = {};

    if (typeof name === "string" && name.trim().length > 0) data.name = name.trim();
    if (typeof email === "string") data.email = email.trim().toLowerCase() || null;
    if (typeof phone === "string") data.phone = phone.trim() || null;
    if (typeof address === "string") data.address = address.trim() || null;
    if (typeof medicalNotes === "string") data.medicalNotes = medicalNotes.trim() || null;
    if (dateOfBirth !== undefined) {
      data.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null;
    }
    if (typeof password === "string" && password.length > 0) {
      if (password.length < 6) {
        return NextResponse.json(
          { error: "Password must be at least 6 characters" },
          { status: 400 }
        );
      }
      data.password = await bcrypt.hash(password, 10);
    }

    const patient = await prisma.patient.update({
      where: { id: patientId },
      data,
    });

    return NextResponse.json({
      id: patient.id,
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      address: patient.address,
      dateOfBirth: patient.dateOfBirth?.toISOString().slice(0, 10) ?? null,
      medicalNotes: patient.medicalNotes,
      updatedAt: patient.updatedAt,
    });
  } catch (error) {
    const prismaError = error as { code?: string; meta?: { target?: string[] } };
    if (prismaError.code === "P2002" && prismaError.meta?.target?.includes("email")) {
      return NextResponse.json(
        { error: "This email is already in use by another account." },
        { status: 409 }
      );
    }
    console.error("Update patient profile error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
