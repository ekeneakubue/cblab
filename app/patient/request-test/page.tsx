import Link from "next/link";

export default function PatientRequestTestPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-brand-900">Request a test</h1>
        <p className="mt-1 text-brand-600">Book a lab test or panel. We’ll guide you through the process.</p>
      </div>
      <div className="rounded-xl border border-brand-100 bg-white p-8 shadow-sm">
        <p className="text-center text-brand-500">Test request form coming soon.</p>
        <p className="mt-2 text-center text-sm text-brand-400">
          You can contact the lab to request a test in the meantime.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/contact"
            className="rounded-lg bg-brand-400 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-500"
          >
            Contact the lab
          </Link>
          <Link
            href="/patient"
            className="rounded-lg border border-brand-200 px-4 py-2.5 text-sm font-medium text-brand-700 transition hover:bg-brand-50"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
