import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { departments } from "@/data/departments";
import { images } from "@/data/images";

export const Route = createFileRoute("/departments/")({
  head: () => ({
    meta: [
      { title: "Departments — BrightFuture Academy" },
      { name: "description", content: "Explore our five departments: Science, Arts & Humanities, Commercial, ICT & Computing, Sports & Athletics." },
      { property: "og:title", content: "Departments — BrightFuture Academy" },
      { property: "og:description", content: "Five departments, one ambition." },
      { property: "og:url", content: "/departments" },
      { property: "og:image", content: images.classroom },
    ],
    links: [{ rel: "canonical", href: "/departments" }],
  }),
  component: DepartmentsPage,
});

function DepartmentsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Departments"
        title="Five departments, one ambition."
        description="Each department combines specialist teaching with our shared values of excellence, integrity, compassion and innovation."
        image={images.classroom}
      />
      <section className="bg-background py-20">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <Link
                key={d.slug}
                to="/departments/$slug"
                params={{ slug: d.slug }}
                className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <p className="text-2xl">{d.icon}</p>
                  <h2 className="mt-2 font-display text-lg font-semibold">{d.name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{d.short}</p>
                  <p className="mt-4 text-sm font-medium text-primary group-hover:underline">Explore department →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
