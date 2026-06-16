import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { staff } from "@/data/staff";
import { images } from "@/data/images";

export const Route = createFileRoute("/staff/")({
  head: () => ({
    meta: [
      { title: "Staff Directory — BrightFuture Academy" },
      { name: "description", content: "Meet the teachers and leadership team at BrightFuture Academy." },
      { property: "og:title", content: "Staff Directory" },
      { property: "og:description", content: "Our teachers and leadership team." },
      { property: "og:url", content: "/staff" },
      { property: "og:image", content: images.teacher },
    ],
    links: [{ rel: "canonical", href: "/staff" }],
  }),
  component: StaffIndex,
});

function StaffIndex() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Staff"
        title="Meet the educators behind BrightFuture."
        description="A community of passionate, qualified and caring teachers, led by an experienced senior team."
        image={images.teacher}
      />
      <section className="bg-background py-20">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {staff.map((s) => (
              <Link
                key={s.slug}
                to="/staff/$slug"
                params={{ slug: s.slug }}
                className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img src={s.photo} alt={s.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h2 className="font-display text-base font-semibold">{s.name}</h2>
                  <p className="text-sm text-muted-foreground">{s.title}</p>
                  <p className="mt-1 text-xs text-primary">{s.department}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
