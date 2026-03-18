"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StaffLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/staff/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error ?? "Invalid email or password. Please try again.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-brand-950">
      {/* subtle grid background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-12">
        {/* Staff badge */}
        <div className="mb-6 flex items-center gap-2 rounded-full border border-brand-600/50 bg-brand-900/80 px-4 py-1.5 text-xs font-medium tracking-wide text-brand-200 backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Authorized personnel only
        </div>

        {/* Card */}
        <div className="w-full max-w-[400px] rounded-2xl border border-brand-700/50 bg-white shadow-xl shadow-black/20">
          <div className="border-b border-brand-100 px-8 pt-8 pb-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Classic Biomedical Laboratory"
                width={160}
                height={54}
              />
            </Link>
            <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-brand-950">
              Staff portal
            </h1>
            <p className="mt-1.5 text-sm text-brand-500">
              Sign in with your work email to access lab operations
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 p-8">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="staff-email" className="mb-1.5 block text-sm font-medium text-brand-800">
                Work email
              </label>
              <input
                id="staff-email"
                type="email"
                autoComplete="email"
                required
                disabled={loading}
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="name@cblab.com"
                className="w-full rounded-lg border border-brand-200 bg-white px-4 py-3 text-sm text-brand-950 placeholder-brand-400 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 disabled:bg-brand-50 disabled:opacity-70"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="staff-password" className="text-sm font-medium text-brand-800">
                  Password
                </label>
                <Link
                  href="/staff/forgot-password"
                  className="text-xs font-medium text-brand-400 hover:text-brand-600"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="staff-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  disabled={loading}
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-brand-200 bg-white px-4 py-3 pr-11 text-sm text-brand-950 placeholder-brand-400 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 disabled:bg-brand-50 disabled:opacity-70"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-400 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7c1.07 0 2.1.18 3.07.51M6.1 6.1l11.8 11.8M9.88 9.88A3 3 0 0114.12 14.12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-brand-300 accent-brand-500"
              />
              <span className="text-sm text-brand-600">Remember this device</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="w-full rounded-lg bg-brand-600 py-3 text-sm font-semibold text-white shadow-md shadow-brand-900/30 transition hover:bg-brand-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-brand-600 disabled:active:scale-100"
            >
              <span className="inline-flex items-center justify-center gap-2">
                {loading && (
                  <svg
                    className="h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                )}
                {loading ? "Signing in..." : "Sign in"}
              </span>
            </button>
          </form>
        </div>

        {/* Footer links */}
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <Link
            href="/login"
            className="text-sm text-brand-400 hover:text-brand-300"
          >
            Patient login →
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-brand-500 hover:text-brand-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
