import Link from "next/link";
import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";


export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-50 text-brand-950">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-linear-to-br from-white via-brand-50 to-brand-100">
          <div className="hero-animate-blob pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-200/40 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
            <p className="hero-animate-pill inline-block rounded-full border border-brand-200 bg-brand-100 px-4 py-1.5 text-sm font-medium text-brand-600">
              Get in touch
            </p>
            <h1 className="hero-animate-title mt-4 text-4xl font-extrabold tracking-tight text-brand-950 md:text-5xl">
              Contact us
            </h1>
            <p className="hero-animate-desc mt-4 max-w-2xl text-lg leading-relaxed text-brand-600">
              Have a question, need a quote, or want to partner with us? Reach out by email, phone, or use the form below. We’ll get back to you as soon as we can.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Contact info */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-brand-950">Contact information</h2>
              <p className="mt-2 text-sm text-brand-600">
                Reach us directly or send a message through the form.
              </p>
              <ul className="mt-8 space-y-6 text-sm">
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 mt-0.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-400">Address</p>
                    <p className="mt-1 font-medium text-brand-700">22 University Road, Nsukka, Enugu State</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 mt-0.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-400">Email</p>
                    <a href="mailto:classic.biomed@gmail.com" className="mt-1 block font-medium text-brand-700 hover:text-brand-500">
                      classic.biomed@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 mt-0.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-400">Phone</p>
                    <a href="tel:08094493767" className="mt-1 block font-medium text-brand-700 hover:text-brand-500">
                      08094493767
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 mt-0.5 text-brand-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-400">WhatsApp</p>
                    <a href="https://wa.me/2348094493767" target="_blank" rel="noopener noreferrer" className="mt-1 block font-medium text-brand-700 hover:text-brand-500">
                      08094493767
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 mt-0.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-400">Hours</p>
                    <p className="mt-1 font-medium text-brand-700">Mon – Sat, 7:00 AM – 7:00 PM</p>
                  </div>
                </li>
              </ul>
              <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-6">
                <p className="text-sm font-semibold text-brand-800">
                  For urgent lab results or clinical inquiries
                </p>
                <p className="mt-2 text-sm text-brand-600">
                  Please call us during business hours or email with your reference number for faster follow-up.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-xl font-bold text-brand-950">Send a message</h2>
                <p className="mt-1 text-sm text-brand-600">
                  Fill out the form and we’ll respond within 1–2 business days.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-brand-100 bg-white px-6 py-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-brand-600">
              Prefer to explore our services first?{" "}
              <Link href="/services" className="font-semibold text-brand-500 underline hover:text-brand-600">
                View our services
              </Link>{" "}
              or{" "}
              <Link href="/" className="font-semibold text-brand-500 underline hover:text-brand-600">
                go back to home
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
