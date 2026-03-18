import { redirect } from "next/navigation";
import { getStaffSession, canAccessAdminUI } from "@/lib/auth";
import AdminShell from "./AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getStaffSession();
  if (!canAccessAdminUI(session)) {
    redirect("/staff/login");
  }

  return (
    <AdminShell>{children}</AdminShell>
  );
}
