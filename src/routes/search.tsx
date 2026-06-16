import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Input } from "@/components/ui/input";
import { news } from "@/data/news";
import { events } from "@/data/events";
import { staff } from "@/data/staff";
import { departments } from "@/data/departments";
import { images } from "@/data/images";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — BrightFuture Academy" },
      { name: "description", content: "Search news, events, staff and departments at BrightFuture Academy." },
      { property: "og:title", content: "Search" },
      { property: "og:description", content: "Search across BrightFuture Academy." },
      { property: "og:url", content: "/search" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/search" }],
  }),
  component: SearchPage,
});

type Result = { kind: string; title: string; description: string; to: string; params?: Record<string, string> };

function SearchPage() {
  const [q, setQ] = useState("");
  const results = useMemo<Result[]>(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    const out: Result[] = [];
    for (const n of news) {
      if (`${n.title} ${n.excerpt}`.toLowerCase().includes(term))
        out.push({ kind: "News", title: n.title, description: n.excerpt, to: "/news/$slug", params: { slug: n.slug } });
    }
    for (const e of events) {
      if (`${e.title} ${e.excerpt}`.toLowerCase().includes(term))
        out.push({ kind: "Event", title: e.title, description: e.excerpt, to: "/events/$slug", params: { slug: e.slug } });
    }
    for (const s of staff) {
      if (`${s.name} ${s.title} ${s.department}`.toLowerCase().includes(term))
        out.push({ kind: "Staff", title: s.name, description: `${s.title}, ${s.department}`, to: "/staff/$slug", params: { slug: s.slug } });
    }
    for (const d of departments) {
      if (`${d.name} ${d.short}`.toLowerCase().includes(term))
        out.push({ kind: "Department", title: d.name, description: d.short, to: "/departments/$slug", params: { slug: d.slug } });
    }
    return out;
  }, [q]);

  return (
    <SiteLayout>
      <PageHero eyebrow="Search" title="Search the school" image={images.library} />
      <section className="bg-background py-12">
        <div className="mx-auto w-full max-w-3xl px-4 lg:px-8">
          <Input
            placeholder="Search news, events, staff…"
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            maxLength={120}
            aria-label="Search query"
          />
          <div className="mt-8">
            {q.trim() === "" ? (
              <p className="text-sm text-muted-foreground">Type something above to start searching.</p>
            ) : results.length === 0 ? (
              <p className="text-sm text-muted-foreground">No results for "{q}".</p>
            ) : (
              <ul className="space-y-3">
                {results.map((r, i) => (
                  <li key={`${r.kind}-${i}`} className="rounded-xl border bg-card p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-primary">{r.kind}</p>
                    <h2 className="mt-1 text-lg font-semibold">
                      <Link to={r.to as "/news/$slug"} params={r.params as { slug: string }} className="hover:underline">{r.title}</Link>
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
