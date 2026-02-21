import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/90 backdrop-blur shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Classic Biomedical Laboratory"
            width={180}
            height={60}
          />
        </Link>
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
      </div>
    </header>
  );
}
