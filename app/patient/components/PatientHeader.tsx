"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/patient" },
  { label: "My reports", href: "/patient/reports" },
  { label: "Request test", href: "/patient/request-test" },
  { label: "Profile", href: "/patient/profile" },
];

export default function PatientHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

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

        {/* Desktop/tablet nav */}
        <nav className="hidden min-w-0 items-center gap-1 overflow-x-auto md:flex">
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

        {/* Desktop/tablet actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/contact"
            className="rounded-lg px-3 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50 hover:text-brand-800"
          >
            Contact
          </Link>
          <Link
            href="/"
            className="hidden rounded-lg px-3 py-2 text-xs font-medium text-brand-500 hover:bg-brand-50 hover:text-brand-700 sm:inline-flex"
          >
            Back to site
          </Link>
        </div>

        {/* Mobile: hamburger */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="patient-mobile-menu"
            className="inline-flex items-center justify-center rounded-lg p-2 text-brand-600 hover:bg-brand-50 hover:text-brand-800"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
          <div
            id="patient-mobile-menu"
            role="menu"
            aria-label="Patient navigation"
            className="fixed right-4 top-16 z-50 w-[280px] overflow-hidden rounded-xl border border-brand-100 bg-white shadow-lg"
          >
            <div className="p-2">
              <nav className="flex flex-col gap-1">
                {navItems.map(({ label, href }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      role="menuitem"
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
            </div>

            <div className="border-t border-brand-100 p-2">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                role="menuitem"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50 hover:text-brand-800"
              >
                Contact
              </Link>
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                role="menuitem"
                className="mt-1 block rounded-lg px-3 py-2 text-sm font-medium text-brand-500 hover:bg-brand-50 hover:text-brand-700"
              >
                Back to site
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
