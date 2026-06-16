import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { news } from "@/data/news";
import { images } from "@/data/images";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "News — BrightFuture Academy" },
      { name: "description", content: "Latest news, achievements and announcements from BrightFuture Academy." },
      { property: "og:title", content: "News — BrightFuture Academy" },
      { property: "og:description", content: "Latest news and announcements." },
      { property: "og:url", content: "/news" },
      { property: "og:image", content: images.news1 },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: NewsIndex,
});

const PAGE_SIZE = 6;

function NewsIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [page, setPage] = useState(1);

  const categories = useMemo(() => ["All", ...Array.from(new Set(news.map((n) => n.category)))], []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return news.filter((n) => {
      if (cat !== "All" && n.category !== cat) return false;
      if (term && !`${n.title} ${n.excerpt}`.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [q, cat]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="News"
        title="What's happening at BrightFuture."
        description="Achievements, announcements and stories from across the school."
        image={images.news1}
      />
      <section className="bg-background py-12">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Input
              placeholder="Search news…"
              value={q}
              maxLength={80}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              className="md:max-w-sm"
              aria-label="Search news"
            />
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => { setCat(c); setPage(1); }}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium ${cat === c ? "bg-primary text-primary-foreground" : "border bg-card hover:bg-muted"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {current.length === 0 ? (
            <div className="mt-12 rounded-xl border bg-card p-12 text-center">
              <p className="text-muted-foreground">No articles match your search.</p>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {current.map((n) => (
                <Link
                  key={n.slug}
                  to="/news/$slug"
                  params={{ slug: n.slug }}
                  className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={n.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <Badge variant="secondary">{n.category}</Badge>
                    <h2 className="mt-3 line-clamp-2 font-display text-lg font-semibold">{n.title}</h2>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{n.excerpt}</p>
                    <p className="mt-3 text-xs text-muted-foreground">{new Date(n.date).toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" })}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`h-9 w-9 rounded-md text-sm font-medium ${page === p ? "bg-primary text-primary-foreground" : "border bg-card hover:bg-muted"}`}
                  aria-current={page === p ? "page" : undefined}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
