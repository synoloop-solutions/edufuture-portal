import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { events } from "@/data/events";

export const Route = createFileRoute("/events/$slug")({
  loader: ({ params }) => {
    const event = events.find((e) => e.slug === params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData, params }) => {
    const e = loaderData?.event;
    const title = e ? `${e.title} — BrightFuture Academy` : "Event — BrightFuture Academy";
    const desc = e?.excerpt ?? "Event at BrightFuture Academy";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/events/${params.slug}` },
        ...(e ? [{ property: "og:image", content: e.image }] : []),
      ],
      links: [{ rel: "canonical", href: `/events/${params.slug}` }],
      scripts: e
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Event",
                name: e.title,
                startDate: e.date,
                location: { "@type": "Place", name: e.venue },
                image: e.image,
                description: e.excerpt,
              }),
            },
          ]
        : [],
    };
  },
  component: EventDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Event not found</h1>
        <Button asChild className="mt-6"><Link to="/events">Back to events</Link></Button>
      </div>
    </SiteLayout>
  ),
  errorComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <Button asChild className="mt-6"><Link to="/events">Back to events</Link></Button>
      </div>
    </SiteLayout>
  ),
});

function EventDetail() {
  const { event: e } = Route.useLoaderData();
  return (
    <SiteLayout>
      <div className="bg-muted/50 py-8">
        <div className="mx-auto w-full max-w-3xl px-4 lg:px-8">
          <Button asChild variant="ghost" size="sm">
            <Link to="/events"><ArrowLeft className="mr-1 h-4 w-4" /> All events</Link>
          </Button>
        </div>
      </div>
      <article className="mx-auto w-full max-w-3xl px-4 py-10 lg:px-8">
        <Badge className="bg-gold text-gold-foreground">{e.category}</Badge>
        <h1 className="mt-3 text-3xl font-bold md:text-4xl">{e.title}</h1>
        <img src={e.image} alt="" loading="eager" className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover shadow-md" />
        <div className="mt-6 grid gap-3 rounded-xl border bg-card p-5 sm:grid-cols-3">
          <p className="flex items-center gap-2 text-sm"><Calendar className="h-4 w-4 text-primary" /> {new Date(e.date).toLocaleDateString("en", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
          <p className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-primary" /> {e.time}</p>
          <p className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-primary" /> {e.venue}</p>
        </div>
        <div className="mt-8">
          {e.description.map((p, i) => (
            <p key={i} className="mt-4 text-foreground/85 leading-relaxed first:mt-0">{p}</p>
          ))}
        </div>
        <div className="mt-8 flex gap-3">
          <Button asChild><Link to="/contact">RSVP / Enquire</Link></Button>
          <Button asChild variant="outline"><Link to="/events">More events</Link></Button>
        </div>
      </article>
    </SiteLayout>
  );
}
