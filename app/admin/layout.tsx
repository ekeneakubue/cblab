import { redirect } from "next/navigation";
import { getStaffSession, canAccessAdmin } from "@/lib/auth";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getStaffSession();
  if (!canAccessAdmin(session)) {
    redirect("/staff/login");
  }

  return (
    <div className="min-h-screen bg-brand-50/50">
      <AdminSidebar />
      <div className="pl-64">
        <AdminHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
