import { cookies } from "next/headers";

const STAFF_SESSION_COOKIE = "staff_session";
const PATIENT_SESSION_COOKIE = "patient_session";

export type StaffSession = {
  userId: string;
  email: string;
  role: string;
  exp: number;
};

/**
 * Reads and validates the staff session cookie.
 * Returns the session payload or null if missing/invalid/expired.
 */
export async function getStaffSession(): Promise<StaffSession | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(STAFF_SESSION_COOKIE)?.value;
  if (!value) return null;

  try {
    const json = Buffer.from(value, "base64url").toString("utf-8");
    const payload = JSON.parse(json) as StaffSession;
    if (!payload.userId || !payload.role || typeof payload.exp !== "number") {
      return null;
    }
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // expired
    }
    return payload;
  } catch {
    return null;
  }
}

/** Role required to access the admin dashboard */
export const ADMIN_DASHBOARD_ROLE = "super-admin";

export function canAccessAdmin(session: StaffSession | null): boolean {
  return session?.role === ADMIN_DASHBOARD_ROLE;
}

/**
 * Use in admin API routes. Returns the session if the user is super-admin, otherwise null.
 * Return 403 when null: return NextResponse.json({ error: "Forbidden" }, { status: 403 })
 */
export async function requireSuperAdmin(): Promise<StaffSession | null> {
  const session = await getStaffSession();
  return canAccessAdmin(session) ? session : null;
}

// --- Patient session (for /login) ---

export type PatientSession = {
  patientId: string;
  email: string;
  exp: number;
};

export async function getPatientSession(): Promise<PatientSession | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(PATIENT_SESSION_COOKIE)?.value;
  if (!value) return null;

  try {
    const json = Buffer.from(value, "base64url").toString("utf-8");
    const payload = JSON.parse(json) as PatientSession;
    if (!payload.patientId || !payload.email || typeof payload.exp !== "number") {
      return null;
    }
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export const PATIENT_SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
export { PATIENT_SESSION_COOKIE };
