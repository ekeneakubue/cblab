import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const services = [
  {
    name: "Molecular Diagnostics",
    tagline: "Precision at the genetic level",
    description: "Our molecular diagnostics suite supports clinical and research needs with validated methods and strict quality controls. We offer DNA paternity testing, conventional PCR, and real-time RT-PCR for infectious disease, oncology, and genetic markers.",
    icon: "🧬",
    highlights: ["DNA Paternity", "Conventional PCR", "RT-PCR", "Infectious disease panels"],
  },
  {
    name: "Blood Chemistry",
    tagline: "Comprehensive biochemical profiling",
    description: "Blood chemistry and immunoassay services cover hormonal profiles, tumor markers, metabolic panels, and routine chemistry. Results support diagnosis, monitoring, and screening with fast turnaround and clear reporting.",
    icon: "🩸",
    highlights: ["Hormonal profile", "Tumor markers", "Metabolic panels", "Routine chemistry"],
  },
  {
    name: "Biostatistics",
    tagline: "Rigorous analysis for research and trials",
    description: "Our biostatistics team applies statistical methods to biological and health research. We support study design, data analysis, and interpretation for clinical trials, epidemiology, and laboratory research.",
    icon: "🧪",
    highlights: ["Study design", "Clinical trials", "Epidemiology", "Data analysis"],
  },
  {
    name: "Bioinformatics & Molecular Biology Research",
    tagline: "From sequence to insight",
    description: "We provide bioinformatics and molecular biology research services including genome sequencing, RNA-seq, ChIP-seq, and custom pipeline development. Ideal for academic and industry research partnerships.",
    icon: "🔬",
    highlights: ["Genome sequencing", "RNA-seq", "ChIP-seq", "Custom pipelines"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-brand-50 text-brand-950">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-linear-to-br from-white via-brand-50 to-brand-100">
          <div className="hero-animate-blob pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-200/40 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
            <p className="hero-animate-pill inline-block rounded-full border border-brand-200 bg-brand-100 px-4 py-1.5 text-sm font-medium text-brand-600">
              Laboratory Services
            </p>
            <h1 className="hero-animate-title mt-4 text-4xl font-extrabold tracking-tight text-brand-950 md:text-5xl">
              Medical Diagnostic, Imaging & Research Center
            </h1>
            <p className="hero-animate-desc mt-4 max-w-2xl text-lg leading-relaxed text-brand-600">
              Classic Biomedical Laboratory delivers accurate, timely diagnostics and research support from routine chemistry to advanced molecular and bioinformatics services.
            </p>
          </div>
        </section>

        {/* Services grid */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <article
                key={service.name}
                className="group flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm transition-all duration-300 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100/50"
              >
                {/* Icon + number strip */}
                <div className="relative flex items-center gap-4 border-b border-brand-100 bg-linear-to-r from-brand-50 to-white px-6 py-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-2xl transition-colors group-hover:bg-brand-200">
                    {service.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400">
                      Service {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="truncate text-lg font-bold text-brand-950 sm:text-xl">
                      {service.name}
                    </h2>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm font-medium text-brand-500">
                    {service.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-brand-700">
                    {service.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {service.highlights.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-600 ring-1 ring-brand-100 transition-colors group-hover:ring-brand-200"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-brand-100 bg-white px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-brand-950 md:text-3xl">
              Need a quote or want to partner with us?
            </h2>
            <p className="mt-3 text-brand-600">
              Reach out for service details, pricing, or to discuss your project.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-lg bg-brand-400 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-200 transition hover:bg-brand-500"
              >
                Contact us
              </Link>
              <Link
                href="/"
                className="rounded-lg border border-brand-200 bg-white px-6 py-3 text-sm font-semibold text-brand-600 transition hover:border-brand-400 hover:bg-brand-50"
              >
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
