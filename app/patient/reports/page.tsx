import Link from "next/link";

export default function PatientReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-brand-900">My reports</h1>
        <p className="mt-1 text-brand-600">View and download your lab results.</p>
      </div>
      <div className="rounded-xl border border-brand-100 bg-white p-8 shadow-sm">
        <p className="text-center text-brand-500">No reports yet.</p>
        <p className="mt-2 text-center text-sm text-brand-400">
          Your completed lab reports will appear here when they are ready.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            href="/patient/request-test"
            className="rounded-lg bg-brand-400 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-500"
          >
            Request a test
          </Link>
        </div>
      </div>
    </div>
  );
}
