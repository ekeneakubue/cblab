import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      {/* Animated hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="about-hero-bg absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="about-hero-float absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-brand-300/20 blur-2xl" style={{ animationDelay: "1s" }} />
          <div className="about-hero-float absolute left-1/3 top-1/4 h-32 w-32 rounded-full bg-white/10 blur-2xl" style={{ animationDelay: "2s" }} />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="hero-animate-pill inline-block rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            Who we are
          </p>
          <h1 className="hero-animate-title mt-5 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            About us
          </h1>
          <p className="hero-animate-desc mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
            Classic Biomedical Laboratory delivers accurate and timely diagnostic services for clinics, hospitals, and patients.
          </p>
          <div className="hero-animate-cta mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 shadow-lg transition hover:bg-white/95"
            >
              Our services
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <h2 className="sr-only">More about us</h2>
        <div className="mt-10 space-y-6 text-brand-700">
          <p>
            We close the gap between principle and practice through precision laboratory testing, 
            rigorous quality controls, and a commitment to better patient outcomes.
          </p>
          <p>
            Our team combines expertise in molecular diagnostics, blood chemistry, and research 
            support with a focus on reliability and clear, actionable results.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          <section className="rounded-xl border border-brand-100 bg-brand-50/50 p-6">
            <h2 className="text-lg font-semibold text-brand-800">Our mission</h2>
            <p className="mt-3 text-brand-700">
              To provide quality, timely and affordable medical diagnostic services, 
              enabled by research, education and state-of-the-art facilities.
            </p>
          </section>
          <section className="rounded-xl border border-brand-100 bg-brand-50/50 p-6">
            <h2 className="text-lg font-semibold text-brand-800">Our vision</h2>
            <p className="mt-3 text-brand-700">
              To be a leading reference laboratory where healthcare providers and patients 
              rely on us for reliable results, innovation in diagnostics, and a commitment 
              to better health outcomes in our communities and beyond.
            </p>
          </section>
        </div>

        <div className="mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-400 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-500"
          >
            Our services
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
