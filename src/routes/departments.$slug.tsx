import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { departments } from "@/data/departments";
import { staff } from "@/data/staff";

export const Route = createFileRoute("/departments/$slug")({
  loader: ({ params }): { dept: (typeof departments)[number] } => {
    const dept = departments.find((d) => d.slug === params.slug);
    if (!dept) throw notFound();
    return { dept };
  },
  head: ({ loaderData, params }) => {
    const d = loaderData?.dept;
    const title = d ? `${d.name} Department — BrightFuture Academy` : "Department — BrightFuture Academy";
    const desc = d?.short ?? "Department at BrightFuture Academy";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/departments/${params.slug}` },
        ...(d ? [{ property: "og:image", content: d.image }] : []),
      ],
      links: [{ rel: "canonical", href: `/departments/${params.slug}` }],
    };
  },
  component: DepartmentDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Department not found</h1>
        <p className="mt-3 text-muted-foreground">We couldn't find that department.</p>
        <Button asChild className="mt-6"><Link to="/departments">Back to departments</Link></Button>
      </div>
    </SiteLayout>
  ),
  errorComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <Button asChild className="mt-6"><Link to="/departments">Back to departments</Link></Button>
      </div>
    </SiteLayout>
  ),
});

function DepartmentDetail() {
  const { dept } = Route.useLoaderData();
  const deptStaff = staff.filter((s) => s.department === dept.name);

  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <img src={dept.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/60" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
          <Button asChild variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
            <Link to="/departments"><ArrowLeft className="mr-1 h-4 w-4" /> All departments</Link>
          </Button>
          <p className="mt-6 text-4xl">{dept.icon}</p>
          <h1 className="mt-2 text-4xl font-bold md:text-5xl">{dept.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-primary-foreground/85">{dept.short}</p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 lg:grid-cols-[1.4fr_1fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-bold">About the department</h2>
            <p className="mt-4 text-muted-foreground">{dept.description}</p>
            <h3 className="mt-8 text-lg font-semibold">Highlights</h3>
            <ul className="mt-4 space-y-2">
              {dept.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /> {h}
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-2xl border bg-card p-6">
            <h3 className="font-display text-lg font-semibold">Faculty</h3>
            {deptStaff.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">Faculty list coming soon.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {deptStaff.map((s) => (
                  <li key={s.slug}>
                    <Link to="/staff/$slug" params={{ slug: s.slug }} className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted">
                      <img src={s.photo} alt="" loading="lazy" className="h-10 w-10 rounded-full object-cover" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{s.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{s.title}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Button asChild className="mt-6 w-full"><Link to="/admissions">Apply now</Link></Button>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
