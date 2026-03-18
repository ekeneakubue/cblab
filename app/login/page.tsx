"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
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
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error ?? "Invalid email or password. Please try again.");
        return;
      }
      router.push("/patient");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-50">

      {/* ── Left panel: branding ───────────────────────────────── */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-brand-400 to-brand-600 p-12 lg:flex lg:w-1/2">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-brand-300/30 blur-3xl" />

        {/* logo */}
        <Link href="/" className="relative z-10">
          <Image
            src="/images/logo.png"
            alt="Classic Biomedical Laboratory"
            width={180}
            height={60}
            className="brightness-0 invert"
          />
        </Link>

        {/* centre tagline */}
        <div className="relative z-10 space-y-4">
          <h2 className="text-4xl font-extrabold leading-tight text-white">
            Precision diagnostics,<br />trusted results.
          </h2>
          <p className="max-w-sm text-base leading-relaxed text-white/80">
            Sign in to access your lab reports, manage bookings, and stay
            connected with your care team.
          </p>
        </div>

        {/* bottom feature pills */}
        <div className="relative z-10 flex flex-wrap gap-3">
          {["Secure Access", "Fast Reports", "24-hr Turnaround", "ISO Certified"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Right panel: form ──────────────────────────────────── */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">

        {/* mobile logo */}
        <Link href="/" className="mb-8 lg:hidden">
          <Image
            src="/images/logo.png"
            alt="Classic Biomedical Laboratory"
            width={160}
            height={54}
          />
        </Link>

        <div className="w-full max-w-md">
          {/* heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-brand-950">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-brand-500">
              Sign in to your Classic Biomedical account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-brand-800"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                disabled={loading}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-brand-200 bg-white px-4 py-3 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-brand-800"
                >
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-xs font-medium text-brand-400 hover:text-brand-600"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  disabled={loading}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-brand-200 bg-white px-4 py-3 pr-11 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
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

            {/* Remember me */}
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-brand-300 accent-brand-400"
              />
              <span className="text-sm text-brand-600">Remember me for 30 days</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="w-full rounded-lg bg-brand-400 py-3 text-sm font-semibold text-white shadow-md shadow-brand-200 transition hover:bg-brand-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-brand-400 disabled:active:scale-100"
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
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                )}
                {loading ? "Signing in..." : "Sign in"}
              </span>
            </button>
          </form>

          {/* divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-brand-100" />
            <span className="text-xs text-brand-400">or</span>
            <div className="h-px flex-1 bg-brand-100" />
          </div>

          {/* register link */}
          <p className="text-center text-sm text-brand-500">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-brand-400 hover:text-brand-600"
            >
              Request access
            </a>
          </p>

          {/* back to home */}
          <p className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
