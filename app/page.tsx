import HeroSlider from "./components/HeroSlider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-50 text-brand-950">
      <Navbar />

      <main>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-linear-to-br from-white via-brand-50 to-brand-100">
          <div className="hero-animate-blob pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-200/50 blur-3xl" />
          <div className="hero-animate-blob pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-brand-300/30 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
            {/* left: copy */}
            <div className="space-y-7">
              <span className="hero-animate-pill inline-block rounded-full border border-brand-200 bg-brand-100 px-4 py-1.5 text-sm font-medium text-brand-500">
                Trusted Clinical Diagnostics
              </span>
              <h1 className="hero-animate-title text-3xl font-extrabold leading-tight tracking-tight text-brand-950 md:text-4xl">
                Precision laboratory testing for better patient outcomes
              </h1>
              <p className="hero-animate-desc max-w-xl text-lg leading-relaxed text-brand-700">
                Classic Biomedical Laboratory provides dependable,
                evidence-based diagnostic services with modern equipment and
                experienced professionals.
              </p>
              <div className="hero-animate-cta flex flex-wrap gap-4">
                <a
                  href="/contact"
                  className="rounded-lg bg-brand-400 px-7 py-3 text-sm font-semibold text-white shadow-md shadow-brand-200 transition hover:bg-brand-500"
                >
                  Book a Test
                </a>
                <a
                  href="/services"
                  className="rounded-lg border border-brand-300 bg-white px-7 py-3 text-sm font-semibold text-brand-500 transition hover:border-brand-400 hover:text-brand-700"
                >
                  Explore Services
                </a>
              </div>
            </div>

            {/* right: image slider */}
            <div className="h-[420px] w-full">
              <HeroSlider />
            </div>
          </div>
        </section>

        {/* ── Stats strip ────────────────────────────────────────── */}
        <section className="border-y border-brand-100 bg-white">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-brand-100 px-6 md:grid-cols-4">
            {[
              { label: "Daily Test Capacity", value: "1,200+" },
              { label: "Turnaround Time",     value: "24 hrs" },
              { label: "Qualified Experts",   value: "40+"    },
              { label: "Quality Compliance",  value: "ISO"    },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center py-8 text-center">
                <span className="text-3xl font-extrabold text-brand-400">{value}</span>
                <span className="mt-1 text-xs font-medium text-brand-500">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Services ───────────────────────────────────────────── */}
        <section id="services" className="bg-white px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-brand-950">
                Core Services
              </h2>
              <p className="mt-2 text-brand-500">
                Closing the gap between principle and practice
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2">
              {[
                {
                  name: "Molecular Diagnostics",
                  description: "DNA Paternity, Conventional & RT-PCR ",
                  icon: "🧬"
                },
                {
                  name: "Blood Chemistry",
                  description: "Hormonal Profile, Tumor Markers, etc",
                  icon: "🩸"
                },
                {
                  name: "Biostatistics",
                  description: "Applies statistical methods to biological and health research",
                  icon: "🧪"
                },
                {
                  name: "Bioinformatics & Molecular Biology Research Services",
                  description: "Genome sequencing, RNA-seq, ChIP-seq, etc",
                  icon: "🔬"
                },
              ].map(({ name, icon, description }) => (
                <article
                  key={name}
                  className="group rounded-2xl border border-brand-100 bg-brand-50 p-6 transition hover:border-brand-300 hover:bg-brand-100"
                >
                  <span className="text-3xl">{icon}</span>
                  <h3 className="mt-3 text-base font-semibold text-brand-800">
                    {name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-500">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Us ─────────────────────────────────────────────── */}
        <section id="why-us" className="bg-brand-50 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-brand-950">
                Why Choose Us
              </h2>
              <p className="mt-2 text-brand-500">
                Built on a foundation of scientific rigor and patient trust.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Advanced Technology",
                  body: "Automated analyzers and fully calibrated equipment deliver consistent, reproducible results.",
                },
                {
                  title: "Expert Team",
                  body: "Pathologists and biomedical scientists with deep clinical and research expertise.",
                },
                {
                  title: "Patient-Centered Care",
                  body: "Transparent reporting and fast communication with referring care providers.",
                },
              ].map(({ title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-brand-200 bg-white p-7 shadow-sm"
                >
                  <div className="mb-4 h-1 w-10 rounded-full bg-brand-400" />
                  <h3 className="text-lg font-semibold text-brand-800">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-500">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact CTA ────────────────────────────────────────── */}
        <section id="contact" className="bg-white px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-400 to-brand-600 p-10 shadow-xl shadow-brand-200">
              <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <h2 className="relative text-3xl font-bold tracking-tight text-white">
                Need dependable laboratory support?
              </h2>
              <p className="relative mt-3 max-w-2xl text-white/80">
                Partner with Classic Biomedical Laboratory for timely, accurate,
                and actionable diagnostic insights.
              </p>
              <div className="relative mt-8 flex flex-wrap gap-10 text-sm">
                {[
                  { key: "Email",  val: "classic.biomed@gmail.com"     },
                  { key: "Phone",  val: "08094493767, 08038814796"      },
                  { key: "Hours",  val: "Mon – Sat, 7:00 AM – 7:00 PM"  },
                ].map(({ key, val }) => (
                  <div key={key}>
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                      {key}
                    </p>
                    <p className="mt-1 font-medium text-white">{val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
