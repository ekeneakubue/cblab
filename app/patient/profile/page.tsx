"use client";

import { useState, useRef } from "react";

type PatientProfile = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  dateOfBirth: string | null;
  medicalNotes: string | null;
  createdAt: string;
};

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  dateOfBirth: "",
  medicalNotes: "",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function PatientProfilePage() {
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [loadEmail, setLoadEmail] = useState("");
  const [loadLoading, setLoadLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loadProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadError(null);
    if (!loadEmail.trim()) return;
    setLoadLoading(true);
    try {
      const res = await fetch(`/api/patient/profile?email=${encodeURIComponent(loadEmail.trim())}`);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setLoadError(data.error ?? "Failed to load profile.");
        setLoadLoading(false);
        return;
      }
      setProfile(data);
      setForm({
        name: data.name ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
        address: data.address ?? "",
        dateOfBirth: data.dateOfBirth ?? "",
        medicalNotes: data.medicalNotes ?? "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch {
      setLoadError("Something went wrong.");
    } finally {
      setLoadLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaveError(null);
    setSaveSuccess(false);
    if (form.newPassword.length > 0) {
      if (form.newPassword.length < 6) {
        setSaveError("New password must be at least 6 characters.");
        return;
      }
      if (form.newPassword !== form.confirmPassword) {
        setSaveError("New password and confirmation do not match.");
        return;
      }
    }
    setSaveLoading(true);
    try {
      const res = await fetch("/api/patient/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: profile.id,
          name: form.name,
          email: form.email || null,
          phone: form.phone || null,
          address: form.address || null,
          dateOfBirth: form.dateOfBirth || null,
          medicalNotes: form.medicalNotes || null,
          password: form.newPassword || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSaveError(data.error ?? "Failed to update profile.");
        setSaveLoading(false);
        return;
      }
      setProfile((prev) => prev ? { ...prev, ...data } : null);
      setForm((f) => ({ ...f, newPassword: "", confirmPassword: "", currentPassword: "" }));
      setSaveSuccess(true);
      if (passwordRef.current) passwordRef.current.value = "";
    } catch {
      setSaveError("Something went wrong.");
    } finally {
      setSaveLoading(false);
    }
  };

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  if (!profile) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-brand-900">Profile</h1>
          <p className="mt-1 text-brand-600">Load your profile to view and update your details.</p>
        </div>
        <div className="rounded-xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={loadProfile} className="mx-auto max-w-sm space-y-4">
            {loadError && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {loadError}
              </div>
            )}
            <div>
              <label htmlFor="load-email" className="mb-1.5 block text-sm font-medium text-brand-800">
                Email address
              </label>
              <input
                id="load-email"
                type="email"
                required
                value={loadEmail}
                onChange={(e) => setLoadEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
              />
              <p className="mt-1.5 text-xs text-brand-500">
                Enter the email you used when you requested access.
              </p>
            </div>
            <button
              type="submit"
              disabled={loadLoading}
              className="w-full rounded-lg bg-brand-400 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-500 disabled:opacity-60"
            >
              {loadLoading ? "Loading…" : "Load my profile"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-brand-900">Profile</h1>
        <p className="mt-1 text-brand-600">Update your details and medical information.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {saveError && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {saveError}
          </div>
        )}
        {saveSuccess && (
          <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
            Profile updated successfully.
          </div>
        )}

        {/* Personal information */}
        <div className="rounded-xl border border-brand-100 bg-white shadow-sm">
          <div className="border-b border-brand-100 px-5 py-4">
            <h2 className="font-semibold text-brand-900">Personal information</h2>
            <p className="mt-0.5 text-sm text-brand-500">Name, contact details and address.</p>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="profile-name" className="mb-1.5 block text-sm font-medium text-brand-800">
                Full name
              </label>
              <input
                id="profile-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
              />
            </div>
            <div>
              <label htmlFor="profile-email" className="mb-1.5 block text-sm font-medium text-brand-800">
                Email address
              </label>
              <input
                id="profile-email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
              />
            </div>
            <div>
              <label htmlFor="profile-phone" className="mb-1.5 block text-sm font-medium text-brand-800">
                Phone
              </label>
              <input
                id="profile-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="e.g. 08012345678"
                className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="profile-dob" className="mb-1.5 block text-sm font-medium text-brand-800">
                Date of birth
              </label>
              <input
                id="profile-dob"
                type="date"
                value={form.dateOfBirth}
                onChange={(e) => update("dateOfBirth", e.target.value)}
                className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="profile-address" className="mb-1.5 block text-sm font-medium text-brand-800">
                Address
              </label>
              <textarea
                id="profile-address"
                rows={2}
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="Street, city, state"
                className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
              />
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="rounded-xl border border-brand-100 bg-white shadow-sm">
          <div className="border-b border-brand-100 px-5 py-4">
            <h2 className="font-semibold text-brand-900">Password</h2>
            <p className="mt-0.5 text-sm text-brand-500">Leave blank to keep your current password.</p>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <div>
              <label htmlFor="profile-new-password" className="mb-1.5 block text-sm font-medium text-brand-800">
                New password
              </label>
              <input
                ref={passwordRef}
                id="profile-new-password"
                type="password"
                minLength={6}
                value={form.newPassword}
                onChange={(e) => update("newPassword", e.target.value)}
                placeholder="At least 6 characters"
                className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
              />
            </div>
            <div>
              <label htmlFor="profile-confirm-password" className="mb-1.5 block text-sm font-medium text-brand-800">
                Confirm new password
              </label>
              <input
                id="profile-confirm-password"
                type="password"
                minLength={6}
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                placeholder="Re-enter new password"
                className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
              />
            </div>
          </div>
        </div>

        {/* Medical records */}
        <div className="rounded-xl border border-brand-100 bg-white shadow-sm">
          <div className="border-b border-brand-100 px-5 py-4">
            <h2 className="font-semibold text-brand-900">Medical records</h2>
            <p className="mt-0.5 text-sm text-brand-500">
              Allergies, current medications, conditions or notes for the lab. This helps us provide safer care.
            </p>
          </div>
          <div className="p-5">
            <label htmlFor="profile-medical" className="mb-1.5 block text-sm font-medium text-brand-800">
              Medical notes
            </label>
            <textarea
              id="profile-medical"
              rows={5}
              value={form.medicalNotes}
              onChange={(e) => update("medicalNotes", e.target.value)}
              placeholder="e.g. Allergies: Penicillin. Current medications: Metformin 500mg. Conditions: Type 2 diabetes."
              className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saveLoading}
            className="rounded-lg bg-brand-400 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-500 disabled:opacity-60"
          >
            {saveLoading ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
