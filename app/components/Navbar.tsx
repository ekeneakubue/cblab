"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/90 backdrop-blur shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" onClick={() => setMobileOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="Classic Biomedical Laboratory"
            width={180}
            height={60}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-brand-500 transition hover:text-brand-800"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/login"
            className="rounded-lg bg-brand-400 px-5 py-2 font-semibold text-white shadow-sm shadow-brand-200 transition hover:bg-brand-500"
          >
            Login
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-600 hover:bg-brand-100 md:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden border-t border-brand-100 bg-white transition-[max-height] duration-300 ease-out md:hidden ${mobileOpen ? "max-h-80" : "max-h-0"}`}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col items-center gap-1 px-6 py-4 text-center">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-brand-600 hover:bg-brand-50 hover:text-brand-800"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="mt-2 inline-block rounded-lg bg-brand-400 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-500"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
