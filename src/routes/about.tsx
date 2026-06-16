import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { images } from "@/data/images";
import { site, stats } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — BrightFuture Academy" },
      { name: "description", content: `Founded in ${site.founded}, BrightFuture Academy combines academic excellence with character formation. Learn about our mission, values and history.` },
      { property: "og:title", content: "About BrightFuture Academy" },
      { property: "og:description", content: "Our mission, values, history and leadership." },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: images.heroCampus },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About us"
        title="A school where every child is seen, heard and challenged."
        description={`Founded in ${site.founded}, BrightFuture has grown into one of the region's most respected K–college institutions.`}
        image={images.heroCampus}
      />

      <section className="bg-background py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">Our mission</h2>
            <p className="mt-4 text-muted-foreground">
              To form curious, kind and capable young people who succeed academically, contribute to their communities and lead with integrity.
            </p>
            <h2 className="mt-10 text-3xl font-bold">Our values</h2>
            <ul className="mt-4 grid gap-3 text-muted-foreground">
              {[
                ["Excellence", "We pursue rigorous, joyful learning every day."],
                ["Integrity", "We tell the truth and keep our promises."],
                ["Compassion", "We care for one another and for our world."],
                ["Innovation", "We try new ideas, learn from mistakes and improve."],
              ].map(([t, b]) => (
                <li key={t} className="rounded-lg border bg-card p-4">
                  <p className="font-semibold text-foreground">{t}</p>
                  <p className="mt-1 text-sm">{b}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <img src={images.studentSmiling} alt="BrightFuture student" className="aspect-[4/5] w-full rounded-2xl object-cover shadow-xl" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <Card key={s.label}>
              <CardContent className="p-6 text-center">
                <p className="font-display text-3xl font-bold text-primary md:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto w-full max-w-3xl px-4 text-center lg:px-8">
          <h2 className="text-3xl font-bold">Our story</h2>
          <p className="mt-4 text-muted-foreground">
            BrightFuture Academy opened its doors in {site.founded} with 48 students and a simple promise: every child deserves
            an education that takes them seriously. Twenty-five years on, we serve over 1,200 students from JSS1 to SS3 across a
            campus that includes new science laboratories, an expanded library, a robotics studio and a competitive sports
            complex. Our alumni now study, work and lead in over 30 countries.
          </p>
          <div className="mt-8">
            <Button asChild><Link to="/admissions">Join the next generation</Link></Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
