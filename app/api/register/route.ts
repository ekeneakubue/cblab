import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone } = body;

    if (!fullName || typeof fullName !== "string" || fullName.trim().length === 0) {
      return NextResponse.json(
        { error: "Full name is required" },
        { status: 400 }
      );
    }
    if (!email || typeof email !== "string" || email.trim().length === 0) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const name = fullName.trim();
    const emailNormalized = email.trim().toLowerCase();
    const phoneValue =
      typeof phone === "string" && phone.trim().length > 0 ? phone.trim() : null;

    const existing = await prisma.patient.findFirst({
      where: { email: emailNormalized },
    });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const patient = await prisma.patient.create({
      data: {
        name,
        email: emailNormalized,
        phone: phoneValue,
      },
    });

    return NextResponse.json({
      id: patient.id,
      name: patient.name,
      email: patient.email,
      message: "Access request submitted successfully.",
    });
  } catch (error) {
    console.error("Register (create patient) error:", error);
    return NextResponse.json(
      { error: "Failed to submit request. Please try again." },
      { status: 500 }
    );
  }
}
