"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

const pathTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/requests": "Test requests",
  "/admin/users": "Users",
  "/admin/patients": "Patients",
  "/admin/blogs": "Blogs",
  "/admin/reports": "Reports",
  "/admin/inventory": "Inventory",
  "/admin/settings": "Settings",
};

function getPageTitle(pathname: string): string {
  if (pathTitles[pathname]) return pathTitles[pathname];
  if (pathname.startsWith("/admin/requests")) return "Test requests";
  if (pathname.startsWith("/admin/users")) return "Users";
  if (pathname.startsWith("/admin/patients")) return "Patients";
  if (pathname.startsWith("/admin/blogs")) return pathname === "/admin/blogs/new" ? "Create blog" : "Blogs";
  if (pathname.startsWith("/admin/reports")) return "Reports";
  if (pathname.startsWith("/admin/inventory")) return "Inventory";
  if (pathname.startsWith("/admin/settings")) return "Settings";
  return "Admin";
}

export default function AdminHeader() {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-brand-100 bg-white px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded-lg p-2 text-brand-500 hover:bg-brand-50 lg:hidden"
          aria-label="Open menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-brand-900">{getPageTitle(pathname ?? "")}</h1>
      </div>

      {/* Right: search, notifications, profile */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-lg p-2 text-brand-500 hover:bg-brand-50"
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button
          type="button"
          className="relative rounded-lg p-2 text-brand-500 hover:bg-brand-50"
          aria-label="Notifications"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-400" aria-hidden />
        </button>
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2 hover:bg-brand-50"
            aria-expanded={profileOpen}
            aria-haspopup="true"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-medium text-brand-600">
              A
            </span>
            <span className="hidden text-left text-sm font-medium text-brand-800 sm:block">Admin</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-brand-500 transition ${profileOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {profileOpen && (
            <>
              <div className="fixed inset-0 z-10" aria-hidden onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 top-full z-20 mt-1 w-48 rounded-lg border border-brand-100 bg-white py-1 shadow-lg">
                <a href="/admin/settings" className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50">Settings</a>
                <a href="/staff/login" className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50">Sign out</a>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
