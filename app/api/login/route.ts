import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { PATIENT_SESSION_COOKIE, PATIENT_SESSION_MAX_AGE } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.findFirst({
      where: { email: email.trim().toLowerCase() },
    });

    if (!patient) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (!patient.password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, patient.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const payload = JSON.stringify({
      patientId: patient.id,
      email: patient.email,
      exp: Math.floor(Date.now() / 1000) + PATIENT_SESSION_MAX_AGE,
    });
    const value = Buffer.from(payload, "utf-8").toString("base64url");

    const res = NextResponse.json({ success: true });
    res.cookies.set(PATIENT_SESSION_COOKIE, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: PATIENT_SESSION_MAX_AGE,
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Patient login error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
