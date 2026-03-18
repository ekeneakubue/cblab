"use client";

import { useState, useEffect } from "react";
import Modal from "../../components/Modal";

type Patient = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  dateOfBirth: string | null;
  address: string | null;
  medicalNotes?: string | null;
  createdAt: string;
};

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  address: "",
  medicalNotes: "",
  password: "",
};

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function toInputDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toISOString().slice(0, 10);
}

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/patients");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setPatients(data);
    } catch {
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleClose = () => {
    if (submitLoading) return;
    setModalOpen(false);
    setEditingPatient(null);
    setForm(emptyForm);
    setError(null);
  };

  const openEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setForm({
      name: patient.name,
      email: patient.email ?? "",
      phone: patient.phone ?? "",
      dateOfBirth: toInputDate(patient.dateOfBirth),
      address: patient.address ?? "",
      medicalNotes: patient.medicalNotes ?? "",
      password: "",
    });
    setError(null);
    setModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPatient) return;
    setError(null);
    setSubmitLoading(true);
    try {
      const res = await fetch(`/api/admin/patients/${editingPatient.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim() || null,
          phone: form.phone.trim() || null,
          dateOfBirth: form.dateOfBirth.trim() || null,
          address: form.address.trim() || null,
          medicalNotes: form.medicalNotes.trim() || null,
          password: form.password.trim() || null,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Failed to update patient");
        setSubmitLoading(false);
        return;
      }
      setModalOpen(false);
      setEditingPatient(null);
      setForm(emptyForm);
      await fetchPatients();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (patient: Patient) => {
    if (!confirm(`Delete ${patient.name}? This cannot be undone.`)) return;
    setDeletingId(patient.id);
    try {
      const res = await fetch(`/api/admin/patients/${patient.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? "Failed to delete patient");
        return;
      }
      await fetchPatients();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="rounded-xl border border-brand-100 bg-white p-8 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-brand-900">Patients</h2>
        <p className="mt-2 text-sm text-brand-500">View and manage patient records.</p>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-brand-100">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-sm text-brand-500">
            Loading patients…
          </div>
        ) : patients.length === 0 ? (
          <div className="py-12 text-center text-sm text-brand-500">
            No patients yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="px-4 py-3 font-semibold text-brand-800">Name</th>
                  <th className="px-4 py-3 font-semibold text-brand-800">Email</th>
                  <th className="px-4 py-3 font-semibold text-brand-800">Phone</th>
                  <th className="px-4 py-3 font-semibold text-brand-800">Date of birth</th>
                  <th className="px-4 py-3 font-semibold text-brand-800">Registered</th>
                  <th className="w-20 px-4 py-3 font-semibold text-brand-800 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b border-brand-50 last:border-0 hover:bg-brand-50/30"
                  >
                    <td className="px-4 py-3 font-medium text-brand-900">{patient.name}</td>
                    <td className="px-4 py-3 text-brand-600">{patient.email ?? "—"}</td>
                    <td className="px-4 py-3 text-brand-600">{patient.phone ?? "—"}</td>
                    <td className="px-4 py-3 text-brand-500">{formatDate(patient.dateOfBirth)}</td>
                    <td className="px-4 py-3 text-brand-500">{formatDate(patient.createdAt)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openEdit(patient)}
                          className="rounded-lg p-2 text-brand-500 transition hover:bg-brand-100 hover:text-brand-700"
                          title="Edit patient"
                          aria-label="Edit patient"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(patient)}
                          disabled={deletingId === patient.id}
                          className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
                          title="Delete patient"
                          aria-label="Delete patient"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={handleClose} title="Edit patient">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="patient-name" className="mb-1.5 block text-sm font-medium text-brand-800">
              Full name
            </label>
            <input
              id="patient-name"
              type="text"
              required
              disabled={submitLoading}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Jane Doe"
              className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 disabled:opacity-60"
            />
          </div>
          <div>
            <label htmlFor="patient-email" className="mb-1.5 block text-sm font-medium text-brand-800">
              Email address
            </label>
            <input
              id="patient-email"
              type="email"
              disabled={submitLoading}
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="jane@example.com"
              className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 disabled:opacity-60"
            />
            <p className="mt-1 text-xs text-brand-500">Optional</p>
          </div>
          <div>
            <label htmlFor="patient-phone" className="mb-1.5 block text-sm font-medium text-brand-800">
              Phone
            </label>
            <input
              id="patient-phone"
              type="tel"
              disabled={submitLoading}
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder="+1 (000) 000-0000"
              className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 disabled:opacity-60"
            />
            <p className="mt-1 text-xs text-brand-500">Optional</p>
          </div>
          <div>
            <label htmlFor="patient-dob" className="mb-1.5 block text-sm font-medium text-brand-800">
              Date of birth
            </label>
            <input
              id="patient-dob"
              type="date"
              disabled={submitLoading}
              value={form.dateOfBirth}
              onChange={(e) => setForm((f) => ({ ...f, dateOfBirth: e.target.value }))}
              className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 disabled:opacity-60"
            />
            <p className="mt-1 text-xs text-brand-500">Optional</p>
          </div>
          <div>
            <label htmlFor="patient-address" className="mb-1.5 block text-sm font-medium text-brand-800">
              Address
            </label>
            <textarea
              id="patient-address"
              rows={2}
              disabled={submitLoading}
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              placeholder="Street, city, postal code"
              className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 disabled:opacity-60"
            />
            <p className="mt-1 text-xs text-brand-500">Optional</p>
          </div>
          <div>
            <label htmlFor="patient-notes" className="mb-1.5 block text-sm font-medium text-brand-800">
              Medical notes
            </label>
            <textarea
              id="patient-notes"
              rows={3}
              disabled={submitLoading}
              value={form.medicalNotes}
              onChange={(e) => setForm((f) => ({ ...f, medicalNotes: e.target.value }))}
              placeholder="Internal notes (not visible to patient)"
              className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 disabled:opacity-60"
            />
            <p className="mt-1 text-xs text-brand-500">Optional, internal use only</p>
          </div>
          <div>
            <label htmlFor="patient-password" className="mb-1.5 block text-sm font-medium text-brand-800">
              New password
            </label>
            <input
              id="patient-password"
              type="password"
              autoComplete="new-password"
              disabled={submitLoading}
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              placeholder="Leave blank to keep current password"
              className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 disabled:opacity-60"
            />
            <p className="mt-1 text-xs text-brand-500">Leave blank to keep current. Min 6 characters if set.</p>
          </div>
          <div className="flex justify-end gap-3 border-t border-brand-100 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={submitLoading}
              className="rounded-lg border border-brand-200 px-4 py-2.5 text-sm font-medium text-brand-700 transition hover:bg-brand-50 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitLoading}
              className="rounded-lg bg-brand-400 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-500 disabled:opacity-60"
            >
              {submitLoading ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
