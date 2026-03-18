import Link from "next/link";

const stats = [
  {
    label: "Reports available",
    value: "0",
    description: "Ready to view or download",
    href: "/patient/reports",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: "Pending tests",
    value: "0",
    description: "Awaiting results",
    href: "/patient/reports",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const quickActions = [
  {
    label: "View my reports",
    description: "See and download your lab results",
    href: "/patient/reports",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: "Request a test",
    description: "Book a new lab test or panel",
    href: "/patient/request-test",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Contact the lab",
    description: "Questions or support",
    href: "/contact",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function PatientDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
          Your dashboard
        </h1>
        <p className="mt-2 text-brand-600">
          Access your lab reports, request tests, and stay up to date with Classic Biomedical Laboratory.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group flex items-start gap-4 rounded-xl border border-brand-100 bg-white p-5 shadow-sm transition hover:border-brand-200 hover:shadow-md"
          >
            <span className="rounded-xl bg-brand-100 p-3 text-brand-500 transition group-hover:bg-brand-200 group-hover:text-brand-600">
              {stat.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-brand-500">{stat.label}</p>
              <p className="mt-0.5 text-2xl font-bold text-brand-900">{stat.value}</p>
              <p className="mt-1 text-xs text-brand-500">{stat.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="rounded-xl border border-brand-100 bg-white shadow-sm">
        <div className="border-b border-brand-100 px-5 py-4">
          <h2 className="font-semibold text-brand-900">Quick actions</h2>
          <p className="mt-0.5 text-sm text-brand-500">Common tasks and links</p>
        </div>
        <div className="grid gap-0 sm:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-start gap-4 border-b border-brand-50 px-5 py-4 transition last:border-b-0 hover:bg-brand-50/50 sm:border-b-0 sm:border-r sm:last:border-r-0"
            >
              <span className="rounded-lg bg-brand-100 p-2.5 text-brand-500">
                {action.icon}
              </span>
              <div>
                <p className="font-medium text-brand-900">{action.label}</p>
                <p className="mt-0.5 text-sm text-brand-500">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity placeholder */}
      <div className="rounded-xl border border-brand-100 bg-white shadow-sm">
        <div className="border-b border-brand-100 px-5 py-4">
          <h2 className="font-semibold text-brand-900">Recent activity</h2>
          <p className="mt-0.5 text-sm text-brand-500">Your latest reports and requests</p>
        </div>
        <div className="px-5 py-10 text-center">
          <p className="text-sm text-brand-500">No recent activity yet.</p>
          <p className="mt-1 text-sm text-brand-400">
            When you request a test or receive a report, it will appear here.
          </p>
          <Link
            href="/patient/request-test"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-400 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-500"
          >
            Request a test
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
