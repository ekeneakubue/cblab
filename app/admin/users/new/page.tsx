import Link from "next/link";

export default function AdminNewUserPage() {
  return (
    <div className="rounded-xl border border-brand-100 bg-white p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-brand-900">Add new user</h2>
      <p className="mt-2 text-sm text-brand-500">Create a new admin or staff account. (Placeholder — form to be added)</p>
      <Link
        href="/admin/users"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-400 hover:text-brand-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to users
      </Link>
    </div>
  );
}
