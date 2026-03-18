"use client";

import { useState, useRef, useEffect } from "react";
import Modal from "../../components/Modal";

type Blog = {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string | null;
  imageUrl: string | null;
  publishedAt: string | null;
  createdAt: string;
};

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const CATEGORY_OPTIONS = ["Diagnostics", "Patient care", "Research", "Lab life", "Other"];

function titleToSlug(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const emptyForm = {
  slug: "",
  title: "",
  date: "",
  category: "",
  readTime: "",
  content: "",
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchBlogs = async () => {
    setBlogsLoading(true);
    try {
      const res = await fetch("/api/admin/blogs");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setBlogs(data);
    } catch {
      setBlogs([]);
    } finally {
      setBlogsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    let imageUrl: string | undefined;
    if (imageFile) {
      try {
        const fd = new FormData();
        fd.append("file", imageFile);
        fd.append("folder", "blogs");
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(data.error ?? "Failed to upload image.");
          setLoading(false);
          return;
        }
        imageUrl = data.url;
      } catch {
        setError("Failed to upload image.");
        setLoading(false);
        return;
      }
    }
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          slug: form.slug,
          category: form.category,
          readTime: form.readTime || undefined,
          imageUrl,
          content: form.content,
          date: form.date || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Failed to create blog.");
        setLoading(false);
        return;
      }
      setModalOpen(false);
      setForm(emptyForm);
      setSlugTouched(false);
      clearImage();
      await fetchBlogs();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;
    setModalOpen(false);
    setForm(emptyForm);
    setSlugTouched(false);
    clearImage();
    setError(null);
  };

  return (
    <div className="rounded-xl border border-brand-100 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-brand-900">Blogs</h2>
          <p className="mt-2 text-sm text-brand-500">Manage blog posts and content.</p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-400 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-500 active:scale-[0.98]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Create blog
        </button>
      </div>

      {/* Blog list */}
      <div className="mt-6 overflow-hidden rounded-xl border border-brand-100">
        {blogsLoading ? (
          <div className="flex items-center justify-center py-12 text-sm text-brand-500">
            Loading blogs…
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-12 text-center text-sm text-brand-500">
            No blogs yet. Create one to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="w-16 px-4 py-3 font-semibold text-brand-800"></th>
                  <th className="px-4 py-3 font-semibold text-brand-800">Title</th>
                  <th className="px-4 py-3 font-semibold text-brand-800">Category</th>
                  <th className="px-4 py-3 font-semibold text-brand-800">Slug</th>
                  <th className="px-4 py-3 font-semibold text-brand-800">Published</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="border-b border-brand-50 last:border-0 hover:bg-brand-50/30"
                  >
                    <td className="px-4 py-3">
                      <div className="flex h-12 w-16 items-center justify-center overflow-hidden rounded-lg bg-brand-100">
                        {blog.imageUrl ? (
                          <img
                            src={blog.imageUrl}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-brand-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-brand-900">{blog.title}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-700">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-brand-600">{blog.slug}</td>
                    <td className="px-4 py-3 text-brand-500">{formatDate(blog.publishedAt ?? blog.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={handleClose} title="Create new blog">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Image upload - first field */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-800">
              Image
            </label>
            <div className="flex items-start gap-4">
              <div className="flex h-28 w-40 shrink-0 overflow-hidden rounded-lg border-2 border-dashed border-brand-200 bg-brand-50/50">
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
                  id="blog-image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  disabled={loading}
                  onChange={handleImageChange}
                  className="block w-full text-sm text-brand-600 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-brand-700 hover:file:bg-brand-200"
                />
                <p className="text-xs text-brand-500">JPEG, PNG, WebP or GIF. Max 5MB. Card and post hero image.</p>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={clearImage}
                    disabled={loading}
                    className="text-xs font-medium text-red-600 hover:text-red-700"
                  >
                    Remove image
                  </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="blog-title" className="mb-1.5 block text-sm font-medium text-brand-800">
              Title
            </label>
            <input
              id="blog-title"
              type="text"
              required
              disabled={loading}
              value={form.title}
              onChange={(e) => {
                const title = e.target.value;
                setForm((f) => ({
                  ...f,
                  title,
                  slug: slugTouched ? f.slug : titleToSlug(title),
                }));
              }}
              placeholder="e.g. Understanding your lab results"
              className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 disabled:opacity-60"
            />
          </div>

          <div>
            <label htmlFor="blog-slug" className="mb-1.5 block text-sm font-medium text-brand-800">
              Slug
            </label>
            <input
              id="blog-slug"
              type="text"
              required
              disabled={loading}
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                setForm((f) => ({ ...f, slug: e.target.value }));
              }}
              placeholder="e.g. understanding-your-lab-results"
              className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 disabled:opacity-60"
            />
            <p className="mt-1 text-xs text-brand-500">URL-friendly identifier; use lowercase and hyphens.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="blog-date" className="mb-1.5 block text-sm font-medium text-brand-800">
                Date
              </label>
              <input
                id="blog-date"
                type="date"
                required
                disabled={loading}
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 disabled:opacity-60"
              />
            </div>
            <div>
              <label htmlFor="blog-category" className="mb-1.5 block text-sm font-medium text-brand-800">
                Category
              </label>
              <select
                id="blog-category"
                required
                disabled={loading}
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 disabled:opacity-60"
              >
                <option value="">Select category</option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="blog-readTime" className="mb-1.5 block text-sm font-medium text-brand-800">
              Read time
            </label>
            <input
              id="blog-readTime"
              type="text"
              disabled={loading}
              value={form.readTime}
              onChange={(e) => setForm((f) => ({ ...f, readTime: e.target.value }))}
              placeholder="e.g. 5 min read"
              className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 disabled:opacity-60"
            />
          </div>

          <div>
            <label htmlFor="blog-content" className="mb-1.5 block text-sm font-medium text-brand-800">
              Content
            </label>
            <textarea
              id="blog-content"
              rows={8}
              required
              disabled={loading}
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              placeholder="Full blog post content (body)…"
              className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 disabled:opacity-60"
            />
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
              {loading ? "Creating…" : "Create blog"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
