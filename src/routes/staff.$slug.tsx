import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Mail } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { staff } from "@/data/staff";

export const Route = createFileRoute("/staff/$slug")({
  loader: ({ params }): { member: (typeof staff)[number] } => {
    const member = staff.find((s) => s.slug === params.slug);
    if (!member) throw notFound();
    return { member };
  },
  head: ({ loaderData, params }) => {
    const m = loaderData?.member;
    const title = m ? `${m.name} — ${m.title} | BrightFuture Academy` : "Staff member — BrightFuture Academy";
    const desc = m ? `${m.title}, ${m.department}. ${m.bio.slice(0, 120)}` : "Staff member at BrightFuture Academy";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/staff/${params.slug}` },
        ...(m ? [{ property: "og:image", content: m.photo }, { property: "og:type", content: "profile" }] : []),
      ],
      links: [{ rel: "canonical", href: `/staff/${params.slug}` }],
    };
  },
  component: StaffDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Staff member not found</h1>
        <Button asChild className="mt-6"><Link to="/staff">Back to staff directory</Link></Button>
      </div>
    </SiteLayout>
  ),
  errorComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <Button asChild className="mt-6"><Link to="/staff">Back to staff</Link></Button>
      </div>
    </SiteLayout>
  ),
});

function StaffDetail() {
  const { member } = Route.useLoaderData();
  return (
    <SiteLayout>
      <section className="bg-muted/50 py-12">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <Button asChild variant="ghost" size="sm">
            <Link to="/staff"><ArrowLeft className="mr-1 h-4 w-4" /> Staff directory</Link>
          </Button>
        </div>
      </section>
      <section className="bg-background py-12">
        <div className="mx-auto grid w-full max-w-5xl gap-10 px-4 lg:grid-cols-[1fr_1.4fr] lg:px-8">
          <div>
            <img src={member.photo} alt={member.name} className="aspect-square w-full rounded-2xl object-cover shadow-xl" loading="eager" />
          </div>
          <div>
            <p className="text-sm font-medium text-primary">{member.department}</p>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">{member.name}</h1>
            <p className="mt-1 text-lg text-muted-foreground">{member.title}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary">{member.yearsOfExperience} years experience</Badge>
              {member.subjects.map((s) => <Badge key={s} variant="outline">{s}</Badge>)}
            </div>
            <h2 className="mt-8 text-lg font-semibold">Biography</h2>
            <p className="mt-2 text-muted-foreground">{member.bio}</p>
            <h2 className="mt-6 text-lg font-semibold">Qualifications</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
              {member.qualifications.map((q) => <li key={q}>{q}</li>)}
            </ul>
            <div className="mt-8">
              <Button asChild variant="outline">
                <a href={`mailto:${member.email}`}><Mail className="mr-2 h-4 w-4" /> {member.email}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
