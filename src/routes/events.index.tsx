import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin, Clock } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Badge } from "@/components/ui/badge";
import { events } from "@/data/events";
import { images } from "@/data/images";

export const Route = createFileRoute("/events/")({
  head: () => ({
    meta: [
      { title: "Events — BrightFuture Academy" },
      { name: "description", content: "Upcoming events at BrightFuture Academy: open days, sports, arts, community and more." },
      { property: "og:title", content: "Events — BrightFuture Academy" },
      { property: "og:description", content: "Upcoming events at BrightFuture Academy." },
      { property: "og:url", content: "/events" },
      { property: "og:image", content: images.event1 },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: EventsIndex,
});

function EventsIndex() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Events"
        title="What's on at BrightFuture."
        description="Open days, sports fixtures, arts performances, alumni gatherings and more."
        image={images.event1}
      />
      <section className="bg-background py-12">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <Link
                key={e.slug}
                to="/events/$slug"
                params={{ slug: e.slug }}
                className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={e.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <Badge className="absolute left-3 top-3 bg-gold text-gold-foreground">{e.category}</Badge>
                </div>
                <div className="p-5">
                  <h2 className="line-clamp-2 font-display text-lg font-semibold">{e.title}</h2>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> {new Date(e.date).toLocaleDateString("en", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}</li>
                    <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {e.time}</li>
                    <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {e.venue}</li>
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
