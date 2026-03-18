"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/patient" },
  { label: "My reports", href: "/patient/reports" },
  { label: "Request test", href: "/patient/request-test" },
  { label: "Profile", href: "/patient/profile" },
];

export default function PatientHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-brand-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/patient" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Classic Biomedical Laboratory"
            width={140}
            height={47}
            className="h-8 w-auto"
          />
          <span className="hidden text-sm font-medium text-brand-600 sm:inline">Patient portal</span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-brand-100 text-brand-700"
                    : "text-brand-600 hover:bg-brand-50 hover:text-brand-800"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="rounded-lg px-3 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50 hover:text-brand-800"
          >
            Contact
          </Link>
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-xs font-medium text-brand-500 hover:bg-brand-50 hover:text-brand-700"
          >
            Back to site
          </Link>
        </div>
      </div>
    </header>
  );
}
