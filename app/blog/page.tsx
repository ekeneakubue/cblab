import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function excerptFromContent(content: string, maxLength = 160): string {
  const plain = content.replace(/\s+/g, " ").trim();
  if (plain.length <= maxLength) return plain;
  return plain.slice(0, maxLength).trim() + "…";
}

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    select: {
      slug: true,
      title: true,
      category: true,
      readTime: true,
      imageUrl: true,
      content: true,
      publishedAt: true,
      createdAt: true,
    },
  });

  const posts = blogs.map((b) => ({
    slug: b.slug,
    title: b.title,
    excerpt: excerptFromContent(b.content),
    date: (b.publishedAt ?? b.createdAt).toISOString().slice(0, 10),
    category: b.category,
    readTime: b.readTime ?? "",
    image: b.imageUrl ?? PLACEHOLDER_IMAGE,
  }));

  return (
    <div className="min-h-screen bg-brand-50 text-brand-950">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-linear-to-br from-white via-brand-50 to-brand-100">
          <div className="hero-animate-blob pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-200/40 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
            <p className="hero-animate-pill inline-block rounded-full border border-brand-200 bg-brand-100 px-4 py-1.5 text-sm font-medium text-brand-600">
              Insights & updates
            </p>
            <h1 className="hero-animate-title mt-4 text-4xl font-extrabold tracking-tight text-brand-950 md:text-5xl">
              Blog
            </h1>
            <p className="hero-animate-desc mt-4 max-w-2xl text-lg leading-relaxed text-brand-600">
              News, guides, and insights from our lab and the wider diagnostics and research community.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          {posts.length === 0 ? (
            <p className="text-center text-brand-600">No posts yet. Check back soon.</p>
          ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm transition-all duration-300 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100/50"
              >
                {/* Image */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-brand-100">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {/* Top accent */}
                <div className="h-1 w-full bg-linear-to-r from-brand-300 to-brand-400 opacity-80 group-hover:from-brand-400 group-hover:to-brand-500" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-brand-100 px-2.5 py-1 font-medium text-brand-600">
                      {post.category}
                    </span>
                    <span className="text-brand-400">{post.readTime}</span>
                  </div>
                  <time
                    dateTime={post.date}
                    className="mt-2 block text-xs font-medium text-brand-400"
                  >
                    {formatDate(post.date)}
                  </time>
                  <h2 className="mt-2 text-lg font-bold leading-snug text-brand-950 transition-colors group-hover:text-brand-600">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-600 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-500 group-hover:text-brand-600">
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          )}
        </section>

        {/* CTA */}
        <section className="border-t border-brand-100 bg-white px-6 py-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-brand-600">
              Have a topic you’d like us to cover?{" "}
              <Link href="/#contact" className="font-semibold text-brand-500 underline hover:text-brand-600">
                Get in touch
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
