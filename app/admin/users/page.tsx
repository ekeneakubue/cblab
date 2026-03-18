"use client";

import { useState, useEffect, useRef } from "react";
import Modal from "../../components/Modal";

const emptyForm = {
  name: "",
  email: "",
  role: "staff" as const,
  password: "",
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  imageUrl?: string | null;
  createdAt: string;
};

function formatRole(role: string) {
  return role
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (JPEG, PNG, WebP or GIF).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }
    setError(null);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setUsers(data);
    } catch {
      setUsers([]);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      let imageUrl: string | undefined;
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json().catch(() => ({}));
        if (!uploadRes.ok) {
          setError(uploadData.error ?? "Failed to upload image");
          setLoading(false);
          return;
        }
        imageUrl = uploadData.url;
      }
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          role: form.role,
          password: form.password,
          imageUrl,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Failed to create user");
        setLoading(false);
        return;
      }
      setModalOpen(false);
      setForm(emptyForm);
      clearImage();
      await fetchUsers();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;
    setModalOpen(false);
    setEditingUser(null);
    setForm(emptyForm);
    clearImage();
    setError(null);
  };

  const openEdit = (user: User) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role as typeof form.role,
      password: "",
    });
    setImageFile(null);
    setImagePreview(user.imageUrl ?? null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setError(null);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setError(null);
    setLoading(true);
    try {
      let imageUrl: string | null | undefined = editingUser
        ? imagePreview ?? null
        : undefined;
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json().catch(() => ({}));
        if (!uploadRes.ok) {
          setError(uploadData.error ?? "Failed to upload image");
          setLoading(false);
          return;
        }
        imageUrl = uploadData.url;
      }
      const payload: { name: string; email: string; role: string; imageUrl?: string | null; password?: string } = {
        name: form.name,
        email: form.email,
        role: form.role,
        imageUrl,
      };
      if (form.password.length > 0) payload.password = form.password;
      const res = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Failed to update user");
        setLoading(false);
        return;
      }
      setModalOpen(false);
      setEditingUser(null);
      setForm(emptyForm);
      clearImage();
      await fetchUsers();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (user: User) => {
    if (!confirm(`Delete ${user.name}? This cannot be undone.`)) return;
    setDeletingId(user.id);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? "Failed to delete user");
        return;
      }
      await fetchUsers();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="rounded-xl border border-brand-100 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-brand-900">Users</h2>
          <p className="mt-2 text-sm text-brand-500">Manage admin and staff user accounts.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingUser(null);
            setForm(emptyForm);
            clearImage();
            setError(null);
            setModalOpen(true);
          }}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-400 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-500 active:scale-[0.98]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add new user
        </button>
      </div>

      {/* User list */}
      <div className="mt-6 overflow-hidden rounded-xl border border-brand-100">
        {usersLoading ? (
          <div className="flex items-center justify-center py-12 text-sm text-brand-500">
            Loading users…
          </div>
        ) : users.length === 0 ? (
          <div className="py-12 text-center text-sm text-brand-500">
            No users yet. Add one to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="w-12 px-4 py-3 font-semibold text-brand-800"></th>
                  <th className="px-4 py-3 font-semibold text-brand-800">Name</th>
                  <th className="px-4 py-3 font-semibold text-brand-800">Email</th>
                  <th className="px-4 py-3 font-semibold text-brand-800">Role</th>
                  <th className="px-4 py-3 font-semibold text-brand-800">Joined</th>
                  <th className="w-20 px-4 py-3 font-semibold text-brand-800 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-brand-50 last:border-0 hover:bg-brand-50/30">
                    <td className="px-4 py-3">
                      <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-brand-100">
                        {user.imageUrl ? (
                          <img src={user.imageUrl} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-sm font-medium text-brand-500">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-brand-900">{user.name}</td>
                    <td className="px-4 py-3 text-brand-600">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-700">
                        {formatRole(user.role)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-brand-500">{formatDate(user.createdAt)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            openEdit(user);
                            setModalOpen(true);
                          }}
                          className="rounded-lg p-2 text-brand-500 transition hover:bg-brand-100 hover:text-brand-700"
                          title="Edit user"
                          aria-label="Edit user"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(user)}
                          disabled={deletingId === user.id}
                          className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
                          title="Delete user"
                          aria-label="Delete user"
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

      <Modal open={modalOpen} onClose={handleClose} title={editingUser ? "Edit user" : "Add new user"}>
        <form onSubmit={editingUser ? handleEditSubmit : handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          {/* Image upload */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-800">
              Photo
            </label>
            <div className="flex items-start gap-4">
              <div className="flex h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-dashed border-brand-200 bg-brand-50/50">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-brand-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <input
                  ref={fileInputRef}
                  id="user-image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  disabled={loading}
                  onChange={handleImageChange}
                  className="block w-full text-sm text-brand-600 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-brand-700 hover:file:bg-brand-200"
                />
                <p className="text-xs text-brand-500">JPEG, PNG, WebP or GIF. Max 5MB.</p>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={clearImage}
                    disabled={loading}
                    className="text-xs font-medium text-red-600 hover:text-red-700"
                  >
                    Remove photo
                  </button>
                )}
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="user-name" className="mb-1.5 block text-sm font-medium text-brand-800">
              Full name
            </label>
            <input
              id="user-name"
              type="text"
              required
              disabled={loading}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Jane Okeke"
              className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 disabled:opacity-60"
            />
          </div>
          <div>
            <label htmlFor="user-email" className="mb-1.5 block text-sm font-medium text-brand-800">
              Email address
            </label>
            <input
              id="user-email"
              type="email"
              required
              disabled={loading}
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="jane@example.com"
              className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 disabled:opacity-60"
            />
          </div>
          <div>
            <label htmlFor="user-role" className="mb-1.5 block text-sm font-medium text-brand-800">
              Role
            </label>
            <select
              id="user-role"
              disabled={loading}
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as typeof form.role }))}
              className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 disabled:opacity-60"
            >
              <option value="staff">Staff</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
              <option value="super-admin">Super admin</option>
            </select>
          </div>
          <div>
            <label htmlFor="user-password" className="mb-1.5 block text-sm font-medium text-brand-800">
              {editingUser ? "New password (leave blank to keep current)" : "Password"}
            </label>
            <input
              id="user-password"
              type="password"
              required={!editingUser}
              minLength={8}
              disabled={loading}
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              placeholder={editingUser ? "••••••••" : "••••••••"}
              className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 disabled:opacity-60"
            />
            <p className="mt-1 text-xs text-brand-500">{editingUser ? "Leave blank to keep current password" : "Minimum 8 characters"}</p>
          </div>
          <div className="flex justify-end gap-3 border-t border-brand-100 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-lg border border-brand-200 px-4 py-2.5 text-sm font-medium text-brand-700 transition hover:bg-brand-50 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-brand-400 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-500 disabled:opacity-60"
            >
              {loading ? "Saving…" : editingUser ? "Save changes" : "Add user"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
