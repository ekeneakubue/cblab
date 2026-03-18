import Link from "next/link";

const stats = [
  {
    label: "Pending requests",
    value: "24",
    change: "+3 today",
    href: "/admin/requests",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    color: "brand",
  },
  {
    label: "Completed today",
    value: "18",
    change: "On track",
    href: "/admin/reports",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "success",
  },
  {
    label: "Active patients",
    value: "1,247",
    change: "+12 this week",
    href: "/admin/patients",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "brand",
  },
  {
    label: "Low stock items",
    value: "5",
    change: "Needs reorder",
    href: "/admin/inventory",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    color: "warning",
  },
];

const recentActivity = [
  { id: 1, type: "request", title: "New test request #2847", meta: "Full blood count – Dr. Okeke", time: "12 min ago" },
  { id: 2, type: "report", title: "Report ready #2841", meta: "Malaria parasite – Sent to patient", time: "28 min ago" },
  { id: 3, type: "request", title: "New test request #2846", meta: "Lipid profile – Central Hospital", time: "1 hr ago" },
  { id: 4, type: "inventory", title: "Low stock alert", meta: "EDTA tubes (2mL) – 8 remaining", time: "2 hrs ago" },
  { id: 5, type: "report", title: "Report ready #2839", meta: "Urinalysis – Collected by client", time: "3 hrs ago" },
];

const quickActions = [
  { label: "New test request", href: "/admin/requests/new", icon: "plus" },
  { label: "Add patient", href: "/admin/patients/new", icon: "user" },
  { label: "View reports", href: "/admin/reports", icon: "document" },
  { label: "Inventory check", href: "/admin/inventory", icon: "box" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-xl font-semibold text-brand-900">Welcome back</h2>
        <p className="mt-1 text-sm text-brand-600">
          Here’s what’s happening at the lab today.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-xl border border-brand-100 bg-white p-5 shadow-sm transition hover:border-brand-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-brand-500">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-brand-900">{stat.value}</p>
                <p className={`mt-1 text-xs ${stat.color === "warning" ? "text-amber-600" : stat.color === "success" ? "text-emerald-600" : "text-brand-500"}`}>
                  {stat.change}
                </p>
              </div>
              <span className="rounded-lg bg-brand-100 p-2.5 text-brand-500 transition group-hover:bg-brand-200 group-hover:text-brand-600">
                {stat.icon}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent activity */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-brand-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-brand-100 px-5 py-4">
              <h3 className="font-semibold text-brand-900">Recent activity</h3>
              <Link href="/admin/requests" className="text-sm font-medium text-brand-400 hover:text-brand-600">
                View all
              </Link>
            </div>
            <ul className="divide-y divide-brand-50">
              {recentActivity.map((item) => (
                <li key={item.id} className="px-5 py-3 transition hover:bg-brand-50/50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-brand-900">{item.title}</p>
                      <p className="text-sm text-brand-500">{item.meta}</p>
                    </div>
                    <span className="shrink-0 text-xs text-brand-400">{item.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <div className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-brand-900">Quick actions</h3>
            <p className="mt-1 text-sm text-brand-500">Shortcuts for common tasks</p>
            <ul className="mt-4 space-y-2">
              {quickActions.map((action) => (
                <li key={action.label}>
                  <Link
                    href={action.href}
                    className="flex items-center gap-3 rounded-lg border border-brand-100 px-3 py-2.5 text-sm font-medium text-brand-700 transition hover:border-brand-200 hover:bg-brand-50"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-500">
                      {action.icon === "plus" && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                      {action.icon === "user" && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                      )}
                      {action.icon === "document" && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      {action.icon === "box" && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      )}
                    </span>
                    {action.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
